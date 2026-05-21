# QA Test Report — Round 4 Deploy Prep

**Date:** 2026-05-21
**Author:** worker-a (josh-desk-2@mesh)
**Site:** Detailer Shield Insurance (`https://www.contractorschoiceagency.com`)
**Site root:** `/workspace/Websites/mobiledetailinsurance.com/`

---

## Executive Summary

**Verdict:** READY to deploy after manager review of the items in "Deploy Blockers / Watch Items" below.

- 18/18 HTML pages structurally valid (DOCTYPE, balanced tags, lang/charset/viewport, non-empty title)
- 0 inline `console.log` / `debugger` leftovers
- 0 Stitch leftover image URLs (`lh3.googleusercontent.com`) — all replaced
- JS (`js/main.js`) passes `node --check` syntax validation
- `npm run build` succeeds; produces `css/styles.min.css` + regenerates FAQ section in `index.html`
- SEO infra (sitemap.xml, robots.txt, llms.txt) present and well-formed (delivered by worker-c)
- Tailwind CDN reference present on all pages (1 stylistic anomaly — see below)

---

## Validation Results

### 1. HTML structure (18/18 PASS)

| Page | DOCTYPE | balanced tags | lang/charset/viewport | title | Tailwind |
|---|---|---|---|---|---|
| index.html | ✓ | ✓ | ✓ | ✓ | ✓ |
| coverage.html | ✓ | ✓ | ✓ | ✓ | ✓ |
| coverage-by-state.html | ✓ | ✓ | ✓ | ✓ | ✓ |
| get-a-quote.html | ✓ | ✓ | ✓ | ✓ | ✓ |
| trust-faqs.html | ✓ | ✓ | ✓ | ✓ | ✓ |
| success.html | ✓ | ✓ | ✓ | ✓ | ✓ (legacy jsdelivr v2 — see note) |
| pressure-washing-insurance.html | ✓ | ✓ | ✓ | ✓ | ✓ |
| auto-detailing-insurance.html | ✓ | ✓ | ✓ | ✓ | ✓ |
| states/{arizona,california,florida,texas}.html | ✓ | ✓ | ✓ | ✓ | ✓ |
| blog/index.html | ✓ | ✓ | ✓ | ✓ | ✓ |
| blog/posts/*.html (5 posts) | ✓ | ✓ | ✓ | ✓ | ✓ |

**Stylistic note:** `success.html` loads Tailwind v2 via `cdn.jsdelivr.net/npm/tailwindcss@2.2.19/...` while every other page uses `cdn.tailwindcss.com?plugins=forms,container-queries` (v3). Renders correctly but utility classes differ. Recommend standardizing in a future round.

### 2. JS validation

- `js/main.js` — `node --check` passes, syntax clean
- 0 inline `console.log(` or `debugger;` anywhere in the 18 HTML files
- Inline scripts: reCAPTCHA loader (external), schema.org JSON-LD blocks (data, not code)

### 3. Internal link audit (script: `scripts/link-audit.py`)

960 internal href/src values scanned. Findings:

- **Anchor mismatches:** 0
- **Stitch leftovers (`lh3.googleusercontent.com`):** 0 ✓
- **Broken internal page links:** ~22 — all fall into two pre-existing classes:
  - **Missing optimized logo set (24 refs):** every page preloads + sources `images/optimized/company-logo-{large,medium,small}.webp`. The `images/optimized/` directory does not exist. Either (a) run `npm run optimize:images` to generate them, or (b) fix the `<picture>` srcset to point at the existing `images/placeholder-logo.webp` / `images/Mobile-detail-insurance.webp`. Not site-breaking — browser falls back to the unoptimized `<img src>` — but wastes preload bandwidth and triggers 404s in DevTools.
  - **Missing neighbor state pages (10 refs):** `states/{arizona,california,florida,texas}.html` link to non-existent neighbor states (nevada, oregon, washington, georgia, north-carolina, oklahoma, new-mexico, louisiana). Either remove the cross-links or create stub pages. Currently not breaking — links 404 on click.
- **Bare `href="#"` placeholders (~16 refs):** every page's footer Privacy Policy link + lead-capture form disclaimer use `href="#"`. Single source: shared footer/disclaimer partial pattern repeated per page. Mike noted "no privacy policy yet" — recommend stubbing `/privacy-policy.html` next round and updating the template.

### 4. Image audit

| Class | Count | Action |
|---|---|---|
| Real images present on disk | ~15 | ok |
| Stitch leftovers (`lh3.googleusercontent.com`) | 0 | ✓ none |
| Case-mismatch (`Man.webp` vs `man.webp`) | 1 file | **FIXED** — renamed `images/reviews/Man.webp` → `man.webp` (Linux/Netlify is case-sensitive; macOS/Windows hid the bug locally) |
| Missing content images with TODO placeholders | ~13 | Expected — round 3 artwork pipeline pending |

Missing image list (high-traffic pages affected):
- `index.html` — hero-detailing, cta-protect-your-shine
- `coverage.html` — coverage-hero-ceramic, coverage-equipment-nozzle, coverage-custom-quote-beads
- `coverage-by-state.html` — placeholder-state-map
- `pressure-washing-insurance.html` — pressure-washing-hero, foam-cannon-action, residential/commercial pressure-washing, fleet
- `auto-detailing-insurance.html` — auto-detailing-shop-hero (used 2×)
- blog/featured-image set

These are the TODO placeholders called out in the brief; not a deploy blocker but visible visual gaps until art is shipped.

### 5. Build pipeline (`npm run build`)

`npm install` → 229 packages, 44s, 0 errors.
`npm run build` → success.

- `npm run build:css` → `postcss css/styles.css -o css/styles.min.css` — Tailwind compiled cleanly
- `node build-faq.js` → parses `data/faq.md` (18 FAQ items), injects `<section id="faq">` content + `<script type="application/ld+json">` LocalBusiness + FAQPage schemas into `index.html`

**Build script issue found + fixed:** `build-faq.js` had hardcoded address placeholders (`[STREET ADDRESS]`, `[CITY]`, etc.) that overwrote the real address on every run. Patched `publisherConfig` to real CCA address (12220 E Riggs Road, Suite #105, Chandler AZ 85249) and replaced `sameAs: ["[FACEBOOK URL]","[LINKEDIN URL]"]` with `sameAs: []`. Rebuild verified clean schema.

---

## Deploy Blockers / Watch Items

1. **`build-faq.js` strips ALL `<script type="application/ld+json">` from index.html on every build** (line 243 regex). If worker-b has added Service/BreadcrumbList/Article/etc schemas to `index.html`, the Netlify build will nuke them and re-inject only LocalBusiness + FAQPage. Schemas on every OTHER page are safe — build only touches index.html. **Decision needed:** either (a) edit build-faq.js to preserve additional schemas, (b) move all rich schema work off index.html, or (c) accept the limitation and have manager re-add any extra index.html schema as a hardcoded block in build-faq.js.
2. **`images/optimized/` directory missing** — preload links and `<picture>` srcsets reference it. Either run `npm run optimize:images` pre-deploy, or accept benign 404s with `<img src>` fallback.
3. **Missing content images** — ~13 hero/CTA images are TODO placeholders. Site is live-deployable but visibly incomplete on the affected pages.

---

## SEO Infrastructure (worker-c deliverables verified)

- `sitemap.xml` — well-formed XML, all 18 pages listed with priority + lastmod
- `robots.txt` — comprehensive AI bot allowlist (Anthropic, OpenAI, Google, Meta, Perplexity, etc.), sitemap reference, `/docs/` `/scripts/` `/.netlify/` excluded
- `llms.txt` — rich brand description, primary services, trust & company, blog index — matches Detailer Shield positioning
- `netlify.toml` — security headers (HSTS, X-Frame-Options, Permissions-Policy, etc.), long-cache for `/images/` `/css/` `/js/`, short-cache for sitemap/robots/llms.txt
- `docs/technical-seo-sweep.md` — independent SEO audit covering DOCTYPE / lang / charset / viewport / dead links / broken images. Findings align with this report.

---

## Pre-deploy Git State

(filled in after worker-b done message)

---

## Deploy Decision Options

For manager:
- **Option A — `git push origin master`** → triggers Netlify auto-deploy from master branch (per netlify.toml `command = "npm run build"`)
- **Option B — `netlify deploy --prod`** → manual CLI deploy if configured (Netlify CLI auth status unknown)
- **Option C — manager handles deploy manually** out-of-band

Worker-a recommends Option A after manager review of "Deploy Blockers / Watch Items" above.

---

## Files Changed by worker-a in Round 4

- `build-faq.js` — patched `publisherConfig.address` with real Chandler AZ values; replaced placeholder `sameAs` URLs with empty array
- `images/reviews/Man.webp` → `images/reviews/man.webp` — case fix for Linux/Netlify
- `index.html`, `css/styles.min.css` — regenerated by `npm run build` after `build-faq.js` patch
- `scripts/link-audit.py` — new re-runnable link/image audit tool
- `docs/qa-test-report.md` — this file
