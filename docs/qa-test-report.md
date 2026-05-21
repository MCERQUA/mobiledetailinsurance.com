# QA Test Report — Round 4 Deploy Prep

**Date:** 2026-05-21
**Author:** worker-a (josh-desk-2@mesh)
**Site:** Detailer Shield Insurance (`https://www.contractorschoiceagency.com`)
**Site root:** `/workspace/Websites/mobiledetailinsurance.com/`

---

## Executive Summary

**Verdict:** READY to deploy. All blocking issues resolved. One minor SEO follow-up (`success.html` lacks `noindex` meta) and pre-existing artwork-TODO gaps remain but do not block the round-4 ship.

- 18/18 HTML pages structurally valid (DOCTYPE, balanced tags, lang/charset/viewport, non-empty title)
- 17/17 SEO pages have unique title + description + canonical + OG/Twitter + JSON-LD (`success.html` intentionally bare — see watch items)
- All 21 JSON-LD `<script>` blocks across the site parse as valid JSON (verified with `json.loads()`)
- All canonicals point to `https://www.contractorschoiceagency.com` — no legacy `mobiledetailinsurance.com` leakage
- 0 inline `console.log` / `debugger` leftovers
- 0 Stitch leftover image URLs (`lh3.googleusercontent.com`)
- JS (`js/main.js`) passes `node --check` syntax validation
- `npm run build` succeeds with worker-b's @graph rewrite — produces `css/styles.min.css` and reproducibly correct schema on `index.html`
- SEO infra (sitemap.xml, robots.txt, llms.txt, netlify.toml security headers) present and well-formed (worker-c)

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

**Blockers:** none — all hard blockers resolved this round.

**Watch items (non-blocking, follow-up rounds):**

1. **`success.html` missing `<meta name="robots" content="noindex">`** — post-form-submit thank-you page. Currently has no description / canonical / OG / Twitter / JSON-LD either (worker-b intentionally skipped since conversion pages shouldn't be indexed). One-line fix: add `<meta name="robots" content="noindex,follow">` to its `<head>`. Recommended next round.
2. **`images/optimized/` directory does not exist** — every page preloads `images/optimized/company-logo-{large,medium,small}.webp`. The `<picture>` srcset 404s and the browser falls back to the unoptimized `<img src>` (which works). Wastes preload bandwidth and shows 404s in DevTools. Fix: either run `npm run optimize:images` to generate them, or remove the preload/srcset references.
3. **Missing neighbor state pages** — `states/{arizona,california,florida,texas}.html` link to non-existent neighbors (nevada, oregon, washington, georgia, north-carolina, oklahoma, new-mexico, louisiana). Currently 404 on click. Fix: stub the missing state pages or remove the cross-links.
4. **Bare `href="#"` Privacy Policy + form disclaimer links** — every page's footer + lead form use `href="#"` for "Privacy Policy". A `/privacy-policy.html` page does not exist. Fix: create the page and update the shared template.
5. **~13 content `<img>` TODO placeholders** — hero/CTA imagery on index/coverage/pressure-washing/auto-detailing pages. Expected per round-3 artwork pipeline. Site ships visibly but with broken image icons until art lands.
6. **`success.html` Tailwind anomaly** — uses Tailwind v2 (jsdelivr) instead of v3 (cdn.tailwindcss.com) like every other page. Renders correctly; standardize next round.

**`build-faq.js` schema integrity (was a blocker, now RESOLVED):** worker-b rewrote `build-faq.js` to emit a canonical `@graph` (Organization + LocalBusiness + WebSite + Service + BreadcrumbList, plus FAQPage only when a `<section id="faq">` exists in the source HTML). This eliminates the previous risk where every Netlify build clobbered any extra schemas on index.html. Verified by running `npm run build` locally — index.html now ships with the full @graph reproducibly.

---

## SEO Infrastructure (worker-c deliverables verified)

- `sitemap.xml` — well-formed XML, all 18 pages listed with priority + lastmod
- `robots.txt` — comprehensive AI bot allowlist (Anthropic, OpenAI, Google, Meta, Perplexity, etc.), sitemap reference, `/docs/` `/scripts/` `/.netlify/` excluded
- `llms.txt` — rich brand description, primary services, trust & company, blog index — matches Detailer Shield positioning
- `netlify.toml` — security headers (HSTS, X-Frame-Options, Permissions-Policy, etc.), long-cache for `/images/` `/css/` `/js/`, short-cache for sitemap/robots/llms.txt
- `docs/technical-seo-sweep.md` — independent SEO audit covering DOCTYPE / lang / charset / viewport / dead links / broken images. Findings align with this report.

---

## Pre-deploy Git State

- **Branch:** `master`
- **Working tree:** clean
- **Unpushed commits ahead of `origin/master`:** 54 (full round-2 / 3 / 4 work — all three workers + auto-saver)
- **Remote:** `git@github-mobiledetailinsurance.com:MCERQUA/mobiledetailinsurance.com.git` (per-repo SSH alias for MCERQUA write key, per `agent-git-push-workflow` skill)
- **Auto-saver:** active — every file save is auto-committed by the host watcher. No further `git add` / `git commit` from worker-a needed.

## Post-build Verification

- `npm run build` ran twice (once for the build-faq.js patch, once after worker-b's rewrite) — both succeeded
- 21 JSON-LD blocks across 18 files all parse with `json.loads()` — 0 invalid
- `index.html` @graph contains: Organization, LocalBusiness, WebSite, Service, BreadcrumbList (FAQPage omitted because no `<section id="faq">` in source — by design of new build-faq.js)
- Per-page schema coverage (worker-b's audit): 17/17 BreadcrumbList, 11/17 Service, 9/17 FAQPage, 5/17 Article/BlogPosting

---

## Deploy Decision Options

For manager:
- **Option A — `git push origin master`** → 54 commits go to GitHub, Netlify auto-deploys from master via webhook (runs `npm run build` per netlify.toml). Worker-a is configured with the MCERQUA write key and can execute. **Recommended.**
- **Option B — `netlify deploy --prod`** → NOT viable from this container: `netlify` CLI is not installed and `.netlify/` config not present.
- **Option C — Manager handles `git push` manually** out-of-band (no SSH key sharing needed).

**Worker-a recommends Option A**, gated on explicit manager approval per the round-4 brief ("do NOT push without manager approval — this is a production deploy"). Awaiting go-signal.

---

## Files Changed by worker-a in Round 4

- `build-faq.js` — patched `publisherConfig.address` with real Chandler AZ values + cleared placeholder `sameAs` URLs (later superseded by worker-b's full @graph rewrite; address values carried forward)
- `images/reviews/Man.webp` → `images/reviews/man.webp` — case fix for Linux/Netlify (prevents 404 in production)
- `css/styles.min.css` — regenerated by `npm run build`
- `scripts/link-audit.py` — new re-runnable link/image audit script
- `docs/qa-test-report.md` — this file

## Files Verified (delivered by others)

- worker-b: meta tags, OG, Twitter cards, JSON-LD @graph on all 17 SEO pages; `docs/meta-and-schema-audit.md`; full `build-faq.js` rewrite to canonical @graph emitter
- worker-c: `sitemap.xml`, `robots.txt`, `llms.txt`, `netlify.toml` security/cache headers, `docs/technical-seo-sweep.md`

---

## Round 5 — Forms Readiness (worker-c)

Audit + fix pass for Netlify Forms native capture. Every existing form on the site is now compliant with Netlify's build-time form parser requirements.

### Issues found and fixed across all 14 pages

| # | Issue | Pages affected | Fix |
|---|---|---|---|
| 1 | Garbage `netlify ` standalone attribute on form tag | 12 (every modal-contact + newsletter form) | Removed |
| 2 | `netlify-honeypot="bot-field"` missing `data-` prefix | 14 (every form site-wide) | Renamed to `data-netlify-honeypot="bot-field"` |
| 3 | `action="/success"` → 404 (file is `/success.html`) | 14 | Updated to `action="/success.html"` |
| 4 | `<form>` tag missing `data-netlify-recaptcha="true"` on forms that already host `<div data-netlify-recaptcha="true">` widget | 13 (modal-contact + get-a-quote, NOT newsletter) | Added attribute |
| 5 | Form name `modal-contact` did not match brief standard | 12 | Renamed to `contact` (form tag + hidden form-name input) |

### Final form registry

| Name | Pages | reCAPTCHA | Honeypot | Fields |
|---|---|---|---|---|
| `contact` | every page with floating contact button (13 pages) | ✓ | ✓ | name, email, phone, company |
| `get-a-quote` | `get-a-quote.html` | ✓ | ✓ | full_name, email, phone, company, street, city, state, zip, years_in_business, num_employees, annual_revenue, equipment_value, services[], client_base, insurance_status, coverage_needs[], additional_info |
| `newsletter` | `blog/index.html` | — | ✓ | email |

### Netlify requirements — verification

For every form on every page:
1. ✓ `name="<unique>"` on `<form>` tag
2. ✓ `data-netlify="true"` on `<form>` tag
3. ✓ `method="POST"`
4. ✓ Hidden `<input type="hidden" name="form-name" value="<unique>">` as first child
5. ✓ Honeypot field — `data-netlify-honeypot="bot-field"` on form tag + `<p class="hidden" style="display:none;"><label>... <input name="bot-field"></label></p>` inside form
6. ✓ reCAPTCHA — `data-netlify-recaptcha="true"` on form tag + `<div data-netlify-recaptcha="true"></div>` widget (contact + get-a-quote only)
7. ✓ `action="/success.html"` — success page exists at site root

### New file: `forms.html`

Created a build-time discovery file at site root:
- Lists every named form with full field list
- `<meta name="robots" content="noindex,nofollow">` — not user-facing
- All inputs `hidden` so the page itself renders blank
- Insurance: Netlify form parser will still register the form names if any production page lazy-loads or removes its form at runtime

### netlify.toml — no changes needed

Current `netlify.toml` has no `[[redirects]]` or form-handling config that would conflict with Netlify Forms. Forms are enabled by default when forms are detected in built HTML.

### Files modified in Round 5 (forms work)

- `index.html`
- `get-a-quote.html`
- `coverage.html`
- `coverage-by-state.html`
- `trust-faqs.html`
- `pressure-washing-insurance.html`
- `auto-detailing-insurance.html`
- `blog/index.html`
- `blog/posts/general-liability-insurance-for-mobile-detailing.html`
- `blog/posts/ceramic-coating-insurance-mobile-detailers.html`
- `states/california.html`
- `states/florida.html`
- `states/texas.html`
- `states/arizona.html`

### New files in Round 5 (forms work)

- `forms.html` (form-discovery file at site root)

### Note for round 5 follow-up

Worker-a is generating 8 new state stub pages (NV, OR, WA, GA, NC, OK, NM, LA). If those pages include the modal-contact form via the same template, worker-c will re-run the same 4-pattern sed pass on them during Task 2 verification to bring them to the same standard.

