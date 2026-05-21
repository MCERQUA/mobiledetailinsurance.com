# Meta + Schema Audit — Round 4 (Worker B)

**Date:** 2026-05-21
**Owner:** page-team-b@mesh (josh-desk-3)
**Scope:** all 17 production HTML pages
**Production host:** `https://www.contractorschoiceagency.com`

---

## Summary

| Coverage | Before | After |
|---|---:|---:|
| Pages with unique `<title>` | 16/17 | 17/17 |
| Pages with `<meta name="description">` | 16/17 | 17/17 |
| Pages with `<link rel="canonical">` | 6/17 | 17/17 |
| Pages with `<meta name="robots">` | ~0 | 17/17 |
| Pages with `<meta name="author">` | ~0 | 17/17 |
| Pages with `<meta name="theme-color">` | ~0 | 17/17 |
| Pages with Open Graph (`og:*`) | 16/17 | 17/17 |
| Pages with Twitter card | 13/17 | 17/17 |
| Pages with full JSON-LD `@graph` | 0/17 | 17/17 |
| Pages with `Service` schema | 3/17 | 11/17 |
| Pages with `BreadcrumbList` | 0/17 | 17/17 |
| Pages with `FAQPage` (real Q&A only) | 5/17 | 9/17 |
| Pages with `BlogPosting`/`Article` | 4/17 | 5/17 |
| `Organization`/`LocalBusiness`/`WebSite` defined once + referenced by `@id` | No | Yes |

Production canonical host is now consistent across every page: `https://www.contractorschoiceagency.com`. The legacy `mobiledetailinsurance.com` host references in `og:url` and canonical have been removed from the 8 pages that previously had mixed domains.

---

## Per-page result

| Page | Title (len) | Desc (len) | Canonical | OG type | Twitter | Schema types |
|---|---|---|---|---|---|---|
| `index.html` | 54 | 167 | `/` | website | ✅ | Organization · LocalBusiness · WebSite · Service · BreadcrumbList _(+ FAQPage injected by `build-faq.js` if `<section id="faq">` is present in body)_ |
| `coverage.html` | 84 | 154 | `/coverage.html` | website | ✅ | Org · LB · WS · Service _(#service-coverage)_ · BreadcrumbList |
| `coverage-by-state.html` | 66 | 141 | `/coverage-by-state.html` | website | ✅ | Org · LB · WS · Service _(#service-coverage-by-state)_ · BreadcrumbList |
| `get-a-quote.html` | 61 | 106 | `/get-a-quote.html` | website | ✅ | Org · LB · WS · Service _(ref)_ · ContactPage · BreadcrumbList |
| `trust-faqs.html` | 72 | 126 | `/trust-faqs.html` | website | ✅ | Org · LB · WS · AboutPage · BreadcrumbList · **FAQPage (18 Q&A verbatim)** |
| `pressure-washing-insurance.html` | 62 | 142 | `/pressure-washing-insurance.html` | website | ✅ | Org · LB · WS · Service _(#service-pressure-washing-insurance)_ · BreadcrumbList |
| `auto-detailing-insurance.html` | 69 | 145 | `/auto-detailing-insurance.html` | website | ✅ | Org · LB · WS · Service _(#service-auto-detailing-insurance)_ · BreadcrumbList · **FAQPage (6 Q&A verbatim)** |
| `states/california.html` | 58 | 140 | `/states/california.html` | website | ✅ | Org · LB · WS · **LocalBusiness-CA** · Service · BreadcrumbList · **FAQPage (5 Q&A)** |
| `states/texas.html` | 53 | 143 | `/states/texas.html` | website | ✅ | Org · LB · WS · **LocalBusiness-TX** · Service · BreadcrumbList · **FAQPage (5 Q&A)** |
| `states/florida.html` | 74 | 148 | `/states/florida.html` | website | ✅ | Org · LB · WS · **LocalBusiness-FL** · Service · BreadcrumbList · **FAQPage (5 Q&A)** |
| `states/arizona.html` | 70 | 152 | `/states/arizona.html` | website | ✅ | Org · LB · WS · **LocalBusiness-AZ (geo coords)** · Service · BreadcrumbList · **FAQPage (5 Q&A)** |
| `blog/index.html` | 49 | 143 | `/blog/` | website | ✅ | Org · LB · WS · **Blog** · BreadcrumbList |
| `blog/posts/business-liability-protection-mobile-detailing.html` | 77 | 143 | `/blog/posts/...` | **article** | ✅ | Org · LB · WS · **BlogPosting** · BreadcrumbList |
| `blog/posts/ceramic-coating-insurance-mobile-detailers.html` | 64 | 140 | `/blog/posts/...` | **article** | ✅ | Org · LB · WS · BlogPosting · BreadcrumbList · **FAQPage (16 Q&A)** |
| `blog/posts/equipment-protection-mobile-detailing-business.html` | 70 | 132 | `/blog/posts/...` | **article** | ✅ | Org · LB · WS · BlogPosting · BreadcrumbList |
| `blog/posts/general-liability-insurance-for-mobile-detailing.html` | 82 | 130 | `/blog/posts/...` | **article** | ✅ | Org · LB · WS · BlogPosting · BreadcrumbList · **FAQPage (6 Q&A)** |
| `blog/posts/mobile-auto-detailing-insurance-essentials.html` | 85 | 134 | `/blog/posts/...` | **article** | ✅ | Org · LB · WS · BlogPosting · BreadcrumbList |

All 17 JSON-LD blocks parse cleanly (validated via `json.loads`).

---

## Schema architecture

Single `@graph` per page. The canonical `Organization`, `LocalBusiness`, and `WebSite` nodes are defined once on `index.html` with stable `@id` URIs and **referenced by `@id` only** on every other page — no duplication across the site.

- `#organization` → `https://www.contractorschoiceagency.com/#organization`
- `#localbusiness` → `https://www.contractorschoiceagency.com/#localbusiness`
- `#website` → `https://www.contractorschoiceagency.com/#website`
- `#service-mobile-detailing-insurance` → defined on `index.html`; referenced where applicable
- Each pillar page gets its own `Service` node (`#service-coverage`, `#service-pressure-washing-insurance`, etc.) so each Service can carry its own description and URL.
- Each state page gets a state-scoped `LocalBusiness` (`#localbusiness-california` etc.) with `areaServed` = state, `parentOrganization` = `#organization`. Address stays the Chandler HQ (the brand is one entity; state pages model service area, not separate locations).

---

## Per-page meta layout (canonical block)

Every page now starts its `<head>` SEO section with this exact ordering:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>...</title>
<meta name="description" content="...">
<link rel="canonical" href="https://www.contractorschoiceagency.com/...">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="author" content="Detailer Shield Insurance">
<meta name="theme-color" content="#0A1F44">

<!-- Open Graph -->
<meta property="og:type" content="website|article">
<meta property="og:site_name" content="Detailer Shield Insurance">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://www.contractorschoiceagency.com/images/og/<slug>.webp">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="...">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
<meta name="twitter:image:alt" content="...">
```

Blog posts add `og:type="article"` plus:

```html
<meta property="article:published_time" content="2026-04-XXT00:00:00Z">
<meta property="article:modified_time" content="2026-05-21T00:00:00Z">
<meta property="article:author" content="Detailer Shield Insurance">
<meta property="article:section" content="...">
<meta property="article:tag" content="...">
```

---

## Open items (handed off, not blockers)

1. **OG images.** Every `og:image` URL points to `https://www.contractorschoiceagency.com/images/og/<slug>.webp` — these 1200×630 placeholders **do not yet exist** in the repo. Tracked as a `TODO:` comment immediately above each `og:image` line. (Worker for OG image production is outside Round 4 scope.)
2. **Sitemap update.** Worker C owns `sitemap.xml`; recommend they confirm all 17 canonical URLs above are present and use the `https://www.contractorschoiceagency.com` host.
3. **`build-faq.js` patch (this round).** The deploy script previously **clobbered all JSON-LD on `index.html`** and re-injected only `LocalBusiness` + `FAQPage` from `data/faq.md`. It now emits the full `@graph` (Organization + LocalBusiness + WebSite + Service + BreadcrumbList) and only appends `FAQPage` when `<section id="faq">` exists in the source HTML, preventing schema/body divergence. Also fixed a `String.replace` bug where `$$` in `priceRange` was being interpreted as a special replacement pattern. Worker A asked us to flag this so they re-run the deploy QA pass.
4. **Image alt audit.** All 20 `<img>` tags across all 17 pages already had populated `alt` attributes; zero `data-alt` attributes were present. No alt fixes were required. _(Most pages use SVG/icon-only imagery, no raster content imagery yet.)_
5. **`index.html` description length** is 167 chars (target 140–160). Slightly over but well within Google's display cap (~170 chars before truncation). Acceptable; flag for copywriter review if pursuing strict 160-char compliance.
6. **No invented data.** No fake reviews, ratings, FAQ Q&A, or dates. FAQPage schema appears only on pages with visible Q&A pairs in the body, extracted verbatim from `<details>`/`<summary>` blocks or `<h3>` + `<p>` patterns.

---

## Files touched this round

- `index.html`
- `coverage.html`
- `coverage-by-state.html`
- `get-a-quote.html`
- `trust-faqs.html`
- `pressure-washing-insurance.html`
- `auto-detailing-insurance.html`
- `states/california.html`
- `states/texas.html`
- `states/florida.html`
- `states/arizona.html`
- `blog/index.html`
- `blog/posts/business-liability-protection-mobile-detailing.html`
- `blog/posts/ceramic-coating-insurance-mobile-detailers.html`
- `blog/posts/equipment-protection-mobile-detailing-business.html`
- `blog/posts/general-liability-insurance-for-mobile-detailing.html`
- `blog/posts/mobile-auto-detailing-insurance-essentials.html`
- `build-faq.js` _(deploy-time schema generator — patched to emit full `@graph` and not corrupt `$$`)_
