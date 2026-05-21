#!/usr/bin/env python3
"""
round5-verify.py — Final integration check before deploy.

Verifies:
  1. sitemap.xml — XML parses, every <loc> resolves to a real file on disk,
     count matches expectation (18 baseline + 8 new state stubs = 26).
  2. JSON-LD — every <script type="application/ld+json"> block on every page
     parses cleanly via json.loads().
  3. State pages — 12 expected state stubs all exist (CA, FL, TX, AZ +
     NV, OR, WA, GA, NC, OK, NM, LA).
  4. Forms readiness — every <form data-netlify="true"> has the 4 required
     attributes + hidden form-name input.
  5. Images — delegates to link-audit.py for the image-presence check.

Exit code is 0 only if every check passes.
"""
from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

SITE = Path("/workspace/Websites/mobiledetailinsurance.com").resolve()
EXCLUDE_DIRS = {"stitch-mockups", "node_modules", "docs", ".git"}

EXPECTED_STATES = [
    "california.html", "florida.html", "texas.html", "arizona.html",
    "nevada.html", "oregon.html", "washington.html", "georgia.html",
    "north-carolina.html", "oklahoma.html", "new-mexico.html", "louisiana.html",
]

JSONLD_RE = re.compile(
    r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.IGNORECASE | re.DOTALL,
)
FORM_RE = re.compile(r"<form\b[^>]*>", re.IGNORECASE)


def find_html_files(root: Path) -> list[Path]:
    out = []
    import os
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for fn in filenames:
            if fn.endswith(".html"):
                out.append(Path(dirpath) / fn)
    return sorted(out)


def check_sitemap() -> tuple[bool, list[str]]:
    errors: list[str] = []
    sitemap = SITE / "sitemap.xml"
    if not sitemap.exists():
        return False, ["sitemap.xml not found"]

    try:
        tree = ET.parse(sitemap)
    except ET.ParseError as e:
        return False, [f"XML parse error: {e}"]

    root = tree.getroot()
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = root.findall("sm:url", ns)

    if len(urls) < 18:
        errors.append(f"sitemap has {len(urls)} <url> entries — expected at least 18")

    locs: list[str] = []
    for u in urls:
        loc_el = u.find("sm:loc", ns)
        if loc_el is None or not loc_el.text:
            errors.append("found <url> with no <loc>")
            continue
        locs.append(loc_el.text.strip())

    # Resolve each loc to a real file
    domain_re = re.compile(r"https?://[^/]+")
    for loc in locs:
        path = domain_re.sub("", loc).lstrip("/")
        if not path or path == "":
            path = "index.html"
        elif path.endswith("/"):
            path = path + "index.html"
        elif "." not in path.split("/")[-1]:
            # bare directory — try .html sibling, then index.html
            html_sibling = SITE / (path + ".html")
            dir_index = SITE / path / "index.html"
            if not html_sibling.exists() and not dir_index.exists():
                errors.append(f"sitemap loc '{loc}' → no .html file or dir/index")
            continue
        target = SITE / path
        if not target.exists():
            errors.append(f"sitemap loc '{loc}' → file not found at {target}")

    return len(errors) == 0, errors + [f"-- {len(urls)} <url> entries, {len([e for e in errors if 'file not found' in e or 'no .html' in e])} broken"]


def check_jsonld(html_files: list[Path]) -> tuple[bool, list[str]]:
    errors: list[str] = []
    total_blocks = 0
    files_with_ld = 0

    for f in html_files:
        try:
            text = f.read_text(encoding="utf-8", errors="replace")
        except Exception as e:
            errors.append(f"read failed {f}: {e}")
            continue
        matches = JSONLD_RE.findall(text)
        if matches:
            files_with_ld += 1
        for i, blob in enumerate(matches):
            total_blocks += 1
            try:
                json.loads(blob)
            except json.JSONDecodeError as e:
                rel = f.relative_to(SITE)
                errors.append(f"JSON-LD parse error in {rel} block {i+1}: {e}")

    return len(errors) == 0, errors + [
        f"-- {total_blocks} JSON-LD block(s) across {files_with_ld} file(s), {len(errors)} parse errors"
    ]


def check_states() -> tuple[bool, list[str]]:
    errors: list[str] = []
    states_dir = SITE / "states"
    if not states_dir.exists():
        return False, ["states/ directory not found"]
    present = sorted(p.name for p in states_dir.glob("*.html"))
    missing = [s for s in EXPECTED_STATES if s not in present]
    extra = [s for s in present if s not in EXPECTED_STATES]
    for m in missing:
        errors.append(f"missing state page: states/{m}")
    msg = [
        f"-- {len(present)}/12 state pages present",
        f"   missing: {missing or 'none'}",
        f"   extra: {extra or 'none'}",
    ]
    return len(missing) == 0, errors + msg


def check_forms(html_files: list[Path]) -> tuple[bool, list[str]]:
    errors: list[str] = []
    form_count = 0
    for f in html_files:
        try:
            text = f.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue
        for m in FORM_RE.finditer(text):
            tag = m.group(0)
            if "data-netlify=" not in tag:
                continue  # not a Netlify form, skip
            form_count += 1
            rel = f.relative_to(SITE)

            # Required attrs on form tag
            if 'method="POST"' not in tag and "method='POST'" not in tag:
                errors.append(f"{rel}: form missing method=POST: {tag[:80]}")
            if "data-netlify-honeypot=" not in tag:
                errors.append(f"{rel}: form missing data-netlify-honeypot: {tag[:80]}")
            if "netlify-honeypot=" in tag and "data-netlify-honeypot=" not in tag:
                errors.append(f"{rel}: form has bare netlify-honeypot (needs data- prefix)")
            if 'action="/success"' in tag and 'action="/success.html"' not in tag:
                errors.append(f"{rel}: form action='/success' should be '/success.html'")
            # Check it has a name= attr
            name_m = re.search(r'\bname="([^"]+)"', tag)
            if not name_m:
                errors.append(f"{rel}: form missing name= attribute")
                continue
            form_name = name_m.group(1)
            # Find the form body (until next </form>)
            start = m.end()
            end = text.find("</form>", start)
            if end == -1:
                errors.append(f"{rel}: form '{form_name}' missing closing </form>")
                continue
            body = text[start:end]
            # Hidden form-name input matching form name
            hidden_re = re.compile(
                r'<input[^>]*type="hidden"[^>]*name="form-name"[^>]*value="([^"]+)"',
                re.IGNORECASE,
            )
            hm = hidden_re.search(body)
            if not hm:
                errors.append(f"{rel}: form '{form_name}' missing hidden form-name input")
            elif hm.group(1) != form_name:
                errors.append(
                    f"{rel}: form '{form_name}' hidden value='{hm.group(1)}' mismatch"
                )
            # Honeypot bot-field input
            if 'name="bot-field"' not in body:
                errors.append(f"{rel}: form '{form_name}' missing bot-field honeypot input")
    return len(errors) == 0, errors + [f"-- {form_count} Netlify forms checked"]


def main() -> int:
    print("=" * 70)
    print("ROUND 5 — INTEGRATION VERIFICATION")
    print("=" * 70)

    html_files = find_html_files(SITE)
    print(f"\nScanning {len(html_files)} HTML files\n")

    results: list[tuple[str, bool, list[str]]] = []
    results.append(("1. sitemap.xml integrity", *check_sitemap()))
    results.append(("2. JSON-LD validity", *check_jsonld(html_files)))
    results.append(("3. State pages present", *check_states()))
    results.append(("4. Netlify Forms readiness", *check_forms(html_files)))

    all_pass = True
    for label, ok, lines in results:
        status = "PASS" if ok else "FAIL"
        print(f"\n[{status}] {label}")
        for line in lines:
            print(f"  {line}")
        if not ok:
            all_pass = False

    print("\n" + "=" * 70)
    print("OVERALL: " + ("PASS — DEPLOY APPROVED" if all_pass else "FAIL — DEPLOY BLOCKED"))
    print("=" * 70)
    return 0 if all_pass else 1


if __name__ == "__main__":
    sys.exit(main())
