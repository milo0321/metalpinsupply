import type { SupportedLanguage } from './config';
import { useTranslations } from './utils';

export function getLocalizedPageFaqs(
  pageKey: 'home' | 'catalog' | 'branding' | 'packaging' | 'compliance' | 'about' | 'contact' | 'insights',
  defaultFaqs: { question: string; answer: string }[],
  lang: SupportedLanguage
): { question: string; answer: string }[] {
  if (lang === 'en') return defaultFaqs;
  const t = useTranslations(lang);
  const pcs = t('unit.pcs');
  const pc = t('unit.pc');

  return [
    {
      question: `1. ${t('pdp.declTitle')} — ${t('pdp.noMoldFee')}?`,
      answer: `${t('pdp.declQuote')}`
    },
    {
      question: `2. ${t('geo.metricBlankMoq')} & ${t('card.wholesale500')}?`,
      answer: `${t('geo.metricBlankMoqVal')} (${t('home.hero.kpi4Val')}/${pc}). ${t('catalog.lead')}`
    },
    {
      question: `3. ${t('brand.compTitle')}?`,
      answer: t('brand.geoAnswer')
    },
    {
      question: `4. ${t('pdp.orderSample')} & ${t('geo.metricLogoMoq')}?`,
      answer: `${t('geo.metricLogoMoqVal')}. ${t('pdp.opt4Desc')}. ${t('contact.subtitle')}`
    },
    {
      question: `5. ${t('catalog.materialLabel')} (Zamak #3 / Brass / Iron / PVC / Leather)?`,
      answer: `${t('catalog.matZinc')} · ${t('catalog.matStainless')} · ${t('catalog.matAluminum')} · ${t('catalog.matExotic')}.`
    },
    {
      question: `6. ${t('comp.heroTitle')}?`,
      answer: `${t('comp.geoAnswer')} (${t('pdp.trust1')} · ${t('pdp.trust2')}).`
    },
    {
      question: `7. ${t('pkg.heroTitle')}?`,
      answer: `${t('pkg.card1Title')} (+$0.12–$0.22/${pc}, MOQ 100 ${pcs}) · ${t('pkg.card2Title')} (+$0.15–$0.35/${pc}) · ${t('pkg.card3Title')} (+$0.85–$1.85/${pc}, MOQ 100 ${pcs}).`
    },
    {
      question: `8. ${t('home.section4.title')} & ${t('home.section5.title')}?`,
      answer: `${t('home.section4.sub')} ${t('home.section5.sub')}`
    },
    {
      question: `9. ${t('footer.trust4Title')} (${t('contact.hubLabel')})?`,
      answer: `${t('about.geoAnswer')} (${t('contact.hubVal')} · DDP Air / Ocean / EXW).`
    },
    {
      question: `10. ${t('contact.title')} (${pageKey.toUpperCase()})?`,
      answer: `${t('contact.formDesc')} WhatsApp: +86 187 5012 6315 · sales@medalpinsupply.com.`
    }
  ];
}

export function getBrandingTableData(lang: SupportedLanguage) {
  const t = useTranslations(lang);
  const pcs = t('unit.pcs');
  const pc = t('unit.pc');
  if (lang === 'en') {
    return {
      headers: [
        'Manufacturing Specification',
        '1. Cloisonne / Hard Enamel (Jewelry Finish)',
        '2. Die-Struck Soft Enamel (Best Value & Relief)',
        '3. 3D Sculpted Zinc Die-Casting',
        '4. Photo-Etched / CMYK Offset + Epoxy'
      ],
      rows: [
        [
          'Best Application',
          'Executive corporate pins, luxury collector badges, official medallions',
          'Club pins, event pins, retail pin lines, challenge coins with vivid color',
          'Marathon 3D medals, police shields, heavy belt buckles, mascot keychains',
          'Gradients, photographic portraits, intricate ultra-fine heraldry'
        ],
        [
          'Base Alloy Substrate',
          'Die-struck copper or brass',
          'Die-struck iron, brass, or copper',
          'Hot-chamber Zamak #3 zinc alloy',
          '0.8–1.0mm etched brass / aluminum / stainless steel'
        ],
        [
          'Surface Tactile Profile',
          'Flush-ground glass-smooth level surface (stone polished)',
          'Raised metal borders framing recessed Pantone enamel wells',
          'Multi-level contoured 3D sculpture (optional enamel fill)',
          'Flat hairline photo-etched edge or smooth crystal epoxy lens dome'
        ],
        [
          'Minimum Order Quantity (MOQ)',
          '50 pcs per design',
          '50 – 100 pcs per design',
          '50 – 100 pcs per design',
          '100 pcs per design'
        ],
        [
          'Custom Die / Mold Tooling Fee',
          '$55 – $85 (Waived at 500+ pcs)',
          '$55 – $85 (Waived at 500+ pcs)',
          '$95 – $150 (Waived at 1,000+ pcs)',
          '$45 – $65 (Minimal film/etch setup)'
        ],
        [
          'Digital Proof & Bulk Lead Time',
          '12h free proof · 9–12 business days',
          '12h free proof · 7–10 business days',
          '12h free proof · 10–15 business days',
          '12h free proof · 7–10 business days'
        ],
        [
          'Key Process Strengths',
          'Flush-ground jewelry finish, 0.15mm border lines',
          'Tactile recessed enamel wells, vivid Pantone fill',
          'Multi-level 3D sculpting, hollow cut-outs, spinners',
          'Microscopic detail, gradients & photographic art'
        ]
      ]
    };
  }
  return {
    headers: [
      t('pdp.specColParam'),
      '1. Hard Enamel (Cloisonne)',
      '2. Soft Enamel (Die-Struck)',
      '3. 3D Zinc Die-Cast',
      '4. Photo-Etched / CMYK Offset'
    ],
    rows: [
      [t('col.thMaterial'), `${t('catalog.matStainless')}`, `${t('catalog.matStainless')} / ${t('catalog.matAluminum')}`, `${t('catalog.matZinc')}`, `${t('catalog.matStainless')} / ${t('catalog.matAluminum')}`],
      [t('pdp.blankMoq'), `50 ${pcs}`, `50 – 100 ${pcs}`, `50 – 100 ${pcs}`, `100 ${pcs}`],
      [t('col.thLogo'), `$55–$85 (Free ≥ 500 ${pcs})`, `$55–$85 (Free ≥ 500 ${pcs})`, `$95–$150 (Free ≥ 1,000 ${pcs})`, `$45–$65`],
      [t('pdp.trialBatch'), `$0.42–$1.85 / ${pc}`, `$0.22–$1.25 / ${pc}`, `$0.65–$3.85 / ${pc}`, `$0.18–$0.95 / ${pc}`],
      [t('col.stat4Label'), '12h Proof · 9–12d', '12h Proof · 7–10d', '12h Proof · 10–15d', '12h Proof · 7–10d']
    ]
  };
}

export function getPackagingBullets(lang: SupportedLanguage) {
  const t = useTranslations(lang);
  const pc = t('unit.pc');
  const pcs = t('unit.pcs');
  if (lang === 'en') {
    return {
      price1: '+$0.12–$0.22 / pc · MOQ 100',
      bullets1: [
        '✓ Heavy 400gsm Matte or Gloss Paper Card',
        '✓ Double-Sided CMYK Print + Optional Gold Foil',
        '✓ Pin Mounted & Sealed in Euro-Slot OPP Bag'
      ],
      price2: '+$0.15–$0.35 / pc · 38–60mm Fit',
      bullets2: [
        '✓ Optical Virgin Polystyrene (Zero PVC Yellowing)',
        '✓ Precision 38mm–60mm Fit + Black Foam Ring',
        '✓ Scratch-Proof Edge Protection for Coins & Trolley Tokens'
      ],
      price3: '+$0.85–$1.85 / pc · MOQ 100',
      bullets3: [
        '✓ Hinged Velvet Clamshell or Leatherette Case',
        '✓ Metallic Hot-Foil Lid Logo Stamping',
        '✓ Custom Die-Cut Foam Cradle for Coins, Medals & Cufflinks'
      ]
    };
  }
  return {
    price1: `+$0.12–$0.22 / ${pc} · MOQ 100 ${pcs}`,
    bullets1: [`✓ ${t('pkg.card1Title')}`, `✓ ${t('pdp.trust3')}`, `✓ Euro-Slot OPP Bag`],
    price2: `+$0.15–$0.35 / ${pc} · 38–60mm`,
    bullets2: [`✓ ${t('pkg.card2Title')}`, `✓ 38mm–60mm EVA Ring`, `✓ ${t('pdp.trust1')}`],
    price3: `+$0.85–$1.85 / ${pc} · MOQ 100 ${pcs}`,
    bullets3: [`✓ ${t('pkg.card3Title')}`, `✓ ${t('pdp.opt3Desc')}`, `✓ ${t('pdp.trust2')}`]
  };
}

export function getComplianceTableData(lang: SupportedLanguage) {
  const t = useTranslations(lang);
  if (lang === 'en') {
    return {
      headers: ['Compliance Layer', 'Foundry Material & Process Control', 'Verification Standard / Limit', 'Covered Product Lines'],
      rows: [
        [
          '1. Certified Lead-Free Base Ingots',
          'Certified virgin Zamak #3 zinc alloy (<0.005% lead), C26800 brass, copper, low-carbon iron, and 304 stainless steel.',
          'US CPSIA < 90 ppm Total Lead · CA Prop 65 Compliant',
          'All Custom Pins, Medals, Coins & Trolley Tokens'
        ],
        [
          '2. Non-Phthalate Pantone Enamels & Soft PVC',
          'RoHS-verified cloisonne hard enamel pastes, kiln-cured soft enamel pigments, optical epoxy dome resins, and phthalate-free PVC.',
          'EN71-3 Heavy Metal Migration · 6P/7P Phthalate-Free',
          'Enamel Pins, Soft PVC Patches, Keychains & Souvenirs'
        ],
        [
          '3. Nickel-Safe & Anti-Tarnish Electroplating',
          'Automated rack electroplating with optional nickel-free underplate, PVD coatings, and electrophoretic clear lacquer seals.',
          'EU REACH Annex XVII · EN 1811 Nickel Release (< 0.5 µg/cm²/wk)',
          'Cufflinks, Jewelry Pins, Military Insignia & Name Badges'
        ],
        [
          '4. Hardware Attachment Tensile & Breakaway Check',
          'Silver-soldered and ultrasonic-welded pin spurs, military butterfly clutches, M4/M5 screw posts, and breakaway marathon lanyard clasps.',
          'Pull-Force Verification (> 4.5 kg solder joint tensile integrity)',
          'Lapel Pins, Police Badges, Golf Tools & Youth Medals'
        ],
        [
          '5. 100% Cosmetic QC & Export Consolidation',
          'Pre-shipment inspection checking Pantone delta-E tolerances, smooth dome curing, ribbon stitching accuracy, and air/sea export carton labeling.',
          'SGS / Intertek Third-Party Lab Testing Ready · Global DDP',
          '100% of Custom Orders Across All 10 Craft Lines'
        ]
      ]
    };
  }
  return {
    headers: [t('pdp.specColParam'), t('pdp.specColVal'), t('geo.metricSafety'), t('nav.products')],
    rows: [
      [`1. ${t('pdp.trust1')}`, t('comp.geoAnswer'), 'US CPSIA < 90 ppm Pb · CA Prop 65', t('nav.allCatalog')],
      [`2. ${t('pdp.trust2')}`, `${t('about.card2Title')}: ${t('about.card2Desc')}`, 'EU REACH · EN71-3 · EN 1811 (< 0.5 µg/cm²/wk)', `${t('col.custom-enamel-pins.short')} · ${t('col.custom-medals.short')}`],
      [`3. ${t('col.thMagnet')}`, `${t('about.card3Title')}: ${t('about.card3Desc')}`, 'Solder Pull-Force > 4.5 kg · Breakaway Lanyard', `${t('col.police-badges-insignia.short')} · ${t('col.trolley-coin-keyrings.short')}`],
      [`4. ${t('pkg.heroTitle')}`, `${t('pkg.geoAnswer')}`, 'SGS / Intertek Lab Ready · DDP Air & Ocean', t('col.patches-pvc-packaging.short')]
    ]
  };
}

export function getAboutTableData(lang: SupportedLanguage) {
  const t = useTranslations(lang);
  if (lang === 'en') {
    return {
      col1: 'Foundry Dimension',
      col2: 'Zhongshan Xiaolan Metal Craft Manufacturing Standard',
      row1Label: 'Custom-To-Order Tooling Policy (150 Craft Specs)',
      row1Val: '100% custom-tooled from buyer artwork · Custom 2D dies ($45–$85) waived at 500+ pcs; 3D medal/coin molds ($95–$150) waived at 1,000+ pcs; Free 3-year die storage for $0 reorders',
      row2Label: 'Equipment & Compliance Stack',
      row2Val: 'CNC steel die carving, 300T–800T stamping presses, hot-chamber Zamak #3 die-casting, kiln enamel curing, 12 plating finishes, CPSIA/EN71-3/REACH'
    };
  }
  return {
    col1: t('pdp.specColParam'),
    col2: t('pdp.specColVal'),
    row1Label: t('about.heroBadge'),
    row1Val: `${t('pdp.declQuote')}`,
    row2Label: `${t('about.card1Title')} & ${t('about.card2Title')}`,
    row2Val: `${t('about.geoAnswer')}`
  };
}
