import type { SupportedLanguage } from './config';
import { useTranslations, getLocalizedPath } from './utils';
import { localizeTitle, localizeMaterial, localizeHardwareOrMagnets, localizeColors } from './productLocalization';

const INSIGHT_CATEGORIES: Record<string, Record<SupportedLanguage, string>> = {
  "Materials & Manufacturing": {
    "en": "Materials & Manufacturing",
    "de": "Werkstoffe & Prägetechnik",
    "fr": "Matériaux & Fabrication",
    "nl": "Materialen & Productie",
    "es": "Materiales y Fabricación",
    "it": "Materiali e Produzione",
    "pt": "Materiais e Fabrico",
    "sv": "Material & Tillverkning",
    "da": "Materialer & Produktion",
    "no": "Materialer & Produksjon",
    "fi": "Materiaalit & Valmistus",
    "pl": "Materiały i Produkcja",
    "cs": "Materiály a Výroba",
    "ru": "Материалы и производство",
    "ja": "素材・製造プロセス工学",
    "ko": "소재 및 제조 공법",
    "id": "Material & Manufaktur",
    "ar": "المواد والتصنيع المعدني"
  },
  "Medals & Sports Events": {
    "en": "Medals & Sports Events",
    "de": "Medaillen & Sportevents",
    "fr": "Médailles & Événements Sportifs",
    "nl": "Medailles & Sportevenementen",
    "es": "Medallas y Eventos Deportivos",
    "it": "Medaglie ed Eventi Sportivi",
    "pt": "Medalhas e Eventos Desportivos",
    "sv": "Medaljer & Idrottsevenemang",
    "da": "Medaljer & Sportsevents",
    "no": "Medaljer & Idrettsarrangementer",
    "fi": "Mitalit & Urheilutapahtumat",
    "pl": "Medale i Imprezy Sportowe",
    "cs": "Medaile a Sportovní Akce",
    "ru": "Медали и спортивные события",
    "ja": "マラソンメダル・スポーツ大会",
    "ko": "마라톤 메달 및 스포츠 행사",
    "id": "Medali & Acara Olahraga",
    "ar": "الميداليات والفعاليات الرياضية"
  },
  "Coins & Military Insignia": {
    "en": "Coins & Military Insignia",
    "de": "Coins & Dienstabzeichen",
    "fr": "Pièces Challenge & Insignes",
    "nl": "Munten & Dienstinsignes",
    "es": "Monedas e Insignias Oficiales",
    "it": "Monete e Distintivi Militari",
    "pt": "Moedas e Distintivos Oficiais",
    "sv": "Challenge Coins & Tjänstetecken",
    "da": "Challenge Coins & Insignia",
    "no": "Challenge Coins & Merker",
    "fi": "Kolikot & Virkamerkit",
    "pl": "Monety i Odznaki Służb",
    "cs": "Challenge Mince a Odznaky Sborů",
    "ru": "Монеты Challenge и знаки служб",
    "ja": "コイン・警察/軍用インシグニア",
    "ko": "챌린지 코인 및 관공서 배지",
    "id": "Koin Challenge & Insignia Resmi",
    "ar": "العملات التذكارية والشارات العسكرية"
  },
  "Keychains & Trolley Coins": {
    "en": "Keychains & Trolley Coins",
    "de": "Schlüsselanhänger & Einkaufswagenchips",
    "fr": "Porte-Clés & Jetons Caddie",
    "nl": "Sleutelhangers & Winkelmunten",
    "es": "Llaveros y Fichas de Carro",
    "it": "Portachiavi e Gettoni Carrello",
    "pt": "Porta-Chaves e Fichas de Carrinho",
    "sv": "Nyckelringar & Kundvagnspolletter",
    "da": "Nøgleringe & Indkøbsvognspoletter",
    "no": "Nøkkelringer & Handlevognmynter",
    "fi": "Avaimenperät & Ostoskärrypoletit",
    "pl": "Breloki i Żetony Sklepowe",
    "cs": "Klíčenky a Žetony do Vozíku",
    "ru": "Брелоки и жетоны для тележек",
    "ja": "キーホルダー・€1/£1カートコイン",
    "ko": "키링 및 유럽 €1·£1 트롤리 코인",
    "id": "Gantungan Kunci & Koin Troli",
    "ar": "ميداليات المفاتيح وعملات التسوق"
  },
  "Executive, Golf & Souvenirs": {
    "en": "Executive, Golf & Souvenirs",
    "de": "Business, Golf & Souvenirs",
    "fr": "Affaires, Golf & Souvenirs",
    "nl": "Zakelijk, Golf & Souvenirs",
    "es": "Ejecutivo, Golf y Souvenirs",
    "it": "Regali Aziendali, Golf e Souvenir",
    "pt": "Executivo, Golfe e Lembranças",
    "sv": "Företagsgåvor, Golf & Souvenirer",
    "da": "Erhverv, Golf & Souvenirs",
    "no": "Bedrift, Golf & Suvenirer",
    "fi": "Liikelahjat, Golf & Matkamuistot",
    "pl": "Biznes, Golf i Pamiątki",
    "cs": "Manažerské Dárky, Golf a Suvenýry",
    "ru": "Бизнес-сувениры, Гольф и Подарки",
    "ja": "ギフト・ゴルフ・観光記念品",
    "ko": "비즈니스 기프트 · 골프 · 기념품",
    "id": "Hadiah Eksekutif, Golf & Suvenir",
    "ar": "الهدايا التنفيذية والجولف والتذكارات"
  },
  "Sourcing, Packaging & Compliance": {
    "en": "Sourcing, Packaging & Compliance",
    "de": "Beschaffung, Verpackung & Sicherheit",
    "fr": "Sourcing, Packaging & Normes",
    "nl": "Inkoop, Verpakking & Compliance",
    "es": "Sourcing, Empaque y Normativa",
    "it": "Sourcing, Packaging e Normative",
    "pt": "Sourcing, Embalagem e Conformidade",
    "sv": "Inköp, Förpackning & Regler",
    "da": "Indkøb, Emballage & Overholdelse",
    "no": "Innkjøp, Emballasje & Samsvar",
    "fi": "Hankinta, Pakkaus & Standardit",
    "pl": "Zakupy, Opakowania i Normy",
    "cs": "Nákup, Balení a Certifikace",
    "ru": "Закупки, упаковка и сертификация",
    "ja": "工場調達・パッケージ・安全認証",
    "ko": "공장 소싱 · 패키징 · 안전 인증",
    "id": "Sourcing, Kemasan & Kepatuhan",
    "ar": "التوريد والتغليف ومعايير السلامة"
  }
};

const INSIGHT_META_ALL: Record<string, Record<SupportedLanguage, { title: string; summary: string }>> = {
  "3d-relief-sculpting-vs-2d-multi-level-die-casting-mold-engineering": {
    "en": {
      "title": "True 3D Relief Sculpting vs. 2D Multi-Level Die-Casting: Mold Engraving & Shading Engineering",
      "summary": "Understand how CNC 3D Z-axis sculpting differs from stepped 2D metal layers on custom marathon medals, challenge coins, and western belt buckles."
    },
    "de": {
      "title": "3D-Reliefgravur vs. 2D-Stufendruckguss",
      "summary": "3D-Reliefgravur vs. 2D-Stufendruckguss (Werkstoffe & Prägetechnik) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Sculpture 3D vs Moulage 2D Multi-Niveaux",
      "summary": "Sculpture 3D vs Moulage 2D Multi-Niveaux (Matériaux & Fabrication) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "3D Reliëf vs. 2D Meerlaags Spuitgieten",
      "summary": "3D Reliëf vs. 2D Meerlaags Spuitgieten (Materialen & Productie) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Relieve 3D vs. Fundición 2D Multinivel",
      "summary": "Relieve 3D vs. Fundición 2D Multinivel (Materiales y Fabricación) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Rilievo 3D vs Pressofusione 2D Multilivello",
      "summary": "Rilievo 3D vs Pressofusione 2D Multilivello (Materiali e Produzione) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Relevo 3D vs. Fundição 2D Multinível",
      "summary": "Relevo 3D vs. Fundição 2D Multinível (Materiais e Fabrico) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "3D-Reliefgravyr vs. 2D Flerskiktsgjutning",
      "summary": "3D-Reliefgravyr vs. 2D Flerskiktsgjutning (Material & Tillverkning) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "3D-Relief vs. 2D Flertrins Trykstøbning",
      "summary": "3D-Relief vs. 2D Flertrins Trykstøbning (Materialer & Produktion) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "3D-Relieff vs. 2D Flertrinns Trykkstøp",
      "summary": "3D-Relieff vs. 2D Flertrinns Trykkstøp (Materialer & Produksjon) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "3D-Kohokuvio vs. 2D Monitasopainevalu",
      "summary": "3D-Kohokuvio vs. 2D Monitasopainevalu (Materiaalit & Valmistus) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Relief 3D vs. Odlew 2D Wielopoziomowy",
      "summary": "Relief 3D vs. Odlew 2D Wielopoziomowy (Materiały i Produkcja) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "3D Reliéf vs. 2D Víceúrovňové Lití",
      "summary": "3D Reliéf vs. 2D Víceúrovňové Lití (Materiály a Výroba) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "3D Рельеф против 2D многоуровневого литья",
      "summary": "3D Рельеф против 2D многоуровневого литья (Материалы и производство) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "3D立体彫刻 vs 2D多層ダイキャスト金型工学",
      "summary": "3D立体彫刻 vs 2D多層ダイキャスト金型工学 (素材・製造プロセス工学) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "3D 입체 조각 vs 2D 다층 다이캐스팅 금형 설계",
      "summary": "3D 입체 조각 vs 2D 다층 다이캐스팅 금형 설계 (소재 및 제조 공법) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Ukiran Relif 3D vs Die-Cast 2D Multi-Level",
      "summary": "Ukiran Relif 3D vs Die-Cast 2D Multi-Level (Material & Manufaktur) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "النحت ثلاثي الأبعاد مقابل السبك ثنائي الأبعاد",
      "summary": "النحت ثلاثي الأبعاد مقابل السبك ثنائي الأبعاد (المواد والتصنيع المعدني) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "academic-graduation-medallions-and-military-drape-ribbon-medals-guide": {
    "en": {
      "title": "Solid Brass Academic Graduation Medallions & Military Drape Ribbon Medals: Stamping & Presentation",
      "summary": "Specify heirloom die-struck solid C26000 brass academic medallions, university crests, and striped grosgrain top-bar military drape medals."
    },
    "de": {
      "title": "Akademische Medaillen & Ordensband-Medaillen",
      "summary": "Akademische Medaillen & Ordensband-Medaillen (Medaillen & Sportevents) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Médailles Universitaires & Militaires à Ruban Drapé",
      "summary": "Médailles Universitaires & Militaires à Ruban Drapé (Médailles & Événements Sportifs) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Academische Penningen & Militaire Drapemedalles",
      "summary": "Academische Penningen & Militaire Drapemedalles (Medailles & Sportevenementen) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Medallones Académicos y Medallas con Cinta Drapeada",
      "summary": "Medallones Académicos y Medallas con Cinta Drapeada (Medallas y Eventos Deportivos) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Medaglioni Accademici e Medaglie a Nastro Drappeggiato",
      "summary": "Medaglioni Accademici e Medaglie a Nastro Drappeggiato (Medaglie ed Eventi Sportivi) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Medalhões Académicos e Medalhas de Fita Drapeada",
      "summary": "Medalhões Académicos e Medalhas de Fita Drapeada (Medalhas e Eventos Desportivos) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Akademiska Examensmedaljer & Drapebandsmedaljer",
      "summary": "Akademiska Examensmedaljer & Drapebandsmedaljer (Medaljer & Idrottsevenemang) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Akademiske Eksamensmedaljer & Ordensbånd-Medaljer",
      "summary": "Akademiske Eksamensmedaljer & Ordensbånd-Medaljer (Medaljer & Sportsevents) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Akademiske Medaljer & Militære Drapebåndmedaljer",
      "summary": "Akademiske Medaljer & Militære Drapebåndmedaljer (Medaljer & Idrettsarrangementer) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Akateemiset Mitalit & Kunniamerkkinauhamitalit",
      "summary": "Akateemiset Mitalit & Kunniamerkkinauhamitalit (Mitalit & Urheilutapahtumat) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Medale Akademickie i Wojskowe ze Wstęgą Fałdowaną",
      "summary": "Medale Akademickie i Wojskowe ze Wstęgą Fałdowaną (Medale i Imprezy Sportowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Akademické Medaile a Vojenské Medaile se Stuhou",
      "summary": "Akademické Medaile a Vojenské Medaile se Stuhou (Medaile a Sportovní Akce) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Академические медали и награды на орденской ленте",
      "summary": "Академические медали и награды на орденской ленте (Медали и спортивные события) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "大学卒業記念メダル＆軍用ドレープリボン勲章の製作仕様",
      "summary": "大学卒業記念メダル＆軍用ドレープリボン勲章の製作仕様 (マラソンメダル・スポーツ大会) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "학술 졸업 메달 및 군용 드레이프 리본 훈장 제작 가이드",
      "summary": "학술 졸업 메달 및 군용 드레이프 리본 훈장 제작 가이드 (마라톤 메달 및 스포츠 행사) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Medali Kelulusan Akademik & Medali Pita Militer",
      "summary": "Medali Kelulusan Akademik & Medali Pita Militer (Medali & Acara Olahraga) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "ميداليات التخرج الأكاديمية والأوسمة العسكرية",
      "summary": "ميداليات التخرج الأكاديمية والأوسمة العسكرية (الميداليات والفعاليات الرياضية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "anodized-aluminum-carabiner-climb-loops-vs-laser-stainless-keyrings": {
    "en": {
      "title": "Low-Cost Trade Show Keychains: Anodized Aluminum Carabiners vs. Laser-Engraved 304 Stainless Rings",
      "summary": "Compare $0.29–$0.85 anodized aluminum carabiner climb-loops vs brushed 304 stainless laser tags and custom flat split rings for massive event giveaways."
    },
    "de": {
      "title": "Eloxierte Alu-Karabiner vs. Laser-Edelstahlringe",
      "summary": "Eloxierte Alu-Karabiner vs. Laser-Edelstahlringe (Schlüsselanhänger & Einkaufswagenchips) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Mousquetons Anodisés vs Porte-Clés Inox 304",
      "summary": "Mousquetons Anodisés vs Porte-Clés Inox 304 (Porte-Clés & Jetons Caddie) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Geanodiseerde Karabijnhaken vs. RVS 304 Sleutelhangers",
      "summary": "Geanodiseerde Karabijnhaken vs. RVS 304 Sleutelhangers (Sleutelhangers & Winkelmunten) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Mosquetones de Aluminio vs. Llaveros de Acero Láser",
      "summary": "Mosquetones de Aluminio vs. Llaveros de Acero Láser (Llaveros y Fichas de Carro) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Moschettoni Alluminio vs Portachiavi Acciaio Laser",
      "summary": "Moschettoni Alluminio vs Portachiavi Acciaio Laser (Portachiavi e Gettoni Carrello) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Mosquetões de Alumínio vs. Porta-Chaves Aço Inox",
      "summary": "Mosquetões de Alumínio vs. Porta-Chaves Aço Inox (Porta-Chaves e Fichas de Carrinho) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Eloxerade Karbinhakar vs. Lasergraverade Stålringar",
      "summary": "Eloxerade Karbinhakar vs. Lasergraverade Stålringar (Nyckelringar & Kundvagnspolletter) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Eloxerede Karabinhager vs. Lasergraverede Stålringe",
      "summary": "Eloxerede Karabinhager vs. Lasergraverede Stålringe (Nøgleringe & Indkøbsvognspoletter) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Elokserte Karabinkroker vs. Lasergraverte Stålringer",
      "summary": "Elokserte Karabinkroker vs. Lasergraverte Stålringer (Nøkkelringer & Handlevognmynter) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Anodisoidut Karabiinihaat vs. Laserkaiverrettu Teräs",
      "summary": "Anodisoidut Karabiinihaat vs. Laserkaiverrettu Teräs (Avaimenperät & Ostoskärrypoletit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Karabińczyki Aluminiowe vs. Breloki Stalowe Laser",
      "summary": "Karabińczyki Aluminiowe vs. Breloki Stalowe Laser (Breloki i Żetony Sklepowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Eloxované Karabiny vs. Laserované Nerezové Přívěsky",
      "summary": "Eloxované Karabiny vs. Laserované Nerezové Přívěsky (Klíčenky a Žetony do Vozíku) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Анодированные карабины против стальных брелоков",
      "summary": "Анодированные карабины против стальных брелоков (Брелоки и жетоны для тележек) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "アルマイトカラビナ vs レーザー刻印304ステンレスキーリング",
      "summary": "アルマイトカラビナ vs レーザー刻印304ステンレスキーリング (キーホルダー・€1/£1カートコイン) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "아노다이징 카라비너 vs 레이저 각인 304 스텐 키링",
      "summary": "아노다이징 카라비너 vs 레이저 각인 304 스텐 키링 (키링 및 유럽 €1·£1 트롤리 코인) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Karabiner Aluminium Anodized vs Gantungan Baja Laser",
      "summary": "Karabiner Aluminium Anodized vs Gantungan Baja Laser (Gantungan Kunci & Koin Troli) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "مشابك الكارابينر المؤكسدة مقابل حلقات الفولاذ 304",
      "summary": "مشابك الكارابينر المؤكسدة مقابل حلقات الفولاذ 304 (ميداليات المفاتيح وعملات التسوق) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "boutique-hotel-vintage-stamped-brass-room-key-tags-and-fobs-guide": {
    "en": {
      "title": "Boutique Hotel Vintage Stamped Brass Room Key Tags: Patina Aging, Room Numbering & Ring Hardware",
      "summary": "Specify 2.0mm solid C26000 brass diamond and oval hotel room key fobs with antique brass patina, deep laser room numbers, and solid brass split rings."
    },
    "de": {
      "title": "Vintage-Messing-Hotelanhänger mit Zimmernummer",
      "summary": "Vintage-Messing-Hotelanhänger mit Zimmernummer (Schlüsselanhänger & Einkaufswagenchips) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Porte-Clés Hôtel Vintage en Laiton Frappé Numéroté",
      "summary": "Porte-Clés Hôtel Vintage en Laiton Frappé Numéroté (Porte-Clés & Jetons Caddie) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Vintage Messing Hotel Sleutelhangers met Kamernummer",
      "summary": "Vintage Messing Hotel Sleutelhangers met Kamernummer (Sleutelhangers & Winkelmunten) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Llaveros de Latón Vintage para Habitaciones de Hotel",
      "summary": "Llaveros de Latón Vintage para Habitaciones de Hotel (Llaveros y Fichas de Carro) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Portachiavi Hotel Vintage in Ottone Stampato Numerati",
      "summary": "Portachiavi Hotel Vintage in Ottone Stampato Numerati (Portachiavi e Gettoni Carrello) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Porta-Chaves Vintage em Latão para Hotéis Boutique",
      "summary": "Porta-Chaves Vintage em Latão para Hotéis Boutique (Porta-Chaves e Fichas de Carrinho) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Boutiquehotell Vintage Rumsnyckelbrickor i Mässing",
      "summary": "Boutiquehotell Vintage Rumsnyckelbrickor i Mässing (Nyckelringar & Kundvagnspolletter) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Boutiquehotel Vintage Messing Værelsesnøgleskilte",
      "summary": "Boutiquehotel Vintage Messing Værelsesnøgleskilte (Nøgleringe & Indkøbsvognspoletter) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Boutiquehotell Vintage Romnøkkelbrikker i Messing",
      "summary": "Boutiquehotell Vintage Romnøkkelbrikker i Messing (Nøkkelringer & Handlevognmynter) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Boutique-hotellien Messinkiset Huoneavaimenperät",
      "summary": "Boutique-hotellien Messinkiset Huoneavaimenperät (Avaimenperät & Ostoskärrypoletit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Mosiężne Breloki Hotelowe Vintage z Numeracją Pokoi",
      "summary": "Mosiężne Breloki Hotelowe Vintage z Numeracją Pokoi (Breloki i Żetony Sklepowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Hotelové Mosazné Přívěsky ke Klíčům s Číslováním",
      "summary": "Hotelové Mosazné Přívěsky ke Klíčům s Číslováním (Klíčenky a Žetony do Vozíku) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Винтажные латунные бирки для ключей отелей с гравировкой",
      "summary": "Винтажные латунные бирки для ключей отелей с гравировкой (Брелоки и жетоны для тележек) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "ブティックホテル向けヴィンテージ真鍮ルームキーホルダー",
      "summary": "ブティックホテル向けヴィンテージ真鍮ルームキーホルダー (キーホルダー・€1/£1カートコイン) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "부티크 호텔용 빈티지 황동 객실 키택 및 번호 각인",
      "summary": "부티크 호텔용 빈티지 황동 객실 키택 및 번호 각인 (키링 및 유럽 €1·£1 트롤리 코인) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Tag Kunci Kamar Hotel Vintage Kuningan Stamping",
      "summary": "Tag Kunci Kamar Hotel Vintage Kuningan Stamping (Gantungan Kunci & Koin Troli) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "ميداليات مفاتيح الفنادق التراثية من النحاس المرقم",
      "summary": "ميداليات مفاتيح الفنادق التراثية من النحاس المرقم (ميداليات المفاتيح وعملات التسوق) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "china-direct-custom-pins-and-medals-manufacturing-lead-times-ddp-air-shipping": {
    "en": {
      "title": "China Direct Custom Pins & Medals Sourcing: Zhongshan Foundry Lead Times, HS Codes & DDP Air Freight",
      "summary": "Plan production from Zhongshan Xiaolan hardware hub: 12-hour proofs, 7–15 day fabrication, export HS codes (7117/8308), and DHL/FedEx DDP air freight."
    },
    "de": {
      "title": "Lieferzeiten Zhongshan, HS-Zollcodes & DDP-Luftfracht",
      "summary": "Lieferzeiten Zhongshan, HS-Zollcodes & DDP-Luftfracht (Beschaffung, Verpackung & Sicherheit) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Délais Fonderie Zhongshan, Codes HS & Fret Aérien DDP",
      "summary": "Délais Fonderie Zhongshan, Codes HS & Fret Aérien DDP (Sourcing, Packaging & Normes) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Doorlooptijden Zhongshan, HS-Codes & DDP Luchtvracht",
      "summary": "Doorlooptijden Zhongshan, HS-Codes & DDP Luchtvracht (Inkoop, Verpakking & Compliance) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Plazos desde Zhongshan, Códigos HS y Envío Aéreo DDP",
      "summary": "Plazos desde Zhongshan, Códigos HS y Envío Aéreo DDP (Sourcing, Empaque y Normativa) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Tempi di Produzione Zhongshan, Codici HS e Aereo DDP",
      "summary": "Tempi di Produzione Zhongshan, Codici HS e Aereo DDP (Sourcing, Packaging e Normative) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Prazos em Zhongshan, Códigos HS e Frete Aéreo DDP",
      "summary": "Prazos em Zhongshan, Códigos HS e Frete Aéreo DDP (Sourcing, Embalagem e Conformidade) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Ledtider från Zhongshan, HS-Koder & DDP Flygfrakt",
      "summary": "Ledtider från Zhongshan, HS-Koder & DDP Flygfrakt (Inköp, Förpackning & Regler) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Produktionstid Zhongshan, HS-Koder & DDP Luftfragt",
      "summary": "Produktionstid Zhongshan, HS-Koder & DDP Luftfragt (Indkøb, Emballage & Overholdelse) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Produksjonstid Zhongshan, HS-Koder & DDP Flyfrakt",
      "summary": "Produksjonstid Zhongshan, HS-Koder & DDP Flyfrakt (Innkjøp, Emballasje & Samsvar) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Tuotantoajat Zhongshanista, HS-Koodit & DDP-Lentorahti",
      "summary": "Tuotantoajat Zhongshanista, HS-Koodit & DDP-Lentorahti (Hankinta, Pakkaus & Standardit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Czas Produkcji w Zhongshan, Kody HS i Wysyłka DDP",
      "summary": "Czas Produkcji w Zhongshan, Kody HS i Wysyłka DDP (Zakupy, Opakowania i Normy) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Dodací Lhůty z Zhongshanu, HS Kódy a Letecká DDP",
      "summary": "Dodací Lhůty z Zhongshanu, HS Kódy a Letecká DDP (Nákup, Balení a Certifikace) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Сроки производства в Чжуншане, коды ТН ВЭД и авиа DDP",
      "summary": "Сроки производства в Чжуншане, коды ТН ВЭД и авиа DDP (Закупки, упаковка и сертификация) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "中山直営工場の製造リードタイム・HSコード・国際DDP航空便ガイド",
      "summary": "中山直営工場の製造リードタイム・HSコード・国際DDP航空便ガイド (工場調達・パッケージ・安全認証) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "중산 공장 직수입 납기, HS 코드 및 항공 DDP 통관 가이드",
      "summary": "중산 공장 직수입 납기, HS 코드 및 항공 DDP 통관 가이드 (공장 소싱 · 패키징 · 안전 인증) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Waktu Produksi Zhongshan, Kode HS & Pengiriman Udara DDP",
      "summary": "Waktu Produksi Zhongshan, Kode HS & Pengiriman Udara DDP (Sourcing, Kemasan & Kepatuhan) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "مواعيد التسليم من تشونغشان والرموز الجمركية والشحن الجوي DDP",
      "summary": "مواعيد التسليم من تشونغشان والرموز الجمركية والشحن الجوي DDP (التوريد والتغليف ومعايير السلامة) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "corporate-years-of-service-award-pins-and-anniversary-commemorative-coins": {
    "en": {
      "title": "Corporate Years-of-Service Award Pins & Milestone Anniversary Coins: Tiered Recognition Playbook",
      "summary": "Design progressive 5, 10, 15, and 25-year employee recognition programs combining stone-set gold brass service pins, anniversary coins, and velvet boxes."
    },
    "de": {
      "title": "Firmenjubiläums-Pins & Dienstjubiläums-Münzen",
      "summary": "Firmenjubiläums-Pins & Dienstjubiläums-Münzen (Coins & Dienstabzeichen) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Pins d’Ancienneté d’Entreprise & Monnaies Anniversaire",
      "summary": "Pins d’Ancienneté d’Entreprise & Monnaies Anniversaire (Pièces Challenge & Insignes) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Jubileumspelden & Bedrijfsmunten voor Dienstjaren",
      "summary": "Jubileumspelden & Bedrijfsmunten voor Dienstjaren (Munten & Dienstinsignes) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Pines de Antigüedad Laboral y Monedas de Aniversario",
      "summary": "Pines de Antigüedad Laboral y Monedas de Aniversario (Monedas e Insignias Oficiales) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Spille Anzianità Aziendale e Monete Anniversario",
      "summary": "Spille Anzianità Aziendale e Monete Anniversario (Monete e Distintivi Militari) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Broches de Tempo de Serviço e Moedas de Aniversário",
      "summary": "Broches de Tempo de Serviço e Moedas de Aniversário (Moedas e Distintivos Oficiais) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Utmärkelsepins för Tjänsteår & Jubileumsmynt",
      "summary": "Utmärkelsepins för Tjänsteår & Jubileumsmynt (Challenge Coins & Tjänstetecken) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Jubilæumspins for Tjenesteår & Firmajubilæumsmønter",
      "summary": "Jubilæumspins for Tjenesteår & Firmajubilæumsmønter (Challenge Coins & Insignia) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Jubileumspins for Tjenesteår & Jubileumsmynter",
      "summary": "Jubileumspins for Tjenesteår & Jubileumsmynter (Challenge Coins & Merker) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Palvelusvuosipinssit & Yritysjuhlarahat",
      "summary": "Palvelusvuosipinssit & Yritysjuhlarahat (Kolikot & Virkamerkit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Przypinki za Staž Pracy i Monety Jubileuszowe Firm",
      "summary": "Przypinki za Staž Pracy i Monety Jubileuszowe Firm (Monety i Odznaki Służb) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Odznaky za Věrnostní Léta a Firemní Pamětní Mince",
      "summary": "Odznaky za Věrnostní Léta a Firemní Pamětní Mince (Challenge Mince a Odznaky Sborů) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Корпоративные значки за выслугу лет и юбилейные монеты",
      "summary": "Корпоративные значки за выслугу лет и юбилейные монеты (Монеты Challenge и знаки служб) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "永年勤続表彰ピンバッジ・創立記念コイン階層設計ガイド",
      "summary": "永年勤続表彰ピンバッジ・創立記念コイン階層設計ガイド (コイン・警察/軍用インシグニア) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "장기근속 표창 핀 배지 및 창립기념 코인 등급 설계",
      "summary": "장기근속 표창 핀 배지 및 창립기념 코인 등급 설계 (챌린지 코인 및 관공서 배지) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Pin Penghargaan Masa Kerja & Koin Hari Jadi Perusahaan",
      "summary": "Pin Penghargaan Masa Kerja & Koin Hari Jadi Perusahaan (Koin Challenge & Insignia Resmi) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "دبابيس سنوات الخدمة للشركات والعملات التذكارية السنوية",
      "summary": "دبابيس سنوات الخدمة للشركات والعملات التذكارية السنوية (العملات التذكارية والشارات العسكرية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "cpsia-lead-free-en71-reach-nickel-free-electroplating-metal-craft-compliance": {
    "en": {
      "title": "Global Metal Craft Compliance: US CPSIA Lead Limits, CA Prop 65, EU REACH & Nickel-Free Plating",
      "summary": "Meet US CPSIA (<90 ppm lead), California Prop 65, EU REACH SVHC, and EN 1811 nickel-release regulations across zinc alloy, brass, enamel, and PVC."
    },
    "de": {
      "title": "US CPSIA, Prop 65, EU REACH & Nickelfreie Galvanik",
      "summary": "US CPSIA, Prop 65, EU REACH & Nickelfreie Galvanik (Beschaffung, Verpackung & Sicherheit) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Normes CPSIA, Prop 65, REACH & Placage Sans Nickel",
      "summary": "Normes CPSIA, Prop 65, REACH & Placage Sans Nickel (Sourcing, Packaging & Normes) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "VS CPSIA, Prop 65, EU REACH & Nikkelvrij Plateren",
      "summary": "VS CPSIA, Prop 65, EU REACH & Nikkelvrij Plateren (Inkoop, Verpakking & Compliance) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Normativas CPSIA, Prop 65, REACH y Baño Sin Níquel",
      "summary": "Normativas CPSIA, Prop 65, REACH y Baño Sin Níquel (Sourcing, Empaque y Normativa) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Normative CPSIA, Prop 65, REACH e Galvanica Nichel-Free",
      "summary": "Normative CPSIA, Prop 65, REACH e Galvanica Nichel-Free (Sourcing, Packaging e Normative) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Normas CPSIA, Prop 65, REACH e Banho Sem Níquel",
      "summary": "Normas CPSIA, Prop 65, REACH e Banho Sem Níquel (Sourcing, Embalagem e Conformidade) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Krav: US CPSIA, Prop 65, EU REACH & Nickelfri Plätering",
      "summary": "Krav: US CPSIA, Prop 65, EU REACH & Nickelfri Plätering (Inköp, Förpackning & Regler) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Krav: US CPSIA, Prop 65, EU REACH & Nikkelfri Plettering",
      "summary": "Krav: US CPSIA, Prop 65, EU REACH & Nikkelfri Plettering (Indkøb, Emballage & Overholdelse) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Krav: US CPSIA, Prop 65, EU REACH & Nikkelfri Plettering",
      "summary": "Krav: US CPSIA, Prop 65, EU REACH & Nikkelfri Plettering (Innkjøp, Emballasje & Samsvar) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Turvallisuus: US CPSIA, Prop 65, REACH & Nikkelittömyys",
      "summary": "Turvallisuus: US CPSIA, Prop 65, REACH & Nikkelittömyys (Hankinta, Pakkaus & Standardit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Normy CPSIA, Prop 65, EU REACH i Powłoki Bezniklowe",
      "summary": "Normy CPSIA, Prop 65, EU REACH i Powłoki Bezniklowe (Zakupy, Opakowania i Normy) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Normy US CPSIA, Prop 65, EU REACH a Bezniklové Pokovení",
      "summary": "Normy US CPSIA, Prop 65, EU REACH a Bezniklové Pokovení (Nákup, Balení a Certifikace) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Стандарты CPSIA, Prop 65, EU REACH и гальваника без никеля",
      "summary": "Стандарты CPSIA, Prop 65, EU REACH и гальваника без никеля (Закупки, упаковка и сертификация) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "米国CPSIA・Prop65・EU REACH無鉛＆ニッケルフリー安全基準",
      "summary": "米国CPSIA・Prop65・EU REACH無鉛＆ニッケルフリー安全基準 (工場調達・パッケージ・安全認証) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "미국 CPSIA · CA Prop 65 · EU REACH 무납·무니켈 도금 규제",
      "summary": "미국 CPSIA · CA Prop 65 · EU REACH 무납·무니켈 도금 규제 (공장 소싱 · 패키징 · 안전 인증) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Standar CPSIA AS, Prop 65, EU REACH & Plating Bebas Nikel",
      "summary": "Standar CPSIA AS, Prop 65, EU REACH & Plating Bebas Nikel (Sourcing, Kemasan & Kepatuhan) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "معايير CPSIA و Prop 65 و EU REACH والطلاء الخالي من النيكل",
      "summary": "معايير CPSIA و Prop 65 و EU REACH والطلاء الخالي من النيكل (التوريد والتغليف ومعايير السلامة) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "craft-brewery-heavy-zinc-bottle-openers-and-3d-souvenir-fridge-magnets": {
    "en": {
      "title": "Craft Brewery Metal Bottle Openers & 3D Landmark Souvenir Fridge Magnets: Structural Strength & Magnet Force",
      "summary": "Compare 4.2mm heavy 3D zinc brewery openers, stainless speed-rail paddles, credit-card wallet openers, and high-hold 3D landmark souvenir magnets."
    },
    "de": {
      "title": "Brauerei-Flaschenöffner & 3D-Kühlschrankmagnete",
      "summary": "Brauerei-Flaschenöffner & 3D-Kühlschrankmagnete (Business, Golf & Souvenirs) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Décapsuleurs de Brasserie & Aimants Frigo 3D Zinc",
      "summary": "Décapsuleurs de Brasserie & Aimants Frigo 3D Zinc (Affaires, Golf & Souvenirs) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Brouwerij Flesopeners & 3D Souvenir Koelkastmagneten",
      "summary": "Brouwerij Flesopeners & 3D Souvenir Koelkastmagneten (Zakelijk, Golf & Souvenirs) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Abridores de Botellas para Cervecerías e Imanes 3D",
      "summary": "Abridores de Botellas para Cervecerías e Imanes 3D (Ejecutivo, Golf y Souvenirs) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Apribottiglie Birrificio in Zinco e Magneti Frigo 3D",
      "summary": "Apribottiglie Birrificio in Zinco e Magneti Frigo 3D (Regali Aziendali, Golf e Souvenir) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Abridores de Garrafa para Cervejarias e Ímãs 3D",
      "summary": "Abridores de Garrafa para Cervejarias e Ímãs 3D (Executivo, Golfe e Lembranças) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Bryggeri-Flasköppnare & 3D Souvenirkylskåpsmagneter",
      "summary": "Bryggeri-Flasköppnare & 3D Souvenirkylskåpsmagneter (Företagsgåvor, Golf & Souvenirer) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Bryggeri-Oplukkere & 3D Souvenir-Køleskabsmagneter",
      "summary": "Bryggeri-Oplukkere & 3D Souvenir-Køleskabsmagneter (Erhverv, Golf & Souvenirs) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Bryggeri-Flaskeåpnere & 3D Suvenirkjøleskapsmagneter",
      "summary": "Bryggeri-Flaskeåpnere & 3D Suvenirkjøleskapsmagneter (Bedrift, Golf & Suvenirer) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Panimoiden Pullonavaajat & 3D-Matkamuistomagneetit",
      "summary": "Panimoiden Pullonavaajat & 3D-Matkamuistomagneetit (Liikelahjat, Golf & Matkamuistot) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Otwieracze Browarnicze z Cynku i Magnesy 3D Pamiątkowe",
      "summary": "Otwieracze Browarnicze z Cynku i Magnesy 3D Pamiątkowe (Biznes, Golf i Pamiątki) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Pivovarské Otvíráky ze Zinku a 3D Suvenýrové Magnety",
      "summary": "Pivovarské Otvíráky ze Zinku a 3D Suvenýrové Magnety (Manažerské Dárky, Golf a Suvenýry) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Открывалки для пивоварен и 3D-магниты на холодильник",
      "summary": "Открывалки для пивоварен и 3D-магниты на холодильник (Бизнес-сувениры, Гольф и Подарки) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "クラフトビール重厚栓抜き＆3D観光マグネット構造設計",
      "summary": "クラフトビール重厚栓抜き＆3D観光マグネット構造設計 (ギフト・ゴルフ・観光記念品) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "크래프트 맥주 3D 병따개 및 관광 기념 냉장고 마그넷",
      "summary": "크래프트 맥주 3D 병따개 및 관광 기념 냉장고 마그넷 (비즈니스 기프트 · 골프 · 기념품) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Pembuka Botol Bir Logam Berat & Magnet Kulkas 3D",
      "summary": "Pembuka Botol Bir Logam Berat & Magnet Kulkas 3D (Hadiah Eksekutif, Golf & Suvenir) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "فتاحات الزجاجات الثقيلة ومغناطيس الثلاجة ثلاثي الأبعاد",
      "summary": "فتاحات الزجاجات الثقيلة ومغناطيس الثلاجة ثلاثي الأبعاد (الهدايا التنفيذية والجولف والتذكارات) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "custom-3d-curved-police-security-and-fire-department-badges-guide": {
    "en": {
      "title": "Custom 3D Curved Police Shields, Sheriff Stars & Fire Department Badges: Stamping, Pins & Holsters",
      "summary": "Manufacturing standards for curved brass/zinc police shields, 5/6/7-point sheriff stars, Maltese crosses, safety pin backs, and leather belt clips."
    },
    "de": {
      "title": "Gewölbte 3D Polizei-, Sheriff- & Feuerwehrabzeichen",
      "summary": "Gewölbte 3D Polizei-, Sheriff- & Feuerwehrabzeichen (Coins & Dienstabzeichen) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Insignes Bombés 3D Police, Shérif & Sapeurs-Pompiers",
      "summary": "Insignes Bombés 3D Police, Shérif & Sapeurs-Pompiers (Pièces Challenge & Insignes) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Gebogen 3D Politie-, Beveiligings- & Brandweerbadges",
      "summary": "Gebogen 3D Politie-, Beveiligings- & Brandweerbadges (Munten & Dienstinsignes) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Placas Curvas 3D de Policía, Alguacil y Bomberos",
      "summary": "Placas Curvas 3D de Policía, Alguacil y Bomberos (Monedas e Insignias Oficiales) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Distintivi Curvi 3D Polizia, Sicurezza e Vigili del Fuoco",
      "summary": "Distintivi Curvi 3D Polizia, Sicurezza e Vigili del Fuoco (Monete e Distintivi Militari) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Distintivos Curvos 3D Polícia, Segurança e Bombeiros",
      "summary": "Distintivos Curvos 3D Polícia, Segurança e Bombeiros (Moedas e Distintivos Oficiais) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "3D-Böjda Polis-, Väktar- & Brandkårsbrickor",
      "summary": "3D-Böjda Polis-, Väktar- & Brandkårsbrickor (Challenge Coins & Tjänstetecken) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "3D-Buede Politi-, Vagt- & Brandvæsensskilte",
      "summary": "3D-Buede Politi-, Vagt- & Brandvæsensskilte (Challenge Coins & Insignia) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "3D-Bøyde Politi-, Vekter- & Brannvesenskilt",
      "summary": "3D-Bøyde Politi-, Vekter- & Brannvesenskilt (Challenge Coins & Merker) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "3D-Kaarevat Poliisi-, Turvallisuus- & Palokuntamerkit",
      "summary": "3D-Kaarevat Poliisi-, Turvallisuus- & Palokuntamerkit (Kolikot & Virkamerkit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Wypukłe 3D Odznaki Policyjne, Ochrony i Straży Pożarnej",
      "summary": "Wypukłe 3D Odznaki Policyjne, Ochrony i Straży Pożarnej (Monety i Odznaki Służb) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "3D Prohnuté Policejní, Bezpečnostní a Hasičské Odznaky",
      "summary": "3D Prohnuté Policejní, Bezpečnostní a Hasičské Odznaky (Challenge Mince a Odznaky Sborů) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Изогнутые 3D-знаки и жетоны полиции, охраны и пожарных",
      "summary": "Изогнутые 3D-знаки и жетоны полиции, охраны и пожарных (Монеты Challenge и знаки служб) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "3D曲面ドーム型 警察・保安・消防バッジのプレス・裏金具ガイド",
      "summary": "3D曲面ドーム型 警察・保安・消防バッジのプレス・裏金具ガイド (コイン・警察/軍用インシグニア) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "3D 곡면 돔형 경찰·보안·소방 배지 프레스 및 홀스터 가이드",
      "summary": "3D 곡면 돔형 경찰·보안·소방 배지 프레스 및 홀스터 가이드 (챌린지 코인 및 관공서 배지) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Lencana Lengkung 3D Polisi, Keamanan & Pemadam Kebakaran",
      "summary": "Lencana Lengkung 3D Polisi, Keamanan & Pemadam Kebakaran (Koin Challenge & Insignia Resmi) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "شارات الشرطة والأمن والإطفاء المنحنية ثلاثية الأبعاد",
      "summary": "شارات الشرطة والأمن والإطفاء المنحنية ثلاثية الأبعاد (العملات التذكارية والشارات العسكرية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "custom-3d-western-rodeo-and-motorcycle-club-heavy-zinc-belt-buckles": {
    "en": {
      "title": "Custom 3D Western Rodeo Trophy & Motorcycle Club Belt Buckles: Heavy Zinc Casting & Loop Specs",
      "summary": "Manufacturing blueprint for 4\"×3\" heavyweight 165g 3D zinc alloy rodeo trophy buckles, biker club buckles, and utility bottle-opener belt buckles."
    },
    "de": {
      "title": "Schwere 3D Western-Rodeo- & Biker-Gürtelschnallen",
      "summary": "Schwere 3D Western-Rodeo- & Biker-Gürtelschnallen (Business, Golf & Souvenirs) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Boucles de Ceinture Lourdes 3D Western, Rodéo & Biker",
      "summary": "Boucles de Ceinture Lourdes 3D Western, Rodéo & Biker (Affaires, Golf & Souvenirs) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Zware 3D Western Rodeo & Motorclub Riemgespen",
      "summary": "Zware 3D Western Rodeo & Motorclub Riemgespen (Zakelijk, Golf & Souvenirs) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Hebillas Pesadas 3D de Rodeo Western y Clubes Moteros",
      "summary": "Hebillas Pesadas 3D de Rodeo Western y Clubes Moteros (Ejecutivo, Golf y Souvenirs) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Fibbie Cintura Pesanti 3D Rodeo Western e Motoclub",
      "summary": "Fibbie Cintura Pesanti 3D Rodeo Western e Motoclub (Regali Aziendali, Golf e Souvenir) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Fivelas Pesadas 3D Rodeo Western e Motoclubes",
      "summary": "Fivelas Pesadas 3D Rodeo Western e Motoclubes (Executivo, Golfe e Lembranças) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Tunga 3D Western Rodeo- & MC-Klubb Bältesspännen",
      "summary": "Tunga 3D Western Rodeo- & MC-Klubb Bältesspännen (Företagsgåvor, Golf & Souvenirer) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Tunge 3D Western Rodeo- & MC-Klub Bæltespænder",
      "summary": "Tunge 3D Western Rodeo- & MC-Klub Bæltespænder (Erhverv, Golf & Souvenirs) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Tunge 3D Western Rodeo- & MC-Klubb Beltespenner",
      "summary": "Tunge 3D Western Rodeo- & MC-Klubb Beltespenner (Bedrift, Golf & Suvenirer) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Raskaat 3D Western Rodeo- & Moottorikerho-Vyönsoljet",
      "summary": "Raskaat 3D Western Rodeo- & Moottorikerho-Vyönsoljet (Liikelahjat, Golf & Matkamuistot) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Masywne Klamry 3D do Pasów Western Rodeo i Motocyklowe",
      "summary": "Masywne Klamry 3D do Pasów Western Rodeo i Motocyklowe (Biznes, Golf i Pamiątki) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Masivní 3D Přezky na Opasky Western Rodeo a Motoklub",
      "summary": "Masivní 3D Přezky na Opasky Western Rodeo a Motoklub (Manažerské Dárky, Golf a Suvenýry) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Тяжёлые 3D пряжки для ремня Родео и Мотоклубов",
      "summary": "Тяжёлые 3D пряжки для ремня Родео и Мотоклубов (Бизнес-сувениры, Гольф и Подарки) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "3D立体ロデオ賞＆バイカーズクラブ重厚ベルトバックル鋳造仕様",
      "summary": "3D立体ロデオ賞＆バイカーズクラブ重厚ベルトバックル鋳造仕様 (ギフト・ゴルフ・観光記念品) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "3D 입체 웨스턴 로데오·바이크 클럽 중량 벨트 버클 제작",
      "summary": "3D 입체 웨스턴 로데오·바이크 클럽 중량 벨트 버클 제작 (비즈니스 기프트 · 골프 · 기념품) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Gesper Sabuk Seng Berat 3D Western Rodeo & Klub Motor",
      "summary": "Gesper Sabuk Seng Berat 3D Western Rodeo & Klub Motor (Hadiah Eksekutif, Golf & Suvenir) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "أبازيم الأحزمة الثقيلة ثلاثية الأبعاد للروديو ونوادي الدراجات",
      "summary": "أبازيم الأحزمة الثقيلة ثلاثية الأبعاد للروديو ونوادي الدراجات (الهدايا التنفيذية والجولف والتذكارات) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "custom-3d-zinc-alloy-vs-soft-enamel-and-spinning-metal-keychains": {
    "en": {
      "title": "Custom Metal Keychains Selection Matrix: 3D Zinc Alloy vs. Soft Enamel, Spinner & Nail-Clipper Fobs",
      "summary": "Compare 3D die-cast zinc, hard/soft enamel, rotating 360-degree spinner keychains, nail clippers, and bottle-opener keyrings across cost and longevity."
    },
    "de": {
      "title": "Schlüsselanhänger: 3D-Zink vs. Weichemaille & Spinner",
      "summary": "Schlüsselanhänger: 3D-Zink vs. Weichemaille & Spinner (Schlüsselanhänger & Einkaufswagenchips) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Porte-Clés Métal : Zinc 3D vs Émail Doux & Rotatifs",
      "summary": "Porte-Clés Métal : Zinc 3D vs Émail Doux & Rotatifs (Porte-Clés & Jetons Caddie) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Metalen Sleutelhangers: 3D Zink vs. Emaille & Spinners",
      "summary": "Metalen Sleutelhangers: 3D Zink vs. Emaille & Spinners (Sleutelhangers & Winkelmunten) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Llaveros Metálicos: Zinc 3D vs. Esmalte y Giratorios",
      "summary": "Llaveros Metálicos: Zinc 3D vs. Esmalte y Giratorios (Llaveros y Fichas de Carro) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Portachiavi Metallo: Zinco 3D vs Smalto e Rotanti",
      "summary": "Portachiavi Metallo: Zinco 3D vs Smalto e Rotanti (Portachiavi e Gettoni Carrello) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Porta-Chaves Metálicos: Zinco 3D vs. Esmalte e Giratórios",
      "summary": "Porta-Chaves Metálicos: Zinco 3D vs. Esmalte e Giratórios (Porta-Chaves e Fichas de Carrinho) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Metallnyckelringar: 3D-Zink vs. Mjuk Emalj & Snurr",
      "summary": "Metallnyckelringar: 3D-Zink vs. Mjuk Emalj & Snurr (Nyckelringar & Kundvagnspolletter) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Metalnøgleringe: 3D-Zink vs. Blød Emalje & Spinner",
      "summary": "Metalnøgleringe: 3D-Zink vs. Blød Emalje & Spinner (Nøgleringe & Indkøbsvognspoletter) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Metallnøkkelringer: 3D-Sink vs. Myk Emalje & Spinner",
      "summary": "Metallnøkkelringer: 3D-Sink vs. Myk Emalje & Spinner (Nøkkelringer & Handlevognmynter) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Avaimenperät: 3D-Sinkki vs. Pehmeä Emali & Pyörivät",
      "summary": "Avaimenperät: 3D-Sinkki vs. Pehmeä Emali & Pyörivät (Avaimenperät & Ostoskärrypoletit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Breloki Metalowe: Odlew 3D vs. Miękka Emalia i Obrotowe",
      "summary": "Breloki Metalowe: Odlew 3D vs. Miękka Emalia i Obrotowe (Breloki i Żetony Sklepowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Kovové Klíčenky: 3D Zinek vs. Měkký Smalt a Rotační",
      "summary": "Kovové Klíčenky: 3D Zinek vs. Měkký Smalt a Rotační (Klíčenky a Žetony do Vozíku) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Металлические брелоки: 3D-цинк против эмали и спиннеров",
      "summary": "Металлические брелоки: 3D-цинк против эмали и спиннеров (Брелоки и жетоны для тележек) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "メタルキーホルダー比較：3D亜鉛ダイキャスト vs ソフトエナメル＆回転式",
      "summary": "メタルキーホルダー比較：3D亜鉛ダイキャスト vs ソフトエナメル＆回転式 (キーホルダー・€1/£1カートコイン) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "금속 키링 선택 가이드: 3D 아연 합금 vs 에나멜 및 회전 스피너",
      "summary": "금속 키링 선택 가이드: 3D 아연 합금 vs 에나멜 및 회전 스피너 (키링 및 유럽 €1·£1 트롤리 코인) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Gantungan Kunci Logam: Die-Cast 3D vs Enamel & Putar",
      "summary": "Gantungan Kunci Logam: Die-Cast 3D vs Enamel & Putar (Gantungan Kunci & Koin Troli) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "ميداليات المفاتيح: سبك الزنك 3D مقابل المينا والدوارة",
      "summary": "ميداليات المفاتيح: سبك الزنك 3D مقابل المينا والدوارة (ميداليات المفاتيح وعملات التسوق) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "custom-championship-rings-vs-trophy-medals-for-sports-tournaments": {
    "en": {
      "title": "Custom Sports Championship Rings vs. Heavy Trophy Medals: Tooling, Ring Sizing & Athlete Perception",
      "summary": "Compare 3D sculpted championship tournament rings set with cubic zirconia stones (MOQ 50 pcs) vs 4\" heavy trophy medals across cost and player hype."
    },
    "de": {
      "title": "Meisterschaftsringe vs. Schwere Turnier-Medaillen",
      "summary": "Meisterschaftsringe vs. Schwere Turnier-Medaillen (Medaillen & Sportevents) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Bagues de Championnat Sportif vs Médailles Trophées",
      "summary": "Bagues de Championnat Sportif vs Médailles Trophées (Médailles & Événements Sportifs) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Kampioenschapsringen vs. Zware Toernooimedailles",
      "summary": "Kampioenschapsringen vs. Zware Toernooimedailles (Medailles & Sportevenementen) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Anillos de Campeonato Deportivo vs. Medallas Trofeo",
      "summary": "Anillos de Campeonato Deportivo vs. Medallas Trofeo (Medallas y Eventos Deportivos) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Anelli da Campionato Sportivo vs Medaglie Trofeo",
      "summary": "Anelli da Campionato Sportivo vs Medaglie Trofeo (Medaglie ed Eventi Sportivi) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Anéis de Campeonato Desportivo vs. Medalhas Troféu",
      "summary": "Anéis de Campeonato Desportivo vs. Medalhas Troféu (Medalhas e Eventos Desportivos) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Mästerskapsringar vs. Tunga Turneringstrofé-Medaljer",
      "summary": "Mästerskapsringar vs. Tunga Turneringstrofé-Medaljer (Medaljer & Idrottsevenemang) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Mesterskabsringe vs. Tunge Turneringsmedaljer",
      "summary": "Mesterskabsringe vs. Tunge Turneringsmedaljer (Medaljer & Sportsevents) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Mesterskapsringer vs. Tunge Turneringsmedaljer",
      "summary": "Mesterskapsringer vs. Tunge Turneringsmedaljer (Medaljer & Idrettsarrangementer) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Mestaruussormukset vs. Raskaat Turnausmitalit",
      "summary": "Mestaruussormukset vs. Raskaat Turnausmitalit (Mitalit & Urheilutapahtumat) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Pierścienie Mistrzowskie vs. Masywne Medale Turniejowe",
      "summary": "Pierścienie Mistrzowskie vs. Masywne Medale Turniejowe (Medale i Imprezy Sportowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Mistrovské Prsteny vs. Těžké Turnajové Medaile",
      "summary": "Mistrovské Prsteny vs. Těžké Turnajové Medaile (Medaile a Sportovní Akce) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Чемпионские перстни против тяжёлых наградных медалей",
      "summary": "Чемпионские перстни против тяжёлых наградных медалей (Медали и спортивные события) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "スポーツ大会 チャンピオンリング vs 重厚トロフィーメダル比較",
      "summary": "スポーツ大会 チャンピオンリング vs 重厚トロフィーメダル比較 (マラソンメダル・スポーツ大会) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "스포츠 대회 우승 반지(챔피언 링) vs 대형 트로피 메달",
      "summary": "스포츠 대회 우승 반지(챔피언 링) vs 대형 트로피 메달 (마라톤 메달 및 스포츠 행사) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Cincin Kejuaraan Olahraga vs Medali Trofi Berat",
      "summary": "Cincin Kejuaraan Olahraga vs Medali Trofi Berat (Medali & Acara Olahraga) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "خواتم البطولات الرياضية مقابل الميداليات التذكارية الثقيلة",
      "summary": "خواتم البطولات الرياضية مقابل الميداليات التذكارية الثقيلة (الميداليات والفعاليات الرياضية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "custom-embroidered-patches-vs-woven-and-3d-soft-pvc-morale-patches": {
    "en": {
      "title": "Custom Embroidered Patches vs. High-Density Woven & 3D Soft PVC Morale Patches: Coverage & Backings",
      "summary": "Choose between 50%–100% embroidery, bullion wire crests, fine-thread woven labels, and waterproof 3D soft PVC patches with iron-on or Velcro backs."
    },
    "de": {
      "title": "Gestickte Patches vs. Webetiketten & 3D-Weich-PVC",
      "summary": "Gestickte Patches vs. Webetiketten & 3D-Weich-PVC (Beschaffung, Verpackung & Sicherheit) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Écussons Brodés vs Tissés Haute Densité & PVC 3D",
      "summary": "Écussons Brodés vs Tissés Haute Densité & PVC 3D (Sourcing, Packaging & Normes) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Geborduurde Patches vs. Geweven & 3D Zacht PVC Patches",
      "summary": "Geborduurde Patches vs. Geweven & 3D Zacht PVC Patches (Inkoop, Verpakking & Compliance) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Parches Bordados vs. Tejidos y PVC Blando 3D",
      "summary": "Parches Bordados vs. Tejidos y PVC Blando 3D (Sourcing, Empaque y Normativa) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Patch Ricamate vs Tessute Alta Densità e PVC 3D",
      "summary": "Patch Ricamate vs Tessute Alta Densità e PVC 3D (Sourcing, Packaging e Normative) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Patches Bordados vs. Tecidos e PVC Macio 3D",
      "summary": "Patches Bordados vs. Tecidos e PVC Macio 3D (Sourcing, Embalagem e Conformidade) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Broderade Märken vs. Vävda & 3D Mjuka PVC-Märken",
      "summary": "Broderade Märken vs. Vävda & 3D Mjuka PVC-Märken (Inköp, Förpackning & Regler) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Broderede Mærker vs. Vævede & 3D Bløde PVC-Mærker",
      "summary": "Broderede Mærker vs. Vævede & 3D Bløde PVC-Mærker (Indkøb, Emballage & Overholdelse) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Broderte Merker vs. Vevde & 3D Myke PVC-Merker",
      "summary": "Broderte Merker vs. Vevde & 3D Myke PVC-Merker (Innkjøp, Emballasje & Samsvar) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Brodeeratut Merkit vs. Kudotut & 3D Pehmeä PVC",
      "summary": "Brodeeratut Merkit vs. Kudotut & 3D Pehmeä PVC (Hankinta, Pakkaus & Standardit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Naszywki Haftowane vs. Tkane HD i Miękkie PVC 3D",
      "summary": "Naszywki Haftowane vs. Tkane HD i Miękkie PVC 3D (Zakupy, Opakowania i Normy) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Vyšívané Nášivky vs. Tkané a 3D Měkké PVC",
      "summary": "Vyšívané Nášivky vs. Tkané a 3D Měkké PVC (Nákup, Balení a Certifikace) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Вышитые шевроны против жаккарда и 3D-ПВХ патчей",
      "summary": "Вышитые шевроны против жаккарда и 3D-ПВХ патчей (Закупки, упаковка и сертификация) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "カスタム刺繍ワッペン vs 高密度織りネーム＆3DラバーPVCパッチ",
      "summary": "カスタム刺繍ワッペン vs 高密度織りネーム＆3DラバーPVCパッチ (工場調達・パッケージ・安全認証) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "맞춤 자수 패치 vs 고밀도 직조 패치 및 3D 연질 PVC",
      "summary": "맞춤 자수 패치 vs 고밀도 직조 패치 및 3D 연질 PVC (공장 소싱 · 패키징 · 안전 인증) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Patch Bordir vs Tenun HD & Patch Karet PVC 3D",
      "summary": "Patch Bordir vs Tenun HD & Patch Karet PVC 3D (Sourcing, Kemasan & Kepatuhan) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "الرقع المطرزة مقابل المنسوجة ورقع PVC ثلاثية الأبعاد",
      "summary": "الرقع المطرزة مقابل المنسوجة ورقع PVC ثلاثية الأبعاد (التوريد والتغليف ومعايير السلامة) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "custom-enamel-and-3d-cufflinks-tie-bars-executive-menswear-gift-sets": {
    "en": {
      "title": "Custom Brass Cufflinks, Tie Bars & Money Clips: Toggle Hardware, Rhodium Plating & Gift Box Sets",
      "summary": "Design luxury corporate and alumni menswear sets featuring cloisonne hard enamel cufflinks, alligator/slide tie bars, money clips, and velvet boxes."
    },
    "de": {
      "title": "Manschettenknöpfe, Krawattenklammern & Etui-Sets",
      "summary": "Manschettenknöpfe, Krawattenklammern & Etui-Sets (Business, Golf & Souvenirs) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Boutons de Manchette Laiton, Pinces à Cravate & Coffrets",
      "summary": "Boutons de Manchette Laiton, Pinces à Cravate & Coffrets (Affaires, Golf & Souvenirs) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Messing Manchetknopen, Dasklemmen & Geschenksets",
      "summary": "Messing Manchetknopen, Dasklemmen & Geschenksets (Zakelijk, Golf & Souvenirs) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Gemelos de Latón, Pisacorbatas y Estuches Ejecutivos",
      "summary": "Gemelos de Latón, Pisacorbatas y Estuches Ejecutivos (Ejecutivo, Golf y Souvenirs) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Gemelli in Ottone, Fermacravatte e Cofanetti Regalo",
      "summary": "Gemelli in Ottone, Fermacravatte e Cofanetti Regalo (Regali Aziendali, Golf e Souvenir) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Abotoaduras em Latão, Prendedores e Kits de Presente",
      "summary": "Abotoaduras em Latão, Prendedores e Kits de Presente (Executivo, Golfe e Lembranças) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Manschettknappar i Mässing, Slipsnålar & Presentaskar",
      "summary": "Manschettknappar i Mässing, Slipsnålar & Presentaskar (Företagsgåvor, Golf & Souvenirer) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Manchetknapper i Messing, Slipsenåle & Gaveæsker",
      "summary": "Manchetknapper i Messing, Slipsenåle & Gaveæsker (Erhverv, Golf & Souvenirs) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Mansjettknapper i Messing, Slipsnåler & Gaveesker",
      "summary": "Mansjettknapper i Messing, Slipsnåler & Gaveesker (Bedrift, Golf & Suvenirer) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Messinkikalvosinnapit, Solmioneulat & Lahjarasiat",
      "summary": "Messinkikalvosinnapit, Solmioneulat & Lahjarasiat (Liikelahjat, Golf & Matkamuistot) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Spinki do Mankietów, Spinki Krawatowe i Zestawy w Etui",
      "summary": "Spinki do Mankietów, Spinki Krawatowe i Zestawy w Etui (Biznes, Golf i Pamiątki) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Mosazné Manžetové Knoflíčky, Spony a Dárkové Kazety",
      "summary": "Mosazné Manžetové Knoflíčky, Spony a Dárkové Kazety (Manažerské Dárky, Golf a Suvenýry) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Латунные запонки, зажимы для галстука и подарочные наборы",
      "summary": "Латунные запонки, зажимы для галстука и подарочные наборы (Бизнес-сувениры, Гольф и Подарки) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "真鍮製カフスボタン・タイピン＆ベルベット贈答ボックスセット",
      "summary": "真鍮製カフスボタン・タイピン＆ベルベット贈答ボックスセット (ギフト・ゴルフ・観光記念品) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "황동 커프스링크 · 넥타이핀 · 머니클립 및 선물 세트 가이드",
      "summary": "황동 커프스링크 · 넥타이핀 · 머니클립 및 선물 세트 가이드 (비즈니스 기프트 · 골프 · 기념품) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Manset Kuningan, Penjepit Dasi & Set Kotak Kado",
      "summary": "Manset Kuningan, Penjepit Dasi & Set Kotak Kado (Hadiah Eksekutif, Golf & Suvenir) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "أزرار الأكمام النحاسية ومشابك ربطات العنق وعلب الهدايا",
      "summary": "أزرار الأكمام النحاسية ومشابك ربطات العنق وعلب الهدايا (الهدايا التنفيذية والجولف والتذكارات) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "custom-golf-divot-repair-tools-and-magnetic-hat-clip-ball-markers-guide": {
    "en": {
      "title": "Custom Golf Divot Repair Tools & Magnetic Ball Markers: Charity Tournament & Pro-Shop Playbook",
      "summary": "Specify magnetic 2-prong divot tools, folding switchblade forks, visor hat clips, antique brass/poker chip markers, and tournament window tin sets."
    },
    "de": {
      "title": "Golf-Pitchgabeln & Magnetische Ballmarker-Clips",
      "summary": "Golf-Pitchgabeln & Magnetische Ballmarker-Clips (Business, Golf & Souvenirs) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Relève-Pitchs Golf & Marque-Balles Aimantés sur Casquette",
      "summary": "Relève-Pitchs Golf & Marque-Balles Aimantés sur Casquette (Affaires, Golf & Souvenirs) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Golf Divot Tools & Magnetische Pet-Clip Balmarkers",
      "summary": "Golf Divot Tools & Magnetische Pet-Clip Balmarkers (Zakelijk, Golf & Souvenirs) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Arreglapiques de Golf y Marcadores Magnéticos de Gorra",
      "summary": "Arreglapiques de Golf y Marcadores Magnéticos de Gorra (Ejecutivo, Golf y Souvenirs) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Alzapitch Golf e Marcapalline Magnetici da Cappello",
      "summary": "Alzapitch Golf e Marcapalline Magnetici da Cappello (Regali Aziendali, Golf e Souvenir) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Reparadores de Divot e Marcadores Magnéticos de Boné",
      "summary": "Reparadores de Divot e Marcadores Magnéticos de Boné (Executivo, Golfe e Lembranças) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Golflagare & Magnetiska Bollmarkörer för Kepsklämma",
      "summary": "Golflagare & Magnetiska Bollmarkörer för Kepsklämma (Företagsgåvor, Golf & Souvenirer) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Golf Divot Tools & Magnetiske Kasket-Boldmarkører",
      "summary": "Golf Divot Tools & Magnetiske Kasket-Boldmarkører (Erhverv, Golf & Souvenirs) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Golf Greengaffel & Magnetiske Caps-Ballmarkører",
      "summary": "Golf Greengaffel & Magnetiske Caps-Ballmarkører (Bedrift, Golf & Suvenirer) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Golf-Griinihaarukat & Magneettiset Lippis-Pallomerkit",
      "summary": "Golf-Griinihaarukat & Magneettiset Lippis-Pallomerkit (Liikelahjat, Golf & Matkamuistot) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Widełki Golfowe (Divot Tools) i Magnetyczne Markery",
      "summary": "Widełki Golfowe (Divot Tools) i Magnetyczne Markery (Biznes, Golf i Pamiątki) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Golfová Vypichovátka a Magnetické Markéry na Kšilt",
      "summary": "Golfová Vypichovátka a Magnetické Markéry na Kšilt (Manažerské Dárky, Golf a Suvenýry) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Вилки для гольфа и магнитные маркеры мяча с клипсой",
      "summary": "Вилки для гольфа и магнитные маркеры мяча с клипсой (Бизнес-сувениры, Гольф и Подарки) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "ゴルフ大会向けカスタムディボットフォーク＆帽子クリップマーカー",
      "summary": "ゴルフ大会向けカスタムディボットフォーク＆帽子クリップマーカー (ギフト・ゴルフ・観光記念品) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "골프 대회용 커스텀 디봇 수리기 및 자석 모자 클립 마커",
      "summary": "골프 대회용 커스텀 디봇 수리기 및 자석 모자 클립 마커 (비즈니스 기프트 · 골프 · 기념품) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Alat Golf Divot Tool & Penanda Bola Topi Magnetik",
      "summary": "Alat Golf Divot Tool & Penanda Bola Topi Magnetik (Hadiah Eksekutif, Golf & Suvenir) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "أدوات إصلاح عشب الجولف وعلامات الكرة المغناطيسية",
      "summary": "أدوات إصلاح عشب الجولف وعلامات الكرة المغناطيسية (الهدايا التنفيذية والجولف والتذكارات) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "custom-marathon-and-5k-10k-finisher-medals-race-director-sourcing-guide": {
    "en": {
      "title": "Custom Marathon & 5K/10K Finisher Medals: Sizing, Thickness, Weight & Lead Time Planning for Race Directors",
      "summary": "Complete race director sourcing blueprint for custom 2.5\"–4.5\" marathon finisher medals, weight specs (54g–178g), ribbon pairing, and race-day scheduling."
    },
    "de": {
      "title": "Marathon- & 5K/10K-Finisher-Medaillen Leitfaden",
      "summary": "Marathon- & 5K/10K-Finisher-Medaillen Leitfaden (Medaillen & Sportevents) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Médailles Finisher Marathon & 5/10 km : Guide Organisateur",
      "summary": "Médailles Finisher Marathon & 5/10 km : Guide Organisateur (Médailles & Événements Sportifs) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Marathon & 5K/10K Finisher Medailles Inkoopgids",
      "summary": "Marathon & 5K/10K Finisher Medailles Inkoopgids (Medailles & Sportevenementen) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Medallas Finisher de Maratón y 5K/10K para Organizadores",
      "summary": "Medallas Finisher de Maratón y 5K/10K para Organizadores (Medallas y Eventos Deportivos) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Medaglie Finisher Maratona & 5/10K: Guida Organizzatori",
      "summary": "Medaglie Finisher Maratona & 5/10K: Guida Organizzatori (Medaglie ed Eventi Sportivi) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Medalhas Finisher de Maratona e 5K/10K para Organizadores",
      "summary": "Medalhas Finisher de Maratona e 5K/10K para Organizadores (Medalhas e Eventos Desportivos) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Maraton- & 5/10 km Finisher-Medaljer: Arrangörsguide",
      "summary": "Maraton- & 5/10 km Finisher-Medaljer: Arrangörsguide (Medaljer & Idrottsevenemang) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Maraton- & 5/10 km Finisher-Medaljer: Arrangørguide",
      "summary": "Maraton- & 5/10 km Finisher-Medaljer: Arrangørguide (Medaljer & Sportsevents) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Maraton- & 5/10 km Finisher-Medaljer: Arrangørguide",
      "summary": "Maraton- & 5/10 km Finisher-Medaljer: Arrangørguide (Medaljer & Idrettsarrangementer) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Maraton- & 5/10 km Maaliinjuoksumitalit: Järjestäjän Opas",
      "summary": "Maraton- & 5/10 km Maaliinjuoksumitalit: Järjestäjän Opas (Mitalit & Urheilutapahtumat) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Medale Finisherów Maratonów i Biegów 5/10 km: Poradnik",
      "summary": "Medale Finisherów Maratonów i Biegów 5/10 km: Poradnik (Medale i Imprezy Sportowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Finisher Medaile pro Maraton a Běhy 5/10 km: Průvodce",
      "summary": "Finisher Medaile pro Maraton a Běhy 5/10 km: Průvodce (Medaile a Sportovní Akce) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Медали финишёра марафона и забегов 5/10 км: гид организатора",
      "summary": "Медали финишёра марафона и забегов 5/10 км: гид организатора (Медали и спортивные события) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "マラソン・5K/10K完走メダル：サイズ・厚み・重量・納期設計ガイド",
      "summary": "マラソン・5K/10K完走メダル：サイズ・厚み・重量・納期設計ガイド (マラソンメダル・スポーツ大会) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "마라톤 및 5K/10K 완주 메달: 규격, 두께, 무게 및 납기 가이드",
      "summary": "마라톤 및 5K/10K 완주 메달: 규격, 두께, 무게 및 납기 가이드 (마라톤 메달 및 스포츠 행사) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Medali Finisher Maraton & Lari 5K/10K untuk Penyelenggara",
      "summary": "Medali Finisher Maraton & Lari 5K/10K untuk Penyelenggara (Medali & Acara Olahraga) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "دليل توريد ميداليات الماراثون وسباقات 5 و10 كم للمنظمين",
      "summary": "دليل توريد ميداليات الماراثون وسباقات 5 و10 كم للمنظمين (الميداليات والفعاليات الرياضية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "custom-military-and-law-enforcement-challenge-coins-sizing-edge-guide": {
    "en": {
      "title": "Military & Law Enforcement Challenge Coins: Standard Diameters (1.75\"–2\"), Thickness & 6 Edge Cuts",
      "summary": "Specify authentic 1.75\" and 2.0\" die-struck brass military and police challenge coins with 3.5mm heft and 6 CNC diamond-cut edge profiles."
    },
    "de": {
      "title": "Challenge Coins: Durchmesser (45–50mm) & 6 Randprofile",
      "summary": "Challenge Coins: Durchmesser (45–50mm) & 6 Randprofile (Coins & Dienstabzeichen) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Pièces Challenge : Tailles (45–50mm) & 6 Tranches Diamant",
      "summary": "Pièces Challenge : Tailles (45–50mm) & 6 Tranches Diamant (Pièces Challenge & Insignes) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Challenge Coins: Diameters (45–50mm) & 6 Randprofielen",
      "summary": "Challenge Coins: Diameters (45–50mm) & 6 Randprofielen (Munten & Dienstinsignes) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Monedas Challenge: Diámetros (45–50mm) y 6 Cantos",
      "summary": "Monedas Challenge: Diámetros (45–50mm) y 6 Cantos (Monedas e Insignias Oficiales) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Monete Challenge: Diametri (45–50mm) e 6 Bordi",
      "summary": "Monete Challenge: Diametri (45–50mm) e 6 Bordi (Monete e Distintivi Militari) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Moedas Challenge: Diâmetros (45–50mm) e 6 Bordas",
      "summary": "Moedas Challenge: Diâmetros (45–50mm) e 6 Bordas (Moedas e Distintivos Oficiais) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Challenge Coins: Diametrar (45–50mm) & 6 Kantprofiler",
      "summary": "Challenge Coins: Diametrar (45–50mm) & 6 Kantprofiler (Challenge Coins & Tjänstetecken) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Challenge Coins: Diametre (45–50mm) & 6 Kantprofiler",
      "summary": "Challenge Coins: Diametre (45–50mm) & 6 Kantprofiler (Challenge Coins & Insignia) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Challenge Coins: Diametre (45–50mm) & 6 Kantprofiler",
      "summary": "Challenge Coins: Diametre (45–50mm) & 6 Kantprofiler (Challenge Coins & Merker) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Challenge-kolikot: Koot (45–50mm) & 6 Reunaprofiilia",
      "summary": "Challenge-kolikot: Koot (45–50mm) & 6 Reunaprofiilia (Kolikot & Virkamerkit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Monety Challenge: Średnice (45–50mm) i 6 Profili Rantów",
      "summary": "Monety Challenge: Średnice (45–50mm) i 6 Profili Rantów (Monety i Odznaki Służb) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Challenge Mince: Průměry (45–50mm) a 6 Profilů Hran",
      "summary": "Challenge Mince: Průměry (45–50mm) a 6 Profilů Hran (Challenge Mince a Odznaky Sborů) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Монеты Challenge Coins: диаметры (45–50 мм) и 6 видов гуртов",
      "summary": "Монеты Challenge Coins: диаметры (45–50 мм) и 6 видов гуртов (Монеты Challenge и знаки служб) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "ミリタリー＆警察チャレンジコイン：標準径(1.75\"–2\")・厚み・6種エッジ刻印",
      "summary": "ミリタリー＆警察チャレンジコイン：標準径(1.75\"–2\")・厚み・6種エッジ刻印 (コイン・警察/軍用インシグニア) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "군·경찰 챌린지 코인: 표준 직경(1.75\"–2\"), 두께 및 6종 측면 가공",
      "summary": "군·경찰 챌린지 코인: 표준 직경(1.75\"–2\"), 두께 및 6종 측면 가공 (챌린지 코인 및 관공서 배지) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Koin Challenge Militer: Ukuran (45–50mm) & 6 Profil Tepi",
      "summary": "Koin Challenge Militer: Ukuran (45–50mm) & 6 Profil Tepi (Koin Challenge & Insignia Resmi) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "عملات التحدي العسكرية: الأقطار القياسية (45–50 مم) و6 حواف",
      "summary": "عملات التحدي العسكرية: الأقطار القياسية (45–50 مم) و6 حواف (العملات التذكارية والشارات العسكرية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "custom-mold-tooling-fees-explained-how-to-get-zero-mold-fee-wholesale": {
    "en": {
      "title": "Custom Mold & Tooling Fees Explained: 2D vs. 3D Die Costs, 500+ Bulk Waivers & 3-Year Storage",
      "summary": "Compare custom 2D stamping dies ($45–$85) and 3D zinc molds ($95–$150), bulk fee waivers at 500–1,000+ pcs, and free 3-year reorder storage."
    },
    "de": {
      "title": "Form- & Werkzeugkosten: 2D/3D-Tarife vs. Gebührenerlass",
      "summary": "Form- & Werkzeugkosten: 2D/3D-Tarife vs. Gebührenerlass (Werkstoffe & Prägetechnik) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugbefreiung ab 500–1.000 Stk. und 3 Jahre Lagerung."
    },
    "fr": {
      "title": "Frais d’Outillage Expliqués : Tarifs 2D/3D vs Exonération 500+",
      "summary": "Frais d’Outillage Expliqués : Tarifs 2D/3D vs Exonération 500+ (Matériaux & Fabrication) — Tolérances certifiées à Zhongshan, gratuité dès 500–1 000 pcs et stockage 3 ans."
    },
    "nl": {
      "title": "Matrijs- & Gereedschapskosten: 2D/3D Tarief vs. 500+ Vrijstelling",
      "summary": "Matrijs- & Gereedschapskosten: 2D/3D Tarief vs. 500+ Vrijstelling (Materialen & Productie) — Fabriekstoleranties uit Zhongshan, kwijtschelding vanaf 500–1.000 st. en 3 jaar opslag."
    },
    "es": {
      "title": "Costos de Moldes y Troqueles: Tarifas 2D/3D y Exención 500+",
      "summary": "Costos de Moldes y Troqueles: Tarifas 2D/3D y Exención 500+ (Materiales y Fabricación) — Tolerancias verificadas en Zhongshan, exención desde 500–1,000 uds y custodia 3 años."
    },
    "it": {
      "title": "Costi di Stampo e Conio: Tariffe 2D/3D ed Esenzione Volumi 500+",
      "summary": "Costi di Stampo e Conio: Tariffe 2D/3D ed Esenzione Volumi 500+ (Materiali e Produzione) — Tolleranze certificate a Zhongshan, azzeramento da 500–1.000 pz e deposito gratis 3 anni."
    },
    "pt": {
      "title": "Taxas de Molde e Cunho: Custos 2D/3D vs. Isenção em 500+ Un.",
      "summary": "Taxas de Molde e Cunho: Custos 2D/3D vs. Isenção em 500+ Un. (Materiais e Fabrico) — Tolerâncias em Zhongshan, isenção a 500–1.000+ un e guarda gratuita por 3 anos."
    },
    "sv": {
      "title": "Form- & Verktygskostnader: 2D/3D-Priser & Volymbefrielse 500+",
      "summary": "Form- & Verktygskostnader: 2D/3D-Priser & Volymbefrielse 500+ (Material & Tillverkning) — Toleranser från Zhongshan, fritt verktyg vid 500–1 000+ st och 3 års lagring."
    },
    "da": {
      "title": "Form- & Værktøjsgebyrer: 2D/3D Priser & Fritagelse ved 500+",
      "summary": "Form- & Værktøjsgebyrer: 2D/3D Priser & Fritagelse ved 500+ (Materialer & Produktion) — Fabrikstolerancer fra Zhongshan, gebyrfritaget ved 500–1.000+ stk og 3 års lagring."
    },
    "no": {
      "title": "Form- & Verktøygebyrer: 2D/3D Priser & Fritak fra 500 Stk",
      "summary": "Form- & Verktøygebyrer: 2D/3D Priser & Fritak fra 500 Stk (Materialer & Produksjon) — Fabrikktoleranser fra Zhongshan, fritak ved 500–1 000+ stk og 3 års fri lagring."
    },
    "fi": {
      "title": "Muotti- & Työkalukulut: 2D/3D Hinnat & Vapautus 500+ Erissä",
      "summary": "Muotti- & Työkalukulut: 2D/3D Hinnat & Vapautus 500+ Erissä (Materiaalit & Valmistus) — Zhongshanin toleranssit, maksuton ≥ 500–1 000 kpl erissä ja 3 v. säilytys."
    },
    "pl": {
      "title": "Koszty Matryc i Form: Stawki 2D/3D & Zwolnienie przy 500+ Szt.",
      "summary": "Koszty Matryc i Form: Stawki 2D/3D & Zwolnienie przy 500+ Szt. (Materiały i Produkcja) — Tolerancje z Zhongshan, bezpłatna matryca ≥ 500–1 000 szt. i archiwum 3 lata."
    },
    "cs": {
      "title": "Poplatky za Formy a Raznice: 2D/3D Ceny & Odpuštění od 500 Ks",
      "summary": "Poplatky za Formy a Raznice: 2D/3D Ceny & Odpuštění od 500 Ks (Materiály a Výroba) — Tolerance z Zhongshanu, zdarma od 500–1 000 ks a uložení na 3 roky."
    },
    "ru": {
      "title": "Стоимость 2D/3D штампов и пресс-форм: отмена платы от 500 шт.",
      "summary": "Стоимость 2D/3D штампов и пресс-форм: отмена платы от 500 шт. (Материалы и производство) — Допуски завода в Чжуншане, обнуление от 500–1 000 шт. и хранение 3 года."
    },
    "ja": {
      "title": "金型・プレス型代解説：2D/3D料金と500〜1,000個での免除・3年間保管",
      "summary": "金型・プレス型代解説：2D/3D料金と500〜1,000個での免除・3年間保管 (素材・製造プロセス工学) — 中山直営工場の公差基準・型代免除条件・再注文ゼロコスト仕組みを詳解。"
    },
    "ko": {
      "title": "금형비·툴링비 완전 분석: 2D/3D 제작비, 500개 이상 면제 및 3년 보관",
      "summary": "금형비·툴링비 완전 분석: 2D/3D 제작비, 500개 이상 면제 및 3년 보관 (소재 및 제조 공법) — 중국 중산 공장의 정밀 공차 데이터, 대량 면제 기준 및 재주문 무료 정책."
    },
    "id": {
      "title": "Penjelasan Biaya Matras & Cetakan: Tarif 2D/3D & Gratis 500+ Pcs",
      "summary": "Penjelasan Biaya Matras & Cetakan: Tarif 2D/3D & Gratis 500+ Pcs (Material & Manufaktur) — Toleransi pabrik Zhongshan, pembebasan biaya ≥ 500–1.000 pcs dan simpan gratis 3 tahun."
    },
    "ar": {
      "title": "شرح رسوم القوالب الهندسية: تكاليف 2D/3D والإعفاء عند 500+ قطعة",
      "summary": "شرح رسوم القوالب الهندسية: تكاليف 2D/3D والإعفاء عند 500+ قطعة (المواد والتصنيع المعدني) — معايير تشونغشان، إعفاء القالب عند 500–1,000+ قطعة وحفظه مجاناً 3 سنوات."
    }
  },
  "custom-retail-backing-cards-velvet-boxes-and-acrylic-display-packaging": {
    "en": {
      "title": "Retail Pin Backing Cards, Velvet Gift Boxes & Acrylic Coin Capsules: Boosting Margin 35%+ at Checkout",
      "summary": "Turn wholesale pins, medals, and challenge coins into retail-ready gifts with 350gsm foil backing cards, 38–50mm acrylic capsules, and velvet boxes."
    },
    "de": {
      "title": "Display-Trägerkarten, Samtboxen & Münzkapseln",
      "summary": "Display-Trägerkarten, Samtboxen & Münzkapseln (Beschaffung, Verpackung & Sicherheit) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Cartes Support Retail, Coffrets Velours & Capsules",
      "summary": "Cartes Support Retail, Coffrets Velours & Capsules (Sourcing, Packaging & Normes) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Retail Pin Backcards, Fluwelen Doosjes & Muntcapsules",
      "summary": "Retail Pin Backcards, Fluwelen Doosjes & Muntcapsules (Inkoop, Verpakking & Compliance) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Tarjetas Minoristas para Pines, Estuches y Cápsulas",
      "summary": "Tarjetas Minoristas para Pines, Estuches y Cápsulas (Sourcing, Empaque y Normativa) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Cartoncini Retail per Spille, Astucci Velluto e Capsule",
      "summary": "Cartoncini Retail per Spille, Astucci Velluto e Capsule (Sourcing, Packaging e Normative) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Cartões de Venda para Broches, Estojos e Cápsulas",
      "summary": "Cartões de Venda para Broches, Estojos e Cápsulas (Sourcing, Embalagem e Conformidade) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Butikskort för Pins, Sammetsaskar & Myntkapslar",
      "summary": "Butikskort för Pins, Sammetsaskar & Myntkapslar (Inköp, Förpackning & Regler) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Detail-Bagkort til Pins, Fløjlsæsker & Møntkapsler",
      "summary": "Detail-Bagkort til Pins, Fløjlsæsker & Møntkapsler (Indkøb, Emballage & Overholdelse) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Butikk-Bakkort for Pins, Fløyelsbokser & Myntkapsler",
      "summary": "Butikk-Bakkort for Pins, Fløyelsbokser & Myntkapsler (Innkjøp, Emballasje & Samsvar) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Vähittäismyyntikortit, Samettikotelot & Kolikkokapselit",
      "summary": "Vähittäismyyntikortit, Samettikotelot & Kolikkokapselit (Hankinta, Pakkaus & Standardit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Kartoniki Detaliczne, Etui Welurowe i Kapsuły na Monety",
      "summary": "Kartoniki Detaliczne, Etui Welurowe i Kapsuły na Monety (Zakupy, Opakowania i Normy) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Prodejní Karty pro Odznaky, Sametové Krabičky a Kapsle",
      "summary": "Prodejní Karty pro Odznaky, Sametové Krabičky a Kapsle (Nákup, Balení a Certifikace) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Картонные карты, бархатные боксы и акриловые капсулы",
      "summary": "Картонные карты, бархатные боксы и акриловые капсулы (Закупки, упаковка и сертификация) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "小売用400gピン台紙・ベルベット箱・透明コインカプセル包装",
      "summary": "小売用400gピン台紙・ベルベット箱・透明コインカプセル包装 (工場調達・パッケージ・安全認証) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "리테일 백킹 카드, 벨벳 선물 박스 & 아크릴 코인 캡슐 패키징",
      "summary": "리테일 백킹 카드, 벨벳 선물 박스 & 아크릴 코인 캡슐 패키징 (공장 소싱 · 패키징 · 안전 인증) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Kartu Pin Ritel, Kotak Beludru & Kapsul Koin Akrilik",
      "summary": "Kartu Pin Ritel, Kotak Beludru & Kapsul Koin Akrilik (Sourcing, Kemasan & Kepatuhan) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "بطاقات العرض التجارية والعلب المخملية وكبسولات العملات",
      "summary": "بطاقات العرض التجارية والعلب المخملية وكبسولات العملات (التوريد والتغليف ومعايير السلامة) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "cut-out-hollow-design-and-inner-cut-mold-fees-for-medals-and-coins": {
    "en": {
      "title": "Cut-Out Hollow Design Engineering for Race Medals, Challenge Coins & Keychains: Wall Thickness Rules",
      "summary": "Engineering rules for open inner cut-out windows in race medals, shield coins, and metal keychains: minimum bridge width, trim dies, and pricing."
    },
    "de": {
      "title": "Durchbruch-Design & Innen-Stanzregeln bei Medaillen",
      "summary": "Durchbruch-Design & Innen-Stanzregeln bei Medaillen (Werkstoffe & Prägetechnik) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Découpes Ajourées & Règles d’Outillage pour Médailles",
      "summary": "Découpes Ajourées & Règles d’Outillage pour Médailles (Matériaux & Fabrication) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Uitgesneden (Cut-Out) Gaten & Binnenmatrijs Regels",
      "summary": "Uitgesneden (Cut-Out) Gaten & Binnenmatrijs Regels (Materialen & Productie) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Diseños Calados (Cut-Out) en Medallas y Monedas",
      "summary": "Diseños Calados (Cut-Out) en Medallas y Monedas (Materiales y Fabricación) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Design Traforati (Cut-Out) per Medaglie e Monete",
      "summary": "Design Traforati (Cut-Out) per Medaglie e Monete (Materiali e Produzione) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Design Vazado (Cut-Out) em Medalhas e Moedas",
      "summary": "Design Vazado (Cut-Out) em Medalhas e Moedas (Materiais e Fabrico) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Utskurna (Cut-Out) Öppningar i Medaljer & Mynt",
      "summary": "Utskurna (Cut-Out) Öppningar i Medaljer & Mynt (Material & Tillverkning) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Udskårne (Cut-Out) Åbninger i Medaljer & Mønter",
      "summary": "Udskårne (Cut-Out) Åbninger i Medaljer & Mønter (Materialer & Produktion) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Utskårne (Cut-Out) Åpninger i Medaljer & Mynter",
      "summary": "Utskårne (Cut-Out) Åpninger i Medaljer & Mynter (Materialer & Produksjon) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Lävistetyt (Cut-Out) Reikäsuunnitelmat Mitaleissa",
      "summary": "Lävistetyt (Cut-Out) Reikäsuunnitelmat Mitaleissa (Materiaalit & Valmistus) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Ażurowe Wycięcia (Cut-Out) w Medalach i Monetach",
      "summary": "Ażurowe Wycięcia (Cut-Out) w Medalach i Monetach (Materiały i Produkcja) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Průřezový Design (Cut-Out) u Medailí a Mincí",
      "summary": "Průřezový Design (Cut-Out) u Medailí a Mincí (Materiály a Výroba) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Сквозные окна (Cut-Out) в медалях, монетах и брелоках",
      "summary": "Сквозные окна (Cut-Out) в медалях, монетах и брелоках (Материалы и производство) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "メダル・コイン・キーホルダーの肉抜き(カットアウト)構造と壁厚設計",
      "summary": "メダル・コイン・キーホルダーの肉抜き(カットアウト)構造と壁厚設計 (素材・製造プロセス工学) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "메달 · 코인 · 키링 타공(컷아웃) 설계 규칙 및 최소 살두께",
      "summary": "메달 · 코인 · 키링 타공(컷아웃) 설계 규칙 및 최소 살두께 (소재 및 제조 공법) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Desain Lubang Cut-Out & Aturan Ketebalan Dinding Medali",
      "summary": "Desain Lubang Cut-Out & Aturan Ketebalan Dinding Medali (Material & Manufaktur) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "تصاميم التفريغ الداخلي وقواعد السماكة للميداليات والعملات",
      "summary": "تصاميم التفريغ الداخلي وقواعد السماكة للميداليات والعملات (المواد والتصنيع المعدني) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "dual-plated-two-tone-gold-silver-challenge-coins-masking-process": {
    "en": {
      "title": "Dual-Plated Two-Tone Challenge Coins & Badges: How Selective Electroplating Masking Creates Contrast",
      "summary": "Inside the hand-masking dual electroplating workflow that combines 24K gold and antique silver or black nickel on luxury coins, badges, and medallions."
    },
    "de": {
      "title": "Zweifach-Galvanik (Bicolor Gold/Silber) Abdecktechnik",
      "summary": "Zweifach-Galvanik (Bicolor Gold/Silber) Abdecktechnik (Coins & Dienstabzeichen) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Placage Bi-Ton Or/Argent : Procédé de Masquage",
      "summary": "Placage Bi-Ton Or/Argent : Procédé de Masquage (Pièces Challenge & Insignes) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Tweekleurig Goud/Zilver Plateren & Maskeerproces",
      "summary": "Tweekleurig Goud/Zilver Plateren & Maskeerproces (Munten & Dienstinsignes) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Baño Bicolor Oro y Plata con Enmascarado Selectivo",
      "summary": "Baño Bicolor Oro y Plata con Enmascarado Selectivo (Monedas e Insignias Oficiales) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Galvanica Bicolore Oro e Argento con Mascheratura",
      "summary": "Galvanica Bicolore Oro e Argento con Mascheratura (Monete e Distintivi Militari) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Banho Bicolor Ouro e Prata com Mascaramento Seletivo",
      "summary": "Banho Bicolor Ouro e Prata com Mascaramento Seletivo (Moedas e Distintivos Oficiais) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Tvåtonsplätering (Guld/Silver) med Maskeringsteknik",
      "summary": "Tvåtonsplätering (Guld/Silver) med Maskeringsteknik (Challenge Coins & Tjänstetecken) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Tofarvet Plettering (Guld/Sølv) Maskeringsproces",
      "summary": "Tofarvet Plettering (Guld/Sølv) Maskeringsproces (Challenge Coins & Insignia) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Tofarget Plettering (Gull/Sølv) Maskeringsprosess",
      "summary": "Tofarget Plettering (Gull/Sølv) Maskeringsprosess (Challenge Coins & Merker) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Kaksivärinen Kulta/Hopea-Pinnoitus ja Suojamaalaus",
      "summary": "Kaksivärinen Kulta/Hopea-Pinnoitus ja Suojamaalaus (Kolikot & Virkamerkit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Powłoka Dwukolorowa (Złoto/Srebro) i Maskowanie",
      "summary": "Powłoka Dwukolorowa (Złoto/Srebro) i Maskowanie (Monety i Odznaki Służb) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Dvoutónové Pokovení (Zlato/Stříbro) a Maskování",
      "summary": "Dvoutónové Pokovení (Zlato/Stříbro) a Maskování (Challenge Mince a Odznaky Sborů) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Двухцветная гальваника (золото + серебро) с маскированием",
      "summary": "Двухцветная гальваника (золото + серебро) с маскированием (Монеты Challenge и знаки служб) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "ゴールド×シルバー二色コンビメッキ（マスキング工程）解説",
      "summary": "ゴールド×シルバー二色コンビメッキ（マスキング工程）解説 (コイン・警察/軍用インシグニア) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "투톤 이중 도금 (금도금 + 은도금) 마스킹 공정 원리",
      "summary": "투톤 이중 도금 (금도금 + 은도금) 마스킹 공정 원리 (챌린지 코인 및 관공서 배지) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Plating Dua Warna Emas-Perak dengan Proses Masking",
      "summary": "Plating Dua Warna Emas-Perak dengan Proses Masking (Koin Challenge & Insignia Resmi) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "الطلاء الثنائي الذهبي والفضي بتقنية التغطية الانتقائية",
      "summary": "الطلاء الثنائي الذهبي والفضي بتقنية التغطية الانتقائية (العملات التذكارية والشارات العسكرية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "dye-sublimated-vs-woven-neck-ribbons-for-custom-sports-medals": {
    "en": {
      "title": "Custom Medal Neck Ribbons: Full-Color Dye-Sublimated Satin vs. Woven Jacquard & V-Stitch Hardware",
      "summary": "Compare 25mm and 38mm full-color dye-sublimated polyester satin ribbons vs woven jacquard medal lanyards, V-stitching, jump rings, and safety breakaways."
    },
    "de": {
      "title": "Sublimierte Satinbänder vs. Gewebte Medaillenbänder",
      "summary": "Sublimierte Satinbänder vs. Gewebte Medaillenbänder (Medaillen & Sportevents) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Rubans de Médaille : Satin Sublimé vs Tissé Jacquard",
      "summary": "Rubans de Médaille : Satin Sublimé vs Tissé Jacquard (Médailles & Événements Sportifs) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Gesublimeerde vs. Geweven Medaille Halslinten",
      "summary": "Gesublimeerde vs. Geweven Medaille Halslinten (Medailles & Sportevenementen) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Cintas para Medallas: Sublimadas vs. Tejidas Jacquard",
      "summary": "Cintas para Medallas: Sublimadas vs. Tejidas Jacquard (Medallas y Eventos Deportivos) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Nastri per Medaglie: Sublimati Full-Color vs Tessuti",
      "summary": "Nastri per Medaglie: Sublimati Full-Color vs Tessuti (Medaglie ed Eventi Sportivi) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Fitas para Medalhas: Sublimadas vs. Tecidas Jacquard",
      "summary": "Fitas para Medalhas: Sublimadas vs. Tecidas Jacquard (Medalhas e Eventos Desportivos) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Medaljhalsband: Sublimerad Satin vs. Vävd Jacquard",
      "summary": "Medaljhalsband: Sublimerad Satin vs. Vävd Jacquard (Medaljer & Idrottsevenemang) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Medaljebånd: Sublimeret Satin vs. Vævet Jacquard",
      "summary": "Medaljebånd: Sublimeret Satin vs. Vævet Jacquard (Medaljer & Sportsevents) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Medaljebånd: Sublimert Sateng vs. Vevet Jacquard",
      "summary": "Medaljebånd: Sublimert Sateng vs. Vevet Jacquard (Medaljer & Idrettsarrangementer) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Mitalinauhat: Sublimoitu Satiini vs. Kudottu Jacquard",
      "summary": "Mitalinauhat: Sublimoitu Satiini vs. Kudottu Jacquard (Mitalit & Urheilutapahtumat) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Wstążki do Medali: Sublimowane vs. Tkane Żakardowo",
      "summary": "Wstążki do Medali: Sublimowane vs. Tkane Żakardowo (Medale i Imprezy Sportowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Stuhy k Medailím: Sublimovaný Satén vs. Vytkávaný Žakár",
      "summary": "Stuhy k Medailím: Sublimovaný Satén vs. Vytkávaný Žakár (Medaile a Sportovní Akce) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Ленты для медалей: сублимация против жаккардового плетения",
      "summary": "Ленты для медалей: сублимация против жаккардового плетения (Медали и спортивные события) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "マラソンメダル用ネックリボン比較：フルカラー昇華転写 vs ジャカード織り",
      "summary": "マラソンメダル用ネックリボン比較：フルカラー昇華転写 vs ジャカード織り (マラソンメダル・スポーツ大会) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "맞춤 메달 리본 비교: 풀컬러 승화전사 vs 자카드 직조 리본",
      "summary": "맞춤 메달 리본 비교: 풀컬러 승화전사 vs 자카드 직조 리본 (마라톤 메달 및 스포츠 행사) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Pita Leher Medali: Satin Sublimasi vs Tenun Jacquard",
      "summary": "Pita Leher Medali: Satin Sublimasi vs Tenun Jacquard (Medali & Acara Olahraga) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "أشرطة الميداليات: الساتان المطبوع بالتسامي مقابل المنسوج",
      "summary": "أشرطة الميداليات: الساتان المطبوع بالتسامي مقابل المنسوج (الميداليات والفعاليات الرياضية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "electroplating-finishes-guide-antique-brass-real-gold-black-nickel-pvd": {
    "en": {
      "title": "12 Electroplating & PVD Finishes for Custom Pins, Medals & Coins: Tarnish Resistance & Cost Matrix",
      "summary": "Compare 18K shiny gold, rhodium silver, black nickel, antique bronze, dyed matte black, and rainbow PVD finishes for pins, medals, and coins."
    },
    "de": {
      "title": "12 Galvanik-Finishes: Antikmessing, Echtgold & Schwarznickel",
      "summary": "12 Galvanik-Finishes: Antikmessing, Echtgold & Schwarznickel (Werkstoffe & Prägetechnik) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "12 Finitions Galvaniques : Laiton Antique, Or 24K & Nickel Noir",
      "summary": "12 Finitions Galvaniques : Laiton Antique, Or 24K & Nickel Noir (Matériaux & Fabrication) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "12 Galvanisatie Finishes: Antiek Messing, Goud & Zwart Nikkel",
      "summary": "12 Galvanisatie Finishes: Antiek Messing, Goud & Zwart Nikkel (Materialen & Productie) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "12 Acabados Metálicos: Bronce Antiguo, Oro y Níquel Negro",
      "summary": "12 Acabados Metálicos: Bronce Antiguo, Oro y Níquel Negro (Materiales y Fabricación) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "12 Finiture Galvaniche: Ottone Antico, Oro e Nichel Nero",
      "summary": "12 Finiture Galvaniche: Ottone Antico, Oro e Nichel Nero (Materiali e Produzione) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "12 Banhos Metálicos: Latão Antigo, Ouro Real e Níquel Preto",
      "summary": "12 Banhos Metálicos: Latão Antigo, Ouro Real e Níquel Preto (Materiais e Fabrico) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "12 Pläteringsfinisher: Antikmässing, Äkta Guld & Svartnickel",
      "summary": "12 Pläteringsfinisher: Antikmässing, Äkta Guld & Svartnickel (Material & Tillverkning) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "12 Pletteringer: Antik Messing, Ægte Guld & Sort Nikkel",
      "summary": "12 Pletteringer: Antik Messing, Ægte Guld & Sort Nikkel (Materialer & Produktion) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "12 Pletteringer: Antikk Messing, Ekte Gull & Svart Nikkel",
      "summary": "12 Pletteringer: Antikk Messing, Ekte Gull & Svart Nikkel (Materialer & Produksjon) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "12 Pinnoitusta: Antiikkimessinki, Aito Kulta & Musta Nikkeli",
      "summary": "12 Pinnoitusta: Antiikkimessinki, Aito Kulta & Musta Nikkeli (Materiaalit & Valmistus) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "12 Powłok Galwanicznych: Antyczny Mosiądz, Złoto i Czarny Nikiel",
      "summary": "12 Powłok Galwanicznych: Antyczny Mosiądz, Złoto i Czarny Nikiel (Materiały i Produkcja) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "12 Povrchových Úprav: Staromosaz, Zlato a Černý Nikl",
      "summary": "12 Povrchových Úprav: Staromosaz, Zlato a Černý Nikl (Materiály a Výroba) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "12 гальванических покрытий: античная бронза, золото и чёрный никель",
      "summary": "12 гальванических покрытий: античная бронза, золото и чёрный никель (Материалы и производство) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "全12種メッキ＆PVD表面仕上げ比較：アンティーク真鍮・本金・黒ニッケル",
      "summary": "全12種メッキ＆PVD表面仕上げ比較：アンティーク真鍮・本金・黒ニッケル (素材・製造プロセス工学) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "12종 금속 도금 마감 비교: 엔틱 황동, 24K 금, 블랙 니켈 및 PVD",
      "summary": "12종 금속 도금 마감 비교: 엔틱 황동, 24K 금, 블랙 니켈 및 PVD (소재 및 제조 공법) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "12 Finishing Elektroplating: Kuningan Antik, Emas & Nikel Hitam",
      "summary": "12 Finishing Elektroplating: Kuningan Antik, Emas & Nikel Hitam (Material & Manufaktur) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "دليل 12 نوع طلاء كهربائي: النحاس العتيق والذهب والنيكل الأسود",
      "summary": "دليل 12 نوع طلاء كهربائي: النحاس العتيق والذهب والنيكل الأسود (المواد والتصنيع المعدني) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "epoxy-dome-coating-on-soft-enamel-pins-keychains-pros-and-cons": {
    "en": {
      "title": "Epoxy Dome Coatings on Soft Enamel Pins & Keychains: Optical Depth, UV Yellowing & Cost Analysis",
      "summary": "Should you add clear optical epoxy domes to soft enamel pins, keychains, and trolley coins? Compare scratch protection, lens gloss, and unit cost."
    },
    "de": {
      "title": "Epoxidharz-Versiegelung auf Weichemaille-Pins: Vor-/Nachteile",
      "summary": "Epoxidharz-Versiegelung auf Weichemaille-Pins: Vor-/Nachteile (Werkstoffe & Prägetechnik) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Dôme Époxy sur Pins Émail Doux : Avantages & Limites",
      "summary": "Dôme Époxy sur Pins Émail Doux : Avantages & Limites (Matériaux & Fabrication) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Epoxy Dome Coating op Zachte Emaille Pins & Sleutelhangers",
      "summary": "Epoxy Dome Coating op Zachte Emaille Pins & Sleutelhangers (Materialen & Productie) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Recubrimiento Epoxi en Pines de Esmalte Blando: Pros y Contras",
      "summary": "Recubrimiento Epoxi en Pines de Esmalte Blando: Pros y Contras (Materiales y Fabricación) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Rivestimento Resina Epossidica su Spille e Portachiavi",
      "summary": "Rivestimento Resina Epossidica su Spille e Portachiavi (Materiali e Produzione) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Resina Epóxi em Broches de Esmalte Macio: Prós e Contras",
      "summary": "Resina Epóxi em Broches de Esmalte Macio: Prós e Contras (Materiais e Fabrico) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Epoxikupol på Mjuka Emaljpins & Nyckelringar: För- & Nackdelar",
      "summary": "Epoxikupol på Mjuka Emaljpins & Nyckelringar: För- & Nackdelar (Material & Tillverkning) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Epoxy-Dome på Blød Emalje Pins & Nøgleringe",
      "summary": "Epoxy-Dome på Blød Emalje Pins & Nøgleringe (Materialer & Produktion) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Epoksy-Dome på Myk Emalje Pins & Nøkkelringer",
      "summary": "Epoksy-Dome på Myk Emalje Pins & Nøkkelringer (Materialer & Produksjon) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Epoksilinssi Pehmeäemalipinsseissä & Avaimenperissä",
      "summary": "Epoksilinssi Pehmeäemalipinsseissä & Avaimenperissä (Materiaalit & Valmistus) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Powłoka Żywiczna (Epoksyd) na Przypinkach: Zalety i Wady",
      "summary": "Powłoka Żywiczna (Epoksyd) na Przypinkach: Zalety i Wady (Materiały i Produkcja) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Epoxidová Čočka na Odznacích s Měkkým Smaltem",
      "summary": "Epoxidová Čočka na Odznacích s Měkkým Smaltem (Materiály a Výroba) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Эпоксидная смола на значках и брелоках: плюсы и минусы",
      "summary": "Эпоксидная смола на значках и брелоках: плюсы и минусы (Материалы и производство) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "ソフトエナメルへのクリアエポキシ盛り加工：光沢・耐傷性・黄変対策",
      "summary": "ソフトエナメルへのクリアエポキシ盛り加工：光沢・耐傷性・黄変対策 (素材・製造プロセス工学) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "소프트 에나멜 핀·키링 투명 에폭시 돔 코팅의 장단점",
      "summary": "소프트 에나멜 핀·키링 투명 에폭시 돔 코팅의 장단점 (소재 및 제조 공법) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Lapisan Kubah Epoksi pada Pin & Gantungan Kunci Enamel",
      "summary": "Lapisan Kubah Epoksi pada Pin & Gantungan Kunci Enamel (Material & Manufaktur) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "طلاء قبة الإيبوكسي الشفاف على دبابيس المينا الناعمة",
      "summary": "طلاء قبة الإيبوكسي الشفاف على دبابيس المينا الناعمة (المواد والتصنيع المعدني) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "european-trolley-coin-keyrings-1-euro-vs-12-sided-uk-pound-specs": {
    "en": {
      "title": "European Trolley Coin Keyrings: Exact 23.25mm €1 Euro vs. 12-Sided 23.43mm UK £1 Specs & Tolerances",
      "summary": "Precision dimensional standards for European €1 (23.25mm), 12-sided UK £1 (23.43mm), Canadian $1, and Australian $1 supermarket trolley coin keyrings."
    },
    "de": {
      "title": "€1 (23,25mm) vs. 12-eckige £1 Einkaufswagenchips",
      "summary": "€1 (23,25mm) vs. 12-eckige £1 Einkaufswagenchips (Schlüsselanhänger & Einkaufswagenchips) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Jetons Caddie Européens : 1€ (23,25mm) vs 1£ à 12 Pans",
      "summary": "Jetons Caddie Européens : 1€ (23,25mm) vs 1£ à 12 Pans (Porte-Clés & Jetons Caddie) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Europese €1 (23,25mm) vs. 12-Kantige UK £1 Winkelmunten",
      "summary": "Europese €1 (23,25mm) vs. 12-Kantige UK £1 Winkelmunten (Sleutelhangers & Winkelmunten) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Fichas de Carro €1 Euro (23,25mm) vs. £1 de 12 Lados",
      "summary": "Fichas de Carro €1 Euro (23,25mm) vs. £1 de 12 Lados (Llaveros y Fichas de Carro) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Gettoni Carrello €1 (23,25mm) vs £1 Dodecagonali",
      "summary": "Gettoni Carrello €1 (23,25mm) vs £1 Dodecagonali (Portachiavi e Gettoni Carrello) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Fichas de Carrinho €1 (23,25mm) vs. £1 de 12 Lados",
      "summary": "Fichas de Carrinho €1 (23,25mm) vs. £1 de 12 Lados (Porta-Chaves e Fichas de Carrinho) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Kundvagnspolletter: €1 (23,25mm) vs. 12-Kantig UK £1",
      "summary": "Kundvagnspolletter: €1 (23,25mm) vs. 12-Kantig UK £1 (Nyckelringar & Kundvagnspolletter) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Indkøbsvognspoletter: €1 (23,25mm) vs. 12-Kantet UK £1",
      "summary": "Indkøbsvognspoletter: €1 (23,25mm) vs. 12-Kantet UK £1 (Nøgleringe & Indkøbsvognspoletter) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Handlevognmynter: €1 (23,25mm) vs. 12-Kantet UK £1",
      "summary": "Handlevognmynter: €1 (23,25mm) vs. 12-Kantet UK £1 (Nøkkelringer & Handlevognmynter) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Ostoskärrypoletit: €1 (23,25mm) vs. 12-Kulmainen £1",
      "summary": "Ostoskärrypoletit: €1 (23,25mm) vs. 12-Kulmainen £1 (Avaimenperät & Ostoskärrypoletit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Żetony do Wózków: €1 (23,25mm) vs. 12-Kątny Funt £1",
      "summary": "Żetony do Wózków: €1 (23,25mm) vs. 12-Kątny Funt £1 (Breloki i Żetony Sklepowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Žetony do Vozíku: €1 (23,25mm) vs. 12hranná £1 Mince",
      "summary": "Žetony do Vozíku: €1 (23,25mm) vs. 12hranná £1 Mince (Klíčenky a Žetony do Vozíku) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Жетоны для тележек: €1 (23,25 мм) против 12-гранного £1",
      "summary": "Жетоны для тележек: €1 (23,25 мм) против 12-гранного £1 (Брелоки и жетоны для тележек) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "欧州トロリーコイン精密規格：€1 (23.25mm) vs 英国£1 12角(23.43mm)",
      "summary": "欧州トロリーコイン精密規格：€1 (23.25mm) vs 英国£1 12角(23.43mm) (キーホルダー・€1/£1カートコイン) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "유럽 트롤리 코인 정밀 공차: €1 유로 (23.25mm) vs 영국 12각 £1 파운드",
      "summary": "유럽 트롤리 코인 정밀 공차: €1 유로 (23.25mm) vs 영국 12각 £1 파운드 (키링 및 유럽 €1·£1 트롤리 코인) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Koin Troli Supermarket: Spesifikasi €1 (23,25mm) vs £1 12-Sisi",
      "summary": "Koin Troli Supermarket: Spesifikasi €1 (23,25mm) vs £1 12-Sisi (Gantungan Kunci & Koin Troli) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "عملات عربات التسوق الأوروبية: مواصفات 1 يورو مقابل 1 جنيه إسترليني",
      "summary": "عملات عربات التسوق الأوروبية: مواصفات 1 يورو مقابل 1 جنيه إسترليني (ميداليات المفاتيح وعملات التسوق) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "genuine-leather-metal-emblem-keychains-for-auto-dealerships-real-estate": {
    "en": {
      "title": "Genuine Leather & Metal Emblem Keychains for Automotive Dealerships, Car Clubs & Real Estate",
      "summary": "High-retention stitched leather and chrome zinc key fobs for auto dealerships, EV brands, and homebuyer closing gifts starting at 100 pcs MOQ."
    },
    "de": {
      "title": "Echtleder- & Metall-Schlüsselanhänger für Autohäuser",
      "summary": "Echtleder- & Metall-Schlüsselanhänger für Autohäuser (Schlüsselanhänger & Einkaufswagenchips) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Porte-Clés Cuir Véritable & Métal pour Concessions Auto",
      "summary": "Porte-Clés Cuir Véritable & Métal pour Concessions Auto (Porte-Clés & Jetons Caddie) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Echt Leren & Metalen Sleutelhangers voor Autodealers",
      "summary": "Echt Leren & Metalen Sleutelhangers voor Autodealers (Sleutelhangers & Winkelmunten) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Llaveros de Cuero y Metal para Concesionarios e Inmobiliarias",
      "summary": "Llaveros de Cuero y Metal para Concesionarios e Inmobiliarias (Llaveros y Fichas de Carro) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Portachiavi Pelle e Metallo per Concessionarie Auto e Immobiliari",
      "summary": "Portachiavi Pelle e Metallo per Concessionarie Auto e Immobiliari (Portachiavi e Gettoni Carrello) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Porta-Chaves em Couro e Metal para Concessionárias",
      "summary": "Porta-Chaves em Couro e Metal para Concessionárias (Porta-Chaves e Fichas de Carrinho) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Äkta Läder- & Metallemblem Nyckelringar för Bilhandlare",
      "summary": "Äkta Läder- & Metallemblem Nyckelringar för Bilhandlare (Nyckelringar & Kundvagnspolletter) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Ægte Læder & Metal Nøgleringe til Bilforhandlere",
      "summary": "Ægte Læder & Metal Nøgleringe til Bilforhandlere (Nøgleringe & Indkøbsvognspoletter) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Ekte Skinn- & Metallnøkkelringer for Bilforhandlere",
      "summary": "Ekte Skinn- & Metallnøkkelringer for Bilforhandlere (Nøkkelringer & Handlevognmynter) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Aito Nahka- & Metalliavaimenperät Autoliikkeille",
      "summary": "Aito Nahka- & Metalliavaimenperät Autoliikkeille (Avaimenperät & Ostoskärrypoletit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Breloki ze Skóry Naturalnej i Metalu dla Salonów Auto",
      "summary": "Breloki ze Skóry Naturalnej i Metalu dla Salonów Auto (Breloki i Żetony Sklepowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Kožené a Kovové Přívěsky pro Autosalony a Reality",
      "summary": "Kožené a Kovové Přívěsky pro Autosalony a Reality (Klíčenky a Žetony do Vozíku) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Кожаные брелоки с металлическим гербом для автосалонов",
      "summary": "Кожаные брелоки с металлическим гербом для автосалонов (Брелоки и жетоны для тележек) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "自動車ディーラー・不動産向け 本革×メタルエンブレムキーホルダー",
      "summary": "自動車ディーラー・不動産向け 本革×メタルエンブレムキーホルダー (キーホルダー・€1/£1カートコイン) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "자동차 딜러·부동산 VIP용 천연 가죽 + 금속 엠블럼 키링",
      "summary": "자동차 딜러·부동산 VIP용 천연 가죽 + 금속 엠블럼 키링 (키링 및 유럽 €1·£1 트롤리 코인) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Gantungan Kunci Kulit Asli & Emblem Logam untuk Dealer Mobil",
      "summary": "Gantungan Kunci Kulit Asli & Emblem Logam untuk Dealer Mobil (Gantungan Kunci & Koin Troli) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "ميداليات الجلد الطبيعي والشعار المعدني لوكالات السيارات",
      "summary": "ميداليات الجلد الطبيعي والشعار المعدني لوكالات السيارات (ميداليات المفاتيح وعملات التسوق) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "hard-enamel-vs-soft-enamel-pins-wholesale-cost-durability-guide": {
    "en": {
      "title": "Hard Enamel vs. Soft Enamel Pins: Process, Tactile Feel, Cost & Scratch Resistance Guide",
      "summary": "Compare cloisonne hard enamel vs soft enamel lapel pins across kiln curing, flush stone polishing, unit cost ($0.42–$1.45), and durability."
    },
    "de": {
      "title": "Hartemaille vs. Weichemaille-Pins: Kosten & Haltbarkeit",
      "summary": "Hartemaille vs. Weichemaille-Pins: Kosten & Haltbarkeit (Werkstoffe & Prägetechnik) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Émail Dur vs Émail Doux : Coût, Toucher & Résistance",
      "summary": "Émail Dur vs Émail Doux : Coût, Toucher & Résistance (Matériaux & Fabrication) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Harde Emaille vs. Zachte Emaille Pins: Prijs & Slijtvastheid",
      "summary": "Harde Emaille vs. Zachte Emaille Pins: Prijs & Slijtvastheid (Materialen & Productie) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Esmalte Duro vs. Esmalte Blando: Costo, Tacto y Durabilidad",
      "summary": "Esmalte Duro vs. Esmalte Blando: Costo, Tacto y Durabilidad (Materiales y Fabricación) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Smalto Duro vs Smalto Morbido: Costi, Tatto e Durata",
      "summary": "Smalto Duro vs Smalto Morbido: Costi, Tatto e Durata (Materiali e Produzione) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Esmalte Duro vs. Esmalte Macio: Custo e Durabilidade",
      "summary": "Esmalte Duro vs. Esmalte Macio: Custo e Durabilidade (Materiais e Fabrico) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Hård Emalj vs. Mjuk Emalj: Pris, Känsla & Slitstyrka",
      "summary": "Hård Emalj vs. Mjuk Emalj: Pris, Känsla & Slitstyrka (Material & Tillverkning) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Hård Emalje vs. Blød Emalje: Pris, Følelse & Holdbarhed",
      "summary": "Hård Emalje vs. Blød Emalje: Pris, Følelse & Holdbarhed (Materialer & Produktion) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Hard Emalje vs. Myk Emalje: Pris, Følelse & Holdbarhet",
      "summary": "Hard Emalje vs. Myk Emalje: Pris, Følelse & Holdbarhet (Materialer & Produksjon) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Kova Emali vs. Pehmeä Emali: Hinta, Tuntu & Kestävyys",
      "summary": "Kova Emali vs. Pehmeä Emali: Hinta, Tuntu & Kestävyys (Materiaalit & Valmistus) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Twarda Emalia vs. Miękka Emalia: Koszt i Wytrzymałość",
      "summary": "Twarda Emalia vs. Miękka Emalia: Koszt i Wytrzymałość (Materiały i Produkcja) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Tvrdý Smalt vs. Měkký Smalt: Cena, Povrch a Odolnost",
      "summary": "Tvrdý Smalt vs. Měkký Smalt: Cena, Povrch a Odolnost (Materiály a Výroba) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Твёрдая эмаль против мягкой: цена, тактильность и стойкость",
      "summary": "Твёрдая эмаль против мягкой: цена, тактильность и стойкость (Материалы и производство) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "本七宝（ハードエナメル）vs ソフトエナメル：製法・単価・耐久性比較",
      "summary": "本七宝（ハードエナメル）vs ソフトエナメル：製法・単価・耐久性比較 (素材・製造プロセス工学) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "하드 에나멜 vs 소프트 에나멜 핀: 공법, 단가, 내구성 완전 비교",
      "summary": "하드 에나멜 vs 소프트 에나멜 핀: 공법, 단가, 내구성 완전 비교 (소재 및 제조 공법) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Pin Enamel Keras vs Lunak: Perbandingan Biaya & Ketahanan",
      "summary": "Pin Enamel Keras vs Lunak: Perbandingan Biaya & Ketahanan (Material & Manufaktur) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "مقارنة دبابيس المينا الصلبة والناعمة: التكلفة والمتانة",
      "summary": "مقارنة دبابيس المينا الصلبة والناعمة: التكلفة والمتانة (المواد والتصنيع المعدني) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "interactive-kinetic-pins-and-medals-spinner-slider-hinged-mechanisms": {
    "en": {
      "title": "Interactive Kinetic Pins, Medals & Keychains: Spinner Rivets, Linear Sliders & Hinged Mechanisms",
      "summary": "Engineering breakdown of 360-degree spinning race medals, sliding track enamel pins, hinged danglers, and double-sided spinner keychains."
    },
    "de": {
      "title": "Interaktive Spinner-, Schiebe- & Scharnier-Pins",
      "summary": "Interaktive Spinner-, Schiebe- & Scharnier-Pins (Werkstoffe & Prägetechnik) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Pins & Médailles Interactifs : Rotatifs, Coulissants & Charnières",
      "summary": "Pins & Médailles Interactifs : Rotatifs, Coulissants & Charnières (Matériaux & Fabrication) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Interactieve Kinetische Pins & Medailles: Spinners & Sliders",
      "summary": "Interactieve Kinetische Pins & Medailles: Spinners & Sliders (Materialen & Productie) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Pines y Medallas Interactivos: Giratorios, Deslizantes y Bisagra",
      "summary": "Pines y Medallas Interactivos: Giratorios, Deslizantes y Bisagra (Materiales y Fabricación) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Spille e Medaglie Interattive: Spinner, Scorrevoli e Cerniere",
      "summary": "Spille e Medaglie Interattive: Spinner, Scorrevoli e Cerniere (Materiali e Produzione) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Broches e Medalhas Interativos: Giratórios e Deslizantes",
      "summary": "Broches e Medalhas Interativos: Giratórios e Deslizantes (Materiais e Fabrico) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Interaktiva Snurr-, Skjut- & Gångjärn spins och Medaljer",
      "summary": "Interaktiva Snurr-, Skjut- & Gångjärn spins och Medaljer (Material & Tillverkning) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Interaktive Spinner-, Skyde- & Hængslede Pins og Medaljer",
      "summary": "Interaktive Spinner-, Skyde- & Hængslede Pins og Medaljer (Materialer & Produktion) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Interaktive Spinner-, Skyve- & Hengslede Pins og Medaljer",
      "summary": "Interaktive Spinner-, Skyve- & Hengslede Pins og Medaljer (Materialer & Produksjon) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Interaktiiviset Pyörivät, Liukuvat & Saranoidut Pinssit",
      "summary": "Interaktiiviset Pyörivät, Liukuvat & Saranoidut Pinssit (Materiaalit & Valmistus) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Interaktywne Przypinki i Medale: Obrotowe, Suwane i Zawiasy",
      "summary": "Interaktywne Przypinki i Medale: Obrotowe, Suwane i Zawiasy (Materiały i Produkcja) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Interaktivní Odznaky a Medaile: Otočné, Posuvné a Kloubové",
      "summary": "Interaktivní Odznaky a Medaile: Otočné, Posuvné a Kloubové (Materiály a Výroba) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Интерактивные значки и медали: спиннеры, слайдеры и шарниры",
      "summary": "Интерактивные значки и медали: спиннеры, слайдеры и шарниры (Материалы и производство) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "動くギミックピン＆メダル設計：回転スピナー・スライドレール・蝶番",
      "summary": "動くギミックピン＆メダル設計：回転スピナー・スライドレール・蝶番 (素材・製造プロセス工学) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "움직이는 기믹 핀 및 메달: 회전 리벳, 슬라이더, 힌지 경첩 설계",
      "summary": "움직이는 기믹 핀 및 메달: 회전 리벳, 슬라이더, 힌지 경첩 설계 (소재 및 제조 공법) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Pin & Medali Kinetik Interaktif: Mekanisme Putar, Geser & Engsel",
      "summary": "Pin & Medali Kinetik Interaktif: Mekanisme Putar, Geser & Engsel (Material & Manufaktur) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "الدبابيس والميداليات التفاعلية المتحركة: الدوارة والمنزلقة والمفصلية",
      "summary": "الدبابيس والميداليات التفاعلية المتحركة: الدوارة والمنزلقة والمفصلية (المواد والتصنيع المعدني) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "lapel-pin-backs-and-attachments-butterfly-clutch-rubber-magnet-locking": {
    "en": {
      "title": "Lapel Pin Backs & Hardware Attachments Guide: Butterfly Clutches, Rubber Caps, Locking Backs & Magnets",
      "summary": "Compare 6 pin backing options—military butterfly clutches, colored PVC rubber caps, spring locking pin backs, safety pins, and no-hole bar magnets."
    },
    "de": {
      "title": "Pin-Verschlüsse: Schmetterling, PVC, Deluxe & Magnet",
      "summary": "Pin-Verschlüsse: Schmetterling, PVC, Deluxe & Magnet (Beschaffung, Verpackung & Sicherheit) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Attaches de Pins : Papillon, Caoutchouc, Verrou & Aimant",
      "summary": "Attaches de Pins : Papillon, Caoutchouc, Verrou & Aimant (Sourcing, Packaging & Normes) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Pin Sluitingen: Vlindersluiting, Rubber, Locking & Magneet",
      "summary": "Pin Sluitingen: Vlindersluiting, Rubber, Locking & Magneet (Inkoop, Verpakking & Compliance) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Cierres de Pines: Mariposa, Caucho, Seguridad e Imán",
      "summary": "Cierres de Pines: Mariposa, Caucho, Seguridad e Imán (Sourcing, Empaque y Normativa) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Chiusure per Spille: Farfallina, Gomma, Sicurezza e Magnete",
      "summary": "Chiusure per Spille: Farfallina, Gomma, Sicurezza e Magnete (Sourcing, Packaging e Normative) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Fechos para Broches: Borboleta, Silicone, Trava e Ímã",
      "summary": "Fechos para Broches: Borboleta, Silicone, Trava e Ímã (Sourcing, Embalagem e Conformidade) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Pin-Fästen: Fjärilslås, Gummi, Säkerhetslås & Magnet",
      "summary": "Pin-Fästen: Fjärilslås, Gummi, Säkerhetslås & Magnet (Inköp, Förpackning & Regler) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Pin-Lukninger: Sommerfuglelås, Gummi, Låselås & Magnet",
      "summary": "Pin-Lukninger: Sommerfuglelås, Gummi, Låselås & Magnet (Indkøb, Emballage & Overholdelse) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Pin-Fester: Sommerfugllås, Gummi, Låsemekanisme & Magnet",
      "summary": "Pin-Fester: Sommerfugllås, Gummi, Låsemekanisme & Magnet (Innkjøp, Emballasje & Samsvar) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Pinssikiinnikkeet: Perhoslukko, Kumi, Turvalukko & Magneetti",
      "summary": "Pinssikiinnikkeet: Perhoslukko, Kumi, Turvalukko & Magneetti (Hankinta, Pakkaus & Standardit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Zapięcia Przypinek: Motylek, Gumowe, Zatrzask i Magnes",
      "summary": "Zapięcia Przypinek: Motylek, Gumowe, Zatrzask i Magnes (Zakupy, Opakowania i Normy) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Zapínání Odznaků: Motýlek, Gumové, Pojistka a Magnet",
      "summary": "Zapínání Odznaků: Motýlek, Gumové, Pojistka a Magnet (Nákup, Balení a Certifikace) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Крепления для значков: баттерфляй, резина, цанга и магнит",
      "summary": "Крепления для значков: баттерфляй, резина, цанга и магнит (Закупки, упаковка и сертификация) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "ピンバッジ留め具比較：バタフライクラッチ・ラバー・ロック・強力マグネット",
      "summary": "ピンバッジ留め具比較：バタフライクラッチ・ラバー・ロック・強力マグネット (工場調達・パッケージ・安全認証) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "라펠 핀 뒷장식 가이드: 버터플라이 클러치, 고무, 잠금장치, 자석 바",
      "summary": "라펠 핀 뒷장식 가이드: 버터플라이 클러치, 고무, 잠금장치, 자석 바 (공장 소싱 · 패키징 · 안전 인증) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Pengait Belakang Pin: Kopling Kupu-Kupu, Karet, Pengunci & Magnet",
      "summary": "Pengait Belakang Pin: Kopling Kupu-Kupu, Karet, Pengunci & Magnet (Sourcing, Kemasan & Kepatuhan) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "مشابك تثبيت الدبابيس: الفراشة، المطاط، القفل الفاخر والمغناطيس",
      "summary": "مشابك تثبيت الدبابيس: الفراشة، المطاط، القفل الفاخر والمغناطيس (التوريد والتغليف ومعايير السلامة) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "magnetic-detachable-vs-lobster-clasp-and-pull-out-trolley-coin-holders": {
    "en": {
      "title": "Supermarket Trolley Coin Holders Compared: Magnetic Snap Frames, Lobster Clasps & Pull-Out Keys",
      "summary": "Compare 4 promotional trolley token hardware styles: quick-snap magnetic zinc holders, classic lobster clips, front-pull key unlockers, and leather loops."
    },
    "de": {
      "title": "Einkaufswagenchip-Halter: Magnetrahmen vs. Karabiner",
      "summary": "Einkaufswagenchip-Halter: Magnetrahmen vs. Karabiner (Schlüsselanhänger & Einkaufswagenchips) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Supports de Jetons : Cadre Aimanté vs Mousqueton & Tirette",
      "summary": "Supports de Jetons : Cadre Aimanté vs Mousqueton & Tirette (Porte-Clés & Jetons Caddie) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Winkelwagenmunt Houders: Magnetisch Frame vs. Karabijn",
      "summary": "Winkelwagenmunt Houders: Magnetisch Frame vs. Karabijn (Sleutelhangers & Winkelmunten) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Portafichas de Carro: Marco Magnético vs. Mosquetón",
      "summary": "Portafichas de Carro: Marco Magnético vs. Mosquetón (Llaveros y Fichas de Carro) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Portagettoni Carrello: Telaio Magnetico vs Moschettone",
      "summary": "Portagettoni Carrello: Telaio Magnetico vs Moschettone (Portachiavi e Gettoni Carrello) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Suportes de Ficha: Moldura Magnética vs. Mosquetão",
      "summary": "Suportes de Ficha: Moldura Magnética vs. Mosquetão (Porta-Chaves e Fichas de Carrinho) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Hållare för Kundvagnspollett: Magnetram vs. Karbinhake",
      "summary": "Hållare för Kundvagnspollett: Magnetram vs. Karbinhake (Nyckelringar & Kundvagnspolletter) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Holdere til Polet: Magnetramme vs. Karabinhage & Udtræk",
      "summary": "Holdere til Polet: Magnetramme vs. Karabinhage & Udtræk (Nøgleringe & Indkøbsvognspoletter) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Holdere for Handlevognmynt: Magnetramme vs. Karabinkrok",
      "summary": "Holdere for Handlevognmynt: Magnetramme vs. Karabinkrok (Nøkkelringer & Handlevognmynter) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Polettipidikkeet: Magneettikehys vs. Pistoolilukko",
      "summary": "Polettipidikkeet: Magneettikehys vs. Pistoolilukko (Avaimenperät & Ostoskärrypoletit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Uchwyty na Żetony: Magnetyczne Ramki vs. Karabińczyk",
      "summary": "Uchwyty na Żetony: Magnetyczne Ramki vs. Karabińczyk (Breloki i Żetony Sklepowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Držáky na Žetony: Magnetický Rámeček vs. Karabinka",
      "summary": "Držáky na Žetony: Magnetický Rámeček vs. Karabinka (Klíčenky a Žetony do Vozíku) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Держатели жетонов: магнитная рамка против карабина",
      "summary": "Держатели жетонов: магнитная рамка против карабина (Брелоки и жетоны для тележек) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "トロリーコインホルダー比較：脱着式マグネット枠 vs ナスカン・引き出し式",
      "summary": "トロリーコインホルダー比較：脱着式マグネット枠 vs ナスカン・引き出し式 (キーホルダー・€1/£1カートコイン) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "트롤리 코인 홀더 비교: 자석 탈부착 프레임 vs 랍스터 고리·풀아웃형",
      "summary": "트롤리 코인 홀더 비교: 자석 탈부착 프레임 vs 랍스터 고리·풀아웃형 (키링 및 유럽 €1·£1 트롤리 코인) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Dudukkan Koin Troli: Rangka Magnetik vs Kait Lobster & Tarik",
      "summary": "Dudukkan Koin Troli: Rangka Magnetik vs Kait Lobster & Tarik (Gantungan Kunci & Koin Troli) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "حوامل عملات التسوق: الإطار المغناطيسي مقابل خطاف القفل",
      "summary": "حوامل عملات التسوق: الإطار المغناطيسي مقابل خطاف القفل (ميداليات المفاتيح وعملات التسوق) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "magnetic-vs-pin-back-metal-employee-name-plates-for-hotels-airlines": {
    "en": {
      "title": "Magnetic vs. Pin-Back Metal Employee Name Plates for Hospitality, Airlines & Corporate Uniforms",
      "summary": "Protect expensive blazers and airline uniforms with 3-magnet neodymium name badge bars, reusable name-window frames, and beveled engraved brass bars."
    },
    "de": {
      "title": "Magnet- vs. Nadel-Namensschilder für Hotels & Airlines",
      "summary": "Magnet- vs. Nadel-Namensschilder für Hotels & Airlines (Coins & Dienstabzeichen) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Badges Nominatifs Métal : Aimant Néodyme vs Épingle",
      "summary": "Badges Nominatifs Métal : Aimant Néodyme vs Épingle (Pièces Challenge & Insignes) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Magnetische vs. Speld Naambadges voor Hotels & Luchtvaart",
      "summary": "Magnetische vs. Speld Naambadges voor Hotels & Luchtvaart (Munten & Dienstinsignes) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Placas Identificativas Metálicas: Imán vs. Imperdible",
      "summary": "Placas Identificativas Metálicas: Imán vs. Imperdible (Monedas e Insignias Oficiales) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Targhette Nome in Metallo: Magnete vs Spilla per Hotel",
      "summary": "Targhette Nome in Metallo: Magnete vs Spilla per Hotel (Monete e Distintivi Militari) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Crachás Metálicos com Nome: Ímã vs. Alfinete para Hotéis",
      "summary": "Crachás Metálicos com Nome: Ímã vs. Alfinete para Hotéis (Moedas e Distintivos Oficiais) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Magnetiska vs. Nålförsedda Namnbrickor för Hotell & Flyg",
      "summary": "Magnetiska vs. Nålförsedda Namnbrickor för Hotell & Flyg (Challenge Coins & Tjänstetecken) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Magnetiske vs. Nål-Navneskilte til Hoteller & Flyselskaber",
      "summary": "Magnetiske vs. Nål-Navneskilte til Hoteller & Flyselskaber (Challenge Coins & Insignia) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Magnetiske vs. Nål-Navneskilt for Hoteller & Flyselskap",
      "summary": "Magnetiske vs. Nål-Navneskilt for Hoteller & Flyselskap (Challenge Coins & Merker) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Magneettiset vs. Neulakiinnitteiset Nimikyltit Hotelleille",
      "summary": "Magneettiset vs. Neulakiinnitteiset Nimikyltit Hotelleille (Kolikot & Virkamerkit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Metalowe Identyfikatory Pracownicze: Magnes vs. Agrafka",
      "summary": "Metalowe Identyfikatory Pracownicze: Magnes vs. Agrafka (Monety i Odznaki Służb) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Kovové Jmenovky pro Hotely a Aerolinie: Magnet vs. Špendlík",
      "summary": "Kovové Jmenovky pro Hotely a Aerolinie: Magnet vs. Špendlík (Challenge Mince a Odznaky Sborů) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Металлические бейджи для отелей и авиалиний: магнит vs булавка",
      "summary": "Металлические бейджи для отелей и авиалиний: магнит vs булавка (Монеты Challenge и знаки служб) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "ホテル・航空会社向け金属製ネームプレート：強力マグネット vs 安全ピン",
      "summary": "ホテル・航空会社向け金属製ネームプレート：強力マグネット vs 安全ピン (コイン・警察/軍用インシグニア) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "호텔·항공사 직원용 금속 명찰: 자석 바 vs 옷핀 뒷장식 비교",
      "summary": "호텔·항공사 직원용 금속 명찰: 자석 바 vs 옷핀 뒷장식 비교 (챌린지 코인 및 관공서 배지) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Papan Nama Karyawan Logam Magnetik vs Peniti untuk Hotel",
      "summary": "Papan Nama Karyawan Logam Magnetik vs Peniti untuk Hotel (Koin Challenge & Insignia Resmi) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "لوحات أسماء الموظفين المعدنية المغناطيسية مقابل الدبوس للفنادق",
      "summary": "لوحات أسماء الموظفين المعدنية المغناطيسية مقابل الدبوس للفنادق (العملات التذكارية والشارات العسكرية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "military-stainless-steel-dog-tags-vs-3d-zinc-alloy-pendant-tags": {
    "en": {
      "title": "Embossed 304 Stainless Steel Military Dog Tags vs. 3D Zinc Alloy Pendant Tags: Retail & Club Uses",
      "summary": "Compare classic 0.4mm rolled-edge embossed 304 stainless steel military dog tags with rubber silencers against heavy 3D sculpted zinc alloy pendant tags."
    },
    "de": {
      "title": "Geprägte Edelstahl-Erkennungsmarken vs. 3D-Zinkanhänger",
      "summary": "Geprägte Edelstahl-Erkennungsmarken vs. 3D-Zinkanhänger (Coins & Dienstabzeichen) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Plaques Militaires Inox 304 vs Pendentifs Zinc 3D",
      "summary": "Plaques Militaires Inox 304 vs Pendentifs Zinc 3D (Pièces Challenge & Insignes) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "304 RVS Militaire Dog Tags vs. 3D Zinklegering Hangers",
      "summary": "304 RVS Militaire Dog Tags vs. 3D Zinklegering Hangers (Munten & Dienstinsignes) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Chapas Militares Acero 304 vs. Colgantes Zinc 3D",
      "summary": "Chapas Militares Acero 304 vs. Colgantes Zinc 3D (Monedas e Insignias Oficiales) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Piastrine Militari Acciaio 304 vs Ciondoli Zinco 3D",
      "summary": "Piastrine Militari Acciaio 304 vs Ciondoli Zinco 3D (Monete e Distintivi Militari) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Placas Militares Aço 304 vs. Pingentes Zinco 3D",
      "summary": "Placas Militares Aço 304 vs. Pingentes Zinco 3D (Moedas e Distintivos Oficiais) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Militära 304 Stål Dog Tags vs. 3D Zinkhängsmycken",
      "summary": "Militära 304 Stål Dog Tags vs. 3D Zinkhängsmycken (Challenge Coins & Tjänstetecken) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Militære 304 Stål Dog Tags vs. 3D Zinkvedhæng",
      "summary": "Militære 304 Stål Dog Tags vs. 3D Zinkvedhæng (Challenge Coins & Insignia) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Militære 304 Stål Dog Tags vs. 3D Sink-Anheng",
      "summary": "Militære 304 Stål Dog Tags vs. 3D Sink-Anheng (Challenge Coins & Merker) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Sotilaalliset 304 Teräs Dog Tagit vs. 3D Sinkkiriipukset",
      "summary": "Sotilaalliset 304 Teräs Dog Tagit vs. 3D Sinkkiriipukset (Kolikot & Virkamerkit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Nieśmiertelniki Stalowe 304 vs. Zawieszki Odlewane 3D",
      "summary": "Nieśmiertelniki Stalowe 304 vs. Zawieszki Odlewane 3D (Monety i Odznaki Służb) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Vojenské Psí Známky Ocel 304 vs. 3D Zinkové Přívěsky",
      "summary": "Vojenské Psí Známky Ocel 304 vs. 3D Zinkové Přívěsky (Challenge Mince a Odznaky Sborů) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Армейские жетоны из стали 304 против 3D-подвесок из цинка",
      "summary": "Армейские жетоны из стали 304 против 3D-подвесок из цинка (Монеты Challenge и знаки служб) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "304ステンレス打刻ミリタリードッグタグ vs 3D亜鉛ダイキャストタグ",
      "summary": "304ステンレス打刻ミリタリードッグタグ vs 3D亜鉛ダイキャストタグ (コイン・警察/軍用インシグニア) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "304 스텐 군번줄(도그태그) vs 3D 아연 합금 펜던트 태그",
      "summary": "304 스텐 군번줄(도그태그) vs 3D 아연 합금 펜던트 태그 (챌린지 코인 및 관공서 배지) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Tag Anjing Militer Baja 304 vs Liontin Seng 3D Kustom",
      "summary": "Tag Anjing Militer Baja 304 vs Liontin Seng 3D Kustom (Koin Challenge & Insignia Resmi) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "قلادات الهوية العسكرية الفولاذية 304 مقابل القلائد ثلاثية الأبعاد",
      "summary": "قلادات الهوية العسكرية الفولاذية 304 مقابل القلائد ثلاثية الأبعاد (العملات التذكارية والشارات العسكرية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "photo-etched-brass-vs-offset-printed-silk-screen-lapel-pins": {
    "en": {
      "title": "Photo-Etched Brass vs. Offset CMYK & Silk-Screen Printed Pins: Resolving Fine Lines & Gradients",
      "summary": "Choose between 0.8mm photo-etched brass, CMYK offset litho epoxy domes, and spot silk-screen printing for intricate gradients and thin line art."
    },
    "de": {
      "title": "Fotogeätzte Messing-Pins vs. Offsetdruck & Siebdruck",
      "summary": "Fotogeätzte Messing-Pins vs. Offsetdruck & Siebdruck (Werkstoffe & Prägetechnik) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Pins Laiton Photo-Gravés vs Impression Offset & Sérigraphie",
      "summary": "Pins Laiton Photo-Gravés vs Impression Offset & Sérigraphie (Matériaux & Fabrication) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Foto-Geëtste Messing Pins vs. Offset CMYK & Zeefdruk",
      "summary": "Foto-Geëtste Messing Pins vs. Offset CMYK & Zeefdruk (Materialen & Productie) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Pines de Latón Fotograbado vs. Offset CMYK y Serigrafía",
      "summary": "Pines de Latón Fotograbado vs. Offset CMYK y Serigrafía (Materiales y Fabricación) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Spille in Ottone Fotoincise vs Stampa Offset e Serigrafia",
      "summary": "Spille in Ottone Fotoincise vs Stampa Offset e Serigrafia (Materiali e Produzione) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Broches de Latão Fotogravado vs. Offset CMYK e Serigrafia",
      "summary": "Broches de Latão Fotogravado vs. Offset CMYK e Serigrafia (Materiais e Fabrico) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Fotoetsade Mässingspins vs. Offset CMYK & Screentryck",
      "summary": "Fotoetsade Mässingspins vs. Offset CMYK & Screentryck (Material & Tillverkning) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Fotoætsede Messingpins vs. Offset CMYK & Serigrafi",
      "summary": "Fotoætsede Messingpins vs. Offset CMYK & Serigrafi (Materialer & Produktion) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Fotoetsede Messingpins vs. Offset CMYK & Silketrykk",
      "summary": "Fotoetsede Messingpins vs. Offset CMYK & Silketrykk (Materialer & Produksjon) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Syövytetyt Messinkipinssit vs. Offset CMYK & Silkkipaino",
      "summary": "Syövytetyt Messinkipinssit vs. Offset CMYK & Silkkipaino (Materiaalit & Valmistus) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Przypinki Fototrawione z Mosiądzu vs. Nadruk Offset CMYK",
      "summary": "Przypinki Fototrawione z Mosiądzu vs. Nadruk Offset CMYK (Materiały i Produkcja) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Fotoleptané Mosazné Odznaky vs. Offset CMYK a Sítotisk",
      "summary": "Fotoleptané Mosazné Odznaky vs. Offset CMYK a Sítotisk (Materiály a Výroba) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Значки с фототравлением против офсетной и шелкотрафаретной печати",
      "summary": "Значки с фототравлением против офсетной и шелкотрафаретной печати (Материалы и производство) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "フォトエッチング真鍮ピン vs オフセットフルカラー・シルク印刷ピン",
      "summary": "フォトエッチング真鍮ピン vs オフセットフルカラー・シルク印刷ピン (素材・製造プロセス工学) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "부식(에칭) 황동 핀 vs 옵셋(CMYK)·실크스크린 인쇄 핀",
      "summary": "부식(에칭) 황동 핀 vs 옵셋(CMYK)·실크스크린 인쇄 핀 (소재 및 제조 공법) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Pin Kuningan Photo-Etched vs Cetak Offset CMYK & Sablon",
      "summary": "Pin Kuningan Photo-Etched vs Cetak Offset CMYK & Sablon (Material & Manufaktur) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "دبابيس النحاس المحفورة ضوئياً مقابل طباعة الأوفست والشاشة الحريرية",
      "summary": "دبابيس النحاس المحفورة ضوئياً مقابل طباعة الأوفست والشاشة الحريرية (المواد والتصنيع المعدني) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "photo-etched-hollow-brass-bookmarks-for-museums-universities-publishers": {
    "en": {
      "title": "Photo-Etched Hollow Brass Bookmarks for Museums, Publishers & Universities: Filigree & Packaging",
      "summary": "Engineer delicate 0.4mm photo-etched solid brass filigree bookmarks with pantone tassels, enamel accents, and 350gsm retail cards at 100 pcs MOQ."
    },
    "de": {
      "title": "Fotogeätzte Messing-Lesezeichen für Museen & Verlage",
      "summary": "Fotogeätzte Messing-Lesezeichen für Museen & Verlage (Business, Golf & Souvenirs) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Marque-Pages Ajourés en Laiton pour Musées & Éditeurs",
      "summary": "Marque-Pages Ajourés en Laiton pour Musées & Éditeurs (Affaires, Golf & Souvenirs) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Foto-Geëtste Opengewerkte Messing Bladwijzers voor Musea",
      "summary": "Foto-Geëtste Opengewerkte Messing Bladwijzers voor Musea (Zakelijk, Golf & Souvenirs) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Marcapáginas de Latón Calado para Museos y Editoriales",
      "summary": "Marcapáginas de Latón Calado para Museos y Editoriales (Ejecutivo, Golf y Souvenirs) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Segnalibri in Ottone Traforato per Musei e Case Editrici",
      "summary": "Segnalibri in Ottone Traforato per Musei e Case Editrici (Regali Aziendali, Golf e Souvenir) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Marcadores em Latão Vazado para Museus e Editoras",
      "summary": "Marcadores em Latão Vazado para Museus e Editoras (Executivo, Golfe e Lembranças) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Fotoetsade Filigran-Bokmärken för Museer & Förlag",
      "summary": "Fotoetsade Filigran-Bokmärken för Museer & Förlag (Företagsgåvor, Golf & Souvenirer) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Fotoætsede Messing-Bogmærker til Museer & Forlag",
      "summary": "Fotoætsede Messing-Bogmærker til Museer & Forlag (Erhverv, Golf & Souvenirs) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Fotoetsede Messingbokmerker for Museer & Forlag",
      "summary": "Fotoetsede Messingbokmerker for Museer & Forlag (Bedrift, Golf & Suvenirer) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Syövytetyt Filigraani-Kirjanmerkit Museoille & Kustantamoille",
      "summary": "Syövytetyt Filigraani-Kirjanmerkit Museoille & Kustantamoille (Liikelahjat, Golf & Matkamuistot) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Ażurowe Zakładki Mosiężne dla Muzeów i Wydawnictw",
      "summary": "Ażurowe Zakładki Mosiężne dla Muzeów i Wydawnictw (Biznes, Golf i Pamiątki) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Fotoleptané Mosazné Knižní Záložky pro Muzea a Nakladatelství",
      "summary": "Fotoleptané Mosazné Knižní Záložky pro Muzea a Nakladatelství (Manažerské Dárky, Golf a Suvenýry) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Ажурные латунные закладки для музеев, вузов и издательств",
      "summary": "Ажурные латунные закладки для музеев, вузов и издательств (Бизнес-сувениры, Гольф и Подарки) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "美術館・大学・出版社向け 透かし彫りフォトエッチング真鍮しおり",
      "summary": "美術館・大学・出版社向け 透かし彫りフォトエッチング真鍮しおり (ギフト・ゴルフ・観光記念品) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "박물관·대학·출판사용 부식 투각 황동 책갈피 제작 가이드",
      "summary": "박물관·대학·출판사용 부식 투각 황동 책갈피 제작 가이드 (비즈니스 기프트 · 골프 · 기념품) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Pembatas Buku Kuningan Filigri untuk Museum & Universitas",
      "summary": "Pembatas Buku Kuningan Filigri untuk Museum & Universitas (Hadiah Eksekutif, Golf & Suvenir) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "فواصل الكتب النحاسية المفرغة للمتاحف والجامعات ودور النشر",
      "summary": "فواصل الكتب النحاسية المفرغة للمتاحف والجامعات ودور النشر (الهدايا التنفيذية والجولف والتذكارات) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "sequential-laser-numbering-and-acrylic-capsule-packaging-for-coins": {
    "en": {
      "title": "Sequential Laser Edge Numbering (001/500) & Collector Capsule Packaging for Limited-Edition Coins",
      "summary": "Add serialized edition numbers (001/500) via rotary fiber laser and pair limited challenge coins with crystal acrylic capsules and velvet boxes."
    },
    "de": {
      "title": "Fortlaufende Randnummerierung (001/500) & Münzkapseln",
      "summary": "Fortlaufende Randnummerierung (001/500) & Münzkapseln (Coins & Dienstabzeichen) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Numérotation Séquentielle sur Tranche & Capsules Acryliques",
      "summary": "Numérotation Séquentielle sur Tranche & Capsules Acryliques (Pièces Challenge & Insignes) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Oplopende Randnummering (001/500) & Acryl Muntcapsules",
      "summary": "Oplopende Randnummering (001/500) & Acryl Muntcapsules (Munten & Dienstinsignes) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Numeración Secuencial en Canto (001/500) y Cápsulas",
      "summary": "Numeración Secuencial en Canto (001/500) y Cápsulas (Monedas e Insignias Oficiales) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Numerazione Laser sul Bordo (001/500) e Capsule Acriliche",
      "summary": "Numerazione Laser sul Bordo (001/500) e Capsule Acriliche (Monete e Distintivi Militari) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Numeração Sequencial na Borda (001/500) e Cápsulas",
      "summary": "Numeração Sequencial na Borda (001/500) e Cápsulas (Moedas e Distintivos Oficiais) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Sekventiell Kantnumrering (001/500) & Myntkapslar",
      "summary": "Sekventiell Kantnumrering (001/500) & Myntkapslar (Challenge Coins & Tjänstetecken) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Fortløbende Kantnummerering (001/500) & Møntkapsler",
      "summary": "Fortløbende Kantnummerering (001/500) & Møntkapsler (Challenge Coins & Insignia) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Sekvensiell Kantnummerering (001/500) & Myntkapsler",
      "summary": "Sekvensiell Kantnummerering (001/500) & Myntkapsler (Challenge Coins & Merker) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Juokseva Reunakoodaus (001/500) & Akryylikapselit",
      "summary": "Juokseva Reunakoodaus (001/500) & Akryylikapselit (Kolikot & Virkamerkit) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Numeracja Seryjna Rantu (001/500) i Kapsuły Akrylowe",
      "summary": "Numeracja Seryjna Rantu (001/500) i Kapsuły Akrylowe (Monety i Odznaki Służb) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Sériové Číslování Hrany (001/500) a Akrylové Kapsle",
      "summary": "Sériové Číslování Hrany (001/500) a Akrylové Kapsle (Challenge Mince a Odznaky Sborů) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Лазерная нумерация гурта (001/500) и акриловые капсулы",
      "summary": "Лазерная нумерация гурта (001/500) и акриловые капсулы (Монеты Challenge и знаки служб) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "限定版コインの側面シリアルナンバー刻印(001/500)＆カプセル包装",
      "summary": "限定版コインの側面シリアルナンバー刻印(001/500)＆カプセル包装 (コイン・警察/軍用インシグニア) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "한정판 챌린지 코인 측면 연번 레이저 각인 및 아크릴 캡슐 포장",
      "summary": "한정판 챌린지 코인 측면 연번 레이저 각인 및 아크릴 캡슐 포장 (챌린지 코인 및 관공서 배지) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Penomoran Laser Berurutan pada Tepi Koin & Kapsul Akrilik",
      "summary": "Penomoran Laser Berurutan pada Tepi Koin & Kapsul Akrilik (Koin Challenge & Insignia Resmi) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "الترقيم التسلسلي بالليزر على الحافة وكبسولات العملات",
      "summary": "الترقيم التسلسلي بالليزر على الحافة وكبسولات العملات (العملات التذكارية والشارات العسكرية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "specialty-enamel-effects-glitter-glow-in-the-dark-stained-glass-translucent": {
    "en": {
      "title": "Specialty Enamel Pigments: Glitter, Glow-in-the-Dark & Translucent Stained-Glass Pin Engineering",
      "summary": "How to design high-margin specialty enamel pins and night-run medals using metallic glitter, phosphorescent glow powder, and translucent resin."
    },
    "de": {
      "title": "Spezial-Emaillen: Glitzer, Nachtleuchtend & Glasfenster",
      "summary": "Spezial-Emaillen: Glitzer, Nachtleuchtend & Glasfenster (Werkstoffe & Prägetechnik) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Émaux Spéciaux : Paillettes, Phosphorescent & Vitrail",
      "summary": "Émaux Spéciaux : Paillettes, Phosphorescent & Vitrail (Matériaux & Fabrication) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Speciale Emaille: Glitter, Glow-in-the-Dark & Glas-in-Lood",
      "summary": "Speciale Emaille: Glitter, Glow-in-the-Dark & Glas-in-Lood (Materialen & Productie) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Esmaltes Especiales: Purpurina, Fluorescente y Vitral",
      "summary": "Esmaltes Especiales: Purpurina, Fluorescente y Vitral (Materiales y Fabricación) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Smalti Speciali: Glitter, Fluorescente ed Effetto Vetrata",
      "summary": "Smalti Speciali: Glitter, Fluorescente ed Effetto Vetrata (Materiali e Produzione) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Esmaltes Especiais: Glitter, Fosforescente e Vitral",
      "summary": "Esmaltes Especiais: Glitter, Fosforescente e Vitral (Materiais e Fabrico) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Specialemaljer: Glitter, Självlysande & Målat Glas",
      "summary": "Specialemaljer: Glitter, Självlysande & Målat Glas (Material & Tillverkning) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Specialemalje: Glimmer, Selvlysende & Glasmaleri",
      "summary": "Specialemalje: Glimmer, Selvlysende & Glasmaleri (Materialer & Produktion) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Spesialemaljer: Glitter, Selvlysende & Glassmaleri",
      "summary": "Spesialemaljer: Glitter, Selvlysende & Glassmaleri (Materialer & Produksjon) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Erikoisemalit: Glitter, Pimeässä Hohtava & Lasimaalaus",
      "summary": "Erikoisemalit: Glitter, Pimeässä Hohtava & Lasimaalaus (Materiaalit & Valmistus) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Emalie Specjalne: Brokat, Świecąca w Ciemności i Witrażowa",
      "summary": "Emalie Specjalne: Brokat, Świecąca w Ciemności i Witrażowa (Materiały i Produkcja) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Speciální Smalty: Třpytky, Svítící ve Tmě a Vitráž",
      "summary": "Speciální Smalty: Třpytky, Svítící ve Tmě a Vitráž (Materiály a Výroba) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Спецэмали: глиттер, люминофор и полупрозрачный витраж",
      "summary": "Спецэмали: глиттер, люминофор и полупрозрачный витраж (Материалы и производство) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "特殊エナメル仕上げ：グリッター(ラメ)・夜光蓄光・半透明ステンドグラス",
      "summary": "特殊エナメル仕上げ：グリッター(ラメ)・夜光蓄光・半透明ステンドグラス (素材・製造プロセス工学) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "특수 에나멜 공법: 글리터(펄), 야광(축광) & 반투명 스테인드글라스",
      "summary": "특수 에나멜 공법: 글리터(펄), 야광(축광) & 반투명 스테인드글라스 (소재 및 제조 공법) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Enamel Khusus: Efek Glitter, Glow-in-the-Dark & Kaca Patri",
      "summary": "Enamel Khusus: Efek Glitter, Glow-in-the-Dark & Kaca Patri (Material & Manufaktur) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "تأثيرات المينا الخاصة: الجليتر والمضيء في الظلام والزجاج المعشق",
      "summary": "تأثيرات المينا الخاصة: الجليتر والمضيء في الظلام والزجاج المعشق (المواد والتصنيع المعدني) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "spinner-bottle-opener-and-magnetic-interlocking-race-medal-trends": {
    "en": {
      "title": "2026–2027 Race Medal Trends: 360° Spinners, Bottle Openers & Magnetic Interlocking Series Medals",
      "summary": "Boost repeat race registrations with 360° spinning center medallions, integrated brewery bottle openers, and 2-to-4 piece magnetic interlocking medal series."
    },
    "de": {
      "title": "Medaillen-Trends: 360°-Spinner, Öffner & Magnet-Puzzle",
      "summary": "Medaillen-Trends: 360°-Spinner, Öffner & Magnet-Puzzle (Medaillen & Sportevents) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Tendances Médailles : Rotatives 360°, Décapsuleurs & Puzzles",
      "summary": "Tendances Médailles : Rotatives 360°, Décapsuleurs & Puzzles (Médailles & Événements Sportifs) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Medaille Trends: 360° Spinners, Openers & Puzzelmedailles",
      "summary": "Medaille Trends: 360° Spinners, Openers & Puzzelmedailles (Medailles & Sportevenementen) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Tendencias en Medallas: Giratorias, Abridor y Rompecabezas",
      "summary": "Tendencias en Medallas: Giratorias, Abridor y Rompecabezas (Medallas y Eventos Deportivos) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Trend Medaglie Gara: Spinner 360°, Apribottiglie e Puzzle",
      "summary": "Trend Medaglie Gara: Spinner 360°, Apribottiglie e Puzzle (Medaglie ed Eventi Sportivi) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Tendências em Medalhas: Giratórias, Abridor e Quebra-Cabeça",
      "summary": "Tendências em Medalhas: Giratórias, Abridor e Quebra-Cabeça (Medalhas e Eventos Desportivos) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Tävlingsmedaljtrender: 360° Snurror, Öppnare & Pussel",
      "summary": "Tävlingsmedaljtrender: 360° Snurror, Öppnare & Pussel (Medaljer & Idrottsevenemang) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Medaljertrends: 360° Spinnere, Oplukkere & Puslespil",
      "summary": "Medaljertrends: 360° Spinnere, Oplukkere & Puslespil (Medaljer & Sportsevents) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Medaljertrender: 360° Spinnere, Åpnere & Puslespill",
      "summary": "Medaljertrender: 360° Spinnere, Åpnere & Puslespill (Medaljer & Idrettsarrangementer) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Mitalitrendit: 360° Pyörivät, Korkinavaajat & Magneettipalapelit",
      "summary": "Mitalitrendit: 360° Pyörivät, Korkinavaajat & Magneettipalapelit (Mitalit & Urheilutapahtumat) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Trendy Medali Biegowych: Spinnery 360°, Otwieracze i Puzzle",
      "summary": "Trendy Medali Biegowych: Spinnery 360°, Otwieracze i Puzzle (Medale i Imprezy Sportowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Trendy Závodních Medailí: 360° Otočné, Otvíráky a Puzzle",
      "summary": "Trendy Závodních Medailí: 360° Otočné, Otvíráky a Puzzle (Medaile a Sportovní Akce) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Тренды медалей: спиннеры 360°, открывалки и магнитные пазлы",
      "summary": "Тренды медалей: спиннеры 360°, открывалки и магнитные пазлы (Медали и спортивные события) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "最新マラソンメダル設計：360°回転・栓抜き一体・マグネット連結パズル",
      "summary": "最新マラソンメダル設計：360°回転・栓抜き一体・マグネット連結パズル (マラソンメダル・スポーツ大会) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "최신 마라톤 메달 트렌드: 360도 회전, 병따개, 자석 연결 퍼즐 메달",
      "summary": "최신 마라톤 메달 트렌드: 360도 회전, 병따개, 자석 연결 퍼즐 메달 (마라톤 메달 및 스포츠 행사) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Tren Medali Lomba: Spinner 360°, Pembuka Botol & Puzzle Magnetik",
      "summary": "Tren Medali Lomba: Spinner 360°, Pembuka Botol & Puzzle Magnetik (Medali & Acara Olahraga) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "أحدث صيحات ميداليات السباق: الدوارة والفتاحات والألغاز المغناطيسية",
      "summary": "أحدث صيحات ميداليات السباق: الدوارة والفتاحات والألغاز المغناطيسية (الميداليات والفعاليات الرياضية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "virtual-race-finisher-medals-lightweight-mailer-packaging-and-fulfillment": {
    "en": {
      "title": "Virtual Race Finisher Medals: Weight Optimization, Flat Mailer Envelopes & 3PL Fulfillment Prep",
      "summary": "Cut domestic postage costs by 35% on virtual runs using weight-optimized 2.8mm finisher medals, flat-fold ribbons, and FNSKU/barcode pre-pack kits."
    },
    "de": {
      "title": "Virtuelle Laufmedaillen: Versandoptimiertes Gewicht & Porto",
      "summary": "Virtuelle Laufmedaillen: Versandoptimiertes Gewicht & Porto (Medaillen & Sportevents) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Médailles de Courses Virtuelles : Poids & Enveloppes Postales",
      "summary": "Médailles de Courses Virtuelles : Poids & Enveloppes Postales (Médailles & Événements Sportifs) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Virtuele Loopmedailles: Lichtgewicht & Brievenbusverpakking",
      "summary": "Virtuele Loopmedailles: Lichtgewicht & Brievenbusverpakking (Medailles & Sportevenementen) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Medallas de Carreras Virtuales: Peso y Sobres de Envío",
      "summary": "Medallas de Carreras Virtuales: Peso y Sobres de Envío (Medallas y Eventos Deportivos) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Medaglie per Gare Virtuali: Ottimizzazione Peso e Buste",
      "summary": "Medaglie per Gare Virtuali: Ottimizzazione Peso e Buste (Medaglie ed Eventi Sportivi) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Medalhas para Corridas Virtuais: Peso e Envelopes Postais",
      "summary": "Medalhas para Corridas Virtuais: Peso e Envelopes Postais (Medalhas e Eventos Desportivos) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Virtuella Loppsmedaljer: Lättviktsoptimering & Postkuvert",
      "summary": "Virtuella Loppsmedaljer: Lättviktsoptimering & Postkuvert (Medaljer & Idrottsevenemang) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Virtuelle Løbsmedaljer: Vægtoptimering & Forsendelseskuvert",
      "summary": "Virtuelle Løbsmedaljer: Vægtoptimering & Forsendelseskuvert (Medaljer & Sportsevents) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Virtuelle Løpsmedaljer: Vektoptimering & Postkonvolutter",
      "summary": "Virtuelle Løpsmedaljer: Vektoptimering & Postkonvolutter (Medaljer & Idrettsarrangementer) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Virtuaalijuoksun Mitalit: Paino-optimointi & Postituskuoret",
      "summary": "Virtuaalijuoksun Mitalit: Paino-optimointi & Postituskuoret (Mitalit & Urheilutapahtumat) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Medale do Biegów Wirtualnych: Lekka Waga i Koperty 3PL",
      "summary": "Medale do Biegów Wirtualnych: Lekka Waga i Koperty 3PL (Medale i Imprezy Sportowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Medaile pro Virtuální Závody: Hmotnost a Poštovní Obálky",
      "summary": "Medaile pro Virtuální Závody: Hmotnost a Poštovní Obálky (Medaile a Sportovní Akce) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Медали для виртуальных забегов: оптимизация веса и почтовые конверты",
      "summary": "Медали для виртуальных забегов: оптимизация веса и почтовые конверты (Медали и спортивные события) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "バーチャルマラソン向け軽量メダル設計＆封筒郵送・3PL出荷ガイド",
      "summary": "バーチャルマラソン向け軽量メダル設計＆封筒郵送・3PL出荷ガイド (マラソンメダル・スポーツ大会) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "버추얼 마라톤 완주 메달: 우편 요금 절감형 경량 설계 및 패킹",
      "summary": "버추얼 마라톤 완주 메달: 우편 요금 절감형 경량 설계 및 패킹 (마라톤 메달 및 스포츠 행사) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Medali Lari Virtual: Optimasi Berat & Kemasan Amplop Pos",
      "summary": "Medali Lari Virtual: Optimasi Berat & Kemasan Amplop Pos (Medali & Acara Olahraga) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "ميداليات السباقات الافتراضية: تحسين الوزن ومغلفات الشحن البريدي",
      "summary": "ميداليات السباقات الافتراضية: تحسين الوزن ومغلفات الشحن البريدي (الميداليات والفعاليات الرياضية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "youth-sports-tournament-medals-and-baseball-trading-pins-bulk-guide": {
    "en": {
      "title": "Youth Sports Tournament Medals & Oversized Baseball Trading Pins: High-Volume League Sourcing",
      "summary": "Optimize league budgets with $0.82–$1.85 tournament medals and oversized 1.75\"–2\" glitter/spinner baseball trading pins shipped in 8–12 days."
    },
    "de": {
      "title": "Jugendturnier-Medaillen & Baseball-Tauschpins in Großmengen",
      "summary": "Jugendturnier-Medaillen & Baseball-Tauschpins in Großmengen (Medaillen & Sportevents) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Médailles Tournois Jeunes & Pins d’Échange Baseball en Gros",
      "summary": "Médailles Tournois Jeunes & Pins d’Échange Baseball en Gros (Médailles & Événements Sportifs) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Jeugdtoernooi Medailles & Honkbal Ruilpins in Bulk",
      "summary": "Jeugdtoernooi Medailles & Honkbal Ruilpins in Bulk (Medailles & Sportevenementen) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Medallas para Torneos Juveniles y Pines Intercambiables",
      "summary": "Medallas para Torneos Juveniles y Pines Intercambiables (Medallas y Eventos Deportivos) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Medaglie Tornei Giovanili e Spille da Scambio Baseball",
      "summary": "Medaglie Tornei Giovanili e Spille da Scambio Baseball (Medaglie ed Eventi Sportivi) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Medalhas de Torneios Juvenis e Broches de Troca em Lote",
      "summary": "Medalhas de Torneios Juvenis e Broches de Troca em Lote (Medalhas e Eventos Desportivos) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Ungdomsturneringsmedaljer & Baseboll Bytespins i Bulk",
      "summary": "Ungdomsturneringsmedaljer & Baseboll Bytespins i Bulk (Medaljer & Idrottsevenemang) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Ungdomsturneringsmedaljer & Baseball-Byttepins i Engros",
      "summary": "Ungdomsturneringsmedaljer & Baseball-Byttepins i Engros (Medaljer & Sportsevents) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Ungdomsturneringsmedaljer & Baseball-Byttepins i Bulk",
      "summary": "Ungdomsturneringsmedaljer & Baseball-Byttepins i Bulk (Medaljer & Idrettsarrangementer) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Nuorisoturnausmitalit & Joukkueiden Vaihtopinssit Tukkuerissä",
      "summary": "Nuorisoturnausmitalit & Joukkueiden Vaihtopinssit Tukkuerissä (Mitalit & Urheilutapahtumat) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Medale Turniejów Młodzieżowych i Przypinki Wymienne Klubowe",
      "summary": "Medale Turniejów Młodzieżowych i Przypinki Wymienne Klubowe (Medale i Imprezy Sportowe) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Medaile pro Mládežnické Turnaje a Sběratelské Odznaky",
      "summary": "Medaile pro Mládežnické Turnaje a Sběratelské Odznaky (Medaile a Sportovní Akce) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Медали для детских турниров и бейсбольные коллекционные значки",
      "summary": "Медали для детских турниров и бейсбольные коллекционные значки (Медали и спортивные события) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "ユーススポーツ大会メダル＆野球・クラブチーム交換用トレーディングピン",
      "summary": "ユーススポーツ大会メダル＆野球・クラブチーム交換用トレーディングピン (マラソンメダル・スポーツ大会) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "유소년 스포츠 대회 메달 및 야구·클럽 트레이딩 핀 대량 발주",
      "summary": "유소년 스포츠 대회 메달 및 야구·클럽 트레이딩 핀 대량 발주 (마라톤 메달 및 스포츠 행사) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Medali Turnamen Olahraga Remaja & Pin Trading Bisbol Grosir",
      "summary": "Medali Turnamen Olahraga Remaja & Pin Trading Bisbol Grosir (Medali & Acara Olahraga) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "ميداليات بطولات الناشئين ودبابيس تبادل فرق البيسبول بالجملة",
      "summary": "ميداليات بطولات الناشئين ودبابيس تبادل فرق البيسبول بالجملة (الميداليات والفعاليات الرياضية) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "zinc-alloy-die-casting-vs-die-struck-brass-iron-medals-pins-cost": {
    "en": {
      "title": "Zinc Alloy Die-Casting vs. Die-Struck Brass & Iron: 3D Relief Depth, Tooling Fees & Unit Economics",
      "summary": "Compare hot-chamber Zamak #3 zinc alloy die-casting vs hydraulic die-struck brass and iron across 3D sculpting depth, mold fees ($55–$150), and unit cost."
    },
    "de": {
      "title": "Zinkdruckguss vs. Messing-/Eisenprägung: Kostenvergleich",
      "summary": "Zinkdruckguss vs. Messing-/Eisenprägung: Kostenvergleich (Werkstoffe & Prägetechnik) — Geprüfte Werkstoleranzen aus Zhongshan, Werkzeugkosten-Richtlinien und direkte Großhandelspreise."
    },
    "fr": {
      "title": "Moulage Zinc vs Frappe Laiton & Fer : Coûts & Reliefs",
      "summary": "Moulage Zinc vs Frappe Laiton & Fer : Coûts & Reliefs (Matériaux & Fabrication) — Tolérances certifiées de notre fonderie à Zhongshan, politique d’outillage et tarifs directs d’usine."
    },
    "nl": {
      "title": "Zink Spuitgiet vs. Messing/IJzer Stansen: Kostprijsverschillen",
      "summary": "Zink Spuitgiet vs. Messing/IJzer Stansen: Kostprijsverschillen (Materialen & Productie) — Geverifieerde fabriekstoleranties uit Zhongshan, matrijsvoorwaarden en directe groothandelsprijzen."
    },
    "es": {
      "title": "Fundición de Zinc vs. Latón/Hierro Acuñado: Economía",
      "summary": "Fundición de Zinc vs. Latón/Hierro Acuñado: Economía (Materiales y Fabricación) — Tolerancias verificadas en Zhongshan, políticas de exención de troqueles y costos directos de fábrica."
    },
    "it": {
      "title": "Pressofusione Zinco vs Coniatura Ottone/Ferro: Costi",
      "summary": "Pressofusione Zinco vs Coniatura Ottone/Ferro: Costi (Materiali e Produzione) — Tolleranze verificate nella fonderia di Zhongshan, esenzione stampi e prezzi diretti all’ingrosso."
    },
    "pt": {
      "title": "Fundição de Zinco vs. Latão/Ferro Estampado: Custos",
      "summary": "Fundição de Zinco vs. Latão/Ferro Estampado: Custos (Materiais e Fabrico) — Tolerâncias verificadas em Zhongshan, políticas de isenção de moldes e preços diretos da fábrica."
    },
    "sv": {
      "title": "Pressgjuten Zink vs. Präglad Mässing & Järn: Ekonomi",
      "summary": "Pressgjuten Zink vs. Präglad Mässing & Järn: Ekonomi (Material & Tillverkning) — Verifierade fabrikstoleranser från Zhongshan, verktygsregler och direkta partipriser."
    },
    "da": {
      "title": "Trykstøbt Zink vs. Præget Messing & Jern: Prisanalyse",
      "summary": "Trykstøbt Zink vs. Præget Messing & Jern: Prisanalyse (Materialer & Produktion) — Verificerede fabrikstolerancer fra Zhongshan, formregler og direkte engrospriser."
    },
    "no": {
      "title": "Trykkstøpt Sink vs. Preget Messing & Jern: Kostnader",
      "summary": "Trykkstøpt Sink vs. Preget Messing & Jern: Kostnader (Materialer & Produksjon) — Verifiserte fabrikktoleranser fra Zhongshan, formregler og direkte engrospriser."
    },
    "fi": {
      "title": "Sinkkipainevalu vs. Prässätty Messinki & Rauta: Kustannukset",
      "summary": "Sinkkipainevalu vs. Prässätty Messinki & Rauta: Kustannukset (Materiaalit & Valmistus) — Zhongshanin tehtaan toleranssit, muottikäytännöt ja suorat tehdasvertailuhinnat."
    },
    "pl": {
      "title": "Odlew Cynkowy vs. Tłoczony Mosiądz i Żelazo: Kalkulacja",
      "summary": "Odlew Cynkowy vs. Tłoczony Mosiądz i Żelazo: Kalkulacja (Materiały i Produkcja) — Zweryfikowane tolerancje fabryczne z Zhongshan, zasady matryc oraz bezpośrednie ceny producenta."
    },
    "cs": {
      "title": "Tlakové Lití Zinku vs. Ražba Mosazi a Železa: Náklady",
      "summary": "Tlakové Lití Zinku vs. Ražba Mosazi a Železa: Náklady (Materiály a Výroba) — Ověřené výrobní tolerance z Zhongshanu, podmínky pro raznice a přímé tovární ceny."
    },
    "ru": {
      "title": "Литьё из цинка против чеканки из латуни и стали: экономика",
      "summary": "Литьё из цинка против чеканки из латуни и стали: экономика (Материалы и производство) — Проверенные заводские допуски из Чжуншаня, условия по штампам и прямые оптовые цены."
    },
    "ja": {
      "title": "亜鉛合金ダイキャスト vs 真鍮・鉄プレス打ち抜き：立体感・金型・単価比較",
      "summary": "亜鉛合金ダイキャスト vs 真鍮・鉄プレス打ち抜き：立体感・金型・単価比較 (素材・製造プロセス工学) — 中山直営工場の精密公差データ・金型費免除条件・大量生産コストベンチマークを詳解。"
    },
    "ko": {
      "title": "아연 합금 다이캐스팅 vs 황동·철 스탬핑: 입체감, 금형비 및 원가 비교",
      "summary": "아연 합금 다이캐스팅 vs 황동·철 스탬핑: 입체감, 금형비 및 원가 비교 (소재 및 제조 공법) — 중국 중산 직영 공장의 정밀 공차 데이터, 금형비 면제 기준 및 수량별 도매 단가 기준."
    },
    "id": {
      "title": "Die-Cast Zinc Alloy vs Kuningan & Besi Stamping: Analisis Biaya",
      "summary": "Die-Cast Zinc Alloy vs Kuningan & Besi Stamping: Analisis Biaya (Material & Manufaktur) — Toleransi pabrik Zhongshan terverifikasi, kebijakan biaya matras, dan patokan harga grosir langsung."
    },
    "ar": {
      "title": "سبك الزنك مقابل سك النحاس والحديد: عمق النقش واقتصاديات التكلفة",
      "summary": "سبك الزنك مقابل سك النحاس والحديد: عمق النقش واقتصاديات التكلفة (المواد والتصنيع المعدني) — تفاوتات التصنيع المعتمدة في تشونغشان، وسياسات إعفاء القوالب ومعايير التسعير المباشر."
    }
  },
  "custom-metal-fridge-magnets-3d-zinc-vs-hard-soft-enamel-epoxy-guide": {
    "en": {
      "title": "Custom Metal Fridge Magnets: 3D Zinc vs. Enamel & Epoxy",
      "summary": "Compare 3D zinc die-cast, hard enamel, soft enamel & CMYK epoxy metal fridge magnets across mold waivers, unit cost ($0.48–$1.95), and finish."
    },
    "de": {
      "title": "Metall-Kühlschrankmagnete: 3D vs Emaille",
      "summary": "Vergleich von 3D-Zinkguss, Hart- und Weichemaille sowie CMYK-Epoxid-Metallmagneten ab $0,48/Stk. inkl. Werkzeugbefreiung ab 500–1.000 Stk."
    },
    "fr": {
      "title": "Magnets Frigo Métal: 3D Zinc vs Émail",
      "summary": "Comparez magnets métal 3D zinc, émail dur cloisonné, émail doux et dôme époxy CMJN dès $0,48/pc avec exonération de moule dès 500–1 000 pcs."
    },
    "nl": {
      "title": "Metalen Koelkastmagneten: 3D vs Emaille",
      "summary": "Vergelijk 3D-zinkgietwerk, hard/zacht emaille en CMYK epoxy metalen koelkastmagneten vanaf $0,48/st. met matrijsvrijstelling bij 500–1.000+ st."
    },
    "es": {
      "title": "Imanes Metal: Zinc 3D vs Esmalte y Epoxi",
      "summary": "Compare imanes metálicos de zinc 3D, esmalte duro, esmalte blando y epoxi CMYK desde $0.48/ud. con exención de molde desde 500–1,000 unidades."
    },
    "it": {
      "title": "Magneti Frigo Metallo: Zinco 3D vs Smalto",
      "summary": "Confronto tra magneti in metallo zinco 3D, smalto duro cloisonné, smalto morbido ed epossidico CMYK da $0,48/pz con esenzione stampo da 500 pz."
    },
    "pt": {
      "title": "Ímãs Geladeira Metal: Zinco 3D vs Esmalte",
      "summary": "Compare ímãs metálicos em zinco 3D, esmalte duro, esmalte macio e epóxi CMYK a partir de $0,48/un. com isenção de molde a partir de 500–1.000 un."
    },
    "sv": {
      "title": "Metallmagneter: 3D-Zink vs Emalj & Epoxi",
      "summary": "Jämför kylskåpsmagneter i 3D-zink, hård/mjuk emalj och CMYK-epoxi från $0,48/st med slopad formavgift från 500–1 000 st direkt från fabrik."
    },
    "da": {
      "title": "Metalmagneter: 3D-Zink vs Emalje & Epoxy",
      "summary": "Sammenlign køleskabsmagneter i 3D-zink, hård/blød emalje og CMYK-epoxy fra $0,48/stk. med formfritagelse ved 500–1.000+ stk. direkte fra fabrik."
    },
    "no": {
      "title": "Metallmagneter: 3D-Sink vs Emalje",
      "summary": "Sammenlign kjøleskapsmagneter i 3D-sink, hard/myk emalje og CMYK-epoksy fra $0,48/stk. med formfritak ved 500–1 000+ stk. direkte fra fabrikken."
    },
    "fi": {
      "title": "Metallimagneetit: 3D-Sinkki vs Emali",
      "summary": "Vertaa 3D-sinkkivalu-, kova-/pehmeäemali- ja CMYK-epoksijääkaappimagneetteja alk. $0,48/kpl sekä muottivapautusta 500–1 000 kpl tilauksissa."
    },
    "pl": {
      "title": "Magnesy Metalowe: Cynk 3D vs Emalia",
      "summary": "Porównaj magnesy metalowe z odlewu 3D cynku, twardej/miękkiej emalii i żywicy epoksydowej CMYK od $0,48/szt. ze zwolnieniem z matrycy od 500 szt."
    },
    "cs": {
      "title": "Kovové Magnetky: 3D Zinek vs Smalt",
      "summary": "Porovnejte kovové magnetky ze 3D zinku, tvrdého/měkkého smaltu a CMYK epoxidu od $0,48/ks s odpuštěním formy od 500–1 000 ks přímo z továrny."
    },
    "ru": {
      "title": "Магниты из металла: 3D-цинк и эмаль",
      "summary": "Сравнение металлических магнитов 3D-литьё, твёрдая/мягкая эмаль и смола CMYK от $0,48/шт. с отменой платы за штамп от 500–1 000 шт."
    },
    "ja": {
      "title": "金属マグネット製法比較：3D亜鉛 vs 七宝・エポキシ",
      "summary": "3D亜鉛合金ダイキャスト・本七宝ハードエナメル・ソフトエナメル・オフセット印刷+樹脂盛りの単価($0.48〜)・金型代免除条件を詳細比較。"
    },
    "ko": {
      "title": "금속 냉장고 자석 비교: 3D 아연 vs 에나멜·에폭시",
      "summary": "3D 아연합금 다이캐스팅, 칠보 하드 에나멜, 소프트 에나멜, 옵셋 에폭시 냉장고 자석의 단가($0.48~), 금형 면제 및 마감 비교 가이드."
    },
    "id": {
      "title": "Magnet Kulkas Logam: Seng 3D vs Enamel",
      "summary": "Bandingkan magnet kulkas seng 3D die-cast, enamel keras, enamel lunak & epoksi CMYK mulai $0,48/pcs beserta syarat bebas biaya cetakan pabrik."
    },
    "ar": {
      "title": "مغناطيس المعدن: زنك 3D مقابل المينا",
      "summary": "مقارنة مغناطيس الثلاجة المعدني بالزنك ثلاثي الأبعاد والمينا الصلبة والناعمة وإيبوكسي الألوان ($0.48–$1.95) مع شروط الإعفاء من القالب."
    }
  },
  "museum-tourism-souvenir-metal-fridge-magnets-kinetic-stained-glass-multi-layer": {
    "en": {
      "title": "Museum Souvenir Magnets: Kinetic & 3D Layered",
      "summary": "Design high-margin museum and city souvenir fridge magnets with 360° spinners, sliding tracks, stained-glass cut-outs, and multi-layer 3D relief."
    },
    "de": {
      "title": "Souvenir-Magnete: Spinner & Glasmalerei",
      "summary": "Design für Museumsshops & Städte-Souvenirs: 360°-Spinner-Magnete, Gleitschienen, Buntglas-Durchbruch & mehrschichtige 3D-Reliefmagnete ab Werk."
    },
    "fr": {
      "title": "Magnets Souvenirs: Cinétiques & Vitrail",
      "summary": "Créez des magnets de musée et tourisme à forte marge : cadrans rotatifs 360°, glissières, vitrail translucide découpé et plaques 3D superposées."
    },
    "nl": {
      "title": "Souvenirmagneten: Spinner & Glas-in-Lood",
      "summary": "Ontwerp winstgevende museum- en stadssouvenir magneten met 360° spinners, schuifbanen, transparant glas-in-lood uitsnijding en meerlaags 3D-reliëf."
    },
    "es": {
      "title": "Imanes Museo y Turismo: Cinéticos y 3D",
      "summary": "Diseñe imanes de recuerdo rentables con piezas giratorias 360°, rieles deslizantes, vitrales translúcidos calados y relieves 3D multicapa."
    },
    "it": {
      "title": "Magneti Museo: Cinetici, Vetrata e 3D",
      "summary": "Progetta magneti souvenir per musei e turismo con meccanismi rotanti 360°, cursori scorrevoli, smalto traslucido effetto vetrata e rilievi 3D."
    },
    "pt": {
      "title": "Ímãs Museu e Turismo: Cinéticos e 3D",
      "summary": "Crie ímãs souvenir de alta margem para museus com giratórios 360°, trilhos deslizantes, vitrais translúcidos vazados e camadas 3D sobrepostas."
    },
    "sv": {
      "title": "Souvenirmagneter: Spinner & Glasmålning",
      "summary": "Designa lönsamma musei- och stadssouvenirer med 360° snurror, skjutspår, genombruten glasmålnings-emalj och flerskiktade 3D-metallmagneter."
    },
    "da": {
      "title": "Souvenirmagneter: Spinner & Glasmaleri",
      "summary": "Design museums- og turismesouvenirs med 360° spinnere, glidespor, gennemskåret glasmaleri-emalje og flerlags 3D-metalmagneter direkte fra fabrik."
    },
    "no": {
      "title": "Suvenirmagneter: Spinner & Glassmaleri",
      "summary": "Design lønnsomme museums- og turismesuvenirer med 360° spinnere, glidespor, gjennombrutt glassmaleri-emalje og flerlags 3D-metallmagneter."
    },
    "fi": {
      "title": "Matkamuistomagneetit: Kineettinen & 3D",
      "summary": "Suunnittele museokauppojen suosikkimagneetit: 360° pyörivät rattaat, liukukiskot, läpikuultava lasimaalausemali ja monikerroksiset 3D-reliefit."
    },
    "pl": {
      "title": "Magnesy Muzealne: Kinetyczne i Witraż",
      "summary": "Projektuj wysokomarżowe pamiątki turystyczne: magnesy obrotowe 360°, suwaki na szynach, ażurowy witraż translucentny oraz warstwowe panoramy 3D."
    },
    "cs": {
      "title": "Muzejní Magnetky: Kinetické a Vitráž",
      "summary": "Navrhujte ziskové turistické suvenýry: 360° otočné magnetky, posuvné drážky, průsvitnou vitrážovou smaltovanou mřížku a vícevrstvé 3D reliéfy."
    },
    "ru": {
      "title": "Музейные магниты: Спиннер и витраж",
      "summary": "Сувенирные магниты с высокой наценкой: вращающиеся элементы 360°, слайдеры, ажурная витражная эмаль и многослойный 3D-рельеф на заказ."
    },
    "ja": {
      "title": "観光・博物館向けマグネット：回転ギミック・ステンドグラス・多層3D",
      "summary": "美術館・観光地土産に最適な360°回転スピナー、スライドレール機構、透かしステンドグラス七宝、重層リベット3D建築マグネットの設計ガイド。"
    },
    "ko": {
      "title": "박물관·관광 굿즈 자석: 회전·슬라이드·스테인드글라스",
      "summary": "박물관·랜드마크 매장에서 고수익을 내는 360도 회전 스피너, 슬라이딩 트랙, 투과형 스테인드글라스, 다층 리벳 3D 냉장고 자석 설계 가이드."
    },
    "id": {
      "title": "Magnet Suvenir Museum: Kinetik & 3D",
      "summary": "Rancang magnet kulkas suvenir wisata bermargin tinggi dengan pemutar 360°, jalur geser, potongan kaca patri bening, dan relief 3D berlapis."
    },
    "ar": {
      "title": "مغناطيس المتاحف: حركي وزجاج معشق 3D",
      "summary": "تصميم مغناطيس تذكاري للمتاحف والسياحة بآليات دوارة 360° ومسارات منزلقة ومينا زجاج معشق شفاف وطبقات معدنية ثلاثية الأبعاد."
    }
  },
  "fridge-magnet-pull-force-neodymium-vs-ferrite-rubber-backing-and-retail-cards": {
    "en": {
      "title": "Metal Fridge Magnet Pull Force & Retail Cards",
      "summary": "Engineer metal fridge magnet hold strength comparing recessed N45 neodymium vs ceramic ferrite vs soft rubber backs, plus 400gsm retail packaging."
    },
    "de": {
      "title": "Magnet-Haftkraft: Neodym vs Ferrit",
      "summary": "Zugkraft-Technik für Metallmagnete: Versenktes N45-Neodym vs. Ferrit vs. Weichgummi-Folie gegen Kratzer inkl. 400g-Verkaufskarten-Konfektion."
    },
    "fr": {
      "title": "Force Aimant: Néodyme vs Ferrite & Carte",
      "summary": "Ingénierie magnétique comparée : aimants néodyme N45 encastrés vs ferrite céramique vs dos caoutchouc anti-rayures et cartes retail 400 g/m²."
    },
    "nl": {
      "title": "Magneetkracht: Neodymium vs Ferriet",
      "summary": "Vergelijk trekkracht voor metalen magneten: verzonken N45 neodymium vs. ferriet vs. zachte antikras-rubberfolie en 400g Euroslot-winkelkaarten."
    },
    "es": {
      "title": "Fuerza Magnética: Neodimio vs Ferrita",
      "summary": "Ingeniería de sujeción en imanes metálicos: neodimio N45 empotrado frente a ferrita cerámica, goma antirayaduras y tarjetas retail 400gsm."
    },
    "it": {
      "title": "Forza Magnetica: Neodimio vs Ferrite",
      "summary": "Confronto tecnico tra magneti neodimio N45 incassati, ferrite ceramica e gomma antigraffio su acciaio inox, più cartoncini espositivi da 400gsm."
    },
    "pt": {
      "title": "Força Magnética: Neodímio vs Ferrita",
      "summary": "Engenharia de fixação para ímãs de metal: neodímio N45 embutido vs. ferrite cerâmica vs. manta magnética antirrisco e cartelas retail de 400gsm."
    },
    "sv": {
      "title": "Magnetstyrka: Neodym vs Ferrit & Gummi",
      "summary": "Konstruera rätt hållkraft för metallmagneter: försänkt N45 neodym jämfört med ferrit och repfritt gummiunderlag samt 400g Eurohål-butikskort."
    },
    "da": {
      "title": "Magnetstyrke: Neodym vs Ferrit & Kort",
      "summary": "Sammenligning af holdekraft på rustfrit stål: forsænket N45 neodym vs. keramisk ferrit vs. blød gummi samt 400gsm detailhandelskort."
    },
    "no": {
      "title": "Magnetkraft: Neodym vs Ferritt & Gummi",
      "summary": "Konstruksjon av holdekraft på kjøleskap: innfelt N45 neodym vs. keramisk ferritt vs. ripefri gummi og 400gsm butikkort med Eurohull."
    },
    "fi": {
      "title": "Magneettivoima: Neodyymi vs Ferriitti",
      "summary": "Vertaa upotetun N45-neodyymin, keraamisen ferriitin ja naarmuttamattoman kumitaustan pitovoimaa teräksessä sekä 400g myymäläkorttipakkausta."
    },
    "pl": {
      "title": "Siła Magnesu: Neodym N45 vs Ferryt",
      "summary": "Porównanie siły przyciągania: wpuszczany neodym N45, spiekany ferryt czy pełna mata gumowa bezpieczna dla stali nierdzewnej + karty 400g."
    },
    "cs": {
      "title": "Síla Magnetu: Neodym N45 vs Ferit",
      "summary": "Porovnání přídržné síly na nerezové lednici: zapuštěný neodym N45, keramický ferit či měkká guma proti poškrábání + prodejní karty 400gsm."
    },
    "ru": {
      "title": "Сила сцепления: Неодим N45 vs Феррит",
      "summary": "Расчёт магнитной тяги для тяжёлого металла: утопленный неодим N45, феррит или мягкая антицарапная резина + розничные подложки 400 г/м²."
    },
    "ja": {
      "title": "マグネット吸着力比較：N45ネオジム vs フェライト・ゴムシート・台紙",
      "summary": "重厚ダイキャスト製冷蔵庫マグネットの落下防止設計：埋め込みN45ネオジム、フェライト、傷防止ソフトラバーの吸着力比較と400g小売台紙仕様。"
    },
    "ko": {
      "title": "냉장고 자석 자력 비교: N45 네오디뮴 vs 페라이트·고무",
      "summary": "스테인리스 냉장고 밀착력을 위한 매립형 N45 네오디뮴, 페라이트, 긁힘 방지 고무 자석의 인장력 비교 및 400g 유로슬롯 매장용 카드 패키징 가이드."
    },
    "id": {
      "title": "Daya Tarik Magnet: Neodymium vs Ferit",
      "summary": "Rekayasa daya lekat magnet kulkas logam: perbandingan neodymium N45 tertanam vs ferit keramik vs karet antilecet dan kartu display ritel 400gsm."
    },
    "ar": {
      "title": "قوة الجذب: النيوديميوم N45 مقابل الفريت",
      "summary": "مقارنة قوة تثبيت المغناطيس المعدني: نيوديميوم N45 الغائر مقابل الفريت والظهر المطاطي المقاوم للخدش مع بطاقات العرض 400 جرام."
    }
  },
  "custom-challenge-coins-cost-pricing-tooling-guide": {
    "en": {
      "title": "Custom Challenge Coins Cost Guide: 2026 Factory Pricing, Mold Fees & Volume Tiers",
      "summary": "2026 custom challenge coins cost breakdown ($0.95–$4.50/pc): 2D vs 3D dies, mold waivers at 1,000+ pcs, dual plating and capsule packaging pricing."
    },
    "de": {
      "title": "Challenge Coins Kosten: Preise 2026",
      "summary": "Challenge Coins Kosten ab Werk ($0,95–$4,50/St.): 2D- vs. 3D-Prägeformen, Formenbefreiung ab 1.000 St., Bicolor-Plattierung und Kapseln."
    },
    "fr": {
      "title": "Prix Pièces Challenge : Tarifs 2026",
      "summary": "Coût des pièces challenge sur mesure ($0,95–$4,50/pc) : moules 2D/3D offerts dès 1 000 pcs, placage double ton et capsules acryliques."
    },
    "nl": {
      "title": "Challenge Coins Kosten & Prijzen 2026",
      "summary": "Fabriekskosten challenge coins ($0,95–$4,50/st.): 2D vs. 3D stempels, gratis matrijs vanaf 1.000 stuks, dual-plating en capsules."
    },
    "es": {
      "title": "Costo de Monedas Challenge: Precios",
      "summary": "Desglose de precios de monedas challenge ($0.95–$4.50/ud.): troqueles 2D/3D gratis desde 1,000 uds., baño bicolor y cápsulas."
    },
    "it": {
      "title": "Costo Monete Challenge: Prezzi 2026",
      "summary": "Costi di produzione monete challenge ($0,95–$4,50/pz): stampi 2D/3D azzerati da 1.000 pz, doppia placcatura e capsule protettive."
    },
    "pt": {
      "title": "Custo Moedas Challenge: Preços 2026",
      "summary": "Preços de fábrica para moedas challenge ($0,95–$4,50/un.): moldes 2D/3D isentos em 1.000+ un., banho duplo e cápsulas acrílicas."
    },
    "sv": {
      "title": "Pris Challenge Coins: Kostnadsguide",
      "summary": "Fabrikspriser för challenge coins ($0,95–$4,50/st): 2D/3D-verktyg, avgiftsfri form vid 1 000+ st, tvåtonsplätering och akrylkapslar."
    },
    "da": {
      "title": "Challenge Coins Pris: Omkostninger",
      "summary": "Fabrikspriser for challenge coins ($0,95–$4,50/stk.): 2D/3D-stempler frafaldes ved 1.000+ stk., to-tone belægning og kapsler."
    },
    "no": {
      "title": "Pris på Challenge Coins: Prisguide",
      "summary": "Fabrikkostnad for challenge coins ($0,95–$4,50/stk.): 2D/3D-verktøy uten avgift ved 1 000+ stk., to-farget plettering og kapsler."
    },
    "fi": {
      "title": "Haastekolikkojen Hintaopas 2026",
      "summary": "Haastekolikkojen tehdashinnat ($0,95–$4,50/kpl): 2D/3D-muotit ilmaiseksi 1 000+ kpl erissä, kaksiväripinnoitus ja akryylikapselit."
    },
    "pl": {
      "title": "Koszt Monet Challenge: Cennik 2026",
      "summary": "Cennik produkcji monet challenge ($0,95–$4,50/szt.): matryce 2D/3D gratis od 1 000 szt., podwójne galwanizowanie i kapsuły."
    },
    "cs": {
      "title": "Cena Challenge Mincí: Ceník 2026",
      "summary": "Výrobní ceny challenge mincí ($0,95–$4,50/ks): 2D a 3D formy zdarma od 1 000 ks, dvoubarevné pokovení a akrylové kapsle."
    },
    "ru": {
      "title": "Стоимость монет Challenge: цены 2026",
      "summary": "Калькуляция стоимости монет challenge ($0,95–$4,50/шт.): матрицы 2D/3D бесплатно от 1 000 шт., двойное покрытие и акриловые капсулы."
    },
    "ja": {
      "title": "チャレンジコイン製造コスト・金型費ガイド",
      "summary": "オリジナルチャレンジコイン工場直販価格（$0.95〜$4.50/個）：2D/3D金型費、1,000個以上での金型無料条件、二重メッキとカプセル単価。"
    },
    "ko": {
      "title": "챌린지 코인 제작 비용·단가표 가이드",
      "summary": "맞춤형 챌린지 코인 공장 직영 단가($0.95–$4.50/개): 2D·3D 금형 비용, 1,000개 이상 금형비 면제 및 투톤 도금·캡슐 가격 안내."
    },
    "id": {
      "title": "Biaya Pembuatan Koin Challenge 2026",
      "summary": "Rincian biaya pabrik koin challenge ($0,95–$4,50/pcs): cetakan 2D/3D gratis mulai 1.000 pcs, pelapisan ganda, dan kapsul akrilik."
    },
    "ar": {
      "title": "تكلفة تصنيع عملات التحدي: أسعار 2026",
      "summary": "دليل تكلفة عملات التحدي ($0.95–$4.50 للقطعة): إعفاء رسوم القالب عند طلب 1,000+ قطعة والطلاء المزدوج وكبسولات الحفظ."
    }
  }
};

export function localizeInsightMeta(
  guide: { slug?: string; id?: string; title?: string; summary?: string; category?: string },
  lang: SupportedLanguage
) {
  const cleanSlug = (guide.slug || guide.id || '').replace(/\.md$/i, '');
  const meta = INSIGHT_META_ALL[cleanSlug]?.[lang] || INSIGHT_META_ALL[cleanSlug]?.en;
  const category = (guide.category && INSIGHT_CATEGORIES[guide.category]?.[lang]) || guide.category || '';
  return {
    title: meta?.title || guide.title || cleanSlug,
    summary: meta?.summary || guide.summary || '',
    category
  };
}

export function localizeCollectionContent(col: any, lang: SupportedLanguage) {
  const t = useTranslations(lang);
  if (lang === 'en') {
    return {
      heroSubtitle: col.heroSubtitle,
      geoDirectAnswer: col.geoDirectAnswer,
      engineeringHighlights: col.engineeringHighlights,
      moq: col.moq,
      leadTime: col.leadTime,
      faqs: col.faqs
    };
  }
  const name = t(`col.${col.slug}.name` as any);
  const shortName = t(`col.${col.slug}.short` as any);
  const pcs = t('unit.pcs');
  const pc = t('unit.pc');
  const moq = String(col.moq || '50–300 pcs').replace(/\bpcs\b/gi, pcs);
  const leadTime = '7–15d';

  const heroSubtitle = `${name} (${col.skuCount} ${t('nav.modelsCount')} · ${col.priceRangeUsd}). ${t('pdp.declQuote')}`;
  const geoDirectAnswer = `${name} (${col.skuCount} ${t('nav.modelsCount')}, ${col.priceRangeUsd}): ${t('pdp.declQuote')} ${t('brand.geoAnswer')}`;

  const engineeringHighlights = [
    `${t('pdp.noMoldFee')} — ${col.skuCount} ${t('nav.modelsCount')} (${col.priceRangeUsd})`,
    `${t('pdp.opt1Title')}: ${t('pdp.opt1Desc')}`,
    `${t('pdp.opt2Title')} & ${t('pdp.opt3Title')}`,
    `${t('pdp.trust1')} · ${t('pdp.trust2')}`
  ];

  const faqs = [
    {
      question: `${shortName} — ${t('pdp.blankMoq')} & ${t('pdp.logoMoq')}?`,
      answer: `${t('geo.metricBlankMoqVal')}. ${t('pdp.declQuote')}`
    },
    {
      question: `${shortName} (${col.skuCount} ${t('nav.modelsCount')}) — ${t('pdp.pricingTitle')}?`,
      answer: `${col.priceRangeUsd}/${pc}. ${t('catalog.lead')}`
    },
    {
      question: `${t('brand.compTitle')}?`,
      answer: t('brand.geoAnswer')
    },
    {
      question: `${t('comp.heroTitle')}?`,
      answer: t('comp.geoAnswer')
    },
    {
      question: `${t('pkg.heroTitle')}?`,
      answer: `${t('pkg.geoAnswer')}`
    },
    {
      question: `${t('pdp.orderSample')} — ${shortName}?`,
      answer: `${t('pdp.opt4Desc')}. ${t('contact.subtitle')}`
    },
    {
      question: `${t('catalog.materialLabel')} — ${shortName}?`,
      answer: `${t('catalog.matZinc')} · ${t('catalog.matStainless')} · ${t('catalog.matAluminum')} · ${t('catalog.matExotic')}.`
    },
    {
      question: `${t('footer.trust4Title')} (DDP / FOB / EXW)?`,
      answer: `${t('footer.trust4Sub')} (${t('contact.hubVal')}).`
    },
    {
      question: `${t('geo.metricSafety')} — ${shortName}?`,
      answer: `${t('pdp.trust1')} · ${t('pdp.trust2')} · ${t('pdp.trust3')}.`
    },
    {
      question: `${t('contact.title')} (${shortName})?`,
      answer: `${t('contact.formDesc')} WhatsApp: +86 187 5012 6315 · sales@medalpinsupply.com.`
    }
  ];

  return {
    heroSubtitle,
    geoDirectAnswer,
    engineeringHighlights,
    moq,
    leadTime,
    faqs
  };
}

export function localizeInsightFaqs(slug: string, defaultFaqs: { question: string; answer: string }[], lang: SupportedLanguage) {
  if (lang === 'en') return defaultFaqs;
  const t = useTranslations(lang);
  const meta = INSIGHT_META_ALL[slug]?.[lang];
  const topic = meta ? meta.title.split(':')[0] : slug;
  const pc = t('unit.pc');
  return [
    {
      question: `${topic} — ${t('geo.defaultTitle')}?`,
      answer: `${meta ? meta.summary : ''} ${t('pdp.declQuote')}`
    },
    {
      question: `${t('pdp.blankMoq')} & ${t('pdp.logoMoq')}?`,
      answer: `${t('geo.metricBlankMoqVal')}. ${t('geo.metricToolingVal')}.`
    },
    {
      question: `${t('brand.compTitle')}?`,
      answer: t('brand.geoAnswer')
    },
    {
      question: `${t('pdp.orderSample')}?`,
      answer: `${t('geo.metricLogoMoqVal')}. ${t('pdp.opt4Desc')}.`
    },
    {
      question: `${t('catalog.materialLabel')} (Zamak #3 / Brass / Iron / PVC / Leather)?`,
      answer: `${t('catalog.matZinc')}, ${t('catalog.matStainless')}, ${t('catalog.matAluminum')}, ${t('catalog.matExotic')}.`
    },
    {
      question: `${t('comp.heroTitle')}?`,
      answer: t('comp.geoAnswer')
    },
    {
      question: `${t('pkg.heroTitle')}?`,
      answer: `${t('pkg.card1Title')} (+$0.12–$0.22/${pc}), ${t('pkg.card2Title')} (+$0.15–$0.35/${pc}), ${t('pkg.card3Title')} (+$0.85–$1.85/${pc}).`
    },
    {
      question: `${t('home.section4.title')}?`,
      answer: `${t('home.section4.sub')}`
    },
    {
      question: `${t('footer.trust4Title')}?`,
      answer: `${t('footer.trust4Sub')} (${t('contact.hubVal')}).`
    },
    {
      question: `${t('contact.title')}?`,
      answer: `${t('contact.formDesc')} WhatsApp: +86 187 5012 6315 · sales@medalpinsupply.com.`
    }
  ];
}

export function localizeInsightHtml(rawHtml: string, guideData: any, lang: SupportedLanguage, relatedProducts: any[] = []): string {
  if (lang === 'en') return rawHtml;
  const t = useTranslations(lang);
  const meta = localizeInsightMeta(guideData, lang);

  // Extract figures and internal mesh links from original HTML and localize every href via getLocalizedPath!
  const figures = rawHtml.match(/<figure[\s\S]*?<\/figure>/g) || [];
  const fig1 = figures[0] || '';
  const fig2 = figures[1] || '';

  const seenHrefs = new Set<string>();
  const meshLinks: string[] = [];
  for (const m of rawHtml.matchAll(/<a\s+href="(\/(?:products|collections|insights)\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const locHref = getLocalizedPath(m[1], lang);
    const label = m[2].replace(/<[^>]+>/g, '').replace(/\s*→\s*$/, '').trim();
    if (!seenHrefs.has(locHref) && label) {
      seenHrefs.add(locHref);
      meshLinks.push(`<li><a href="${locHref}">${label}</a></li>`);
    }
  }
  const meshLinksHtml = meshLinks.length > 0 ? `<ul class="localized-mesh-links">${meshLinks.slice(0, 18).join('')}</ul>` : '';

  const productsUrl = getLocalizedPath('/products', lang);
  const brandingUrl = getLocalizedPath('/custom-branding', lang);
  const packagingUrl = getLocalizedPath('/custom-packaging', lang);
  const complianceUrl = getLocalizedPath('/compliance-safety', lang);
  const contactUrl = getLocalizedPath('/contact', lang);

  const pinsGuideSlug = 'hard-enamel-vs-soft-enamel-pins-wholesale-cost-durability-guide';
  const medalsGuideSlug = 'custom-marathon-and-5k-10k-finisher-medals-race-director-sourcing-guide';
  const toolingGuideSlug = 'custom-mold-tooling-fees-explained-how-to-get-zero-mold-fee-wholesale';
  const pinsGuideUrl = getLocalizedPath(`/insights/${pinsGuideSlug}`, lang);
  const medalsGuideUrl = getLocalizedPath(`/insights/${medalsGuideSlug}`, lang);
  const toolingGuideUrl = getLocalizedPath(`/insights/${toolingGuideSlug}`, lang);

  const hasSkus = Array.isArray(relatedProducts) && relatedProducts.length > 0;
  const pcs = t('unit.pcs');
  const pc = t('unit.pc');
  const skuMatrixRows = hasSkus
    ? relatedProducts
        .map((prod: any) => {
          const p = prod.data || prod;
          const pUrl = getLocalizedPath(`/products/${p.slug}`, lang);
          const pTitle = localizeTitle(p.title, lang);
          const pMat = localizeMaterial(p.material, lang);
          return `<tr>
        <td><a href="${pUrl}"><strong>${pTitle}</strong></a></td>
        <td>${pMat} · ${p.size} (${p.weight})</td>
        <td>${p.moqNum || 100} ${pcs} · ${p.toolingFee}</td>
        <td>$${p.tier100} / $${p.tier500} / <strong>$${p.tier2000}</strong></td>
      </tr>`;
        })
        .join('\n')
    : '';

  const section1TableHtml = hasSkus
    ? `<div class="geo-table-wrap">
  <table class="geo-table">
    <thead>
      <tr>
        <th>${t('col.thName')}</th>
        <th>${t('col.thMaterial')} · ${t('col.thSizeWeight')}</th>
        <th>MOQ · ${t('col.thLogo')}</th>
        <th>${t('pdp.pricingTitle')}</th>
      </tr>
    </thead>
    <tbody>
      ${skuMatrixRows}
    </tbody>
  </table>
</div>`
    : `<div class="geo-table-wrap">
  <table class="geo-table">
    <thead>
      <tr>
        <th>${t('pdp.specColParam')}</th>
        <th>${t('pdp.specColVal')}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>${t('geo.metricTooling')}</strong></td>
        <td>${t('geo.metricToolingVal')} · ${t('pdp.declQuote')}</td>
      </tr>
      <tr>
        <td><strong>${t('pdp.blankMoq')}</strong></td>
        <td>${t('geo.metricBlankMoqVal')}</td>
      </tr>
      <tr>
        <td><strong>${t('pdp.logoMoq')}</strong></td>
        <td>${t('geo.metricLogoMoqVal')}</td>
      </tr>
      <tr>
        <td><strong>${t('pdp.orderSample')}</strong></td>
        <td>${t('pdp.opt4Desc')}</td>
      </tr>
      <tr>
        <td><strong>${t('geo.metricSafety')}</strong></td>
        <td>${t('pdp.trust1')} · ${t('pdp.trust2')}</td>
      </tr>
    </tbody>
  </table>
</div>`;

  const skuCraftBulletsHtml = hasSkus
    ? `<ul class="localized-sku-specs">
  ${relatedProducts
    .map((prod: any) => {
      const p = prod.data || prod;
      const pUrl = getLocalizedPath(`/products/${p.slug}`, lang);
      const pTitle = localizeTitle(p.title, lang);
      const pMat = localizeMaterial(p.material, lang);
      const pAtt = localizeHardwareOrMagnets(p.attachmentEn, lang);
      const pPlating = localizeColors(p.platingEn, lang);
      return `<li><a href="${pUrl}"><strong>${pTitle}</strong></a> (${p.sku}): ${pMat}, ${p.size}, ${p.weight} · ${pPlating} · ${pAtt} · ${p.leadTime} ($${p.tier2000}–$${p.tier100}/${pc})</li>`;
    })
    .join('\n  ')}
</ul>`
    : '';

  return `
<h2 id="section-1">1. ${meta.title}</h2>
<p>${meta.summary}</p>
<p>${t('home.geo.answer')}</p>

<div class="exec-callout-box">
  <strong>${t('geo.metricTooling')}:</strong> ${t('geo.metricToolingVal')} · ${t('pdp.declQuote')}
</div>

${section1TableHtml}

${fig1}

<h2 id="section-2">2. ${t('brand.compTitle')}</h2>
<p>${t('brand.geoAnswer')}</p>
${skuCraftBulletsHtml}

<div class="geo-table-wrap">
  <table class="geo-table">
    <thead>
      <tr>
        <th>${t('contact.brandingMode')}</th>
        <th>MOQ</th>
        <th>${t('pdp.pricingTitle')}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>${t('pdp.opt1Title')}</strong></td>
        <td>${(guideData.cols && (guideData.cols[0] === 'custom-enamel-pins' || guideData.cols[0] === 'custom-medals')) ? '300' : '50–300'} ${t('unit.pcs')}</td>
        <td>${t('pdp.opt1Desc')}</td>
      </tr>
      <tr>
        <td><strong>${t('pdp.opt2Title')}</strong></td>
        <td>100 ${t('unit.pcs')}</td>
        <td>${t('pdp.opt2Desc')}</td>
      </tr>
      <tr>
        <td><strong>${t('pdp.opt3Title')}</strong></td>
        <td>100 ${t('unit.pcs')}</td>
        <td>${t('pdp.opt3Desc')}</td>
      </tr>
      <tr>
        <td><strong>${t('pdp.opt4Title')}</strong></td>
        <td>7–10d</td>
        <td>${t('pdp.opt4Desc')}</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="section-3">3. ${t('home.section5.title')}</h2>
<p>${t('home.section5.sub')}</p>
<ul>
  <li><strong>${t('catalog.matStainless')}</strong>: $0.18 – $2.85 / ${t('unit.pc')}</li>
  <li><strong>${t('catalog.matZinc')}</strong>: $0.48 – $3.85 / ${t('unit.pc')}</li>
  <li><strong>${t('catalog.matAluminum')}</strong>: $0.14 – $2.40 / ${t('unit.pc')}</li>
  <li><strong>${t('catalog.matExotic')}</strong>: Pewter / Soft PVC / Leather / Fabric</li>
</ul>

${fig2}

<h2 id="section-4">4. ${t('comp.heroTitle')} &amp; ${t('pkg.heroTitle')}</h2>
<p>${t('comp.geoAnswer')}</p>
<p>${t('pkg.geoAnswer')}</p>
<div class="geo-table-wrap">
  <table class="geo-table">
    <thead>
      <tr>
        <th>${t('pkg.heroTitle')}</th>
        <th>MOQ</th>
        <th>${t('pdp.pricingTitle')}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>${t('pkg.card1Title')}</strong></td>
        <td>100 ${t('unit.pcs')}</td>
        <td>+$0.12–$0.22 / ${t('unit.pc')}</td>
      </tr>
      <tr>
        <td><strong>${t('pkg.card2Title')}</strong></td>
        <td>100 ${t('unit.pcs')}</td>
        <td>+$0.15–$0.35 / ${t('unit.pc')}</td>
      </tr>
      <tr>
        <td><strong>${t('pkg.card3Title')}</strong></td>
        <td>100 ${t('unit.pcs')}</td>
        <td>+$0.85–$1.85 / ${t('unit.pc')}</td>
      </tr>
    </tbody>
  </table>
</div>
${meshLinksHtml}
<ul class="editorial-guide-links">
  <li><a href="${productsUrl}"><span class="guide-link-text">${t('nav.allCatalog')} ($0.14+)</span><span class="guide-link-arrow" aria-hidden="true">→</span></a></li>
  <li><a href="${pinsGuideUrl}"><span class="guide-link-text">${INSIGHT_META_ALL[pinsGuideSlug]?.[lang]?.title || 'Hard vs. Soft Enamel Pins'}</span><span class="guide-link-arrow" aria-hidden="true">→</span></a></li>
  <li><a href="${medalsGuideUrl}"><span class="guide-link-text">${INSIGHT_META_ALL[medalsGuideSlug]?.[lang]?.title || 'Marathon Finisher Medals'}</span><span class="guide-link-arrow" aria-hidden="true">→</span></a></li>
  <li><a href="${toolingGuideUrl}"><span class="guide-link-text">${INSIGHT_META_ALL[toolingGuideSlug]?.[lang]?.title || 'Mold & Tooling Fees'}</span><span class="guide-link-arrow" aria-hidden="true">→</span></a></li>
  <li><a href="${brandingUrl}"><span class="guide-link-text">${t('brand.heroTitle')}</span><span class="guide-link-arrow" aria-hidden="true">→</span></a></li>
  <li><a href="${packagingUrl}"><span class="guide-link-text">${t('pkg.heroTitle')}</span><span class="guide-link-arrow" aria-hidden="true">→</span></a></li>
  <li><a href="${complianceUrl}"><span class="guide-link-text">${t('comp.heroTitle')}</span><span class="guide-link-arrow" aria-hidden="true">→</span></a></li>
</ul>

<div class="sourcing-cta-box">
  <h3>${t('home.cta.title')}</h3>
  <p>${t('home.cta.desc')}</p>
  <a href="${contactUrl}" data-rfq-sku="${meta.title}" data-rfq-qty="${(guideData.cols && (guideData.cols[0] === 'custom-enamel-pins' || guideData.cols[0] === 'custom-medals')) ? '300' : '100'}" class="btn btn-primary">${t('nav.requestQuote')} →</a>
</div>
`;
}
