# Interlink Audit — Detailer Shield Insurance

Date: 2026-05-21
Auditor: page-team-a (josh-desk-2@mesh)
Scope: 9 HTML pages — site root `/workspace/Websites/mobiledetailinsurance.com/`

## Summary

- **9 pages audited** (5 top-level: home, coverage, coverage-by-state, get-a-quote, trust-faqs, plus blog/index and 3 blog posts)
- **24 issues found**
  - **9 critical** (broken anchors, broken paths, broken back-links, missing pages)
  - **8 inconsistencies** (header/footer drift between legacy and refreshed pages)
  - **7 missing cross-links / nice-to-haves** (recommendations to deepen interlinking)

The dominant root cause: 5 pages have been refreshed to the new Tailwind/glass design (`index.html`, `coverage.html`, `trust-faqs.html`, `blog/index.html`) and 2 pages are still on the **legacy nav** (`coverage-by-state.html`, `get-a-quote.html`). The 3 blog posts (`blog/posts/*.html`) have **no header/footer at all** and use broken `../../index.html#contact` paths.

---

## Page-by-page link map

### 1. index.html  (home, REFRESHED)

**Header nav (desktop)** — sticky glass header, brand `Detailer Shield Insurance`:
| Label | href |
|---|---|
| Home | `/` (current, cyan underline) |
| Coverage | `coverage.html` |
| Coverage by State | `coverage-by-state.html` |
| Trust & FAQs | `trust-faqs.html` |
| Blog | `blog/` |
| Get Quote (amber CTA) | `get-a-quote.html` |

**Header nav (mobile drawer)** — adds `Get a Quote` (`get-a-quote.html`) as a 4th item between By State and Trust & FAQs. Order: Home, Coverage, Coverage by State, Get a Quote, Trust & FAQs, Blog.

**Footer columns** (4-column grid, on-background bg):
- Coverage: `coverage.html#equipment`, `coverage.html#liability`, `coverage.html#business`, `coverage-by-state.html`
- Company: `trust-faqs.html`, `get-a-quote.html`, `blog/`, `#` (Privacy Policy)
- Contact: `tel:8449675247`, `mailto:josh@contractorschoiceagency.com`

**Mobile bottom nav bar** (fixed): `/` (Home), `coverage.html`, `get-a-quote.html`, `trust-faqs.html`.

**In-body internal links**:
- Hero mobile CTA → `get-a-quote.html` ("Get Your Custom Quote")
- Hero desktop CTAs → `get-a-quote.html`, `coverage.html` ("View Coverage Details")
- Resource Center sidebar (desktop) → `blog/` (Safety Tips), `blog/` (Marketing Guide), `coverage.html` (Insurance 101), `trust-faqs.html` (Success Stories), `coverage-by-state.html` (State Laws)
- Coverage preview "Learn more" cards (3) → `coverage.html#equipment`, `coverage.html#liability`, `coverage.html#business`
- Final CTA → `get-a-quote.html` (mobile and desktop)

**IDs on page**: `closeModal`, `contactButton`, `contactModal`, `faqSchema`, `localBusinessSchema`, `menuButton`, `mobileMenu`, `tailwind-config` (none are page-section landing anchors).

---

### 2. coverage.html  (REFRESHED)

**Header nav (desktop)** — identical to index.html, but with `Coverage` styled as the active state (cyan underline).
**Mobile drawer** — same 6-item order as index.html.

**Footer** — identical to index.html footer (same 4 columns, same links).

**No mobile bottom nav bar** — missing from this page (present on index.html only).

**In-body internal links**:
- Hero CTA → `get-a-quote.html` ("Get Your Custom Quote")
- Mobile CTA → `get-a-quote.html`
- Business Continuity "Premium Support" inset → `trust-faqs.html`
- Resource Center sidebar → `blog/` (Safety Tips), `blog/` (Marketing Guide), `trust-faqs.html` (Insurance 101), `blog/` (Success Stories), `coverage-by-state.html` (State Laws)
- "Need a Custom Quote?" panel → `get-a-quote.html` (Consult an Agent), `coverage-by-state.html` (View All Policies)
- Final CTA → `get-a-quote.html`

**IDs on page**: `equipment`, `liability`, `business`, plus modal/menu IDs. **All three deep-link targets resolve correctly.**

---

### 3. coverage-by-state.html  (LEGACY)

**Header nav (desktop)** — legacy dark-blue `header-section`, brand "Mobile Detail Insurance" (plain text, no link):
| Label | href |
|---|---|
| Coverage | `coverage.html` |
| Testimonials | `index.html#testimonials` |
| FAQ | `trust-faqs.html` |
| Blog | `blog/` |
| Get a Quote (amber CTA) | `get-a-quote.html` |

**Header nav (mobile drawer)** — identical 5 items, same hrefs.
- Missing: explicit "Home" link
- Missing: "Coverage by State" self-link
- Label "FAQ" diverges from "Trust & FAQs" used on refreshed pages

**Footer** — legacy 3-column footer with raw `<h3 class="footer-heading">`:
- Coverage: `coverage.html` (Coverage Overview), `coverage-by-state.html` (By State), `#` (Equipment), `#` (Environmental)
- Company: `#` (About Us), `trust-faqs.html`, `blog/`, `get-a-quote.html`
- Contact: phone, address (no email)
- Bottom row: `#` Privacy Policy, `#` Terms of Service, `#` Sitemap

**In-body internal links**:
- Announcement bar: "Learn More" → `get-a-quote.html`
- Hero CTA → `get-a-quote.html`
- State grid: 50 states — 44 use `href="#"` (dead), 6 use `href="#state-AZ"` etc. (Arizona, California, Florida, Georgia, New York, Texas anchors). All 6 anchors resolve to corresponding `id="state-XX"` cards lower on the page.
- 6 spotlighted state cards each link to `get-a-quote.html?state=XX` (CA, TX, FL, NY, AZ, GA)
- Secondary nav (lower in page): `index.html` (Home), `coverage.html` (Coverage Overview), `get-a-quote.html`, `trust-faqs.html`, `blog/`
- Final CTA → `get-a-quote.html`

**IDs on page**: `state-directory`, `state-AZ`, `state-CA`, `state-FL`, `state-GA`, `state-NY`, `state-TX`, plus modal/menu IDs.

---

### 4. get-a-quote.html  (LEGACY)

**Header nav (desktop)** — legacy dark-blue style, brand "Mobile Detail Insurance" linking to `index.html`:
| Label | href |
|---|---|
| Coverage | `coverage.html` |
| By State | `coverage-by-state.html` |
| Trust & FAQs | `trust-faqs.html` |
| Blog | `blog/` |
| Get a Quote (amber CTA, current page) | `get-a-quote.html` |

**Header nav (mobile drawer)** — same 5 items.
- Missing: explicit "Home" link in the nav `<ul>` (brand wordmark is the home link)

**Footer** — same legacy 3-column structure:
- Coverage: `coverage.html` x4 (Liability, Equipment, Workers' Comp, Environmental — all point to same page, no anchors)
- Company: `index.html` (About Us), `trust-faqs.html`, `coverage-by-state.html` (By State), `blog/`
- Contact: phone only
- Bottom: `#` Privacy Policy, `#` Terms of Service, `#` Sitemap

**In-body internal links**:
- Announcement bar "Learn More" → `#quote-form-section` (resolves; id exists)
- Form section anchor target: `id="quote-form-section"`

**IDs on page**: `quote-form-section` plus dozens of form field IDs (full_name, email, phone, company, street, city, state, zip, years_in_business, num_employees, annual_revenue, equipment_value, additional_info) plus modal/menu IDs.

---

### 5. trust-faqs.html  (REFRESHED)

**Header nav (desktop)** — matches index.html nav exactly (Home, Coverage, Coverage by State, Trust & FAQs [active], Blog, Get Quote CTA).
**Mobile drawer** — same 6-item order as index.html.

**Footer** — identical to index/coverage footer.

**No mobile bottom nav bar** — missing.

**In-body internal links**:
- Hero CTAs → `#faqs` (Jump to FAQs), `get-a-quote.html` (Get Your Custom Quote)
- Final CTA → `get-a-quote.html`

**IDs on page**: `trust`, `faqs`, plus modal/menu/schema IDs. `#faqs` self-anchor resolves.

---

### 6. blog/index.html  (REFRESHED)

**Header nav (desktop)** — same 6-item structure as refreshed pages, paths corrected for blog/ subdir:
| Label | href |
|---|---|
| Home | `../` |
| Coverage | `../coverage.html` |
| Coverage by State | `../coverage-by-state.html` |
| Trust & FAQs | `../trust-faqs.html` |
| Blog | `./` (active) |
| Get Quote | `../get-a-quote.html` |

**Mobile drawer** — same items, brand links to `../`.

**Footer** — same 4-column refresh footer, all paths prefixed `../`:
- Coverage: `../coverage.html#equipment`, `../coverage.html#liability`, `../coverage.html#business`, `../coverage-by-state.html`
- Company: `../trust-faqs.html`, `../get-a-quote.html`, `./` (Blog), `#` (Privacy)
- Contact: tel + mailto

**No mobile bottom nav bar** — missing.

**In-body internal links**:
- Featured post (mobile-auto-detailing-insurance-essentials) — 2 links to `posts/mobile-auto-detailing-insurance-essentials.html`
- Post grid card 1 → `posts/mobile-auto-detailing-insurance-essentials.html` (x2)
- Post grid card 2 → `posts/business-liability-protection-mobile-detailing.html` (x2)
- Post grid card 3 → `posts/equipment-protection-mobile-detailing-business.html` (x2)
- Newsletter form action: `/success` (Netlify, not internal nav)

**IDs on page**: `blogSchema`, plus modal/menu IDs. No content section anchors.

---

### 7. blog/posts/business-liability-protection-mobile-detailing.html  (LEGACY POST, BROKEN)

**No `<header>` and no `<footer>` site nav** — page renders with inline breadcrumbs and back-links only.

**All internal links**:
| Line | Label | href | Resolves to |
|---|---|---|---|
| 153 | Home (breadcrumb) | `../../index.html` | site `index.html` ✓ |
| 154 | Blog (breadcrumb) | `../index.html` | **BROKEN — file is `blog/index.html`, but the actual file is `blog/index.html`; relative path from `blog/posts/foo.html` is `../index.html`** ✓ Resolves, but the file at `blog/index.html` is the blog landing page — link works. |
| 215 | "Get Free Quote" CTA | `../../index.html#contact` | **BROKEN** — `index.html` has no `id="contact"` |
| 298 | "Speak with an Expert" CTA | `../../index.html#contact` | **BROKEN** (same) |
| 314 | "← Back to Blog" | `../index.html` | Resolves to `blog/index.html` ✓ |
| 315 | "Get Insurance Quote →" | `../../index.html` | Drops user on home, **should be `../../get-a-quote.html`** |

**IDs on page**: none.

---

### 8. blog/posts/equipment-protection-mobile-detailing-business.html  (LEGACY POST, BROKEN)

Same structure as post #7. Links:
| Line | Label | href | Status |
|---|---|---|---|
| 172 | Home (breadcrumb) | `../../index.html` | ✓ |
| 173 | Blog (breadcrumb) | `../index.html` | ✓ (resolves to `blog/index.html`) |
| 281 | "Get Equipment Quote" | `../../index.html#contact` | **BROKEN** anchor |
| 392 | "Discuss Your Needs" | `../../index.html#contact` | **BROKEN** anchor |
| 408 | "← Back to Blog" | `../index.html` | ✓ |
| 409 | "Get Insurance Quote →" | `../../index.html` | **WRONG TARGET** — should go to `../../get-a-quote.html` |

**IDs on page**: none.

---

### 9. blog/posts/mobile-auto-detailing-insurance-essentials.html  (LEGACY POST, BROKEN)

Has an inline mini-header (not full site nav). Links:
| Line | Label | href | Status |
|---|---|---|---|
| 80 | Brand wordmark "Mobile Detail Insurance" | `../../` | ✓ (resolves to site root → `index.html`) |
| 82 | Home | `../../` | ✓ |
| 83 | Blog | `../` | ✓ (resolves to `blog/`) |
| 84 | Contact | `../../#contact` | **BROKEN** anchor on `index.html` |
| 368 | CTA button | `../../#contact` | **BROKEN** anchor |

No other nav links (no Coverage, Coverage by State, Trust & FAQs, or Get a Quote links).

**IDs on page**: none.

---

## Issues found

### Critical (broken — must fix)

1. **`coverage-by-state.html` header nav → `index.html#testimonials`** (2 occurrences: desktop + mobile drawer). `index.html` has **no `id="testimonials"`** element. **Fix:** remove the Testimonials nav item entirely (the refreshed home page has no dedicated testimonials section; testimonials are inline). Or, if testimonials should be linkable, add `id="testimonials"` to the `<section>` that wraps the "Trusted by Mobile Detailers Nationwide" block in `index.html` (around line 698).

2. **`blog/posts/business-liability-protection-mobile-detailing.html` → `../../index.html#contact`** (2 occurrences, lines 215 and 298). `index.html` has no `id="contact"`. **Fix:** change href to `../../get-a-quote.html` (the canonical quote destination).

3. **`blog/posts/equipment-protection-mobile-detailing-business.html` → `../../index.html#contact`** (2 occurrences, lines 281 and 392). Same broken anchor. **Fix:** change to `../../get-a-quote.html`.

4. **`blog/posts/mobile-auto-detailing-insurance-essentials.html` → `../../#contact`** (2 occurrences, lines 84 and 368). Anchor doesn't exist on root. **Fix:** change to `../../get-a-quote.html`.

5. **`blog/posts/business-liability-protection-mobile-detailing.html` line 315 "Get Insurance Quote →"** points to `../../index.html` (home). This is a primary post-article conversion CTA; landing on the home page wastes the click. **Fix:** change to `../../get-a-quote.html`.

6. **`blog/posts/equipment-protection-mobile-detailing-business.html` line 409 "Get Insurance Quote →"** same wrong target. **Fix:** change to `../../get-a-quote.html`.

7. **`coverage-by-state.html` state grid: 44 of 50 state tiles have `href="#"`** (dead links that scroll to top). Only AZ, CA, FL, GA, NY, TX have valid `#state-XX` anchors. **Fix:** either build out the remaining state anchors below, or change all `#` placeholders to `get-a-quote.html?state=XX` to drive traffic to the quote form.

8. **`coverage-by-state.html` "About Us" footer link → `#`** (dead). **Fix:** point to `trust-faqs.html#trust` or remove until an About page exists.

9. **`get-a-quote.html` footer Coverage column: 4 links all point to bare `coverage.html`** (Liability, Equipment, Workers' Comp, Environmental). The first three should deep-link: Equipment → `coverage.html#equipment`, Liability → `coverage.html#liability`, Workers' Comp / Environmental → no matching anchor exists (only `#business` is available, which is broad). **Fix:** swap to `coverage.html#equipment`, `coverage.html#liability`, `coverage.html#business`, `coverage.html#business` — or add `#workers-comp` / `#environmental` anchors on coverage.html if those are intended sections.

### Inconsistencies (header / footer drift)

1. **Two completely different header designs in production.** Refreshed pages (`index.html`, `coverage.html`, `trust-faqs.html`, `blog/index.html`) use the sticky glass Tailwind header with brand `"Detailer Shield Insurance"` and a 6-item nav (Home / Coverage / Coverage by State / Trust & FAQs / Blog / Get Quote CTA). Legacy pages (`coverage-by-state.html`, `get-a-quote.html`) use a flat midnight-blue `.header-section` with brand `"Mobile Detail Insurance"` and a 5-item nav. **Fix:** rebuild the headers on `coverage-by-state.html` and `get-a-quote.html` to match the refreshed glass header verbatim.

2. **Brand wordmark text differs.** Refreshed pages: "Detailer Shield Insurance". Legacy pages: "Mobile Detail Insurance". Also affects schema vs. visible brand consistency. **Fix:** align to "Detailer Shield Insurance".

3. **Nav item order differs.** Refreshed desktop nav order: Home, Coverage, Coverage by State, Trust & FAQs, Blog (Get Quote is a CTA, not a nav item). Legacy nav order on `coverage-by-state.html`: Coverage, Testimonials, FAQ, Blog, Get a Quote — and the "Home" link is absent. Legacy nav on `get-a-quote.html`: Coverage, By State, Trust & FAQs, Blog, Get a Quote (also no Home link in `<ul>`). **Fix:** standardize to refreshed order on all pages.

4. **Footer column count and structure differ.** Refreshed pages: 4 columns (Brand blurb, Coverage, Company, Contact) with no Privacy/Terms/Sitemap row. Legacy pages: 3 columns (Coverage, Company, Contact) plus a bottom row with `#` Privacy/Terms/Sitemap links. **Fix:** swap legacy pages to the refreshed 4-column footer.

5. **Footer "Coverage" column links differ across pages.** Refreshed footer uses deep anchors (`coverage.html#equipment` etc.) and includes `coverage-by-state.html`. Legacy `coverage-by-state.html` footer includes "Coverage Overview", "By State", and two dead `#` links (Equipment, Environmental). Legacy `get-a-quote.html` footer has 4 generic `coverage.html` links. **Fix:** standardize to refreshed footer.

6. **Footer "Company" column varies.** Refreshed: Trust & FAQs / Get a Quote / Blog / Privacy Policy. Legacy `coverage-by-state.html`: About Us (#) / Trust & FAQs / Blog / Get a Quote. Legacy `get-a-quote.html`: About Us (`index.html`) / Trust & FAQs / By State / Blog. **Fix:** standardize.

7. **Mobile bottom nav bar is only on `index.html`.** The refreshed `coverage.html`, `trust-faqs.html`, and `blog/index.html` are missing the fixed bottom nav that `index.html` ships. **Fix:** either remove from index (if it was intentional to be home-only) or replicate on all refreshed pages (recommended — its destinations Home/Coverage/Quote/Support are universally useful).

8. **Blog posts have NO site header or site footer.** Each post (`business-liability-protection-mobile-detailing.html`, `equipment-protection-mobile-detailing-business.html`, `mobile-auto-detailing-insurance-essentials.html`) renders as an isolated article with inline breadcrumbs only. Visitors can't navigate to Coverage, Coverage by State, Trust & FAQs, or Get a Quote without backtracking. **Fix:** add the refreshed glass header (with `../` paths) and the refreshed footer to each post.

### Missing cross-links (recommendations)

1. **Blog posts don't link to `../../coverage.html`.** All 3 posts should have body links to coverage when describing what the policies cover. Specifically, the equipment-protection post should link to `../../coverage.html#equipment`, the liability-protection post to `../../coverage.html#liability`. Currently no such links exist in any post body.

2. **Blog posts don't link to `../../get-a-quote.html` correctly.** Currently every quote CTA in the posts goes to `index.html` or `index.html#contact`. Should consistently go to `get-a-quote.html`. (Overlaps with critical issues 2–6.)

3. **`coverage.html` "Premium Support" inset uses `trust-faqs.html`** (good), but the Resource Center sidebar's "Insurance 101" link also goes to `trust-faqs.html` — that's odd because Insurance 101 is more naturally `blog/`. **Fix:** review the Resource Center mapping; it currently mixes coverage/trust-faqs/blog destinations in ways that don't quite match the labels (e.g., "Safety Tips" → `blog/` is fine, but "Insurance 101" → `trust-faqs.html` is weird; "Success Stories" on coverage.html goes to `blog/`, but on `index.html` it goes to `trust-faqs.html`).

4. **`trust-faqs.html` doesn't link to `coverage.html` from any in-body content.** FAQs about "what does the policy cover" are a natural place to deep-link to `coverage.html#equipment` / `#liability` / `#business`. Body links would also support SEO interlinking.

5. **`coverage-by-state.html` doesn't link to `trust-faqs.html` from the body content** (it's only in the nav). When discussing state-specific licensing, a "Read our trust badges & state-by-state FAQs" link would be helpful.

6. **`blog/index.html` has no link back to `../coverage.html` deep anchors from the post cards.** Each blog category card could subtly cross-link to the matching coverage section (e.g., the Liability card → `../coverage.html#liability`).

7. **`get-a-quote.html` body has no link back to `coverage.html`.** A user landing on the quote page who wants to learn what they're being quoted for has no in-body path to coverage details — only via the nav. Adding a "Not sure what coverage you need? View our coverage options" link near the top of the form would reduce abandonment.

---

## Anchor verification matrix

| Source link | Target file | Required ID | Present? |
|---|---|---|---|
| `coverage.html#equipment` (used in index footer, blog/index footer, trust-faqs footer, index body cards) | coverage.html | `equipment` | ✓ |
| `coverage.html#liability` (same) | coverage.html | `liability` | ✓ |
| `coverage.html#business` (same) | coverage.html | `business` | ✓ |
| `../coverage.html#equipment` (blog/index footer) | coverage.html | `equipment` | ✓ |
| `../coverage.html#liability` | coverage.html | `liability` | ✓ |
| `../coverage.html#business` | coverage.html | `business` | ✓ |
| `index.html#testimonials` (coverage-by-state header) | index.html | `testimonials` | **✗ MISSING** |
| `../../index.html#contact` (blog post liability) | index.html | `contact` | **✗ MISSING** |
| `../../index.html#contact` (blog post equipment) | index.html | `contact` | **✗ MISSING** |
| `../../#contact` (blog post essentials) | index.html | `contact` | **✗ MISSING** |
| `#quote-form-section` (get-a-quote announcement bar) | get-a-quote.html | `quote-form-section` | ✓ |
| `#faqs` (trust-faqs hero CTA) | trust-faqs.html | `faqs` | ✓ |
| `#state-AZ` / `#state-CA` / `#state-FL` / `#state-GA` / `#state-NY` / `#state-TX` (coverage-by-state state grid) | coverage-by-state.html | matching `state-XX` IDs | ✓ all 6 |
| 44 other `href="#"` on state grid | (no target — placeholder) | — | **✗ all dead** |

---

## Recommended fix order (for the engineer applying changes)

1. **Replace the legacy header + footer on `coverage-by-state.html` and `get-a-quote.html`** with the refreshed glass header/footer from `coverage.html` or `trust-faqs.html`. This eliminates inconsistencies 1–6 in one stroke and removes the broken `index.html#testimonials` link.
2. **Add the refreshed header + footer to all 3 blog posts** (`blog/posts/*.html`) — paths prefixed `../../`. Use the patterns already in `blog/index.html` but step back one extra level.
3. **Sweep blog post bodies for `index.html#contact` and `../../#contact`** — replace every occurrence with `get-a-quote.html` (or `../../get-a-quote.html` from the post depth). 6 fixes total across the 3 posts.
4. **Fix the "Get Insurance Quote →" footer link** at the bottom of the two `<a href="../../index.html">` blog posts → change to `../../get-a-quote.html`.
5. **Address the 44 dead `#` state tiles** on `coverage-by-state.html` — either build out state-anchor sections below the grid or change `href="#"` to `get-a-quote.html?state=XX` to capture intent.
6. **Add `mobile bottom nav bar`** to `coverage.html`, `trust-faqs.html`, and `blog/index.html` (copy from `index.html`, lines 800–817).
7. Either add `id="testimonials"` to the testimonials `<section>` on `index.html` (around line 698) or drop the Testimonials nav item entirely when refreshing the coverage-by-state header.
8. (Optional) Add in-body cross-links per the Missing-Cross-Links list above.

---

End of audit.

---

## Fix log — applied 2026-05-21 by josh-desk-2@mesh (page-team-a)

### Critical fixes applied (9 of 9)

1. ✅ `coverage-by-state.html` — removed `Testimonials → index.html#testimonials` from desktop + mobile nav, replaced with `Home → index.html` and relabeled `FAQ` → `Trust & FAQs` to match refreshed nav vocabulary.
2. ✅ `blog/posts/business-liability-protection-mobile-detailing.html` — both `../../index.html#contact` CTAs (lines 215, 298) repointed to `../../get-a-quote.html`.
3. ✅ `blog/posts/equipment-protection-mobile-detailing-business.html` — both `../../index.html#contact` CTAs (lines 281, 392) repointed to `../../get-a-quote.html`.
4. ✅ `blog/posts/mobile-auto-detailing-insurance-essentials.html` — both `../../#contact` links (header Contact line 84, body CTA line 368) repointed to `../../get-a-quote.html`.
5. ✅ `blog/posts/business-liability-protection-mobile-detailing.html` line 315 — "Get Insurance Quote →" closing footer link `../../index.html` → `../../get-a-quote.html`.
6. ✅ `blog/posts/equipment-protection-mobile-detailing-business.html` line 409 — same closing-footer fix.
7. ✅ `coverage-by-state.html` state grid — all 44 dead `href="#"` tiles repointed to `get-a-quote.html?state=XX` (state code drawn from the tile's own badge). The 6 in-page spotlight anchors (`#state-AZ`, `#state-CA`, `#state-FL`, `#state-GA`, `#state-NY`, `#state-TX`) preserved.
8. ✅ `coverage-by-state.html` footer "About Us" — `href="#"` → `trust-faqs.html#trust`. Also fixed adjacent dead Equipment/Environmental footer links to `coverage.html#equipment` / `coverage.html#business`.
9. ✅ `get-a-quote.html` footer Coverage column — 4 flat `coverage.html` links now use deep anchors: `coverage.html#liability`, `coverage.html#equipment`, `coverage.html#business` (Workers' Comp), `coverage.html#business` (Environmental). The `#business` reuse is intentional until dedicated `#workers-comp` / `#environmental` sections exist on coverage.html — flagged below.

### Responsive class fix applied

- `coverage-by-state.html`: **52 unique** sm/md/lg/xl prefixes (target was 30+).
- `get-a-quote.html`: **62 unique** sm/md/lg/xl prefixes (target was 30+).

Layout intent: mobile = stacked single column; tablet → 2-column grids; desktop → hero splits, multi-column form sidebar, 5-6 column state directory. Headers/footers/form sections all scale typography and spacing.

### Verification

Grep sweep confirms zero remaining broken `#testimonials` or `#contact` anchors anywhere in the site.

### Out of scope (deferred — flagged for page-team-b / future task)

The following audit findings require structural rewrites better owned by the page-team-b agent that originally shipped these pages, and are not surgical link fixes:

- **Inconsistency #1–6:** legacy header + footer on `coverage-by-state.html` and `get-a-quote.html` should be rebuilt to match the refreshed glass nav from `coverage.html`/`trust-faqs.html`. Brand wordmark "Mobile Detail Insurance" should become "Detailer Shield Insurance".
- **Inconsistency #7:** mobile bottom nav bar exists only on `index.html` — should be added to `coverage.html`, `trust-faqs.html`, `blog/index.html`.
- **Inconsistency #8:** all 3 blog posts have NO site header or footer — they need the refreshed shell with `../../` paths.
- **Coverage anchors:** `coverage.html` has only `#equipment`, `#liability`, `#business`. Two of the footer fixes (Workers' Comp, Environmental) both map to `#business` for now. Adding dedicated `#workers-comp` and `#environmental` sections on `coverage.html` would let those footers deep-link cleanly.

### Cross-link recommendations (still open — nice-to-have)

See "Missing cross-links" section above. Not applied — those are content additions, not bug fixes.

