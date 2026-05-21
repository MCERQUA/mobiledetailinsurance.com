#!/usr/bin/env python3
"""
link-audit.py — Audit internal links and images for mobiledetailinsurance.com.

Walks every .html file under SITE_ROOT (excluding stitch-mockups/, node_modules/,
docs/, .git/), parses href= and src= attributes, classifies them, and reports:
  - broken internal links (with source + target)
  - anchor mismatches (link references #anchor that doesn't exist on target page)
  - all <img src> values grouped by status (exists, stitch leftover, placeholder,
    missing)

Read-only. Does not modify any HTML.
"""
from __future__ import annotations

import os
import re
import sys
from pathlib import Path
from collections import defaultdict
from urllib.parse import urlsplit, unquote

SITE_ROOT = Path("/workspace/Websites/mobiledetailinsurance.com").resolve()
EXCLUDE_DIRS = {"stitch-mockups", "node_modules", "docs", ".git"}

# href="..." | href='...' | href=bare   (same for src=)
ATTR_RE = re.compile(
    r"""\b(href|src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))""",
    re.IGNORECASE,
)
ID_RE = re.compile(r"""\bid\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))""", re.IGNORECASE)
NAME_RE = re.compile(r"""\bname\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))""", re.IGNORECASE)
IMG_RE = re.compile(
    r"""<img\b[^>]*\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))[^>]*>""",
    re.IGNORECASE,
)

EXTERNAL_PREFIXES = ("http://", "https://", "mailto:", "tel:", "javascript:", "data:")


def find_html_files(root: Path) -> list[Path]:
    out: list[Path] = []
    for dirpath, dirnames, filenames in os.walk(root):
        # prune excluded dirs in place
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for fn in filenames:
            if fn.endswith(".html"):
                out.append(Path(dirpath) / fn)
    return sorted(out)


def extract_attr_values(text: str, attr: str) -> list[str]:
    vals: list[str] = []
    for m in ATTR_RE.finditer(text):
        if m.group(1).lower() != attr.lower():
            continue
        v = m.group(2) or m.group(3) or m.group(4) or ""
        vals.append(v)
    return vals


def extract_anchors(text: str) -> set[str]:
    anchors: set[str] = set()
    for m in ID_RE.finditer(text):
        v = m.group(1) or m.group(2) or m.group(3) or ""
        if v:
            anchors.add(v)
    for m in NAME_RE.finditer(text):
        v = m.group(1) or m.group(2) or m.group(3) or ""
        if v:
            anchors.add(v)
    return anchors


def resolve_target(value: str, source_file: Path) -> Path:
    """Resolve a relative or root-relative URL path to an absolute filesystem Path."""
    # strip query + fragment for filesystem resolution
    parts = urlsplit(value)
    path = unquote(parts.path)
    if path.startswith("/"):
        # root-relative
        target = SITE_ROOT / path.lstrip("/")
    else:
        target = (source_file.parent / path).resolve()
    return target


def is_external(value: str) -> bool:
    v = value.strip().lower()
    return any(v.startswith(p) for p in EXTERNAL_PREFIXES)


def main() -> int:
    html_files = find_html_files(SITE_ROOT)
    print(f"Scanning {len(html_files)} HTML files under {SITE_ROOT}\n")

    # Pre-parse anchors per file so we can verify cross-page #anchor links
    anchors_by_file: dict[Path, set[str]] = {}
    text_by_file: dict[Path, str] = {}
    for f in html_files:
        try:
            t = f.read_text(encoding="utf-8", errors="replace")
        except Exception as e:
            print(f"  ! failed to read {f}: {e}")
            continue
        text_by_file[f] = t
        anchors_by_file[f] = extract_anchors(t)

    total_links = 0
    total_external = 0
    total_internal_pages = 0
    total_internal_assets = 0
    total_anchor_only = 0

    broken_links: list[tuple[Path, str, str]] = []  # (source, raw_value, reason)
    anchor_mismatches: list[tuple[Path, str, str]] = []  # (source, raw_value, reason)

    # Image-specific tracking
    img_exists_count = 0
    img_stitch: list[tuple[Path, str]] = []
    img_placeholder_missing: list[tuple[Path, str]] = []
    img_other_missing: list[tuple[Path, str]] = []

    for f in html_files:
        text = text_by_file.get(f, "")
        if not text:
            continue

        # ---- href + src classification ----
        for attr in ("href", "src"):
            for raw in extract_attr_values(text, attr):
                if not raw:
                    continue
                total_links += 1
                v = raw.strip()

                if is_external(v):
                    total_external += 1
                    continue

                parts = urlsplit(v)
                path = unquote(parts.path)
                frag = parts.fragment

                # Anchor-only link (#foo)
                if not path and frag:
                    total_anchor_only += 1
                    if frag not in anchors_by_file.get(f, set()):
                        anchor_mismatches.append(
                            (f, raw, f"anchor #{frag} not found on same page")
                        )
                    continue

                # Resolve target path on disk
                target = resolve_target(v, f)

                # Decide if this looks like a page (html) or asset
                is_html = target.suffix.lower() in (".html", ".htm") or (
                    target.is_dir() if target.exists() else False
                )

                if is_html:
                    total_internal_pages += 1
                    # If target is a directory, look for index.html
                    actual = target
                    if actual.is_dir():
                        actual = actual / "index.html"
                    if not actual.exists():
                        broken_links.append((f, raw, f"file not found: {actual}"))
                        continue
                    if frag:
                        target_anchors = anchors_by_file.get(actual.resolve())
                        if target_anchors is None:
                            # target page wasn't pre-parsed (maybe under excluded dir)
                            try:
                                tt = actual.read_text(encoding="utf-8", errors="replace")
                                target_anchors = extract_anchors(tt)
                            except Exception:
                                target_anchors = set()
                        if frag not in target_anchors:
                            anchor_mismatches.append(
                                (f, raw, f"anchor #{frag} not found in {actual.name}")
                            )
                else:
                    total_internal_assets += 1
                    if not target.exists():
                        broken_links.append((f, raw, f"asset not found: {target}"))

        # ---- <img src> reporting ----
        for m in IMG_RE.finditer(text):
            raw = m.group(1) or m.group(2) or m.group(3) or ""
            if not raw:
                continue
            v = raw.strip()
            if is_external(v):
                if "lh3.googleusercontent.com" in v:
                    img_stitch.append((f, raw))
                # other external imgs: count as exists (not our concern for disk)
                continue
            target = resolve_target(v, f)
            if target.exists():
                img_exists_count += 1
                continue
            # Missing on disk — classify
            parts = urlsplit(v)
            path = unquote(parts.path)
            if path.startswith("/images/") and path.endswith(".webp"):
                img_placeholder_missing.append((f, raw))
            else:
                img_other_missing.append((f, raw))

    # ---- Report ----
    rel = lambda p: str(Path(p).relative_to(SITE_ROOT)) if isinstance(p, Path) else p

    print("=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Total href/src values checked: {total_links}")
    print(f"  external (skipped):          {total_external}")
    print(f"  internal pages:              {total_internal_pages}")
    print(f"  internal assets:             {total_internal_assets}")
    print(f"  anchor-only:                 {total_anchor_only}")
    print()
    print(f"Broken internal links:         {len(broken_links)}")
    print(f"Anchor mismatches:             {len(anchor_mismatches)}")
    print()
    print(f"<img> exists on disk:          {img_exists_count}")
    print(f"<img> stitch leftovers:        {len(img_stitch)}")
    print(f"<img> placeholder /images/*.webp missing: {len(img_placeholder_missing)}")
    print(f"<img> other broken/missing:    {len(img_other_missing)}")

    if broken_links:
        print("\n" + "-" * 70)
        print("BROKEN INTERNAL LINKS")
        print("-" * 70)
        for src, raw, reason in broken_links:
            print(f"  [{rel(src)}]")
            print(f"    href/src: {raw}")
            print(f"    reason:   {reason}")

    if anchor_mismatches:
        print("\n" + "-" * 70)
        print("ANCHOR MISMATCHES")
        print("-" * 70)
        for src, raw, reason in anchor_mismatches:
            print(f"  [{rel(src)}] {raw}  ({reason})")

    if img_stitch:
        print("\n" + "-" * 70)
        print("STITCH LEFTOVER IMAGES (lh3.googleusercontent.com)")
        print("-" * 70)
        for src, raw in img_stitch:
            print(f"  [{rel(src)}] {raw}")

    if img_placeholder_missing:
        print("\n" + "-" * 70)
        print(f"PLACEHOLDER /images/*.webp REFERENCED BUT NOT ON DISK ({len(img_placeholder_missing)})")
        print("-" * 70)
        # Group by image path so list is digestible
        grouped: dict[str, list[Path]] = defaultdict(list)
        for src, raw in img_placeholder_missing:
            grouped[raw].append(src)
        for raw, srcs in sorted(grouped.items()):
            print(f"  {raw}  (referenced by {len(srcs)} file(s))")

    if img_other_missing:
        print("\n" + "-" * 70)
        print("OTHER MISSING IMAGE REFERENCES")
        print("-" * 70)
        for src, raw in img_other_missing:
            print(f"  [{rel(src)}] {raw}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
