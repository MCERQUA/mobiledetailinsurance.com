# SEO Topical Map — Detailer Shield Insurance

**Site:** `mobiledetailinsurance.com` (deployed as `https://www.contractorschoiceagency.com`)
**Brand:** Detailer Shield Insurance — specialty broker under Contractors Choice Agency (Chandler, AZ)
**Audience:** US-based mobile detailers, auto detailers, power-washing / pressure-washing operators
**Source data:** DataForSEO pulls (2026-05-21) — US, English. Raw JSON in `/tmp/seo-c/`. Total research spend: **$0.17**.

> All search volumes are US monthly. CPC is shown because every keyword here has commercial intent — high CPC = high lead value. Keyword difficulty (KD) was returned as `0` (suppressed) by the DataForSEO Labs endpoint for these low-volume niche terms; difficulty in this doc is **estimated qualitatively from the live SERP** (who actually ranks).

---

## TL;DR — what to build, in priority order

1. **Build a Pressure / Power Washing Insurance hub page** — the site does not currently target this $720/mo cluster despite being relevant to the brand. Single biggest gap.
2. **Build a Garage Keepers Insurance for Mobile Detailers explainer** — 1,600/mo seed term, perfectly aligned to the offering, no specialist owns it for the detailer niche.
3. **Create a `/cost` sub-page for each pillar** — both Thimble and Insureon own the cost queries with dedicated sub-pages. The site has none.
4. **Stop using one page for "Coverage by State"; expand to 10-15 state-specific pages** for the highest-intent states (AZ, CA, TX, FL, NY, GA, NC, OH, IL, PA).
5. **Launch a "How to start a mobile detailing business" pillar** — 880+/mo top-of-funnel keyword Thimble and Insureon both monetize. Easy KD, huge volume, perfect lead magnet.

---

## 1. Competitor landscape (top of SERP)

Pulled from `serp/google/organic/live` for "mobile detailing insurance", "auto detailing insurance", "pressure washing insurance" (3 queries, $0.006).

| Domain | Role | Appears in SERPs | Total org. KWs (US) | Est. monthly ETV |
|---|---|---|---|---|
| progressivecommercial.com | Carrier | #1-2 on all 3 | 2,693,455 | 24,524 |
| insureon.com | Broker | #8-10 | 556,255 | 39,714 |
| thimble.com | Specialty broker | #2-6 | 107,775 | 20,927 |
| nextinsurance.com | Carrier/broker | #3 (PW) | 859,699 | 46,624 |
| simplybusiness.com | Broker | #9-11 | 60,774 | 18,304 |
| hiscox.com | Carrier | #5 (PW) | 258,282 | 16,017 |
| insurancecanopy.com | Niche broker | #11 (PW) | 137,977 | 13,000 |
| detailking.com | Content site (DetailKing blog) | #6-7 | 265,488 | 17,629 |
| boltinsurance.com | Broker | #3 (auto) | n/a | n/a |
| **contractorschoiceagency.com** | **Parent brand** | not in top 10 | **315** | **372** |
| **mobiledetailinsurance.com** | **This site** | not indexed | **0** | **0** |

**The site is invisible in organic search today.** Everything below assumes a clean slate.

### Picked top 3 strategic competitors

For benchmarking content structure I pulled the niche-filtered ranked keywords for the three brokers whose business model is closest to Detailer Shield's (specialty multi-vertical brokers — not carriers, not generalists):

- **Insureon** (`labs/ranked_keywords`, 70 detail-filtered keywords, $0.017) — broker model, hub-and-spoke content
- **Thimble** (`labs/ranked_keywords`, 79 detail-filtered keywords, $0.018) — specialty pricing/cost focus
- **Insurance Canopy** (3 hits on detail filter, $0.010) — niche-vertical broker; only competes peripherally in detailing — kept in list as cautionary benchmark

### Competitor content structure pattern (worth copying)

Both Insureon and Thimble run a **hub-and-spoke** structure per industry vertical. Each industry gets:

```
/[industry-bucket]/[sub-vertical]              ← hub (ranks for 30+ keywords)
/[industry-bucket]/[sub-vertical]/cost         ← cost sub-page (ranks for "X cost" variants)
/blog/how-to-start-a-[sub-vertical]-business   ← TOFU magnet (1,300/mo)
/blog/how-much-do-[sub-vertical]ers-make       ← TOFU magnet (600+/mo)
```

Examples mapped from live SERP data:

| Competitor | Hub page | Cost page | TOFU blog |
|---|---|---|---|
| Insureon | `/auto-services-business-insurance/car-detailing-wash` | `/.../cost` | `/blog/how-to-start-a-pressure-washing-business` |
| Insureon | `/cleaning-business-insurance/pressure-washing` | `/.../cost` | — |
| Thimble | `/industry/cleaning-business-insurance/auto-detailer` | — | `/blog/how-to-start-car-detailing-business` |
| Thimble | `/industry/cleaning-business-insurance/pressure-washer` | `/.../cost` | `/blog/how-much-do-pressure-washing-businesses-make` |

**Insureon's `/cleaning-business-insurance/pressure-washing` page alone ranks for 15+ keywords with combined ~10k/mo volume.** This is the single most-replicable pattern for this site.

---

## 2. Keyword data — full table

### 2.1 Seed-term volume & cost (DataForSEO Keywords Data / Google Ads, $0.075)

Sorted by US monthly search volume. Difficulty estimated from SERP players (H = carriers + brokers dominate; M = mixed; L = thin / room to rank).

| Keyword | US Vol/mo | Comp. | CPC ($) | Est. KD | Intent | Notes |
|---|---:|---|---:|---|---|---|
| garage keepers insurance | **1,600** | MEDIUM | 44.10 | H | Commercial | Cluster anchor — relevant to all detailers |
| pressure washing insurance | **720** | MEDIUM | 51.05 | M | Commercial | **Site has no targeted page — biggest single gap** |
| power washing insurance | **720** | MEDIUM | 51.05 | M | Commercial | Same intent, same gap |
| pressure washing business insurance | **720** | MEDIUM | 42.99 | M | Commercial | Long-tail of above |
| power washing business insurance | **720** | MEDIUM | 42.99 | M | Commercial | Long-tail of above |
| auto detailing insurance | **390** | MEDIUM | 35.16 | M | Commercial | Core target — no dedicated page on site |
| car detailing insurance | **390** | MEDIUM | 35.16 | M | Commercial | Synonym variant of above |
| auto detailer insurance | **390** | MEDIUM | 35.16 | M | Commercial | Synonym variant |
| car wash insurance | **390** | LOW | 28.74 | L | Commercial | Adjacent vertical, easy KD |
| mobile detailing insurance | **320** | HIGH | 50.96 | H | Commercial | **Current homepage target (correct)** |
| mobile detailer insurance | **320** | HIGH | 50.96 | H | Commercial | Same intent, alternate phrasing |
| detailing insurance | **320** | HIGH | 50.96 | H | Commercial | Generic — H1 candidate on coverage page |
| mobile detailing business insurance | **170** | HIGH | 54.94 | H | Commercial | Highest CPC in cluster |
| detailing business insurance | **170** | HIGH | 54.94 | H | Commercial | — |
| mobile car detailing insurance | 70 | MEDIUM | 31.80 | M | Commercial | — |
| auto detailing business insurance | 70 | LOW | 56.59 | L | Commercial | Low comp + high CPC — quick win |
| mobile car wash insurance | 30 | HIGH | 26.18 | M | Commercial | — |
| mobile detailing insurance cost | 20 | HIGH | 35.04 | M | Transactional | Dedicate /cost sub-page |
| mobile detailing insurance near me | 10 | HIGH | — | M | Navigational | Local-pack target |

> 19 long-tail / state-specific terms (e.g., `mobile detailing insurance california`, `paint correction insurance`, `ceramic coating insurance`, `do i need insurance for mobile detailing`) returned `0` from the Google Ads endpoint — meaning <10 searches/mo. They still convert because intent is explicit. **Build them as supporting URLs, not pillars.**

### 2.2 Keyword suggestions / cluster expansion (DataForSEO Labs Keyword Suggestions, $0.012)

Top 18 expansions from seed "mobile detailing insurance":

| Keyword | Vol/mo | CPC ($) | Comp. | Intent |
|---|---:|---:|---|---|
| mobile detailing insurance | 320 | 38.60 | HIGH | Commercial |
| insurance for mobile detailing | 320 | 38.60 | HIGH | Commercial |
| business insurance for mobile detailing | 170 | 54.94 | HIGH | Commercial |
| mobile detailing business insurance | 170 | 51.30 | HIGH | Commercial |
| general liability insurance for mobile detailing | 90 | 64.45 | MEDIUM | Commercial |
| mobile auto detailing business insurance | 70 | 35.12 | MEDIUM | Commercial |
| mobile auto detailing insurance | 70 | 35.12 | MEDIUM | Commercial |
| mobile car detailing insurance | 70 | 35.12 | MEDIUM | Commercial |
| mobile detailing insurance cost | 20 | 39.24 | MEDIUM | Commercial |
| best insurance for mobile detailing | 20 | 35.12 | MEDIUM | Commercial |
| best mobile auto detailing insurance | 20 | 30.47 | HIGH | Commercial |
| do you need insurance for mobile detailing | 20 | 52.98 | MEDIUM | Informational |
| mobile car wash detailing insurance | 10 | — | — | Commercial |
| mobile detailing insurance near me | 10 | — | LOW | Navigational |
| how much is insurance for a mobile detailing business | 10 | — | HIGH | Commercial |
| garage keepers insurance mobile detailing | 10 | 36.21 | HIGH | Commercial |
| insurance for mobile auto detailing business | 10 | — | — | Commercial |
| mobile auto detailing business insurance cost | 10 | — | HIGH | Commercial |

### 2.3 Trend data (from Google Ads monthly_searches)

`mobile detailing insurance` 12-month range: 170–480/mo, **quarterly trend +24%, yearly -56%**. Seasonality peaks Apr-Aug (mobile detailing season). **Publish before April for max compound.**

### 2.4 People-Also-Ask + related searches (from SERP, $0.006)

Each line below is a captured PAA or related-search query straight from Google. These are content-page H2s, not keywords to outrank — they signal what Google believes searchers want clarified next.

**For "mobile detailing insurance":**
- What type of insurance does a mobile detailer need?
- Do I need an LLC for a mobile detailing business?
- How profitable is mobile car detailing?
- What insurance do I need for mobile valeting?
- Related: cheapest mobile detailing insurance, mobile detailing insurance california, mobile detailing insurance reddit, general liability insurance for mobile detailing

**For "pressure washing insurance":**
- What type of insurance do you need for pressure washing?
- How many pressure washing businesses fail?
- Why is pressure washing insurance so expensive?
- How much is power washing insurance?
- Related: pressure washing insurance florida, pressure washing insurance georgia, best insurance for pressure washing business

**For "auto detailing insurance":**
- What kind of insurance do I need for a car detailing business?
- How much is detailers insurance?
- Do I need an LLC to start detailing?
- How much to tip on a $200 car detail?
- Related: auto detailing insurance geico, auto detailing insurance application, cheapest auto detailing insurance

---

## 3. Pillar pages — existing + recommended

### Existing pillars (keep, refine)

| URL | Primary target | Vol/mo | Status |
|---|---|---:|---|
| `/` (index.html) | mobile detailing insurance | 320 | Live, on-target. Add `mobile detailer insurance` + `detailing insurance` as H2 synonyms. |
| `/coverage.html` | mobile detailer general liability insurance | 90 | Live. Re-target to `general liability insurance for mobile detailing` (90/mo) and split garage-keepers into its own page (see below). |
| `/coverage-by-state.html` | mobile detail insurance by state | low (geo-suppressed) | Live as **one** page. **Convert to a hub linking to 10-15 individual state pages** (see Cluster 4). |
| `/get-a-quote.html` | mobile detailing insurance quote | <10 | Transactional. Add `auto detailing insurance quote` as secondary. |
| `/trust-faqs.html` | (no target — trust/FAQ page) | — | In dev. FAQ schema captures "Do I need insurance for mobile detailing?" and similar (good for AI Overviews). |
| `/blog/` | mobile detailing insurance blog | — | Currently 3 posts. Expand per Section 6. |

### Recommended NEW pillars

| URL (suggested) | Primary target | Vol/mo | Why |
|---|---|---:|---|
| `/pressure-washing-insurance.html` | pressure washing insurance | **720** | Largest single addressable cluster the site doesn't currently target. Insureon's equivalent page ranks for 15+ keywords / ~10k vol combined. |
| `/auto-detailing-insurance.html` | auto detailing insurance | **390** | Distinct enough from "mobile" — different searcher (fixed shop vs mobile). Separating them lets both rank. |
| `/garage-keepers-insurance.html` | garage keepers insurance for mobile detailers | 1,600 root / 10 niched | Highest-volume coverage-type keyword in the cluster; specialty positioning will rank for `garage keepers insurance detailing` and related. |
| `/coverage/cost.html` or `/mobile-detailing-insurance-cost.html` | mobile detailing insurance cost | 20 + 10 + transactional | Both Thimble and Insureon have `/cost` sub-pages. They convert. |

---

## 4. Cluster topics to build (prioritized by opportunity × intent)

### Cluster 1: Pressure / Power Washing Insurance — **highest priority gap**

- **Pillar:** `/pressure-washing-insurance.html` — primary: `pressure washing insurance` (720/mo, $51 CPC, MEDIUM comp)
- **Supporting URLs to build:**
  - `/pressure-washing-insurance.html` (hub)
    - Secondary targets: `power washing insurance`, `pressure washing business insurance`, `power washing business insurance` — all 720/mo, same intent
  - `/pressure-washing-insurance-cost.html` — `pressure washing insurance cost` (170/mo per Insureon ranked-KWs)
  - `/blog/posts/how-to-start-a-pressure-washing-business.html` — `how to start a pressure washing business` (1,300/mo, top of funnel)
  - `/blog/posts/pressure-washing-insurance-requirements-by-state.html` — captures FL, GA, TX variants
- **Internal linking:**
  - Link from home `/` → pillar (anchor: "pressure washing insurance")
  - Link from `/coverage.html` → pillar (anchor: "specialty coverage for pressure washers")
  - Link from each blog post → pillar
- **Schema:** Service + Product schema with `serviceType: "Pressure Washing Insurance"`

### Cluster 2: Mobile Detailing Insurance (existing — refine, don't rebuild)

- **Pillar:** `/` (index.html) — primary: `mobile detailing insurance` (320/mo)
- **Supporting URLs to build/refine:**
  - `/` (existing) — confirm H1 contains exact phrase; add H2 with `insurance for mobile detailing` (320/mo synonym)
  - `/mobile-detailing-insurance-cost.html` — `mobile detailing insurance cost` (20/mo, transactional)
  - `/blog/posts/mobile-auto-detailing-insurance-essentials.html` (exists) — re-target H1 to `mobile auto detailing insurance` (70/mo, lower comp)
  - `/blog/posts/general-liability-insurance-for-mobile-detailing.html` — NEW — `general liability insurance for mobile detailing` (90/mo, $64 CPC, **best CPC × volume combo in dataset**)
- **Internal linking:**
  - Home → garage-keepers page → coverage page → quote
- **Schema:** Local FAQPage + Service schema

### Cluster 3: Auto Detailing Insurance (separate from mobile)

- **Pillar:** `/auto-detailing-insurance.html` — primary: `auto detailing insurance` (390/mo)
- **Why split from mobile:** Different searcher (fixed-location detailer with a bay vs. truck-and-trailer mobile op). Thimble and Insureon both treat them as one page, which is why a focused split would create differentiation.
- **Supporting URLs:**
  - `/auto-detailing-insurance.html` (hub) — also targets `car detailing insurance` (390/mo) and `auto detailer insurance` (390/mo)
  - `/blog/posts/auto-detailing-insurance-vs-personal-auto.html` — captures the `auto detailing insurance geico` related search + "do I need" educational intent
  - `/blog/posts/how-to-start-an-auto-detailing-business.html` — `how to start auto detailing business` (880/mo per Thimble's ranked KWs)
  - `/blog/posts/auto-detailing-business-insurance-cost.html` — `auto detailing business insurance` (70/mo, **LOW comp, $56 CPC — quick win**)

### Cluster 4: State-specific coverage (existing geo page → expand)

- **Pillar:** `/coverage-by-state.html` (existing) → convert to **state hub** linking to 10-15 individual state pages
- **Recommended state pages to build** (ordered by detailing-business density + intent signal):
  1. `/states/california.html` — `mobile detailing insurance california`
  2. `/states/texas.html` — `mobile detailing insurance texas`
  3. `/states/florida.html` — `mobile detailing insurance florida` + `pressure washing insurance florida`
  4. `/states/arizona.html` — `mobile detailing insurance arizona` (home base — exploit local pack)
  5. `/states/new-york.html`
  6. `/states/georgia.html` — pressure-washing skew
  7. `/states/north-carolina.html`
  8. `/states/ohio.html`
  9. `/states/illinois.html`
  10. `/states/pennsylvania.html`
- **Page template:** each state page = 600-1,000 words, includes (a) state-specific licensing reqs, (b) state-specific liability minimums, (c) climate-driven coverage notes (e.g., AZ heat → equipment failure; FL hurricane → BOP coverage), (d) embedded quote form
- **Internal linking:** Each state page links to `/coverage.html`, `/garage-keepers-insurance.html`, and parent `/coverage-by-state.html`. Coverage hub links down to each state.
- **Schema:** LocalBusiness + Service per state page (areaServed = state)

### Cluster 5: Coverage types (split current /coverage.html into a hub + leaves)

- **Pillar:** `/coverage.html` (existing) → convert to **coverage hub** with internal links to:
  - `/garage-keepers-insurance.html` — `garage keepers insurance` (1,600/mo, $44 CPC, MEDIUM comp — highest-volume opportunity in dataset)
  - `/general-liability.html` — `general liability insurance for mobile detailing` (90/mo, $64 CPC)
  - `/commercial-auto-insurance.html` — `commercial auto insurance for detailers` (low vol, captures "do I need commercial auto" PAA)
  - `/equipment-insurance.html` — `mobile detailing equipment insurance` + `tools and equipment insurance detailer` (educational; captures `inland marine` PAA)
  - `/workers-compensation.html` — `workers comp for detailers`
  - `/business-owners-policy.html` — `mobile detailing BOP` (no SV data but mentioned in FAQs)
- **Why a hub-and-leaf split:** Currently everything is on one `/coverage.html` page, which dilutes ranking signal. Specialist pages outrank generalist pages on niche queries.

### Cluster 6: Specialty services (new TOFU/MOFU content)

These have low individual search volume but are highly differentiating and have **zero specialist competitors:**

- `/blog/posts/ceramic-coating-insurance.html` — `ceramic coating insurance` (no SV reported but commercial intent strong; CPC unknown but adjacent CPCs are $30+)
- `/blog/posts/paint-correction-insurance.html` — `paint correction insurance`
- `/blog/posts/insurance-for-fleet-mobile-detailing.html` — captures "fleet" + commercial accounts
- `/blog/posts/rv-detailing-insurance.html` — adjacent niche
- `/blog/posts/marine-boat-detailing-insurance.html` — Thimble ranks for boat-cleaner, gap on detailer-specific
- `/blog/posts/motorcycle-detailing-insurance.html`

### Cluster 7: Top-of-funnel / educational ("how to" + "do I need")

The highest-volume keywords in the entire space aren't insurance keywords — they're business-formation keywords. These TOFU pages drive a quote-form CTA at the end:

- `/blog/posts/how-to-start-a-mobile-detailing-business.html` — adjacent to `how to start auto detailing business` (880/mo)
- `/blog/posts/how-to-start-a-pressure-washing-business.html` — `how to start a pressure washing business` (1,300/mo)
- `/blog/posts/how-much-do-mobile-detailers-make.html` — adjacent to `how much do pressure washers make` (390/mo)
- `/blog/posts/do-i-need-an-llc-for-mobile-detailing.html` — directly answers a PAA
- `/blog/posts/mobile-detailing-business-license-by-state.html` — captures `business license` long tail

---

## 5. Quick wins (low difficulty + decent volume + high CPC)

Sorted by `(volume × CPC) / estimated KD`:

| Keyword | Vol | CPC | Why a quick win |
|---|---:|---:|---|
| auto detailing business insurance | 70 | $56.59 | LOW competition, $56 CPC. Build a clean `/auto-detailing-insurance.html` and this comes free. |
| general liability insurance for mobile detailing | 90 | $64.45 | $64 CPC (highest in the cluster). No specialist owns it. Dedicated page wins it. |
| car wash insurance | 390 | $28.74 | LOW competition on a 390/mo term. Adjacent vertical — covers in same content cluster as pressure washing. |
| pressure washing insurance cost | 170 (est. from competitor data) | est. $30-40 | Insureon's `/cost` page ranks #2 nationally — beatable with a single focused page. |
| garage keepers insurance mobile detailing | 10 | $36.21 | Hyper-specific. One page, one keyword, zero competition for the niche modifier. |
| mobile detailing insurance near me | 10 | — | Local pack. Easy if NAP is consistent (Chandler, AZ) and Google Business Profile is verified. |
| do you need insurance for mobile detailing | 20 | $52.98 | Informational intent → great FAQ schema candidate. Already in `data/faq.md`. |

---

## 6. State-specific opportunity

Search volume for `mobile detailing insurance + [state]` is suppressed (`<10/mo`) by Google Ads on individual state queries, BUT:

- "pressure washing insurance florida" appears in Google's related searches for pressure washing insurance — Google **explicitly suggests it**, meaning user demand exists below the SV threshold.
- State pages have the highest local-pack conversion rates in P&C insurance.
- Detailer Shield is **physically located in Chandler, AZ** — Arizona must be a flagship state page for local-pack capture.

### Top 10 states to build (priority order)

1. **California** — largest detailing market, ceramic coating capital
2. **Texas** — fast-growing detailing market + huge pressure-washing market
3. **Florida** — both detailing AND pressure washing (mold/algae demand)
4. **Arizona** — home state, local-pack lock
5. **New York** — high-CPC market, fleet detailing
6. **Georgia** — explicit Google-suggested term for pressure washing
7. **North Carolina** — pressure-washing strong
8. **Ohio** — mid-tier detailing market
9. **Illinois** — fleet/commercial auto
10. **Pennsylvania** — adjacent to NY market

### Recommended URL structure

```
/states/                     ← state hub (replaces /coverage-by-state.html behavior)
/states/california.html
/states/california/los-angeles.html       ← Tier 2 (cities) — only add if state page ranks first
/states/california/san-diego.html
/states/texas.html
/states/texas/houston.html
/states/texas/dallas.html
...
```

City-level pages are **Tier 2**. Don't build them until the state pages are in the top 5 for their state-level query — otherwise you dilute signal.

---

## 7. Competitor content gaps (where Detailer Shield can win)

Pulled from comparing the three competitor ranked-keyword sets against the seed keyword universe:

| Gap | Why no one owns it | Detailer Shield play |
|---|---|---|
| **"Mobile" as the differentiator** | Thimble/Insureon lump mobile + fixed-shop into one page (`/car-detailing-wash`) | Brand says it on the tin — own `mobile detailer insurance` cleanly |
| **Ceramic coating insurance** | No specialty page exists on any top-10 competitor | Single-paragraph blog post will rank top 3 |
| **Paint correction insurance** | Same gap | Same play |
| **Garage keepers for detailers (not body shops)** | "Garage keepers" results are dominated by auto-body / repair shop content | Niche the modifier: `garage keepers insurance for mobile detailers` |
| **State-specific pressure washing requirements** | Insureon has one generic /cost page; no state-by-state requirements page | Build state-specific requirements/license posts |
| **"Do I need insurance for mobile detailing" with a clean YES/NO + scenarios** | Currently dominated by Reddit threads (one ranks at #3 nationally!) | FAQ schema + scenario-driven post outranks Reddit |
| **"Why is pressure washing insurance so expensive" PAA** | No top-10 result directly answers this | Write the definitive answer post |
| **Fleet / commercial-account detailing insurance** | No dedicated pages anywhere | High-CPC B2B audience untapped |

---

## 8. Next 5 blog posts (priority order)

In priority order to publish, optimized for `(volume × CPC × intent fit) / production cost`:

### 1. "How Much Does Mobile Detailing Insurance Cost in 2026?"
- Primary: `mobile detailing insurance cost` (20/mo, $35 CPC)
- Secondary: `how much is mobile detailing insurance`, `mobile auto detailing business insurance cost`, `how much is insurance for a mobile detailing business`
- Why first: Captures the most direct buyer-intent query in the dataset. Drives the largest lift on the quote-form conversion rate. Aligns to PAA "How much is detailers insurance?"
- Target word count: 1,800-2,200
- Schema: Article + FAQPage

### 2. "Pressure Washing Insurance: Coverage, Cost, and Requirements (2026)"
- Primary: `pressure washing insurance` (720/mo, $51 CPC)
- Secondary: `power washing insurance`, `pressure washing business insurance`, `power washing business insurance`
- Why second: Largest untargeted cluster on the site. Establishes Detailer Shield in the adjacent vertical that already shares 80% of the customer base.
- Target word count: 2,500+
- Pair with: new `/pressure-washing-insurance.html` pillar (Cluster 1)

### 3. "Garage Keepers Insurance for Mobile Detailers: When You Need It (and When You Don't)"
- Primary: `garage keepers insurance` (1,600/mo, $44 CPC, MEDIUM comp)
- Secondary: `garage keepers insurance detailing`, `garage keepers insurance mobile detailing`
- Why third: Highest single-keyword volume in the entire dataset. Niching the modifier ("for mobile detailers") creates ranking space.
- Target word count: 2,000

### 4. "Mobile Detailing Insurance vs. Personal Auto Insurance: Why Geico Won't Cover Your Business"
- Primary: `do i need insurance for mobile detailing` (informational)
- Secondary: `auto detailing insurance geico` (Google-suggested related search), `do you need insurance for mobile detailing` (20/mo)
- Why fourth: Directly answers a Google PAA. Captures education-stage searchers before they shop. Adds a "Geico won't cover this" angle that Reddit threads (currently ranking) don't have.
- Target word count: 1,500

### 5. "How to Start a Mobile Detailing Business (and the Insurance You'll Need Day One)"
- Primary: top-of-funnel — `how to start a mobile detailing business` (TOFU magnet; competitors pull 880/mo on the `auto detailing` variant)
- Secondary: `do I need an LLC for a mobile detailing business` (PAA)
- Why fifth: TOFU magnet. Drives backlinks and creates the strongest internal-linking foundation for the whole detailing cluster. Pair with a downloadable LLC + insurance checklist.
- Target word count: 3,000+ (full guide format)

---

## 9. Existing-content recommendations

### `/blog/posts/business-liability-protection-mobile-detailing.html`
- Re-target H1 to include `general liability insurance for mobile detailing` (90/mo, $64 CPC)
- Add internal links to: new `/garage-keepers-insurance.html`, new `/auto-detailing-insurance.html`, `/get-a-quote.html`
- Add FAQPage schema for the 4 PAA questions on "mobile detailing insurance"

### `/blog/posts/equipment-protection-mobile-detailing-business.html`
- Re-target around `mobile detailing equipment insurance` + `tools and equipment insurance detailer`
- Add explicit "Inland Marine" terminology (per FAQ data) — long-tail capture
- Add comparison table: covered events vs. excluded events

### `/blog/posts/mobile-auto-detailing-insurance-essentials.html`
- Re-target H1 to `mobile auto detailing insurance` exact phrase (70/mo, MEDIUM comp)
- Use this as the page that pre-ranks for `mobile auto detailing business insurance` (70/mo) — both terms share the same intent and one well-optimized page will rank for both.

### `/index.html`
- Confirm H1 = "Mobile Detailing Insurance" (exact match seed)
- Add H2: "Insurance for Mobile Detailing Businesses" (synonym, captures 320/mo)
- Add H2: "Detailer General Liability + Garage Keepers in One Policy" (captures cluster terms)
- Add an FAQ section with the 4 PAA questions and FAQPage schema — drives AI Overview citations

### `/coverage.html`
- Convert from a long single page to a hub + 6 leaf pages (see Cluster 5)
- Keep the hub itself short (600 words) and let the leaves do the long-form ranking

### `/coverage-by-state.html`
- Convert to a hub linking to 10-15 state pages (see Cluster 4)
- Add a US map with hover/tap state selection (state.svg + JS — no framework needed)

---

## 10. Internal linking strategy

### Hub-and-spoke graph
```
/  (mobile detailing insurance — primary pillar)
  ↓
  /auto-detailing-insurance.html  (auto detailing pillar)
  /pressure-washing-insurance.html  (pressure washing pillar)
  /coverage.html  (coverage hub)
    /garage-keepers-insurance.html
    /general-liability.html
    /commercial-auto-insurance.html
    /equipment-insurance.html
    /workers-compensation.html
  /coverage-by-state.html  (state hub)
    /states/california.html
    /states/texas.html
    ...
  /trust-faqs.html
  /get-a-quote.html  (transactional)
  /blog/  (content hub)
    /blog/posts/[posts]
```

### Anchor text discipline
- Home → "mobile detailing insurance" (exact match on 1-2 spots only)
- Home → "auto detailing insurance" (anchor → /auto-detailing-insurance.html)
- Coverage hub → "garage keepers insurance for detailers" (anchor → /garage-keepers-insurance.html)
- Each blog post → end with a CTA link to `/get-a-quote.html` using anchor `"get a free mobile detailing insurance quote"`
- State pages → both back to `/coverage-by-state.html` AND laterally to nearest 2 states

### Avoid
- Over-optimization on home page: never repeat exact-match anchor more than 2x
- Orphaned posts: every blog post needs at least 3 inbound internal links from pillars

---

## 11. Schema markup additions (beyond what's planned)

- **FAQPage** on `/trust-faqs.html` — already planned (page-team-c task)
- **FAQPage** on every blog post that answers a PAA — drives AI Overview citation rate
- **Service** schema on each coverage leaf (`/garage-keepers-insurance.html`, etc) with `serviceType` + `areaServed` + `provider`
- **LocalBusiness** schema on each state page (`areaServed` = state, `provider` = Contractors Choice Agency in Chandler, AZ)
- **Article** schema on every blog post (already present? verify in build step)
- **BreadcrumbList** on all non-home pages — Google rich result for navigation

---

## 12. Tracking + measurement

After deploying:
- Add all pillar URLs to Search Console (DataForSEO `serp/google/organic/live` for monthly position tracking is cheap at $0.002/keyword/check)
- Track the 5 priority blog posts via the keyword tracker at `/social-api/api/seo/keyword-tracker?tenant=mobiledetailinsurance`
- Run a monthly `bulk_traffic_estimation` on the site to watch growth ETV vs. competitors
- Target: rank top 10 for `mobile detailing insurance` within 6 months, top 5 for `pressure washing insurance` within 9 months

---

## Appendix A — Raw data file references

| File | Endpoint | Cost | Records |
|---|---|---:|---:|
| `sv.json` | `keywords_data/google_ads/search_volume/live` | $0.0750 | 39 |
| `kd.json` | `dataforseo_labs/google/bulk_keyword_difficulty/live` | $0.0138 | 38 (all KD=0) |
| `suggestions.json` | `dataforseo_labs/google/keyword_suggestions/live` | $0.0118 | 18 |
| `serp.json` + `serp2.json` + `serp3.json` | `serp/google/organic/live/advanced` | $0.0060 | 3 keyword SERPs |
| `comp_canopy.json` | `dataforseo_labs/google/ranked_keywords/live` (insurancecanopy.com) | $0.0103 | 3 |
| `comp_thimble.json` | same (thimble.com) | $0.0179 | 79 |
| `comp_insureon.json` | same (insureon.com) | $0.0170 | 70 |
| `traffic.json` | `dataforseo_labs/google/bulk_traffic_estimation/live` | $0.0110 | 10 |
| `canopy_pages.json` | `dataforseo_labs/google/relevant_pages/live` | $0.0120 | 15 |
| **Total** | | **$0.1748** | |

Raw JSON archived at `/tmp/seo-c/` on the worker container at the time of research (2026-05-21).

## Appendix B — Methodology + caveats

- Difficulty scores from DataForSEO's `bulk_keyword_difficulty` returned `0` for every keyword in this niche — the API suppresses KD on low-volume specialty terms. **All "Est. KD" values in this document are SERP-derived qualitative estimates** (H/M/L based on whether carriers and DR-50+ brokers dominate the top 5).
- All search volumes are US-monthly per Google Ads. Volumes <10 are reported as `0` by Google Ads even when real demand exists (this is a known suppression behavior). Treat the 19 "zero" keywords as **low-volume but real**, not as "no demand."
- CPC values are Google Ads top-of-page bid medians and may differ between the Keywords Data endpoint and Labs endpoint by ~20% (different aggregation windows). The Keywords Data endpoint values are used in §2.1, Labs values in §2.2; both are directionally consistent.
- The current site (`mobiledetailinsurance.com`) returned **zero indexed organic keywords** in `bulk_traffic_estimation` — meaning Google has either not indexed the site or it doesn't rank in the top 100 for any term. Confirm via Search Console after this map is implemented.
- Parent site (`contractorschoiceagency.com`) ranks for 315 keywords with 372 ETV — small footprint, mostly brand. No keyword cannibalization risk between domains.
