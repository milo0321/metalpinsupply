# MedalPinSupply.com Project Development & Design Invariants

## 0. Brand Identity & Positioning Invariants (FIRST IRON RULE)
- **Brand Name**: **MedalPinSupply.com** — Direct Factory Supply Chain Platform for Custom Enamel Pins, Race Medals, Challenge Coins, Trolley Coins, Metal Keychains & Executive Metalware.
- **Manufacturing & Export Hub**: Zhongshan Xiaolan Hardware & Electroplating Hub, Guangdong, China (Est. 1995).
- **Core Business Positioning**: **150 Standardized & Ready-Mold Metal Craft SKUs (`MPS-001` through `MPS-150`)** spanning Die-Struck Brass/Iron, 3D Zinc Alloy Die-Casting, Photo-Etched Brass, Offset/Silk-Screen Printing, Cloisonne Hard Enamel, Pro-Enamel, Soft Enamel, Spin-Cast Pewter, Embroidery/Woven Patches, Soft PVC, and Retail Presentation Packaging.
- **Core Value Propositions**:
  1. **Transparent Mold Tooling Policy**:
     - `$0.00` tooling fee on all Ready/Stock Molds (European €1/£1/$1 CAD/$1 AUD trolley coins, standard keyrings, bottle openers, cufflink toggles, and stock velvet/acrylic packaging).
     - `$55–$85 USD` custom die fee for stamped enamel pins & brass badges (**waived automatically on orders of 500+ pcs**).
     - `$95–$150 USD` custom mold fee for 3D sculpted zinc alloy medals, challenge coins & belt buckles (**waived automatically on orders of 1,000+ pcs**).
     - Custom molds stored free of charge for **3 years** for zero-fee reorders.
  2. **Accessible Wholesale MOQs & Rapid Turnaround**: **50–200 pcs** MOQ depending on SKU, **12-hour free 1:1 digital artwork proofs**, **7–10 days** pre-production physical samples, and **7–15 days** mass production lead time.
  3. **Complete Enamel, Printing & Electroplating Capabilities**: Hard Enamel (Cloisonne/Imitation), Die-Struck Soft Enamel (with or without clear Epoxy Dome), Photo-Etched Brass, Die-Struck Uncolored Relief, Offset CMYK & Silk-Screen Printing, 3D Zinc Alloy Die-Casting, Pewter Spin-Casting, plus 12 electroplating finishes (Shiny Gold, Silver, Nickel, Black Nickel, Antique Brass/Bronze/Silver/Copper, Rose Gold, Dual-Plating, Rainbow Anodized, Matte Black).
  4. **Verified International Compliance**: US CPSIA Lead (<90 ppm) & Cadmium safety, California Prop 65, EU RoHS 3 (2015/863), REACH SVHC, EN 1811 nickel-release compliant plating, and full HS Code export documentation.
- **Prohibited Terms & Privacy Guardrails**:
  - Never expose raw factory brand names (`topbadge.com`, `F&T`, `Qingfeng Industrial Zone`, `Dongguan Fuyuan`), factory phone numbers, or internal codes on the front-end.
  - Never use prohibited terms (`B2B`, `AQL 2.5`, `$49 Sample`, `100% discount` / `100% credit` / `100% rebate` / `100% refund`) in customer-facing copy.

## 1. Catalog & Bidirectional Semantic Mesh Architecture
- **150 Leaf Product SKUs (`/products/[slug]`)**: Organized across **10 L2 Collection Hubs** (`/collections/[slug]`).
- **40 Authoritative Skyscraper Insights (`/insights/[slug]`)**: Covering all 6 procurement pillars (Materials & Manufacturing, Medals & Sports Events, Coins & Military Insignia, Keychains & Trolley Coins, Executive/Golf/Souvenirs, and Sourcing/Packaging/Compliance).
- **Bidirectional Semantic Mesh**:
  1. Every Insight links to `>= 15` Product SKUs (`/products/...`), `>= 2` Collection Hubs (`/collections/...`), and `>= 3` sibling Insights (`/insights/...`).
  2. Every Product SKU page (`/products/[slug]`) renders `>= 4` links to relevant `/insights/...` guides.
  3. Every Collection Hub page (`/collections/[slug]`) renders `>= 3` links to relevant `/insights/...` guides.

## 2. Accordion Event Delegation & Dark CTA Contrast Invariants
- All `.accordion-header` click events are handled globally via Event Delegation in `src/layouts/Layout.astro`.
- For `.sourcing-cta-box` and `.article-inline-cta` (dark slate background `#0f172a` -> `#1e293b`):
  - Headings (`h2`, `h3`): `color: #ffffff !important;`
  - Descriptions (`p`): `color: #cbd5e1 !important;`
  - Inline Text Links (`p a`): `color: #38bdf8 !important; text-decoration: underline;`
  - Conversion Button (`a.btn`, `.btn-primary`): `background-color: #0284c7 !important; color: #ffffff !important; font-weight: 700;`

## 3. Page Settings, Image Hygiene, FAQ, Backlinko & SEO/GEO Invariants
- **Featured Image Physical Existence & Uniqueness**: Every `featuredImage` and inline figure image path MUST physically exist on disk in `public/` and have a unique file path and unique MD5 hash across the entire repository.
- **Image Specifications**: `.webp` format only, file size strictly `< 150KB`, exact `800x600` (`4:3` aspect ratio) on all 150 product `featuredImage` and 40 insight `featuredImage` assets, plus uncropped `4:3` (`360x270`) product panels inside composite inline figures (`800x310` for 2-up, `1170x305` for 3-up), with non-empty descriptive `alt` text.
- **FAQ Invariants (9-12 FAQs per page)**: Every Product SKU page, Collection Hub, Static Service Page, and Insight Guide MUST feature **10 FAQs** backed by Schema.org `FAQPage` JSON-LD structured data and localized across all 18 languages.
- **Backlinko Standards**: Insights require word count `>= 1,200` words, reading time `>= 8` min, `>= 2` unique `.geo-table` comparison tables, `>= 2` unique WebP inline figures with `<figcaption>`, `>= 4` unique `<h2>` headings, `.sourcing-cta-box`, and 0 banned AI cliches (`seamlessly`, `delve`, `paramount`, `crucial`, `tapestry`, `beacon`, `cutting-edge`, `game-changer`, `unwavering`, `revolutionize`, `testament`).
- **SEO & GEO Standards**: Decoded `<title>` strictly `<= 60` chars and `<meta name="description">` strictly `<= 160` chars across all routes (`< 155` chars in product/insight JSON/frontmatter), `GeoDirectAnswer` block present, Triple JSON-LD Schema (`Product`/`CollectionPage`/`TechArticle` + `FAQPage` + `BreadcrumbList`), 18-language parity (`3,799` built HTML pages), zero unlocalized fallback links, and **0 stray Chinese characters (`[\u4e00-\u9fff]`) across all non-Japanese built HTML pages**.
