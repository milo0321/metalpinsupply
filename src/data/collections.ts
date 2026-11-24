export interface CollectionMeta {
  slug: string;
  number: number;
  group: 'primary' | 'cross';
  name: string;
  shortName: string;
  subLabel: string;
  badge: string;
  skuCount: number;
  priceRangeUsd: string;
  moq: string;
  leadTime: string;
  toolingNote: string;
  targetKeywords: string;
  heroSubtitle: string;
  geoDirectAnswer: string;
  engineeringHighlights: string[];
  faqs: { question: string; answer: string }[];
}

export const COLLECTIONS: CollectionMeta[] = [
  {
    slug: 'custom-enamel-pins',
    number: 1,
    group: 'primary',
    name: 'Custom Enamel Pins & Die-Struck Lapel Badges',
    shortName: 'Custom Enamel Pins',
    subLabel: 'Hard Enamel, Soft Enamel, Photo-Etched, 3D Zinc & Offset Pins',
    badge: 'Category #1 · 24 Pin Crafts & Styles',
    skuCount: 24,
    priceRangeUsd: '$0.14 – $2.35',
    moq: '50 – 200 pcs',
    leadTime: '7–12 Days',
    toolingNote: '$55–$85 die (Waived @ 500+ pcs)',
    targetKeywords: 'custom enamel pins wholesale, hard enamel lapel pins manufacturer, soft enamel pins bulk, photo etched brass pins, 3d zinc alloy lapel pins, custom flag pins supplier',
    heroSubtitle: '24 specialized lapel pin configurations covering Cloisonne hard enamel, die-struck soft enamel, clear epoxy domes, photo-etched brass, 3D die-cast zinc/pewter, glitter, glow-in-the-dark, interactive spinners, crossed flag pins, and tinplate buttons ($0.14–$2.35/pc, MOQ 50 pcs).',
    geoDirectAnswer: 'MedalPinSupply manufactures 24 custom lapel lapel pin styles in Zhongshan Xiaolan across 9 factory processes: hard enamel (cloisonne/pro-enamel), die-struck soft enamel, photo-etched brass, antique die-struck uncolored relief, offset CMYK & silk-screen printing, 3D zinc alloy die-casting, spin-cast pewter, and tinplate button badges. Starting MOQ is 50 pcs with 12-hour free digital proofs, $55–$85 custom die fees (waived at 500+ pcs), and 7–12 business day production.',
    engineeringHighlights: [
      'Complete 9-Process Pin Foundry: Seamlessly choose between flush-polished hard enamel, recessed tactile soft enamel, ultra-thin 0.8mm photo-etched brass, full-color CMYK offset epoxy, or 3D sculpted zinc alloy.',
      'Interactive & Specialty Enamel Effects: Precision kinetic mechanisms milled for rotating spinner pins, sliding tracks, hinged dangles, translucent stained glass, glitter, and luminous glow-in-the-dark pigments.',
      'Full Attachment & Packaging Matrix: Supplied with standard butterfly clutches, rubber PVC backs, deluxe locking pin backs, magnetic clothing-safe bars, and custom 350gsm retail backing cards.'
    ],
    faqs: [
      {
        question: 'What is the visual and tactile difference between Hard Enamel (Cloisonne/Pro-Enamel) and Soft Enamel pins?',
        answer: 'Hard enamel pins are over-filled with synthetic enamel paste, kiln-cured, and ground completely flat and smooth so the enamel sits flush with the raised metal borders. Soft enamel pins recess the Pantone-matched enamel slightly below the raised metal ridges, giving a textured 3D tactile edge at 15%–25% lower unit cost.'
      },
      {
        question: 'What is the custom die/mold fee for lapel pins and when is it waived?',
        answer: 'Standard 2D stamped iron or brass lapel pin dies cost $55–$85 USD depending on pin diameter (0.75" to 2.0"). Die fees are automatically waived on orders of 500+ pcs of a single design, and your steel die is stored free for 3 years for zero-fee reorders.'
      },
      {
        question: 'When should I choose Photo-Etched Brass or Offset Printed pins instead of die-struck enamel?',
        answer: 'Choose photo-etched brass when your artwork features delicate ultra-thin lines or you want lightweight 0.8mm badges. Choose CMYK offset printing with clear epoxy dome when your logo contains photographic gradients, shading, or complex small typography that cannot be separated by metal lines.'
      },
      {
        question: 'What is the minimum order quantity (MOQ) and turnaround time for custom lapel pins?',
        answer: 'Die-struck hard enamel, soft enamel, and interactive zinc pins start at just 50 pcs MOQ (100 pcs for photo-etched, offset printed, or glow-in-the-dark). Digital artwork proofs are sent free within 12 hours, and bulk production finishes in 7–12 business days.'
      },
      {
        question: 'Which electroplating colors are available without extra tooling charges?',
        answer: 'Standard electroplating options include shiny gold, shiny silver/nickel, brass, copper, black nickel, matte black-dyed metal, and antique bronze/silver/copper. Two-tone dual plating and rainbow anodized PVD plating are available as optional upgrades.'
      },
      {
        question: 'Do you recommend clear epoxy domes on soft enamel lapel pins?',
        answer: 'Adding a clear optical epoxy dome shields soft enamel colors against scratches while giving a glossy lens depth at minimal extra cost, making it popular for corporate logo badges and school pins.'
      },
      {
        question: 'How do magnetic-back lapel pins prevent holes in suits and delicate uniforms?',
        answer: 'Instead of piercing fabrics with a sharp spur nail, magnetic-back pins solder a flat iron plate onto the pin reverse paired with a high-strength two-magnet neodymium bar clasp that grips firmly through blazers, silk blouses, and uniform shirts.'
      },
      {
        question: 'What sizes and thicknesses are standard for corporate vs. trading lapel pins?',
        answer: 'Corporate service and lapel pins typically measure 0.75" to 1.25" (19–32mm) at 1.2–1.5mm thickness, while youth baseball and sports trading pins run 1.5" to 2.25" (38–57mm) at 1.8–2.0mm thickness with glitter or dangle charms.'
      },
      {
        question: 'Can we order custom printed backing cards and individual polybags with our pins?',
        answer: 'Yes. Standard pins ship individually polybagged at $0.00 extra cost. You can upgrade to custom 350gsm–400gsm matte or foil-stamped retail backing cards mounted and sealed in euro-slot retail pouches ready for direct store display.'
      },
      {
        question: 'Are your enamel paints and electroplatings compliant with US CPSIA and EU REACH standards?',
        answer: 'Yes. All copper, brass, iron, and zinc substrates plus Pantone enamel pigments comply with US CPSIA lead (<90 ppm) and cadmium limits, California Prop 65, and EU REACH / EN 1811 nickel-release directives.'
      }
    ]
  },
  {
    slug: 'custom-medals',
    number: 2,
    group: 'primary',
    name: 'Custom Race Medals & Sports Medallions',
    shortName: 'Custom Race Medals',
    subLabel: '3D Marathon, Spinner, Cut-Out, Magnetic Puzzle & Sublimated Ribbons',
    badge: 'Category #2 · 20 Medal Formats',
    skuCount: 20,
    priceRangeUsd: '$0.24 – $3.85',
    moq: '100 – 200 pcs',
    leadTime: '10–15 Days',
    toolingNote: '$95–$150 mold (Waived @ 1,000+ pcs)',
    targetKeywords: 'custom marathon medals wholesale, race finisher medals manufacturer, custom 3d die cast sports medals, spinner race medal supplier, dye sublimated medal ribbons',
    heroSubtitle: '20 heavyweight custom medal formats engineered for marathons, 5K/10K runs, triathlons, martial arts tournaments, and academic awards—spanning 3" to 4.5" 3D sculpted zinc alloy, 360° spinners, interlocking magnetic puzzle series, integrated bottle openers, stained glass, and custom dye-sublimated ribbons.',
    geoDirectAnswer: 'MedalPinSupply produces 20 custom race and award medal craft styles in heavy 3mm–5mm die-cast zinc alloy and die-struck solid brass. Standard diameter options span 2.0" youth tournament medallions ($0.82–$1.85/pc) up to oversized 4.5" 3D marathon and triathlon finisher medals ($1.35–$3.85/pc), complete with V-stitched custom dye-sublimated satin neck ribbons. Custom 3D mold fees ($95–$150) are waived at 1,000+ pcs.',
    engineeringHighlights: [
      'Deep 3D Sculpting & Multi-Window Cut-Outs: High-pressure Zamak #3 die-casting renders razor-sharp architectural skylines, topographic mountain relief, and hollow cut-out spokes without rough edges.',
      'Interactive Finisher Experience: Stand out on race day with 360° spinning center medallions, integrated bottle openers, sliding runner tracks, translucent stained-glass cutouts, and magnetic multi-race puzzle medals.',
      'Full-Color V-Stitched Ribbons Included: Every medal pairs seamlessly with 25mm or 38mm full-color dye-sublimated polyester satin ribbons featuring custom jump rings or wide ribbon slots.'
    ],
    faqs: [
      {
        question: 'What size and thickness should I choose for a marathon vs. a 5K/10K finisher medal?',
        answer: 'For 5K and 10K community races, 2.5" to 3.0" (65–75mm) at 3mm–3.5mm thickness offers high perceived value at $1.05–$1.65/pc. Full marathons, half marathons, and triathlons typically specify 3.5" to 4.5" (89–114mm) at 4mm–5mm thickness weighing 100g–180g.'
      },
      {
        question: 'Can we share one mold across Gold (1st), Silver (2nd), and Bronze (3rd) place medals?',
        answer: 'Yes! Using our shared-mold electroplating workflow, you pay only one mold fee and divide your production batch across shiny or antique gold, silver, and bronze finishes (for example, 100 gold + 100 silver + 100 bronze) with matching ribbon color variations.'
      },
      {
        question: 'How do custom Magnetic Interlocking Race Series Medals work?',
        answer: 'Designed for multi-race virtual challenges or seasonal 3-race series, each individual medal carries embedded neodymium alignment magnets along its mating edge so finishers can snap all 2 to 4 medals together into a single circular or shield centerpiece.'
      },
      {
        question: 'What is the custom mold fee for 3D sculpted sports medals?',
        answer: 'Custom 2D flat-relief zinc alloy medal molds cost $95–$120 USD, and complex sculpted 3D or cut-out molds cost $120–$150 USD. For race orders of 1,000+ pcs, mold fees are waived automatically, and existing race molds are kept free for 3 years if you only update the annual ribbon or rear engraving.'
      },
      {
        question: 'Are custom dye-sublimated neck ribbons included in the medal pricing?',
        answer: 'Yes. Standard 25mm × 850mm full-color dye-sublimated polyester satin ribbons with V-stitching and jump rings are factored into our medal tier estimates. Upcharging to extra-wide 38mm ribbons or double-sided custom artwork printing adds just $0.12–$0.22/pc.'
      },
      {
        question: 'How fast can you produce and ship medals before our scheduled race weekend?',
        answer: 'Standard production takes 10–15 business days after 12-hour digital proof approval (15–18 days for complex 3D spinner or interlocking puzzle runs). We schedule air express dispatch straight to your race expo or fulfillment warehouse to ensure timely pre-event delivery.'
      },
      {
        question: 'Can we laser-engrave or leave space for winner names and split times on the back?',
        answer: 'Yes. We cast a smooth recessed nameplate zone on the reverse side of your medal mold so local trophy shops can engrave participant names—or we can pre-engrave sequential bib numbers or division categories directly via fiber laser.'
      },
      {
        question: 'What is the difference between Zinc Alloy medals and Die-Struck Solid Brass academic medals?',
        answer: 'Zinc alloy die-casting enables complex 3D contours, cut-outs, and spinner attachments at economical race-day prices. Die-struck solid brass produces dense heirloom weight and crisp coin-sharp edges ideal for university graduations and military honors.'
      },
      {
        question: 'Can virtual race organizers order lightweight mailer-ready finisher medals?',
        answer: 'Yes. Lightweight mailer-ready race medals optimize thickness to 2.8mm–3.0mm to keep total parcel weight under standard postal letter/packet thresholds while still retaining vivid enamel detailing and individual scratch-free polybags.'
      },
      {
        question: 'Can you add glow-in-the-dark enamel or LED modules for night runs?',
        answer: 'Yes. Glow-in-the-dark night-run medals use long-afterglow phosphorescent enamel pigment charged by daylight or UV flashlights, while LED-bezel medals integrate an enclosed replaceable LED module inside a custom 3D zinc alloy bezel.'
      }
    ]
  },
  {
    slug: 'custom-challenge-coins',
    number: 3,
    group: 'primary',
    name: 'Custom Challenge Coins & Commemorative Coins',
    shortName: 'Challenge Coins',
    subLabel: 'Military 3D Brass, Dual-Plated, Diamond-Cut Edge & Numbered Coins',
    badge: 'Category #3 · 16 Coin Specialties',
    skuCount: 16,
    priceRangeUsd: '$0.95 – $4.50',
    moq: '50 – 100 pcs',
    leadTime: '10–15 Days',
    toolingNote: '$95–$145 mold (Waived @ 1,000+ pcs)',
    targetKeywords: 'custom challenge coins manufacturer, military challenge coin bulk, police challenge coins, dual plated challenge coin, diamond cut edge coin, sobriety recovery coins',
    heroSubtitle: '16 heirloom-grade challenge and commemorative coin configurations (1.5" to 2.5" diameter, 3mm–4mm thickness) in solid die-struck brass and heavy zinc alloy—offering 3D double-sided relief, dual gold/silver masking plating, diamond-cut edges, integrated bottle openers, spinners, sequential laser numbering, and 24K gold proof finishes.',
    geoDirectAnswer: 'MedalPinSupply manufactures 16 custom challenge coin styles starting at a low 50 pcs MOQ. Crafted from heavy solid brass or zinc alloy (3mm–4mm thick, 35g–75g), our coins support double-sided 3D relief, Cloisonne hard enamel, two-tone dual electroplating, 6 custom edge cuts (oblique, rope, spur, wave, crosscut, petal), sequential laser edge numbering, and protective acrylic capsules or velvet boxes.',
    engineeringHighlights: [
      'Authentic Coin Metallurgy & 3mm–4mm Heft: Solid C26000 cartridge brass delivers crisp die-struck detail and ringing coin chime, while Zamak #3 zinc alloy enables intricate shield cutouts and spinner centers.',
      '6 Custom Edge Cut Profiles & Dual-Plating: Elevate collector value with CNC diamond-cut oblique/rope/wave edges and masked two-tone gold + antique silver plating.',
      'Turnkey Serialization & Display Packaging: Add sequential laser edge numbering and pair with clear acrylic coin capsules or flocked velvet gift boxes.'
    ],
    faqs: [
      {
        question: 'What are the standard sizes and thicknesses for military and police challenge coins?',
        answer: 'The industry standard sizes are 1.75" (44.5mm) and 2.0" (50.8mm) with a sturdy 3.0mm to 3.5mm edge thickness. Oversized collector or bottle-opener coins frequently scale up to 2.25" or 2.5" at 4.0mm thickness.'
      },
      {
        question: 'What is the difference between Die-Struck Brass and Die-Cast Zinc Alloy challenge coins?',
        answer: 'Solid brass coins are struck under hundreds of tons of hydraulic pressure, yielding ultra-crisp fine text, sharp edges, and high metallic density. Die-cast zinc alloy is molten-injected, making it more economical for custom cut-out shapes, holes, bottle openers, and deep 3D sculpted contours.'
      },
      {
        question: 'How does Dual-Plated Two-Tone finishing work on challenge coins?',
        answer: 'The coin is first electroplated in the base finish (such as antique silver or black nickel), then precision hand-masked with protective lacquer over select zones before entering a second gold or copper plating bath—producing gleaming dual-tone contrast.'
      },
      {
        question: 'What custom edge options can be machined onto challenge coins?',
        answer: 'Beyond standard smooth or reeded (milled) coin edges, our diamond-cut edge tooling supports diamond-cut oblique ridges, rope twist edges, spur gear edges, wave cuts, and crosscut diamond patterns that catch light from every angle.'
      },
      {
        question: 'Can we put sequential serial numbers (e.g., 001 to 500) on every challenge coin?',
        answer: 'Yes. Using our Galvo fiber laser indexer, we engrave crisp sequential edition numbers along the rim or inside a dedicated reverse nameplate at just +$0.15–$0.25/pc.'
      },
      {
        question: 'What is the minimum order quantity (MOQ) for custom challenge coins?',
        answer: 'Custom challenge coins start at 50 pcs MOQ for most brass, enamel, and antique bronze styles (100 pcs for spinner center and translucent glow variants). Two-sided molds ($95–$145) are waived on orders of 1,000+ pcs.'
      },
      {
        question: 'How should challenge coins be packaged for protection and presentation?',
        answer: 'Every coin ships individually sealed in a thick PVC protective sleeve at no charge. Upgrades include clear snap-tight acrylic capsules, black/navy flocked velvet hinge boxes, or mahogany deluxe display cases.'
      },
      {
        question: 'Do you produce Sobriety / AA Recovery medallions and Masonic lodge coins?',
        answer: 'Yes. Sobriety & recovery medallions (34mm–38mm antique bronze/tri-plate) and Masonic & fraternal lodge coins are produced with strict color fidelity and multi-year milestone variants sharing common tooling.'
      },
      {
        question: 'Can we include translucent enamel over a diamond-textured metal background?',
        answer: 'Yes. Translucent enamel challenge coins apply diamond-knurl stamping or sandblasting beneath translucent colored resin so light reflects off the metal facets underneath.'
      },
      {
        question: 'What artwork files are required to begin a custom challenge coin proof?',
        answer: 'Send us your sketches, crest PNGs, or vector logos (.AI, .EPS, .PDF, .SVG) along with desired size, finish, and front/back copy. Our design engineers prepare a clean 2D/3D production render within 12 hours.'
      }
    ]
  },
  {
    slug: 'custom-metal-keychains',
    number: 4,
    group: 'primary',
    name: 'Custom Metal Keychains & Branded Keyrings',
    shortName: 'Metal Keychains',
    subLabel: '3D Zinc, Soft/Hard Enamel, Spinner, Leather-Metal, Nail Clipper & Carabiners',
    badge: 'Category #4 · 20 Keychain Styles',
    skuCount: 20,
    priceRangeUsd: '$0.16 – $2.25',
    moq: '100 – 500 pcs',
    leadTime: '7–12 Days',
    toolingNote: '$45–$120 Custom Die (Waived @ 500–1K+)',
    targetKeywords: 'custom metal keychains wholesale, 3d zinc alloy keychains manufacturer, leather metal keychain bulk, spinning metal keychain, hotel brass key tags, carabiner keychains',
    heroSubtitle: 'Our deepest specialty metalware category with 20 high-demand styles: 3D die-cast zinc alloy, soft & hard enamel, photo-etched brass, 360° spinning centers, stitched genuine leather + metal emblems, multi-tool nail clippers, bottle openers, boutique hotel stamped brass key tags, laser stainless bars, and anodized aluminum carabiners.',
    geoDirectAnswer: 'MedalPinSupply produces 20 commercial metal keychain craft styles combining our factory’s 11 core hardware processes. Options span economy anodized carabiners ($0.29–$0.85/pc) and laser-engraved 304 stainless steel key fobs ($0.44–$1.20/pc) up to heavy 3D zinc alloy landmark keychains ($0.68–$1.65/pc), spinning center keyrings ($0.88–$2.10/pc), genuine leather + metal emblem fobs ($0.78–$1.85/pc), and stamped brass hotel key tags ($0.98–$2.25/pc).',
    engineeringHighlights: [
      '11 Proven Keychain Architectures: From solid stamped brass and high-polish cloisonne enamel to dual-axis spinning zinc cores and stitched leather fobs with recessed metal medallions.',
      'Heavy-Duty Split Rings & Swivel Hardware: Fitted with tempered spring-steel 28mm–32mm flat/round split rings, zinc lobster clasps, or custom-stamped branded keyrings.',
      '500+ / 1,000+ Die Fee Waivers: Custom 2D stamping and laser fixture setups ($45–$75) waive automatically at 500+ pcs and 3D zinc molds ($95–$120) waive at 1,000+ pcs, stored free for 3 years.'
    ],
    faqs: [
      {
        question: 'Which custom metal keychain style offers the best durability against scratches inside pockets?',
        answer: 'For maximum scratch immunity, choose laser-engraved 304 stainless steel, stamped antique brass/vintage look keychains, or genuine leather fobs with recessed metal logos where leather absorbs pocket abrasion.'
      },
      {
        question: 'How do 360° Rotating Spinner Metal Keychains work?',
        answer: 'Spinner keychains nest an inner circular or emblem-shaped metal medallion on opposing top/bottom pivot pins inside an outer zinc alloy ring frame, letting users spin the double-sided logo smoothly between their fingers.'
      },
      {
        question: 'Are Leather & Metal Emblem Keychains available in both genuine cowhide and PU leather?',
        answer: 'Yes. We supply both budget-friendly stitched microfiber/PU leather and genuine top-grain split cowhide fobs in black, cognac brown, navy, and burgundy with custom die-struck or recessed enamel emblems.'
      },
      {
        question: 'Which metal keychains are most popular with car dealerships and real estate agencies?',
        answer: 'Auto dealerships favor chrome-plated 3D zinc alloy crests, leather-metal fobs, and rotating emblem spinners. Boutique hotels and real estate closings favor diamond/oval stamped antique brass tags.'
      },
      {
        question: 'Can we order functional multi-tool keychains like Nail Clipper or Bottle Opener keyrings?',
        answer: 'Yes! Nail-clipper keychains mount a custom Pantone-matched enamel crest onto a hardened stainless steel body, while bottle-opener fobs integrate a heavy zinc or anodized aluminum bottle opener.'
      },
      {
        question: 'Can we customize the metal split ring itself with our company website or logo?',
        answer: 'Yes. Custom-stamped flat split rings feature wide 28mm–32mm profiles that can be die-stamped or laser-etched with your brand URL around the circular rim.'
      },
      {
        question: 'What is the difference between Soft Enamel and Epoxy-Dome Offset Printed keychains?',
        answer: 'Soft enamel keychains separate solid Pantone colors with raised metal walls for tactile richness. Offset printed epoxy keychains reproduce full-color photography, shading, and complex gradients sealed under a crystal-clear resin dome.'
      },
      {
        question: 'Do anodized aluminum carabiners include laser branding?',
        answer: 'Yes. D-shaped and gourd-shaped anodized aluminum climb-loops are laser-etched along the flat spine—revealing crisp bright silver aluminum text against matte black, red, blue, green, or gold anodizing.'
      },
      {
        question: 'Are souvenir city and attraction keychains available with double-sided 3D relief?',
        answer: 'Yes. Double-sided 3D souvenir keychains use two-part 3D zinc alloy molds so tourist landmarks, skylines, and wildlife designs feature detailed relief on both the front and reverse sides.'
      },
      {
        question: 'What are the MOQ and lead times across the 20 custom keychain craft styles?',
        answer: 'Most custom keychains start at 100 pcs MOQ (200 pcs for nail clipper, carabiner, and 3D souvenir runs; 500 pcs for custom flat split rings). Production finishes in 7–12 business days after proof approval.'
      }
    ]
  },
  {
    slug: 'trolley-coin-keyrings',
    number: 5,
    group: 'primary',
    name: 'European Trolley Coins & Supermarket Token Keyrings',
    shortName: 'Trolley Coins',
    subLabel: '€1 Euro (23.25mm), 12-Sided UK £1, Magnetic Holders & Pull-Out Keys',
    badge: 'Category #5 · 10 Euro/UK Token Formats',
    skuCount: 10,
    priceRangeUsd: '$0.30 – $1.75',
    moq: '200 pcs',
    leadTime: '7–12 Days',
    toolingNote: '$55–$75 Coin Die (Waived @ 500–1K+)',
    targetKeywords: 'trolley coin keyrings wholesale, custom 1 euro trolley token, 12 sided uk pound trolley coin, einkaufswagenchips werbeartikel, magnetic trolley coin holder',
    heroSubtitle: 'High-volume promotional favorites across Germany, the UK, Benelux, Scandinavia, Canada, and Australia. Precision-stamped to exact coin diameters: 23.25mm (€1 Euro), 23.43mm (new 12-sided UK £1 Pound), 26.5mm ($1 CAD Loonie), and 25mm ($1 AUD) with lobster clasps, magnetic snap frames, pull-out key tools, and leather loops.',
    geoDirectAnswer: 'MedalPinSupply manufactures 10 dedicated supermarket trolley coin and token trolley token styles engineered to exact international shopping cart lock tolerances: 23.25mm × 2.33mm for €1 Euro carts, 23.43mm × 2.8mm 12-sided for new UK £1 carts, 26.5mm for Canadian Loonie carts, and 25.0mm for Australian $1 carts. Custom coin stamping dies ($55) waive automatically at 500+ pcs, starting at $0.30–$1.75/pc at 200 pcs MOQ.',
    engineeringHighlights: [
      'Exact Mint-Spec Mechanical Tolerances: Held within ±0.08mm on diameter and edge thickness so every token unlocks European, British, Canadian, and Australian supermarket cart locks smoothly without jamming.',
      '4 Ergonomic Holder Mechanisms: Choose from lightweight lobster-clasp rings, quick-snap magnetic zinc alloy holders, front-pull stainless key unlockers, bottle-opener holders, or stitched leather straps.',
      '4 Branding Finishes for High-Impact Logos: Available in stamped uncolored relief, Pantone soft enamel, full-color CMYK offset print + epoxy dome, or crisp fiber laser marking.'
    ],
    faqs: [
      {
        question: 'Do your 1 Euro (23.25mm) and UK 12-Sided £1 (23.43mm) trolley coins fit all supermarket cart locks?',
        answer: 'Yes. Our die-struck €1 tokens match the official 23.25mm diameter and 2.33mm thickness used across Germany, France, Netherlands, Spain, and EU retailers. Our UK tokens match the exact 12-sided 23.43mm × 2.8mm specification required for modern British supermarket trolleys.'
      },
      {
        question: 'What is the difference between a standard Lobster Clasp token and a Magnetic Trolley Coin Holder?',
        answer: 'Standard tokens use a spring-loaded nickel lobster clasp or C-clip attached through a 2mm top eyelet. Magnetic holders house a flat neodymium magnet inside a recessed zinc alloy frame so the un-drilled coin snaps out smoothly with one thumb push and snaps securely back into the frame.'
      },
      {
        question: 'How do Key-Shaped Trolley Unlockers work without leaving a coin inside the cart?',
        answer: 'Key-shaped stainless steel or zinc unlockers slide into the front coin slot to release the trolley lock chain and are immediately pulled straight back out by the user—leaving the token safely on your keychain while shopping.'
      },
      {
        question: 'What are the tooling costs for custom stamped vs. epoxy printed trolley coins?',
        answer: 'Custom 2D coin stamping dies and epoxy print plates ($55 USD) or 3D magnetic holder frames ($75) are waived 100% automatically at 500+ pcs (1,000+ pcs for magnetic holders) and stored free for 3 years for $0 reorders.'
      },
      {
        question: 'Which trolley coin style offers the lowest unit price for mass retail or municipal promotions?',
        answer: 'Uncolored die-struck stamped iron/brass tokens and full-color offset printed epoxy dome coins scale down to $0.30–$0.35/pc at 2,000+ pcs—ideal for supermarket openings, trade shows, and political campaigns.'
      },
      {
        question: 'Can we customize both sides of a trolley coin?',
        answer: 'Yes. On stamped enamel and magnetic snap coins, both front and back faces can feature custom logos, QR codes, or dual-language promotional text.'
      },
      {
        question: 'Do you also manufacture Canadian Loonie ($1 CAD) and Australian ($1 AUD) trolley tokens?',
        answer: 'Yes. Dedicated international trolley coin dies are calibrated specifically to 26.5mm ($1 CAD Loonie) and 25.0mm ($1 AUD) cart mechanisms popular with Canadian and Australian grocery chains.'
      },
      {
        question: 'What plating colors are most popular for European supermarket tokens?',
        answer: 'Bright nickel, brushed silver, antique bronze, and shiny gold electroplating baths are continuously maintained for all custom batches. For enamel options, corporate Pantone blue, red, green, and black inks provide sharp brand contrast.'
      },
      {
        question: 'Can trolley coins be mounted onto custom printed cardboard backing cards?',
        answer: 'Yes. Many banks, insurers, and supermarkets distribute trolley tokens mounted on full-color informational mailer cards inside direct-mail envelopes.'
      },
      {
        question: 'What is the minimum order quantity and production speed for trolley coins?',
        answer: 'MOQ is 200 pcs across all 10 trolley coin configurations, with fast 7–12 business day production from artwork sign-off.'
      }
    ]
  },
  {
    slug: 'police-badges-insignia',
    number: 6,
    group: 'primary',
    name: 'Police, Security, Fire & Military Insignia',
    shortName: 'Police & Insignia',
    subLabel: '3D Curved Shield Badges, Sheriff Stars, Dog Tags, Name Plates & Rings',
    badge: 'Category #6 · 14 Uniform & Institutional Styles',
    skuCount: 14,
    priceRangeUsd: '$0.42 – $7.50',
    moq: '50 – 100 pcs',
    leadTime: '10–15 Days',
    toolingNote: '$75–$145 die (Free storage 3 yrs)',
    targetKeywords: 'custom police badges manufacturer, security guard chest badges, sheriff star badge bulk, fire department maltese cross badge, embossed military dog tags, magnetic metal name plates',
    heroSubtitle: '14 high-margin institutional insignia lines engineered for law enforcement agencies, private security firms, fire departments, hospitality staff, and sports champions—featuring 3D curved dome brass/zinc police shields, 5/6/7-point sheriff stars, cowhide belt-clip holders, embossed 304 stainless military dog tags, magnetic employee name badges, and rhinestone championship rings.',
    geoDirectAnswer: 'MedalPinSupply manufactures 14 institutional uniform and badge & award styles ranging from $0.42 embossed stainless steel military dog tags and $0.92 magnetic employee name plates up to $2.35–$7.50 curved 3D brass police shield badges, sheriff stars, firefighter Maltese crosses, leather belt holsters, and sports championship rings. MOQs start at 50 pcs with sequential badge numbering and verified institutional authorization.',
    engineeringHighlights: [
      'True Domed-Curve Stamping & Cloisonne Enamel: Police shields, sheriff stars, and fire department crosses are hydraulically domed after flat stamping to hug uniform pockets cleanly.',
      'Heavy-Duty Uniform Hardware: Backed with reinforced heavy safety-catch pins, dual clutch posts for cap badges, recessed genuine leather belt clips, or clothing-safe neodymium bar magnets.',
      'Custom Badge Serialization & Institutional Verification: Each badge can be stamped or laser-engraved with unique officer/guard ID numbers (e.g., 001–500) with official department or company verification.'
    ],
    faqs: [
      {
        question: 'How are 3D curved police and security shield badges manufactured?',
        answer: 'First, solid brass or thick zinc alloy blanks are struck with multi-level 3D relief dies and filled with stone-polished hard enamel. Next, a curved forming die applies a smooth cylindrical dome curvature so the finished badge sits flush against uniform shirts and leather holders.'
      },
      {
        question: 'Can we order custom recessed genuine leather belt-clip holders matched to our badge shape?',
        answer: 'Yes. We die-cut top-grain cowhide belt holders specifically matched to your exact shield, oval, or star outline—equipped with tempered steel belt clips and optional neck bead chains.'
      },
      {
        question: 'Can each security or police chest badge carry an individual serial number?',
        answer: 'Yes. We provide recessed bottom banners or rear panels on our badge molds for crisp rotary-engraved or fiber-laser officer badge numbers at +$0.25/pc.'
      },
      {
        question: 'What sizes are standard for full-size chest badges vs. miniature hat and collar badges?',
        answer: 'Full-size uniform chest badges typically measure 2.5" to 3.25" (63–82mm) tall with a heavy soldered safety catch. Matching miniature hat, wallet, or collar badges measure 1.0" to 1.5" with dual military clutch posts.'
      },
      {
        question: 'Do you require authorization before producing official law enforcement or government badges?',
        answer: 'Yes. Orders replicating official municipal, state, or federal law enforcement agencies require an official department purchase order or signed authorization letter from the ordering agency.'
      },
      {
        question: 'How do embossed 304 stainless steel military dog tags differ from 3D zinc dog tags?',
        answer: 'Embossed dog tags use authentic 0.4mm rolled-edge 304 matte or shiny stainless steel blanks pressed with up to 5 lines of raised text, paired with rubber silencer rings and 24" #3 ball chains. 3D zinc dog tags cast thick sculpted logos or cut-outs in zinc alloy for streetwear and clubs.'
      },
      {
        question: 'Are your magnetic metal employee name plates safe for hospitality and airline uniforms?',
        answer: 'Yes. Our triple-magnet neodymium name badge bars hold securely through thick wool blazers and chef jackets without poking pinholes. Window-slot reusable name plates allow staff turnover updates at zero ongoing badge cost.'
      },
      {
        question: 'What is the minimum order quantity for custom Sports Championship Rings?',
        answer: 'Custom 3D zinc alloy tournament rings featuring cubic zirconia stones, soft enamel borders, and custom side-panel engraving start at 50 pcs MOQ across standard US ring sizes 7 through 13.'
      },
      {
        question: 'What finishes are most durable for outdoor security and patrol badges?',
        answer: 'Two-tone rhodium silver + 18K gold electroplating over solid brass with clear protective lacquer provides high tarnish and weather resistance during daily outdoor shifts.'
      },
      {
        question: 'What is the production lead time for curved police badges and championship rings?',
        answer: 'Complex 3D curved badges and stone-set championship rings require 12–15 business days after artwork proof approval (10–12 days for dog tags and employee name plates).'
      }
    ]
  },
  {
    slug: 'executive-cufflinks-tie-bars',
    number: 7,
    group: 'cross',
    name: 'Executive Cufflinks, Tie Bars & Heavy Belt Buckles',
    shortName: 'Executive & Buckles',
    subLabel: 'Brass Cufflinks, Tie Clips, Money Clips & 3D Western/Club Belt Buckles',
    badge: 'Category #7 · 14 Menswear & Buckle Styles',
    skuCount: 14,
    priceRangeUsd: '$0.68 – $6.80',
    moq: '50 pcs / pairs',
    leadTime: '10–14 Days',
    toolingNote: '$55–$130 Custom Die (Waived @ 500–1K+)',
    targetKeywords: 'custom enamel cufflinks wholesale, branded tie bars manufacturer, cufflink tie bar gift sets, custom 3d belt buckles bulk, western rodeo trophy buckle, brass money clips',
    heroSubtitle: '14 high-margin menswear and heavy buckle lines designed for corporate executive gifting, alumni associations, financial firms, western rodeos, and motorcycle clubs—covering solid brass hard-enamel cufflinks, matching velvet-boxed tie bar gift sets, spring money clips, and heavy 4"×3" 3D sculpted zinc belt buckles.',
    geoDirectAnswer: 'MedalPinSupply crafts 14 executive menswear and heavy metal menswear & buckle styles starting at just 50 pairs or 50 pcs MOQ. Lineups span solid brass cloisonne cufflinks ($1.75–$3.60/pair), alligator/slide tie bars ($0.85–$2.10/pc), boxed cufflink & tie clip gift sets ($3.65–$6.80/set), tension money clips ($1.10–$2.45/pc), and oversized 3D rodeo, military, or biker belt buckles ($2.45–$5.80/pc).',
    engineeringHighlights: [
      'Jewelry-Grade Rhodium & 18K Gold Plating: Brass cufflinks, tie bars, and money clips undergo multi-stage vibratory barrel polishing and fine precious-metal electroplating for mirror luxury luster.',
      'Heavy-Duty Western & Club Belt Buckles: Cast in solid 120g–180g Zamak #3 zinc alloy fit for standard 1.5" to 1.75" snap belts, with rear D-loops, prong hooks, and optional functional bottle openers.',
      'Executive Gift Set Assembly: Seamlessly pair custom cufflinks and matching tie bars inside custom foil-stamped velvet or leatherette presentation boxes ready for boardroom gifting.'
    ],
    faqs: [
      {
        question: 'What base metal and toggle hardware do your custom cufflinks use?',
        answer: 'Our cufflinks are stamped or cast in solid brass/zinc alloy and soldered to heavy-duty swivel whaleback (bullet-back) toggles plated in matching rhodium, silver, or gold.'
      },
      {
        question: 'Can we order a matched Cufflink + Tie Bar Executive Gift Set at 50 sets MOQ?',
        answer: 'Yes. At 50 sets MOQ, we combine one pair of your custom-logo cufflinks and one matching 55mm/60mm tie bar inside a custom die-cut foam velvet or leatherette gift box—and we can foil-stamp your brand logo on the inside box lid.'
      },
      {
        question: 'What is the difference between Alligator-Clip Tie Bars and Slide-On Tie Clips?',
        answer: 'Alligator-clip tie bars use a hidden spring hinge with soft serrated teeth for thick silk neckties and hold a soldered custom enamel emblem. Slide-on clips are sleek single-piece brass bars ideal for minimalist laser engraving and skinny ties.'
      },
      {
        question: 'What belt widths do your 3D Western and Biker Belt Buckles fit?',
        answer: 'Our standard rear zinc buckle bail loop accommodates all 1.5-inch (38mm) and 1.75-inch (45mm) snap leather belts. Standard western oval/rectangular trophy buckles measure 3.5"×2.5" up to oversized 4.25"×3.25".'
      },
      {
        question: 'Can trophy belt buckles have engraved competition dates, division titles, or winner names?',
        answer: 'Yes. Trophy buckles for rodeos, equestrian events, and shooting tournaments feature smooth recessed banner ribbons where we can stamp or laser-engrave Champion, Reserve Champion, event year, and category names.'
      },
      {
        question: 'How do Bottle-Opener Belt Buckles stay strong under leverage?',
        answer: 'Bottle-opener belt buckles cast a thickened 5.5mm high-density Zamak #3 rim cutout around the bottle-cap pry lip so the buckle resists bending even after years of heavy event use.'
      },
      {
        question: 'Are Laser-Engraved Silver Cufflinks and Slide Tie Clips eligible for bulk tooling waivers?',
        answer: 'Yes! Custom crest and laser tooling setups ($55 USD) on brass/stainless cufflinks and 55mm tie clips are waived 100% automatically at 500+ pcs and stored free for 3 years for zero-fee corporate reorders.'
      },
      {
        question: 'How do your Brass & Stainless Steel Money Clips retain tension over time?',
        answer: 'We form money clips from spring-tempered C26000 brass or 301/304 spring stainless steel so the jaw holds 15–20 folded bills or credit cards snugly without permanent spreading.'
      },
      {
        question: 'Which enamel type is best for luxury corporate cufflinks?',
        answer: 'We recommend Cloisonne / Hard Enamel because its stone-polished flat surface mimics fine jewelry cloisonne and collects zero pocket lint.'
      },
      {
        question: 'How are executive cufflinks and belt buckles packed for safe export shipping?',
        answer: 'Each belt buckle is wrapped in anti-tarnish tissue inside an individual zip polybag; cufflinks and tie sets are individually bagged or nestled inside slotted velvet gift boxes.'
      }
    ]
  },
  {
    slug: 'custom-golf-accessories',
    number: 8,
    group: 'cross',
    name: 'Custom Golf Divot Tools & Magnetic Ball Markers',
    shortName: 'Golf Accessories',
    subLabel: 'Magnetic Divot Forks, Switchblade Tools, Hat Clips & Poker Chip Markers',
    badge: 'Category #8 · 10 Golf Tournament Styles',
    skuCount: 10,
    priceRangeUsd: '$0.48 – $4.85',
    moq: '100 pcs / sets',
    leadTime: '10–14 Days',
    toolingNote: '$55–$95 Custom Die (Waived @ 500+ pcs)',
    targetKeywords: 'custom golf divot tools wholesale, magnetic golf ball markers bulk, custom golf hat clip, switchblade divot tool logo, poker chip golf ball marker, golf tournament gift sets',
    heroSubtitle: '10 high-margin golf tournament and pro-shop favorites—covering magnetic 2-prong zinc divot repair tools, push-button spring switchblade forks, spring-steel visor hat clips, heavy die-struck antique brass ball markers, 40mm weighted poker chip markers, bottle-opener divot combos, leather-strapped metal bag tags, and windowed tin tournament gift sets.',
    geoDirectAnswer: 'MedalPinSupply produces 10 specialized golf golf accessory styles at 100 pcs MOQ. Product lines include magnetic zinc divot tools ($1.08–$2.35/pc), folding switchblade repair tools ($1.85–$3.65/pc), visor hat-clip ball marker sets ($0.68–$1.65/pc), die-struck antique brass ball markers ($0.58–$1.45/pc), 40mm metal poker chip markers ($0.95–$2.15/pc), and turnkey windowed tin tournament gift sets ($2.55–$4.85/set).',
    engineeringHighlights: [
      'Modular 25mm Magnetic Marker Tooling ($55 Die, Waived @ 500+): Customize your 25mm removable magnetic ball marker mounted onto ergonomic divot tools and hat-clip bodies—or cast a 100% bespoke fork silhouette.',
      'High-Hold Recessed Neodymium Magnets: Every divot tool and visor hat clip features an embedded nickel-plated neodymium disc magnet that locks the steel/iron ball marker securely even during vigorous swings.',
      'Tournament Gift Tin Packaging: Combine 1 magnetic divot tool + 1 hat clip + 2 custom ball markers inside a foam-fitted windowed metal tin ready for player welcome bags.'
    ],
    faqs: [
      {
        question: 'How do custom die fees work on golf divot tools and magnetic ball markers?',
        answer: 'Custom 25mm magnetic ball marker dies ($55) and fork/clip tooling ($55–$95) are waived 100% automatically at 500+ pcs per design and stored free for 3 years for zero-fee tournament reorders.'
      },
      {
        question: 'Why must golf ball markers be stamped from iron rather than brass when used with magnetic divot tools?',
        answer: 'Solid brass and zinc alloy are non-magnetic, whereas stamped iron is ferromagnetic and snaps cleanly onto the neodymium magnet recessed inside divot forks and hat clips. For antique brass ball markers, we use brass-plated iron so they stick magnetically while looking like solid aged brass.'
      },
      {
        question: 'How does the Switchblade Folding Golf Divot Tool work?',
        answer: 'Switchblade divot tools house spring-loaded aluminum or stainless steel repair prongs inside a sleek ergonomic handle. Pressing the release button flips the fork open smoothly with one hand, while the 25mm magnetic ball marker locks onto the top bezel.'
      },
      {
        question: 'What is a Heavy Metal Poker Chip Golf Ball Marker?',
        answer: 'Heavy metal poker chip markers are oversized 40mm × 3.2mm weighted clay-composite or all-metal casino chip featuring a removable 25mm magnetic metal center ball marker engraved or enameled with your tournament logo.'
      },
      {
        question: 'What goes inside the Golf Tournament Tin Gift Set?',
        answer: 'Our standard tournament tin (115×85×22mm with clear viewing window and die-cut EVA tray) holds 1 magnetic divot tool, 1 visor hat clip, and 2 Pantone-matched ball markers, with optional foil or full-color lid printing.'
      },
      {
        question: 'What hardware is included on Metal Golf Bag Tags?',
        answer: 'Each 3"–3.5" heavy die-cast metal bag tag ships with a heavy-duty black or brown stitched leather buckle strap (plus optional rear player name/phone laser engraving).'
      },
      {
        question: 'Can we use full-color photographic or gradient sponsor logos on ball markers?',
        answer: 'Yes. Full-color CMYK printing sealed under a clear optical epoxy dome reproduces intricate sponsor gradients and multi-color tournament crests cleanly on 25mm–30mm ball markers (plate setup waived at 500+ pcs).'
      },
      {
        question: 'How are Alignment Stencil Divot Tools used on the green?',
        answer: 'The wide U-channel cutout along the handle edge fits cleanly over a standard 42.67mm golf ball so players can mark a straight putt-alignment line with a Sharpie right on the course.'
      },
      {
        question: 'What is the minimum order quantity and production time for charity golf tournaments?',
        answer: 'MOQ is 100 pcs or 100 boxed sets. Digital artwork proofs ship within 12 hours, and bulk production finishes in 10–14 business days—keeping you well ahead of tee-off.'
      },
      {
        question: 'Can you provide individual velvet pouches or polybags for club pro-shop retail?',
        answer: 'Yes. Individual units ship in protective polybags or optional drawstring velvet pouches with custom printed barcode hangtags for resort pro shops.'
      }
    ]
  },
  {
    slug: 'metal-bookmarks-openers-souvenirs',
    number: 9,
    group: 'cross',
    name: 'Custom Metal Bookmarks, Openers & Souvenirs',
    shortName: 'Bookmarks & Openers',
    subLabel: 'Photo-Etched Brass Bookmarks, Brewery Openers, Bag Charms & Spoons',
    badge: 'Category #9 · 10 Cultural & Promo Styles',
    skuCount: 10,
    priceRangeUsd: '$0.32 – $2.45',
    moq: '100 – 200 pcs',
    leadTime: '7–14 Days',
    toolingNote: '$45–$115 Custom Mold (Waived @ 500–1K+)',
    targetKeywords: 'photo etched brass bookmarks wholesale, custom museum metal bookmarks, brewery zinc bottle openers bulk, custom metal zipper pulls, foldable bag hangers',
    heroSubtitle: '10 high-margin cultural museum, craft brewery, apparel hardware, and tourist attraction products—spanning 0.4mm intricate photo-etched hollow gold brass bookmarks with silk tassels, heavy 3D zinc alloy brewery bottle openers, credit-card stainless openers, bartender speed blades, collector souvenir spoons, custom logo zipper pulls, luxury bag charms, and foldable purse table hangers.',
    geoDirectAnswer: 'MedalPinSupply manufactures 10 cultural, hospitality, and retail souvenir craft styles covering 0.4mm–0.5mm photo-etched hollow brass bookmarks ($0.56–$1.85/pc), heavy 4mm zinc alloy and 304 stainless brewery bottle openers ($0.39–$2.45/pc), souvenir spoons ($0.68–$1.65/pc), custom metal zipper pulls & bag charms ($0.32–$1.95/pc), and foldable handbag hooks ($0.95–$2.25/pc)—plus a dedicated 10-style Custom Metal Fridge Magnets line.',
    engineeringHighlights: [
      'Architectural Filigree Photo-Etching: Chemical acid-etching carves razor-sharp filigree cutouts, botanical leaves, and stained-glass museum motifs through 0.4mm solid brass without sharp stamping burrs.',
      'Heavy-Duty Brewery & Hospitality Tooling: 4mm thick Zamak #3 bottle openers and 1.5mm brushed 304 stainless speed-rail or credit-card openers handle thousands of cap pops without bending.',
      'Modern Apparel & Retail Hardware Upgrades: Upgraded zipper pulls and polished hard-enamel bag charms serve fashion brands, luggage lines, and gift shops.'
    ],
    faqs: [
      {
        question: 'How thin are Photo-Etched Brass Bookmarks and do they damage book spines?',
        answer: 'We etch solid brass sheets at 0.4mm to 0.5mm thickness—thin enough to rest flat between book pages without creasing spines, yet springy enough to resist bending. All cut-out edges undergo vibratory tumble-deburring for silky-smooth finger handling.'
      },
      {
        question: 'Can we include silk tassels and custom printed display cards with metal bookmarks?',
        answer: 'Yes. You can choose from 20+ Pantone-coordinated silk tassels or braided cords attached through a top eyelet, and mount each bookmark onto custom 350gsm museum backing cards inside clear cello sleeves.'
      },
      {
        question: 'What thickness is required so Zinc Alloy Bottle Openers do not bend when opening caps?',
        answer: 'Custom shaped zinc alloy bottle openers are cast at 3.8mm to 4.5mm structural thickness around the pry lip—and for high-leverage bar service we reinforce the pry tab or offer 1.5mm–2.0mm hardened 304 stainless steel speed openers.'
      },
      {
        question: 'How strong are the magnets on 3D Metal Souvenir Fridge Magnets and Magnetic Openers?',
        answer: 'Lighter 3D zinc fridge magnets use flush-mounted heavy ceramic ferrite or thin neodymium discs capable of holding 5–8 sheets of paper. Heavy magnetic bottle openers embed recessed N45 neodymium magnets so the opener sticks firmly to commercial refrigerators.'
      },
      {
        question: 'Can tourist attractions order custom 3D city landmark fridge magnets and souvenir spoons together?',
        answer: 'Yes! Gift shops frequently reuse the same custom 25mm emblem die across both souvenir tea spoons and matching keychains or fridge magnets to amortize mold tooling across multiple custom retail formats.'
      },
      {
        question: 'What clasps are available for Custom Metal Zipper Pulls and Bag Charms?',
        answer: 'Zipper pulls ship with standard 10mm swivel snap hooks or horseshoe D-shackles engineered for quick attachment to existing jacket and backpack sliders. Luxury purse bag charms upgrade to heavy spring-gate O-rings and swivel lobster clasps.'
      },
      {
        question: 'How much weight can Foldable Metal Purse Table Hangers support?',
        answer: 'Engineered with articulated zinc alloy hinge links and a high-friction non-slip rubber base pad, foldable purse table hangers safely suspend handbags and laptop totes weighing up to 5 kg (11 lbs) from café and restaurant tables.'
      },
      {
        question: 'Are Credit-Card Stainless Bottle Openers available with zero mold fees?',
        answer: 'Yes. Our 85.5 × 54 × 1.5mm matte black, brushed steel, and gold stainless credit-card opener blanks are customized via permanent fiber laser engraving at 200 pcs MOQ ($45 setup waived @ 500+ pcs).'
      },
      {
        question: 'Can photo-etched brass bookmarks include colored enamel accents?',
        answer: 'Yes. Soft enamel museum bookmarks combine precision photo-etched recessed areas filled with vibrant Pantone soft enamel—ideal for museum masterpieces, stained-glass motifs, and university crests.'
      },
      {
        question: 'What is the standard lead time for custom bookmarks, openers, and souvenir hardware?',
        answer: 'Custom bookmarks, openers, and zipper pulls ship in 7–14 business days after 12-hour digital artwork proof sign-off (MOQ 100–200 pcs).'
      }
    ]
  },
  {
    slug: 'patches-pvc-packaging',
    number: 10,
    group: 'cross',
    name: 'Custom Patches, Soft PVC & Presentation Packaging',
    shortName: 'Patches, PVC & Boxes',
    subLabel: 'Embroidered, Bullion Wire & Woven Patches, 3D Soft PVC & Gift Boxes',
    badge: 'Category #10 · 10 Complementary & Packaging Styles',
    skuCount: 10,
    priceRangeUsd: '$0.11 – $4.50',
    moq: '50 – 200 pcs',
    leadTime: '7–14 Days',
    toolingNote: '$35–$75 Setup & Mold (Waived @ 300–1K+)',
    targetKeywords: 'custom embroidered patches wholesale, bullion wire blazer crest patches, woven logo patches, 3d soft pvc keychains bulk, pvc morale patches, velvet medal coin boxes, pin backing cards',
    heroSubtitle: '10 essential textile, polymer, and retail presentation lines completing your custom merch program—covering 50%–100% embroidered patches, hand-stitched gold/silver bullion wire blazer crests, high-density woven patches, eco-friendly 3D soft PVC keychains, morale patches, coasters, velvet presentation boxes, acrylic coin capsules, printed pin backing cards, and luxury wooden award cases.',
    geoDirectAnswer: 'MedalPinSupply supplies 10 textile patch, soft PVC, and retail presentation patch & packaging styles. Uniform buyers can bundle embroidered patches ($0.48–$1.35/pc), bullion blazer crests ($2.35–$4.50/pc), woven patches ($0.42–$1.20/pc), and waterproof 3D soft PVC keychains/morale patches ($0.36–$1.55/pc) alongside metal orders—plus upgrade retail perception by 35%+ using custom printed pin backing cards ($0.11–$0.35), acrylic coin capsules ($0.16–$0.45), velvet presentation boxes ($0.88–$1.85), and deluxe award cases ($2.25–$4.20).',
    engineeringHighlights: [
      'Complete Uniform & Merch Consolidation: Bundle custom metal police/club pins with matching embroidered, woven, or Velcro-backed soft PVC tactical patches in one unified shipment.',
      'Non-Phthalate Eco-Friendly Soft PVC: Micro-injected 2D/3D soft PVC keychains, morale patches, and luggage tags/coasters are 100% waterproof, flexible, and CPSIA compliant.',
      'High-Margin Packaging Upsells: Transform bulk medals, coins, pins, and cufflinks into retail-ready gifts with custom 350gsm backing cards, crystal capsules, velvet boxes, and mahogany cases.'
    ],
    faqs: [
      {
        question: 'Should I choose Embroidered Patches or High-Density Woven Patches?',
        answer: 'Choose embroidered patches when you want classic raised thread texture and bold vector shapes (available in 50%, 75%, or 100% stitch coverage with merrowed borders). Choose woven patches when your design includes tiny text (<4mm), fine gradients, or ultra-detailed crests that thick embroidery threads cannot resolve.'
      },
      {
        question: 'What backing options are available for custom embroidered and woven patches?',
        answer: 'We offer 5 backings: heat-activated iron-on film, sew-on plain twill, hook-and-loop tactical Velcro (male + female), peel-and-stick 3M adhesive for temporary event wear, and rigid plastic stabilizer.'
      },
      {
        question: 'What are Gold/Silver Bullion Wire Patches used for?',
        answer: 'Bullion wire crests are hand-embroidered using fine coiled metallic gold and silver bullion threads over navy/black wool felt—prized by yacht clubs, golf societies, Ivy League blazers, and military dress uniforms.'
      },
      {
        question: 'What is the advantage of 3D Soft PVC Keychains & Morale Patches over metal?',
        answer: 'Soft PVC is flexible, ultra-lightweight, waterproof, never scratches car paint or motorcycle tanks, and supports vivid multi-layer 3D sculpted characters at low unit cost ($0.36–$0.68/pc).'
      },
      {
        question: 'Can we order custom Velvet Presentation Boxes sized specifically for our medals, coins, or cufflinks?',
        answer: 'Yes. We manufacture flocked black, navy blue, and burgundy velvet hinge boxes fitted with custom die-cut EVA foam trays tailored to your exact medal diameter, challenge coin capsule, or cufflink pair—with optional metallic foil logo stamping inside the silk lid.'
      },
      {
        question: 'What coin sizes fit inside Clear Acrylic Coin Capsules?',
        answer: 'We supply custom-fitted snap-tight optical acrylic capsules in 38mm (1.5"), 40mm, 44.5mm (1.75"), and 50.8mm (2.0") inner diameters—and die-cut custom black EVA foam reducer rings for non-standard coin sizes, plus optional mini easel display stands.'
      },
      {
        question: 'Will you mount our custom enamel pins onto our Printed Retail Backing Cards before shipping?',
        answer: 'Yes! On all combined pin + backing card orders, our packing team pierces, attaches each pin with its butterfly/rubber clutch, and heat-seals or euro-slot polybags every card so inventory arrives 100% retail-ready.'
      },
      {
        question: 'Do you charge mold setup fees for Embroidered or Woven Patches?',
        answer: 'Digitized DST embroidery tapes and jacquard loom setups cost $35 (waived 100% at 300–500+ pcs), while PVC injection molds run $55–$75 (waived at 1,000–2,000+ pcs) and store free for 3 years.'
      },
      {
        question: 'What are Leatherette & Wooden Deluxe Award Cases used for?',
        answer: 'Deluxe wooden & leatherette award cases use lacquered mahogany wood or stitched PU leatherette hinge boxes with satin linings to house VIP marathon medals, corporate retirement coins, and institutional police awards.'
      },
      {
        question: 'Can packaging items be ordered separately if we already manufactured our medals or pins elsewhere?',
        answer: 'Yes. You can order custom velvet boxes, wooden award cases, acrylic coin capsules, and printed backing cards standalone starting at 50–200 pcs MOQ.'
      }
    ]
  },
  {
    slug: 'custom-metal-fridge-magnets',
    number: 11,
    group: 'cross',
    name: 'Custom Metal Fridge Magnets',
    shortName: 'Fridge Magnets',
    subLabel: 'Hard & Soft Enamel, 3D Zinc, Kinetic Spinner, Stained Glass & Magnetic Openers',
    badge: 'Category #11 · 10 Custom Magnetic Craft Styles',
    skuCount: 10,
    priceRangeUsd: '$0.48 – $3.10',
    moq: '100 – 200 pcs',
    leadTime: '7–16 Days',
    toolingNote: '$55–$145 Custom Mold (Waived @ 500–1K+)',
    targetKeywords: 'custom metal fridge magnets wholesale, 3d die cast tourist souvenir magnets, hard enamel metal magnets, interactive spinner slider fridge magnets, neodymium magnetic bottle openers, museum shop metal magnets',
    heroSubtitle: '10 custom-tooled magnetic craft lines built for museum gift shops, national parks, craft breweries, and corporate campaigns—spanning kiln-cured hard enamel cloisonne, textured soft enamel, crystal epoxy litho print, 3D landmark zinc reliefs, rotating spinner & slider kinetic magnets, translucent stained-glass cut-outs, multi-layer riveted panoramas, antique bronze museum crests, glow-in-dark specialty fills, and recessed neodymium magnetic bottle openers.',
    geoDirectAnswer: 'MedalPinSupply custom-manufactures 10 metal fridge magnet architectures ($0.48–$3.10/pc EXW, 100–200 pcs MOQ) strictly to client artwork: smooth hard enamel cloisonne ($0.82–$1.95), tactile soft enamel ($0.58–$1.45), full-color offset epoxy-dome ($0.48–$1.25), interactive kinetic spinner/slider magnets ($1.28–$2.85), translucent stained-glass cut-outs ($1.02–$2.35), 3-layer riveted architectural panoramas ($1.42–$3.10), antique relief medallions ($0.92–$2.15), glow/glitter specialty fills ($0.78–$1.90), 3D landmark zinc reliefs ($0.72–$1.75), and magnetic bottle openers ($1.18–$2.65).',
    engineeringHighlights: [
      'Recessed Flush-Mount Magnet Hardware: Every heavy cast magnet hides its N35–N52 neodymium discs, sintered ferrite rings, or die-cut soft rubber backing inside a CNC-milled rear pocket with flush epoxy resin locking so magnets never detach or scratch stainless steel appliances.',
      'True Kinetic & Architectural Souvenir Engineering: Stand out in gift shops with smooth central rivet spinners, curved slider tracks, stained-glass translucent enamel windows, and stacked multi-plate city skyline panoramas.',
      'Retail-Ready Euro-Slot Backing & Anti-Scratch Film: Supplied on custom 350gsm–400gsm full-color foil-stamped cards or polybags pre-tested to US CPSIA (<90 ppm Pb), Prop 65, and EU EN71-3 chemical migration safety.'
    ],
    faqs: [
      {
        question: 'Should we choose Hard Enamel, Soft Enamel, or 3D Die-Cast Zinc for custom metal fridge magnets?',
        answer: 'Choose Hard Enamel (cloisonne) for crisp geometric logos and a smooth jewelry-grade glass-like face, Soft Enamel for intricate colorful coastal/nature crests with raised gold borders, and 3D Die-Cast Zamak #3 Zinc Alloy when historic castles, mountains, or sculptures require true multi-level relief height.'
      },
      {
        question: 'What magnet backing holds best without sliding down stainless steel refrigerators?',
        answer: 'For compact or heavy 3D zinc magnets (25–85g), we use high-pull N35–N52 nickel-plated neodymium discs recessed flush with industrial two-part epoxy—capable of pinning multiple heavy parchment sheets. For ultra-thin flat steel or soft-enamel shapes, we pair sintered ferrite discs or full-surface 1.5mm die-cut anisotropic rubber magnets that maximize friction and never mar brushed steel.'
      },
      {
        question: 'How do you stop recessed metal magnets from popping loose or scratching stainless steel doors?',
        answer: 'Instead of surface-gluing magnets directly onto flat alloy, our dies cast a 1.6mm–2.0mm deep circular pocket on the reverse face, lock the magnet inside with UV-cured structural resin, and add an optional clear PET/EVA micro-felt cushion ring or soft rubber backing pad.'
      },
      {
        question: 'When should souvenir buyers choose Epoxy-Dome Offset Printed Metal Magnets?',
        answer: 'Choose full-color litho offset + optically clear polyurethane epoxy dome when your artwork features photography, painterly gradients, oil paintings, or photorealistic national park posters that spot-color Pantone enamels cannot reproduce.'
      },
      {
        question: 'How do Interactive Spinner, Slider, and Multi-Layer 3D Stacked Fridge Magnets work?',
        answer: 'Interactive kinetic magnets combine two custom die-cast plates joined with precision stainless rivets or machined slide channels—allowing subway trains to glide past skylines, zodiac wheels to rotate, or stained-glass doors to swing open right on the customer’s refrigerator.'
      },
      {
        question: 'Can you cast Stained-Glass Translucent Enamel Cut-Out Magnets for cathedrals and museums?',
        answer: 'Yes. We cast hollow cut-out gothic arches or filigree windows and fill the open voids with stained-glass translucent resin enamel—creating stained-glass jewel tones backed cleanly by perimeter neodymium pockets so the transparent windows remain clear of opaque backing glue.'
      },
      {
        question: 'Are Magnetic Bottle Openers strong enough to pop crown caps and stick cleanly afterward?',
        answer: 'Yes. Our heavy 4mm Zamak #3 zinc alloy and 304 stainless magnetic openers embed dual recessed N52 neodymium magnets alongside hardened prying edges so they open glass beer bottles effortlessly and snap straight onto kegerators, fridges, or steel bar shelving.'
      },
      {
        question: 'What custom mold and setup fees apply to custom metal fridge magnets?',
        answer: '2D hard/soft enamel dies start at $55–$75 (waived 100% at 500+ pcs per shape), while multi-level 3D sculpted or kinetic multi-plate molds range $95–$145 (waived 100% at 1,000+ pcs) and are stored free in our Zhongshan mold vault for 3 years.'
      },
      {
        question: 'Can we share one outer magnet die across multiple city names or regional store designs?',
        answer: 'Yes. Museums and gift-shop distributors frequently share a common base border mold with interchangeable text inserts or silkscreened colorways/antique finishes to lower per-city tooling costs while ordering larger combined factory batches.'
      },
      {
        question: 'Are your metal fridge magnets tested for CPSIA and EU EN71-3 safety compliance?',
        answer: 'Yes. Every magnet uses virgin lead-free brass, stainless steel, or Zamak #3 (<90 ppm total lead) paired with EN71-3 certified pigments, sealed flush-mounted magnets, and optional bilingual safety warning stickers on retail backing cards.'
      }
    ]
  }
];

export const COLLECTION_BY_SLUG = Object.fromEntries(
  COLLECTIONS.map((c) => [c.slug, c])
);
