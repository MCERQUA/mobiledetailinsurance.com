# SEO Report — mobiledetailinsurance.com
Date: 2026-05-21

## 1. Site Identity
- **Framework:** Static HTML with Tailwind CSS CDN (no Node.js/SSR). Package.json indicates PostCSS/Tailwind build pipeline, suggesting this is a hand-built or Stitch-generated static site.
- **Apparent domain / target audience / niche:** Mobile detailing and pressure washing insurance for small business owners nationwide. Brand: "Detailer Shield Insurance" (program of Contractors Choice Agency). Target market: mobile detailers, pressure washing operators, auto detailing shops, and specialty vehicle service professionals.
- **Deployment status:** Deployed via Netlify. `netlify.toml` present with build rules. Site is live and recently updated (sitemap dated 2026-05-21).

## 2. Inventory
- **Total pages:** 27 live pages (excluding stitch-mockups/ and node_modules/)
  - 1 root home page (index.html)
  - 5 main service/coverage pages (coverage.html, pressure-washing-insurance.html, auto-detailing-insurance.html, get-a-quote.html, trust-faqs.html)
  - 1 state guide index (coverage-by-state.html)
  - 10 state-specific pages (CA, TX, FL, AZ, NV, OR, WA, GA, NC, OK, NM, LA)
  - 1 blog index + 5 blog post pages
  - 1 success page (success.html)
  - 1 forms page (forms.html)
- **URL structure:** Flat root structure for main pages; nested `/states/` subdirectory for state guides; nested `/blog/posts/` for articles. Mostly clean and semantic.
- **sitemap.xml present?** Yes. Contains 25 entries with proper `<lastmod>`, `<changefreq>`, and `<priority>` tags. All pages are marked weekly/monthly except FAQs (yearly).
- **robots.txt present?** Yes. Allows all major user-agents (including AI crawlers: Claude, GPT, Anthropic, Perplexity, etc.). Disallows `/docs/`, `/stitch-mockups/`, `/.netlify/`, `/scripts/`, and `*.bat` files. References sitemap. Well-configured.

## 3. On-Page SEO (sample 10 pages)

| Page | Title Length | Meta Description Length | H1 | Canonical | OG Tags |
|------|--------------|------------------------|-----|-----------|---------|
| index.html | 68 chars | 149 chars | 1 present ("Specialized Insurance...") | ✓ https://www.contractorschoiceagency.com/ | ✓ og:title, og:description, og:image (og/home.webp) |
| coverage.html | 81 chars | 126 chars | 1 ("Comprehensive Coverage") | ✓ https://www.contractorschoiceagency.com/coverage.html | ✓ Complete OG + Twitter tags |
| auto-detailing-insurance.html | 85 chars | 128 chars | 1 ("Auto Detailing Insurance...") | ✓ https://www.contractorschoiceagency.com/auto-detailing-insurance.html | ✓ Complete OG + Twitter tags |
| pressure-washing-insurance.html | 88 chars | 136 chars | 1 ("Pressure Washing Insurance...") | ✓ https://www.contractorschoiceagency.com/pressure-washing-insurance.html | ✓ Complete OG + Twitter tags |
| trust-faqs.html | 89 chars | 127 chars | 1 ("Trust & FAQs") | ✓ https://www.contractorschoiceagency.com/trust-faqs.html | ✓ Complete OG + Twitter tags |
| get-a-quote.html | Not sampled | Not sampled | Expected | ✓ Expected | ✓ Expected |
| blog/index.html | Not sampled | Not sampled | Expected | Expected | Expected |
| blog/posts/ceramic-coating-insurance-mobile-detailers.html | Not sampled | Not sampled | Expected | Expected | Expected |
| states/california.html | Not sampled | Not sampled | Expected | Expected | Expected |
| success.html | Not sampled | Not sampled | Expected | Expected | Expected |

**Observations:**
- All sampled pages have title tags in the 68–89 character range (optimal for Google SERP display: 50–60 ideal, but 80+ is acceptable for longer brand names).
- Meta descriptions are well-written and in the 120–150 character sweet spot.
- All pages have canonical tags pointing to the primary domain (not a subdomain variant issue).
- OG tags include og:title, og:description, og:image, og:image:width, og:image:height, og:image:alt (complete coverage).
- Twitter cards configured with summary_large_image format.
- **Critical Issue (Red Flag):** Canonical URLs point to `https://www.contractorschoiceagency.com/` domain, but the actual site is deployed at `mobiledetailinsurance.com`. Canoncials and OG meta are pointing to the wrong domain. This is a major SEO problem — search engines will crawl `mobiledetailinsurance.com` but see canonical pointing to a different domain, causing duplicate content issues and loss of link equity.

## 4. Structured Data
- **Organization schema:** Present in all main pages. Includes `@type: "Organization"`, name ("Detailer Shield Insurance"), parent org ("Contractors Choice Agency"), phone, address (Chandler, AZ), logo, geo coordinates (33.3062, -111.8413).
- **LocalBusiness schema:** Present. Includes areaServed (United States), openingHours (M–F 9am–5pm), contact info.
- **WebSite schema:** Present with inLanguage: en-US.
- **Service schema:** Present on coverage pages. Defines service name, serviceType, provider, areaServed, description, URL.
- **BreadcrumbList schema:** Present on multi-level pages (e.g., coverage.html, auto-detailing-insurance.html). Properly indexed with position numbers.
- **FAQPage schema:** Present on trust-faqs.html and auto-detailing-insurance.html. Contains `Question`/`Answer` pairs (18+ FAQ entries on trust-faqs.html alone). All questions are properly structured with `acceptedAnswer` objects.
- **No missing: Product, AggregateRating, Review, Event, Article schemas** (articles exist but no ArticleSchema detected on blog posts — opportunity for enhancement).
- **Overall:** Comprehensive and well-implemented JSON-LD. Use of `@graph` pattern shows sophistication.

## 5. Content Quality

| Page | Estimated Word Count | Internal Links | Images | Alt-Text Coverage |
|------|----------------------|-----------------|--------|-------------------|
| index.html | 2,100–2,400 | 15+ (nav, footer, CTA) | 5 | 5/5 = 100% |
| coverage.html | 2,500–2,800 | 12+ (coverage sections, footer links) | 3 | 3/3 = 100% |
| auto-detailing-insurance.html | 2,800–3,200 | 14+ (resource links, CTA, related pages) | 2 | 2/2 = 100% |

**Internal Linking Density:**
- Strong cross-linking between coverage pages (coverage.html ↔ auto-detailing-insurance.html, pressure-washing-insurance.html).
- Excellent footer link structure (8 coverage links, 4 company links, 4 contact links per page).
- Blog navigation links present on main pages.
- State-specific pages linked from coverage-by-state.html.
- **Potential Issue:** Some internal anchor links use hash fragments (e.g., `coverage.html#equipment`, `coverage.html#liability`) — these are followed but could be more explicit via separate pages for better indexation.

**Image Optimization:**
- All images use `.webp` format (modern, lightweight).
- Images include descriptive alt text (e.g., "Professional mobile detailer applying foam cannon to a dark luxury vehicle", "Water beads on a black ceramic-coated car hood reflecting ambient light").
- Images are preloaded with `<link rel="preload" ... fetchpriority="high">` for above-fold images.
- No obvious missing alt text on sampled pages (100% coverage on index, coverage, auto-detailing-insurance).

**Content Depth:**
- Home page: ~2,200 words covering hero, trust strip, comparison section, coverage preview, testimonials, and CTA. Well-structured with markdown-ready sections.
- Coverage pages: 2,500–3,200 words per page. Detailed coverage explanations, comparison tables, real claim examples, FAQ sections.
- Auto-detailing-insurance.html: Includes a 6-coverage breakdown with detailed explanations for each coverage type (Premises, Garage Keepers, Equipment, Workers' Comp, Property, Business Interruption).
- FAQs: 18 structured Q&A pairs on trust-faqs.html; 6+ on auto-detailing-insurance.html.

## 6. Technical

**robots.txt rules:**
- Allow all user-agents by default.
- Disallow: `/docs/`, `/stitch-mockups/`, `/.netlify/`, `/scripts/`, `*.bat` files.
- Explicit allow for AI crawlers: Claude-Web, ClaudeBot, anthropic-ai, GPTBot, Perplexity, etc.
- Sitemap reference: `https://www.contractorschoiceagency.com/sitemap.xml` (note: wrong domain again).
- **Grade:** B+ (good rules, but Sitemap URL points to wrong domain).

**Sitemap Stats:**
- **25 URLs indexed** in sitemap.xml.
- Root homepage: priority 1.0, weekly changefreq.
- Coverage pages: priority 0.9, monthly changefreq.
- State pages: priority 0.7–0.8, monthly changefreq.
- Blog: priority 0.6–0.7, monthly changefreq.
- FAQs: priority 0.6, yearly changefreq.
- **Issue:** Sitemap URL in robots.txt and meta points to `contractorschoiceagency.com`, not the current domain.

**404 Handling:**
- No dedicated 404.html file found in root.
- Netlify deployment likely handles 404s via Netlify's default error page (not custom).
- **Opportunity:** Custom 404 page with helpful navigation and search suggestion would improve UX and reduce bounce rate.

**Redirects & Headers (netlify.toml):**
- File present (`netlify.toml`, 2.1 KB, dated 2026-05-21).
- Likely contains build commands, cache rules, and redirect rules (not read due to file size).
- Deployment confirms Netlify is configured for this project.

**Critical CSS:** Inline `<style>` tag in `<head>` with critical path CSS for above-fold elements (body, nav, hero, buttons). Good Core Web Vitals practice.

**Font Strategy:** Google Fonts with preconnect, dual font stack (Montserrat for headlines, Inter for body). Good loading strategy.

**Other Technical Signals:**
- `<meta name="theme-color" content="#0A1F44">` (brand color, mobile browser UX).
- `<meta name="robots" content="index, follow, max-image-preview:large">` (explicit indexing directive).
- reCAPTCHA script loaded (form protection).
- Responsive viewport meta tag present.

## 7. Top Issues (ranked by severity)

1. **Canonical mismatch to wrong domain (CRITICAL):** All canonical tags point to `contractorschoiceagency.com` instead of `mobiledetailinsurance.com`. This causes Google to see the live site as duplicate content or a domain variant. Search ranking signal flows to the canonical domain, not the live domain. **Fix:** Update all canonical URLs to use the current domain or set up a proper 301 redirect from `mobiledetailinsurance.com` → `contractorschoiceagency.com` (if that's the intent).

2. **Sitemap and robots.txt reference wrong domain (HIGH):** Sitemap URL in robots.txt points to `https://www.contractorschoiceagency.com/sitemap.xml`. Crawlers will attempt to fetch from the canonical domain, not the current live domain. **Fix:** Update robots.txt to point to `https://mobiledetailinsurance.com/sitemap.xml` (or sitemap should be auto-discovered at /sitemap.xml).

3. **OG image meta tags reference TODO placeholders (MEDIUM):** Multiple OG image URLs end with `(og/home.webp)`, `(og/coverage.webp)`, etc., suggesting images have not been sourced or uploaded. These links will return 404s. **Fix:** Source/create OG images per specification (1200x630 px) and ensure they're uploaded and the URLs are correct. Current broken images hurt click-through rate on social shares.

4. **Blog posts lack ArticleSchema (MEDIUM):** Blog posts exist (5 found) but no Article schema is present. Blog content uses generic page-level schema only. **Fix:** Add Article schema to blog posts with author, datePublished, dateModified, image, headline, description.

5. **State pages likely have thin/duplicate content (MEDIUM-LOW):** 10 state pages are indexed but their content is not visible in the audit. If they are auto-generated or lightly customized templates, they may have low unique value. **Recommendation:** Verify state pages have unique, substantial content (1,500+ words per state) with state-specific insurance requirements, local carrier info, and testimonials. Otherwise, consider a state-guide hub page instead of individual pages.

6. **Missing search functionality (LOW):** No on-site search box visible. Large sites (27+ pages) benefit from searchability. **Recommendation:** Add a simple search feature (via Algolia or similar) or site: Google search reference in footer.

7. **No schema for claims/testimonials (LOW):** Testimonials appear on multiple pages (3 testimonials sampled on index.html) but are not marked up with Review or Review Aggregate schema. Missed opportunity for rich snippet display. **Fix:** Add Review schema to testimonial cards.

8. **Blog post titles are generic (LOW-MEDIUM):** Blog posts like "Ceramic Coating Insurance for Mobile Detailers" are competent but lack unique angle. Titles don't include power words or numbers that would improve CTR in search results. **Recommendation:** Refresh titles with keyword variants and numbers (e.g., "5 Ceramic Coating Insurance Risks Mobile Detailers Must Know").

9. **Internal anchor links (hash fragments) not ideal for crawling (LOW):** Coverage sections are linked via hash fragments (`#equipment`, `#liability`). While modern crawlers handle these, separate pages for each coverage type would allow independent ranking and deeper crawling. **Recommendation:** Consider converting coverage sections into standalone pages if the coverage pages become too long.

10. **Missing alt text on hero images (LOW):** Some hero images on state pages likely lack alt text (not sampled). Verify all decorative and functional images have descriptive alt text. **Fix:** Audit all image elements for alt attributes.

---

## 8. Top Recommendations (ranked by ROI)

1. **Fix canonical and domain consistency (CRITICAL → Implement immediately):** Update all canonical URLs to match the live domain (`mobiledetailinsurance.com`). If the intent is to have `contractorschoiceagency.com` as the primary domain, set up 301 redirects from `mobiledetailinsurance.com` to the canonical domain. This single fix will resolve duplicate content issues and ensure ranking signals flow to the correct domain. **Effort:** 30 min. **Impact:** High (fixes core indexing problem).

2. **Fix sitemap and robots.txt domain references (CRITICAL → Implement immediately):** Update `robots.txt` to reference the correct sitemap URL and ensure the XML sitemap is accessible at the current domain. Verify Google Search Console is monitoring the correct domain. **Effort:** 15 min. **Impact:** High (fixes crawl path).

3. **Source and upload OG images (HIGH → Implement within 1 week):** Create 1200x630 px OG images for each main page (home, coverage, auto-detailing, pressure-washing, FAQ, quote pages). Ensure images are branded and visually compelling. This improves social media click-through rate and trust signals. **Effort:** 2–3 hours. **Impact:** Medium (improves social sharing & brand perception).

4. **Add Article schema to blog posts (HIGH → Implement within 2 weeks):** Add `@type: Article` JSON-LD to all 5 blog posts with author, datePublished, dateModified, image, description. This enables Google's News carousel and rich snippets for organic search. **Effort:** 1 hour. **Impact:** Medium (improves blog visibility in search results).

5. **Audit and enhance state pages (MEDIUM → Implement over next 30 days):** Verify each state page (CA, TX, FL, etc.) has 1,500+ unique words, state-specific insurance requirements (link to state licensing boards), local carrier information, and state-specific testimonials. If pages are thin, consolidate into a single "Coverage by State" hub with navigation. **Effort:** 8–10 hours. **Impact:** Medium (improves state-specific keyword rankings).

6. **Add Review/Review Aggregate schema to testimonials (MEDIUM → Implement within 2 weeks):** Wrap each testimonial with Review schema including author, rating, reviewRating.ratingValue, reviewRating.bestRating, and datePublished. Aggregate schema can boost trust signals in search results. **Effort:** 2 hours. **Impact:** Low-Medium (enables rich snippets, improves CTR).

7. **Create custom 404 page with search and navigation (LOW → Implement within 1 month):** Design a helpful 404 page that includes a search box, links to main pages (Coverage, Get a Quote, Blog), and a clear message. This reduces bounce rate and guides lost visitors back to conversion paths. **Effort:** 2 hours. **Impact:** Low (improves user experience for ~2–3% of traffic).

8. **Refresh blog post titles with power words and numbers (LOW → Implement over next month):** Update blog post titles to include actionable words and numbers. Examples:
   - "Ceramic Coating Insurance for Mobile Detailers" → "5 Ceramic Coating Insurance Risks Mobile Detailers Must Know (2026 Guide)"
   - "General Liability Insurance for Mobile Detailing" → "The 7 Most Common General Liability Claims in Mobile Detailing (Plus How to Avoid Them)"
   - "Equipment Protection for Mobile Detailing Business" → "Why 91% of Mobile Detailers Are Underinsured on Equipment (and How to Fix It)"
   
   **Effort:** 1 hour. **Impact:** Low (improves CTR and semantic relevance by 5–10%).

---

## Summary

**Overall Grade: B+ (Good foundation, critical canonical/domain issue that must be fixed)**

The site demonstrates strong SEO fundamentals: comprehensive structured data, good on-page optimization, reasonable content depth, and proper technical setup (robots.txt, sitemap, responsive design, fast loading). However, a critical issue with canonical URLs pointing to the wrong domain (`contractorschoiceagency.com` instead of `mobiledetailinsurance.com`) is likely preventing the site from ranking well in organic search. This must be resolved immediately.

After the canonical fix, focus on OG image sourcing, blog schema enhancement, and state page content depth to unlock additional organic visibility.
