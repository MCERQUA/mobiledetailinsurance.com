# Technical SEO Sweep — 2026-05-21

**Pages audited:** 18
**Result:** 2 issue categories found (bare `href="#"` dead links across all 18 pages; 13 broken image references across 6 pages)

## Summary Table

| Page | DOCTYPE | lang="en" | charset | viewport | href="#" | console/debug | broken imgs |
|------|---------|-----------|---------|----------|----------|---------------|-------------|
| index.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | ✗ |
| coverage.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | ✗ |
| coverage-by-state.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | ✗ |
| get-a-quote.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | — |
| trust-faqs.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | ✗ |
| pressure-washing-insurance.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | ✗ |
| auto-detailing-insurance.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | ✗ |
| success.html | ✓ | ✓ | ✓ | ✓ | — | — | — |
| states/california.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | — |
| states/texas.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | — |
| states/florida.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | — |
| states/arizona.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | — |
| blog/index.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | — |
| blog/posts/ceramic-coating-insurance-mobile-detailers.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | — |
| blog/posts/general-liability-insurance-for-mobile-detailing.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | — |
| blog/posts/business-liability-protection-mobile-detailing.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | — |
| blog/posts/equipment-protection-mobile-detailing-business.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | — |
| blog/posts/mobile-auto-detailing-insurance-essentials.html | ✓ | ✓ | ✓ | ✓ | ✗ | — | — |

## Issues Found

### Missing DOCTYPE
None.

### Missing lang attribute
None.

### Missing charset
None.

### Missing viewport
None.

### Bare `href="#"` dead links

Pattern: every page that contains the global footer has a `href="#"` on a "Privacy Policy" link. Every page with the inline lead-capture form also has a `href="#"` on the "privacy policy" disclaimer link. `success.html` is the only page clean (no footer, no form).

- `index.html:849` — footer Privacy Policy link
- `index.html:918` — form disclaimer privacy policy link
- `coverage.html:724` — footer Privacy Policy link
- `coverage.html:793` — form disclaimer privacy policy link
- `coverage-by-state.html:717` — footer Privacy Policy link
- `coverage-by-state.html:786` — form disclaimer privacy policy link
- `get-a-quote.html:480` — quote-form disclaimer privacy policy link
- `get-a-quote.html:609` — footer Privacy Policy link
- `get-a-quote.html:673` — secondary form disclaimer privacy policy link
- `trust-faqs.html:1119` — footer Privacy Policy link
- `trust-faqs.html:1188` — form disclaimer privacy policy link
- `pressure-washing-insurance.html:894` — footer Privacy Policy link
- `pressure-washing-insurance.html:963` — form disclaimer privacy policy link
- `auto-detailing-insurance.html:846` — footer Privacy Policy link
- `auto-detailing-insurance.html:915` — form disclaimer privacy policy link
- `states/california.html:775` — footer Privacy Policy link
- `states/california.html:842` — form disclaimer privacy policy link
- `states/texas.html:774` — footer Privacy Policy link
- `states/texas.html:841` — form disclaimer privacy policy link
- `states/florida.html:806` — footer Privacy Policy link
- `states/florida.html:861` — form disclaimer privacy policy link
- `states/arizona.html:874` — footer Privacy Policy link
- `states/arizona.html:929` — form disclaimer privacy policy link
- `blog/index.html:651` — footer Privacy Policy link
- `blog/index.html:720` — form disclaimer privacy policy link
- `blog/posts/ceramic-coating-insurance-mobile-detailers.html:716` — footer Privacy Policy link
- `blog/posts/ceramic-coating-insurance-mobile-detailers.html:752` — form disclaimer privacy policy link
- `blog/posts/general-liability-insurance-for-mobile-detailing.html:781` — footer Privacy Policy link
- `blog/posts/general-liability-insurance-for-mobile-detailing.html:817` — form disclaimer privacy policy link
- `blog/posts/business-liability-protection-mobile-detailing.html:486` — footer Privacy Policy link
- `blog/posts/equipment-protection-mobile-detailing-business.html:580` — footer Privacy Policy link
- `blog/posts/mobile-auto-detailing-insurance-essentials.html:531` — footer Privacy Policy link

### Inline console.log / debugger
None.

### Broken image references

Disk inventory of `/images/` (live files): `Mobile-detail-insurance.webp`, `placeholder-logo.webp`, and `reviews/` containing `Man.webp` (capital M), `man-4.webp`, `man-5.webp`, `man-6.webp`, `man-7.webp`, `man2.webp`, `man3.webp`, `woman-2.webp`, `woman-3.webp`, `woman-4.webp`, `woman.webp`.

The following `<img src>` refs resolve to files that do not exist at the corresponding disk path:

- `index.html:363` — `/images/hero-detailing.webp` (missing)
- `index.html:708` — `/images/reviews/man.webp` (disk has `Man.webp` with capital M — case-sensitive filesystem will 404)
- `index.html:766` — `/images/cta-protect-your-shine.webp` (missing)
- `coverage.html:294` — `/images/coverage-hero-ceramic.webp` (missing)
- `coverage.html:329` — `/images/coverage-equipment-nozzle.webp` (missing)
- `coverage.html:626` — `/images/coverage-custom-quote-beads.webp` (missing)
- `coverage-by-state.html:293` — `/images/placeholder-state-map.webp` (missing)
- `trust-faqs.html:631` — `/images/reviews/man.webp` (case mismatch with `Man.webp`)
- `pressure-washing-insurance.html:375` — `/images/pressure-washing-hero.webp` (missing)
- `pressure-washing-insurance.html:606` — `/images/foam-cannon-action.webp` (missing)
- `pressure-washing-insurance.html:625` — `/images/residential-pressure-washing.webp` (missing)
- `pressure-washing-insurance.html:657` — `/images/commercial-pressure-washing.webp` (missing)
- `pressure-washing-insurance.html:689` — `/images/pressure-washing-fleet.webp` (missing)
- `auto-detailing-insurance.html:375` — `/images/auto-detailing-shop-hero.webp` (missing)
- `auto-detailing-insurance.html:401` — `/images/auto-detailing-shop-hero.webp` (missing, second usage)

Refs verified present on disk: `/images/reviews/man2.webp`, `/images/reviews/woman.webp`.

## Notes

- The footer-link and form-disclaimer `href="#"` instances are a single template defect repeated across every page that includes the shared footer / lead-capture partial. A single fix in the source template (replace `href="#"` with `href="/privacy-policy.html"` or equivalent) plus rebuild would clear the whole bare-hash class. A `/privacy-policy.html` page does not currently exist in the site root — it should be created before re-wiring the links.
- The 13 broken image references break critical above-the-fold imagery on five high-value commercial pages (`index.html`, `coverage.html`, `coverage-by-state.html`, `pressure-washing-insurance.html`, `auto-detailing-insurance.html`). Recommend either restoring the source `.webp` assets at the expected paths under `/images/` or updating each `src` to an extant placeholder (e.g. `/images/Mobile-detail-insurance.webp`) until art is ready.
- The `man.webp` vs `Man.webp` case mismatch is a real production hazard: it likely renders on case-insensitive macOS/Windows local dev but 404s on Linux/Netlify. Either rename the on-disk file to lowercase or fix the two `src` references.
- All 18 pages pass the four foundational checks (DOCTYPE, `html lang="en"`, UTF-8 charset, mobile viewport). No inline `console.log` or `debugger;` found anywhere.
