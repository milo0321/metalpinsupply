import type { SupportedLanguage } from './config';
import { getLocalizedPath, useTranslations } from './utils';
import { localizeInsightMeta } from './insightAndCollectionLocalization';

export interface LocalizedProductData {
  title: string;
  metaTitle: string;
  metaDescription: string;
  overview: string;
  material: string;
  magnets: string;
  accessories: string;
  colors: string;
  specs: Array<[string, string]>;
  variants: Array<any>;
  features: string[];
  editorialHtml: string;
  faqs: Array<{ question: string; answer: string }>;
}

const SPEC_KEY_MAP: Record<string, Record<SupportedLanguage, string>> = {
  "Custom Tooling Mode": {
    "en": "Custom Tooling Mode",
    "de": "Sonderanfertigung / Werkzeug",
    "fr": "Mode Outillage Sur Mesure",
    "nl": "Maatwerk Matrijsmodus",
    "es": "Fabricación a Medida",
    "it": "Stampo su Misura",
    "pt": "Molde Sob Medida",
    "sv": "Specialverktyg & Gjutning",
    "da": "Specialfremstillet Form",
    "no": "Spesialtilpasset Form",
    "fi": "Mittatilaustyökalu",
    "pl": "Tryb Produkcji na Zamówienie",
    "cs": "Zakázková Výroba Formy",
    "ru": "Индивидуальная оснастка",
    "ja": "完全オーダーメイド仕様",
    "ko": "100% 고객 맞춤형 금형",
    "id": "Mode Cetakan Kustom",
    "ar": "تصنيع بقالب مخصص بالكامل"
  },
  "Production Category": {
    "en": "Production Category",
    "de": "Produktkategorie",
    "fr": "Catégorie de Production",
    "nl": "Productcategorie",
    "es": "Categoría de Producción",
    "it": "Categoria Produttiva",
    "pt": "Categoria de Produção",
    "sv": "Produktkategori",
    "da": "Produktkategori",
    "no": "Produktkategori",
    "fi": "Tuotekategoria",
    "pl": "Kategoria Produkcji",
    "cs": "Výrobní Kategorie",
    "ru": "Производственная категория",
    "ja": "製造カテゴリー",
    "ko": "생산 카테고리",
    "id": "Kategori Produksi",
    "ar": "فئة التصنيع"
  },
  "Base Material": {
    "en": "Base Material",
    "de": "Grundmaterial & Legierung",
    "fr": "Alliage de Base",
    "nl": "Basismateriaal",
    "es": "Metal / Material Base",
    "it": "Lega Base",
    "pt": "Material Base",
    "sv": "Basmaterial",
    "da": "Basismateriale",
    "no": "Basismateriale",
    "fi": "Perusmateriaali",
    "pl": "Materiał Bazowy",
    "cs": "Základní Materiál",
    "ru": "Основной материал",
    "ja": "本体素材・合金仕様",
    "ko": "기본 소재 및 합금",
    "id": "Material Dasar",
    "ar": "المادة الأساسية والسبيكة"
  },
  "Manufacturing Craft": {
    "en": "Manufacturing Craft",
    "de": "Präge- / Gussverfahren",
    "fr": "Procédé de Fabrication",
    "nl": "Productietechniek",
    "es": "Proceso de Fabricación",
    "it": "Lavorazione Tecnica",
    "pt": "Processo Fabril",
    "sv": "Tillverkningsmetod",
    "da": "Fremstillingsmetode",
    "no": "Produksjonsmetode",
    "fi": "Valmistusmenetelmä",
    "pl": "Technologia Wykonania",
    "cs": "Technologie Výroby",
    "ru": "Технология изготовления",
    "ja": "製造プロセス・仕上げ工法",
    "ko": "제조 공법",
    "id": "Teknik Manufaktur",
    "ar": "الحرفة التصنيعية"
  },
  "Standard Dimensions": {
    "en": "Standard Dimensions",
    "de": "Standardmaße",
    "fr": "Dimensions Standard",
    "nl": "Standaard Afmetingen",
    "es": "Dimensiones Estándar",
    "it": "Dimensioni Standard",
    "pt": "Dimensões Padrão",
    "sv": "Standardmått",
    "da": "Standardmål",
    "no": "Standardmål",
    "fi": "Vakiomitat",
    "pl": "Standardowe Wymiary",
    "cs": "Standardní Rozměry",
    "ru": "Стандартные размеры",
    "ja": "標準サイズ寸法",
    "ko": "표준 규격 치수",
    "id": "Dimensi Standar",
    "ar": "الأبعاد القياسية"
  },
  "Unit Net Weight": {
    "en": "Unit Net Weight",
    "de": "Stückgewicht",
    "fr": "Poids Unitaire Net",
    "nl": "Netto Stukgewicht",
    "es": "Peso Neto Unitario",
    "it": "Peso Netto Unitario",
    "pt": "Peso Líquido Unitário",
    "sv": "Nettovikt per St",
    "da": "Nettovægt pr. Stk",
    "no": "Nettovekt per Stk",
    "fi": "Nettopaino / Kpl",
    "pl": "Masa Netto Szt.",
    "cs": "Čistá Hmotnost Kusu",
    "ru": "Чистый вес изделия",
    "ja": "単体重量",
    "ko": "개당 순중량",
    "id": "Berat Bersih per Unit",
    "ar": "الوزن الصافي للقطعة"
  },
  "Electroplating & Finishes": {
    "en": "Electroplating & Finishes",
    "de": "Galvanik & Oberflächen",
    "fr": "Placages & Finitions",
    "nl": "Galvanisatie & Finishes",
    "es": "Acabados y Baños Metálicos",
    "it": "Finiture Galvaniche",
    "pt": "Banhos e Acabamentos",
    "sv": "Plätering & Ytbehandling",
    "da": "Plettering & Finish",
    "no": "Plettering & Finish",
    "fi": "Pinnoitus & Viimeistely",
    "pl": "Galwanizacja i Wykończenie",
    "cs": "Pokovení a Povrch",
    "ru": "Гальваника и отделка",
    "ja": "表面メッキ・仕上げ仕様",
    "ko": "표면 도금 및 마감",
    "id": "Elektroplating & Finishing",
    "ar": "الطلاء المعدني والتشطيبات"
  },
  "Attachment & Hardware": {
    "en": "Attachment & Hardware",
    "de": "Verschluss & Zubehör",
    "fr": "Attache & Accessoires",
    "nl": "Sluiting & Beslag",
    "es": "Enganches y Herrajes",
    "it": "Chiusura e Accessori",
    "pt": "Fecho e Ferragens",
    "sv": "Fäste & Beslag",
    "da": "Lukning & Beslag",
    "no": "Feste & Beslag",
    "fi": "Kiinnitys & Tarvikkeet",
    "pl": "Zapięcie i Osprzęt",
    "cs": "Zapínání a Kování",
    "ru": "Крепление и фурнитура",
    "ja": "付属留め具・パーツ",
    "ko": "뒷면 부자재 및 부속",
    "id": "Pengait & Perangkat Keras",
    "ar": "التثبيت والمرفقات"
  },
  "Tooling / Mold Policy": {
    "en": "Tooling / Mold Policy",
    "de": "Werkzeug- & Formrichtlinie",
    "fr": "Politique d’Outillage",
    "nl": "Matrijs- & Stempelbeleid",
    "es": "Política de Troqueles",
    "it": "Politica Stampi e Conii",
    "pt": "Política de Moldes",
    "sv": "Verktygs- & Formpolicy",
    "da": "Form- & Værktøjspolitik",
    "no": "Form- & Verktøypolicy",
    "fi": "Muottikäytäntö",
    "pl": "Zasady Dotyczące Matryc",
    "cs": "Pravidla pro Raznice",
    "ru": "Политика по штампам",
    "ja": "金型費用・免除条件",
    "ko": "금형비 및 면제 기준",
    "id": "Kebijakan Biaya Matras",
    "ar": "سياسة القوالب الهندسية"
  },
  "Wholesale MOQ": {
    "en": "Wholesale MOQ",
    "de": "Mindestbestellmenge (MOQ)",
    "fr": "Quantité Min. (MOQ)",
    "nl": "Minimumafname (MOQ)",
    "es": "Pedido Mínimo (MOQ)",
    "it": "Minimo d’Ordine (MOQ)",
    "pt": "Qtd. Mínima (MOQ)",
    "sv": "Minsta Antal (MOQ)",
    "da": "Mindste Antal (MOQ)",
    "no": "Minste Antall (MOQ)",
    "fi": "Vähimmäismäärä (MOQ)",
    "pl": "Minimalne Zamówienie",
    "cs": "Minimální Odběr (MOQ)",
    "ru": "Мин. партия (MOQ)",
    "ja": "最小注文数量 (MOQ)",
    "ko": "최소 주문 수량 (MOQ)",
    "id": "Pesanan Minimum (MOQ)",
    "ar": "الحد الأدنى للطلب"
  },
  "Digital Artwork Proof": {
    "en": "Digital Artwork Proof",
    "de": "Digitaler Korrekturabzug",
    "fr": "BAT Numérique",
    "nl": "Digitale Proefdruk",
    "es": "Prueba Digital",
    "it": "Bozza Grafica Digitale",
    "pt": "Prova Digital",
    "sv": "Digital Korrekturskiss",
    "da": "Digitalt Udkast",
    "no": "Digital Skisse",
    "fi": "Digitaalinen Vedos",
    "pl": "Projekt Graficzny",
    "cs": "Grafický Náhled",
    "ru": "Цифровой макет",
    "ja": "デザインデジタル校正",
    "ko": "디지털 시안 교정",
    "id": "Proof Desain Digital",
    "ar": "البروفة الرقمية المجانية"
  },
  "Pre-Production Sample": {
    "en": "Pre-Production Sample",
    "de": "Vorab-Musterfertigung",
    "fr": "Échantillon Pré-Série",
    "nl": "Voorproductie Monster",
    "es": "Muestra Preproducción",
    "it": "Campione Pre-Produzione",
    "pt": "Amostra Pré-Produção",
    "sv": "Förproduktionsprov",
    "da": "Før-Produktionsprøve",
    "no": "Før-Produksjonsprøve",
    "fi": "Esituotantomalli",
    "pl": "Próbka Przedprodukcyjna",
    "cs": "Předvýrobní Vzorek",
    "ru": "Предсерийный образец",
    "ja": "量産前サンプル製作",
    "ko": "양산 전 실물 샘플",
    "id": "Sampel Pra-Produksi",
    "ar": "عينة ما قبل الإنتاج"
  },
  "Compliance & Safety": {
    "en": "Compliance & Safety",
    "de": "Normen & Produktsicherheit",
    "fr": "Normes & Conformité",
    "nl": "Veiligheid & Compliance",
    "es": "Normativa y Seguridad",
    "it": "Sicurezza e Conformità",
    "pt": "Normas e Segurança",
    "sv": "Säkerhet & Efterlevnad",
    "da": "Sikkerhed & Lovkrav",
    "no": "Sikkerhet & Samsvar",
    "fi": "Turvallisuusstandardit",
    "pl": "Zgodność i Bezpieczeństwo",
    "cs": "Bezpečnostní Normy",
    "ru": "Стандарты безопасности",
    "ja": "安全基準コンプライアンス",
    "ko": "안전 인증 및 규제 준수",
    "id": "Keamanan & Kepatuhan",
    "ar": "معايير السلامة الدولية"
  }
};

const PHRASE_TRANSLATIONS: Array<[string, Record<SupportedLanguage, string>]> = [
  [
    "Marathon Finisher Medals",
    {
      "en": "Marathon Finisher Medals",
      "de": "Marathon-Finisher-Medaillen",
      "fr": "Médailles Finisher Marathon",
      "nl": "Marathon Finisher Medailles",
      "es": "Medallas Finisher Maratón",
      "it": "Medaglie Finisher Maratona",
      "pt": "Medalhas Finisher Maratona",
      "sv": "Maratonmedaljer",
      "da": "Maratonmedaljer",
      "no": "Maratonmedaljer",
      "fi": "Maratonmitalit",
      "pl": "Medale Maratońskie",
      "cs": "Maratonské Medaile",
      "ru": "Марафонские медали финишёра",
      "ja": "マラソン完走メダル",
      "ko": "마라톤 완주 메달",
      "id": "Medali Finisher Maraton",
      "ar": "ميداليات إنهاء الماراثون"
    }
  ],
  [
    "Finisher Medals",
    {
      "en": "Finisher Medals",
      "de": "Finisher-Medaillen",
      "fr": "Médailles Finisher",
      "nl": "Finisher Medailles",
      "es": "Medallas Finisher",
      "it": "Medaglie Finisher",
      "pt": "Medalhas Finisher",
      "sv": "Finishermedaljer",
      "da": "Finishermedaljer",
      "no": "Finishermedaljer",
      "fi": "Maaliintulomitalit",
      "pl": "Medale dla Uczestników",
      "cs": "Cílové Medaile",
      "ru": "Медали финишёра",
      "ja": "完走メダル",
      "ko": "완주 메달",
      "id": "Medali Finisher",
      "ar": "ميداليات الإنهاء"
    }
  ],
  [
    "Race Medals",
    {
      "en": "Race Medals",
      "de": "Lauf-Medaillen",
      "fr": "Médailles de Course",
      "nl": "Hardloopmedailles",
      "es": "Medallas de Carrera",
      "it": "Medaglie da Corsa",
      "pt": "Medalhas de Corrida",
      "sv": "Loppmedaljer",
      "da": "Løbsmedaljer",
      "no": "Løpsmedaljer",
      "fi": "Juoksumitalit",
      "pl": "Medale Biegowe",
      "cs": "Běžecké Medaile",
      "ru": "Медали для забегов",
      "ja": "レースメダル",
      "ko": "레이스 메달",
      "id": "Medali Lomba Lari",
      "ar": "ميداليات السباقات"
    }
  ],
  [
    "Sports Medals",
    {
      "en": "Sports Medals",
      "de": "Sportmedaillen",
      "fr": "Médailles Sportives",
      "nl": "Sportmedailles",
      "es": "Medallas Deportivas",
      "it": "Medaglie Sportive",
      "pt": "Medalhas Desportivas",
      "sv": "Idrottsmedaljer",
      "da": "Sportsmedaljer",
      "no": "Idrettsmedaljer",
      "fi": "Urheilumitalit",
      "pl": "Medale Sportowe",
      "cs": "Sportovní Medaile",
      "ru": "Спортивные медали",
      "ja": "スポーツメダル",
      "ko": "스포츠 메달",
      "id": "Medali Olahraga",
      "ar": "ميداليات رياضية"
    }
  ],
  [
    "Award Medals",
    {
      "en": "Award Medals",
      "de": "Auszeichnungsmedaillen",
      "fr": "Médailles de Récompense",
      "nl": "Prijsmedailles",
      "es": "Medallas de Premio",
      "it": "Medaglie Premio",
      "pt": "Medalhas de Prémio",
      "sv": "Prismedaljer",
      "da": "Prismedaljer",
      "no": "Premiemedaljer",
      "fi": "Palkintomitalit",
      "pl": "Medale Okolicznościowe",
      "cs": "Ocenění a Medaile",
      "ru": "Наградные медали",
      "ja": "表彰メダル",
      "ko": "시상용 메달",
      "id": "Medali Penghargaan",
      "ar": "ميداليات التكريم"
    }
  ],
  [
    "Challenge Coins",
    {
      "en": "Challenge Coins",
      "de": "Challenge Coins",
      "fr": "Pièces Challenge",
      "nl": "Challenge Munten",
      "es": "Monedas Challenge",
      "it": "Monete Challenge",
      "pt": "Moedas Challenge",
      "sv": "Challenge Coins",
      "da": "Challenge Coins",
      "no": "Challenge Coins",
      "fi": "Haastekolikot",
      "pl": "Monety Challenge",
      "cs": "Challenge Mince",
      "ru": "Монеты Challenge",
      "ja": "チャレンジコイン",
      "ko": "챌린지 코인",
      "id": "Koin Challenge",
      "ar": "عملات التحدي"
    }
  ],
  [
    "Trolley Coins",
    {
      "en": "Trolley Coins",
      "de": "Einkaufswagenchips",
      "fr": "Jetons de Caddie",
      "nl": "Winkelwagenmunten",
      "es": "Fichas de Carro",
      "it": "Gettoni Carrello",
      "pt": "Fichas de Carrinho",
      "sv": "Kundvagnspolletter",
      "da": "Indkøbsvognspoletter",
      "no": "Handlevognmynter",
      "fi": "Ostoskärrypoletit",
      "pl": "Żetony do Wózków",
      "cs": "Žetony do Vozíku",
      "ru": "Жетоны для тележек",
      "ja": "トロリーコイン",
      "ko": "트롤리 코인",
      "id": "Koin Troli",
      "ar": "عملات عربات التسوق"
    }
  ],
  [
    "Lapel Pins",
    {
      "en": "Lapel Pins",
      "de": "Anstecknadeln",
      "fr": "Épinglettes & Pins",
      "nl": "Reversspelden",
      "es": "Pines de Solapa",
      "it": "Spille da Bavero",
      "pt": "Pins de Lapela",
      "sv": "Kavajnålar",
      "da": "Jakkenåle",
      "no": "Jakkenåler",
      "fi": "Rintamerkit",
      "pl": "Przypinki",
      "cs": "Klopové Odznaky",
      "ru": "Значки на лацкан",
      "ja": "ラペルピン",
      "ko": "라펠 핀",
      "id": "Pin Kerah",
      "ar": "دبابيس طية صدر"
    }
  ],
  [
    "Police Badges",
    {
      "en": "Police Badges",
      "de": "Polizeiabzeichen",
      "fr": "Insignes de Police",
      "nl": "Politie-insignes",
      "es": "Placas de Policía",
      "it": "Distintivi di Polizia",
      "pt": "Distintivos Policiais",
      "sv": "Polisbrickor",
      "da": "Politiskilte",
      "no": "Politimerker",
      "fi": "Poliisimerkit",
      "pl": "Odznaki Policyjne",
      "cs": "Policejní Odznaky",
      "ru": "Полицейские жетоны",
      "ja": "警察バッジ",
      "ko": "경찰 배지",
      "id": "Lencana Polisi",
      "ar": "شارات الشرطة"
    }
  ],
  [
    "Security Badges",
    {
      "en": "Security Badges",
      "de": "Sicherheitsabzeichen",
      "fr": "Insignes de Sécurité",
      "nl": "Beveiligingsinsignes",
      "es": "Placas de Seguridad",
      "it": "Distintivi Sicurezza",
      "pt": "Crachás de Segurança",
      "sv": "Väktarbrickor",
      "da": "Sikkerhedsskilte",
      "no": "Vektermerker",
      "fi": "Turvamerkit",
      "pl": "Odznaki Ochrony",
      "cs": "Bezpečnostní Odznaky",
      "ru": "Жетоны охраны",
      "ja": "警備バッジ",
      "ko": "보안 배지",
      "id": "Lencana Keamanan",
      "ar": "شارات الأمن"
    }
  ],
  [
    "Law Enforcement",
    {
      "en": "Law Enforcement",
      "de": "Behörden & Polizei",
      "fr": "Forces de l’Ordre",
      "nl": "Handhaving",
      "es": "Fuerzas del Orden",
      "it": "Forze dell’Ordine",
      "pt": "Forças Policiais",
      "sv": "Polis & Myndighet",
      "da": "Politi & Myndighed",
      "no": "Politi & Etater",
      "fi": "Viranomaiset",
      "pl": "Służby Mundurowe",
      "cs": "Bezpečnostní Sbory",
      "ru": "Силовые ведомства",
      "ja": "警察・法執行機関",
      "ko": "법 집행 기관",
      "id": "Aparat Keamanan",
      "ar": "إنفاذ القانون"
    }
  ],
  [
    "Flat Split Keyrings",
    {
      "en": "Flat Split Keyrings",
      "de": "Flache Schlüsselringe",
      "fr": "Anneaux Plats Brisés",
      "nl": "Platte Sleutelringen",
      "es": "Anillas Planas Llavero",
      "it": "Anelli Piatti Portachiavi",
      "pt": "Argolas Chatas",
      "sv": "Platta Nyckelringar",
      "da": "Flade Nøgleringe",
      "no": "Flate Nøkkelringer",
      "fi": "Litteät Avainrenkaat",
      "pl": "Płaskie Kółka Kluczowe",
      "cs": "Ploché Kroužky na Klíče",
      "ru": "Плоские кольца для ключей",
      "ja": "平打ち二重リング",
      "ko": "플랫 스플릿 키링",
      "id": "Ring Gantungan Kunci Pipih",
      "ar": "حلقات مفاتيح مسطحة"
    }
  ],
  [
    "Custom-Stamped",
    {
      "en": "Custom-Stamped",
      "de": "Sondergeprägt",
      "fr": "Estampé Sur Mesure",
      "nl": "Op Maat Gestanst",
      "es": "Estampado a Medida",
      "it": "Coniato su Misura",
      "pt": "Estampado Sob Medida",
      "sv": "Specialpräglad",
      "da": "Specialpræget",
      "no": "Spesialpreget",
      "fi": "Mittatilausprässätty",
      "pl": "Tłoczone na Zamówienie",
      "cs": "Zakázkově Ražené",
      "ru": "Индивидуальная штамповка",
      "ja": "特注刻印",
      "ko": "맞춤 스탬핑",
      "id": "Tempa Kustom",
      "ar": "مختوم حسب الطلب"
    }
  ],
  [
    "Bottle Openers",
    {
      "en": "Bottle Openers",
      "de": "Flaschenöffner",
      "fr": "Décapsuleurs",
      "nl": "Flesopeners",
      "es": "Abridores de Botellas",
      "it": "Apribottiglie",
      "pt": "Abridores de Garrafa",
      "sv": "Flasköppnare",
      "da": "Oplukkere",
      "no": "Flaskeåpnere",
      "fi": "Pullonavaajat",
      "pl": "Otwieracze do Butelek",
      "cs": "Otvíráky na Lahve",
      "ru": "Открывалки",
      "ja": "栓抜き・オープナー",
      "ko": "병따개",
      "id": "Pembuka Botol",
      "ar": "فتاحات زجاجات"
    }
  ],
  [
    "Belt Buckles",
    {
      "en": "Belt Buckles",
      "de": "Gürtelschnallen",
      "fr": "Boucles de Ceinture",
      "nl": "Riemgespen",
      "es": "Hebillas de Cinturón",
      "it": "Fibbie per Cinture",
      "pt": "Fivelas de Cinto",
      "sv": "Bältesspännen",
      "da": "Bæltespænder",
      "no": "Beltespenner",
      "fi": "Vyönsoljet",
      "pl": "Klamry do Paska",
      "cs": "Přezky na Opasek",
      "ru": "Пряжки для ремня",
      "ja": "ベルトバックル",
      "ko": "벨트 버클",
      "id": "Gesper Sabuk",
      "ar": "أبزيم حزام"
    }
  ],
  [
    "Divot Tools",
    {
      "en": "Divot Tools",
      "de": "Pitchgabeln",
      "fr": "Relève-Pitches",
      "nl": "Pitchforks",
      "es": "Arreglapiques",
      "it": "Alzapitch",
      "pt": "Reparadores Divot",
      "sv": "Greengafflar",
      "da": "Pitchforks",
      "no": "Greengafler",
      "fi": "Griinihaarukat",
      "pl": "Widełki Golfowe",
      "cs": "Golfové Vypichováky",
      "ru": "Вилки для гольфа",
      "ja": "ディボットフォーク",
      "ko": "디봇 툴",
      "id": "Alat Divot Golf",
      "ar": "أدوات إصلاح الجولف"
    }
  ],
  [
    "Ball Markers",
    {
      "en": "Ball Markers",
      "de": "Ballmarker",
      "fr": "Marqueurs de Balle",
      "nl": "Balmarkers",
      "es": "Marcadores de Bola",
      "it": "Marcatori Palla",
      "pt": "Marcadores de Bola",
      "sv": "Bollmarkörer",
      "da": "Boldmarkører",
      "no": "Ballmarkører",
      "fi": "Pallomerkit",
      "pl": "Markery do Piłek",
      "cs": "Značkovače Míčků",
      "ru": "Маркеры для гольфа",
      "ja": "ゴルフマーカー",
      "ko": "볼 마커",
      "id": "Penanda Bola Golf",
      "ar": "محددات كرات الجولف"
    }
  ],
  [
    "Tie Bars",
    {
      "en": "Tie Bars",
      "de": "Krawattenklammern",
      "fr": "Pinces à Cravate",
      "nl": "Dasklemmen",
      "es": "Pisacorbatas",
      "it": "Fermacravatte",
      "pt": "Prendedores de Gravata",
      "sv": "Slipsklämmor",
      "da": "Slipseklemmer",
      "no": "Slipsklemmer",
      "fi": "Solmioneulat",
      "pl": "Spinki do Krawata",
      "cs": "Kravatové Spony",
      "ru": "Зажимы для галстука",
      "ja": "タイバー・ネクタイピン",
      "ko": "타이바",
      "id": "Jepit Dasi",
      "ar": "مشابك ربطة عنق"
    }
  ],
  [
    "Tie Clips",
    {
      "en": "Tie Clips",
      "de": "Krawattenspangen",
      "fr": "Pinces à Cravate",
      "nl": "Dasklemmen",
      "es": "Pasadores Corbata",
      "it": "Fermacravatte",
      "pt": "Prendedores de Gravata",
      "sv": "Slipsnålar",
      "da": "Slipseklemmer",
      "no": "Slipsnåler",
      "fi": "Solmiopidikkeet",
      "pl": "Klipsy do Krawata",
      "cs": "Spony na Kravatu",
      "ru": "Зажимы для галстука",
      "ja": "タイクリップ",
      "ko": "타이 클립",
      "id": "Klip Dasi",
      "ar": "مشابك ربطة عنق"
    }
  ],
  [
    "Money Clips",
    {
      "en": "Money Clips",
      "de": "Geldscheinklammern",
      "fr": "Pinces à Billets",
      "nl": "Geldclips",
      "es": "Clips para Billetes",
      "it": "Fermabanconote",
      "pt": "Prendedores de Notas",
      "sv": "Sedelklämmor",
      "da": "Pengeclips",
      "no": "Pengeklips",
      "fi": "Setelipidikkeet",
      "pl": "Klipsy do Banknotów",
      "cs": "Klipy na Bankovky",
      "ru": "Зажимы для денег",
      "ja": "マネークリップ",
      "ko": "머니 클립",
      "id": "Klip Uang",
      "ar": "مشابك نقود"
    }
  ],
  [
    "Keychains",
    {
      "en": "Keychains",
      "de": "Schlüsselanhänger",
      "fr": "Porte-Clés",
      "nl": "Sleutelhangers",
      "es": "Llaveros",
      "it": "Portachiavi",
      "pt": "Chaveiros",
      "sv": "Nyckelringar",
      "da": "Nøgleringe",
      "no": "Nøkkelringer",
      "fi": "Avaimenperät",
      "pl": "Breloki",
      "cs": "Klíčenky",
      "ru": "Брелоки",
      "ja": "キーホルダー",
      "ko": "키링",
      "id": "Gantungan Kunci",
      "ar": "ميداليات مفاتيح"
    }
  ],
  [
    "Keyrings",
    {
      "en": "Keyrings",
      "de": "Schlüsselringe",
      "fr": "Porte-Clés",
      "nl": "Sleutelringen",
      "es": "Llaveros",
      "it": "Portachiavi",
      "pt": "Porta-Chaves",
      "sv": "Nyckelringar",
      "da": "Nøgleringe",
      "no": "Nøkkelringer",
      "fi": "Avainrenkaat",
      "pl": "Breloki do Kluczy",
      "cs": "Přívěsky na Klíče",
      "ru": "Кольца-брелоки",
      "ja": "キーリング",
      "ko": "키링",
      "id": "Gantungan Kunci",
      "ar": "حلقات مفاتيح"
    }
  ],
  [
    "Dog Tags",
    {
      "en": "Dog Tags",
      "de": "Erkennungsmarken",
      "fr": "Plaques Militaires",
      "nl": "Dog Tags",
      "es": "Placas Militares",
      "it": "Piastrine Militari",
      "pt": "Placas Militares",
      "sv": "Id-Brickor",
      "da": "Hundetegn",
      "no": "Identitetsmerker",
      "fi": "Tunnistuslevyt",
      "pl": "Nieśmiertelniki",
      "cs": "Vojenské Známky",
      "ru": "Армейские жетоны",
      "ja": "ドッグタグ",
      "ko": "군번줄 태그",
      "id": "Tag Militer",
      "ar": "أطواق تعريف عسكرية"
    }
  ],
  [
    "Name Plates",
    {
      "en": "Name Plates",
      "de": "Namensschilder",
      "fr": "Badges Nominatifs",
      "nl": "Naamplaatjes",
      "es": "Placas de Nombre",
      "it": "Targhette Nome",
      "pt": "Crachás de Nome",
      "sv": "Namnbrickor",
      "da": "Navneskilte",
      "no": "Navneskilt",
      "fi": "Nimikyltit",
      "pl": "Identyfikatory",
      "cs": "Jmenovky",
      "ru": "Именные бейджи",
      "ja": "ネームプレート",
      "ko": "명찰 플레이트",
      "id": "Papan Nama",
      "ar": "لوحات الأسماء"
    }
  ],
  [
    "Backing Cards",
    {
      "en": "Backing Cards",
      "de": "Trägerkarten",
      "fr": "Cartes Support",
      "nl": "Displaykaarten",
      "es": "Tarjetas de Cartón",
      "it": "Cartoncini Supporto",
      "pt": "Cartelas Expositoras",
      "sv": "Pin-Kort",
      "da": "Displaykort",
      "no": "Visningskort",
      "fi": "Taustakortit",
      "pl": "Karty Ekspozycyjne",
      "cs": "Podkladové Karty",
      "ru": "Подложки-карточки",
      "ja": "ピン台紙カード",
      "ko": "배지 배경 카드",
      "id": "Kartu Display",
      "ar": "بطاقات العرض"
    }
  ],
  [
    "Presentation Boxes",
    {
      "en": "Presentation Boxes",
      "de": "Geschenkboxen",
      "fr": "Coffrets Présentation",
      "nl": "Presentatiedozen",
      "es": "Estuches Regalo",
      "it": "Cofani Espositivi",
      "pt": "Estojos Presente",
      "sv": "Presentaskar",
      "da": "Præsentationsæsker",
      "no": "Presentasjonsesker",
      "fi": "Lahjakotelot",
      "pl": "Pudełka Prezentowe",
      "cs": "Dárkové Krabičky",
      "ru": "Подарочные футляры",
      "ja": "ギフト化粧箱",
      "ko": "고급 선물 케이스",
      "id": "Kotak Presentasi",
      "ar": "علب العرض الفاخرة"
    }
  ],
  [
    "Coin Capsules",
    {
      "en": "Coin Capsules",
      "de": "Münzkapseln",
      "fr": "Capsules à Pièces",
      "nl": "Muntcapsules",
      "es": "Cápsulas para Monedas",
      "it": "Capsule per Monete",
      "pt": "Cápsulas para Moedas",
      "sv": "Myntkapslar",
      "da": "Møntkapsler",
      "no": "Myntkapsler",
      "fi": "Kolikkokapselit",
      "pl": "Kapsuły na Monety",
      "cs": "Kapsle na Mince",
      "ru": "Капсулы для монет",
      "ja": "コインカプセル",
      "ko": "코인 캡슐",
      "id": "Kapsul Koin",
      "ar": "كبسولات العملات"
    }
  ],
  [
    "Morale Patches",
    {
      "en": "Morale Patches",
      "de": "Klett-Patches",
      "fr": "Écussons Tactiques",
      "nl": "Morale Patches",
      "es": "Parches Tácticos",
      "it": "Patch Tattiche",
      "pt": "Patches Táticos",
      "sv": "Taktiska Märken",
      "da": "Morale Mærker",
      "no": "Taktiske Merker",
      "fi": "Tarrapätsit",
      "pl": "Naszywki Taktyczne",
      "cs": "Nášivky na Suchý Zip",
      "ru": "Тактические шевроны",
      "ja": "モラールパッチ",
      "ko": "모랄 패치",
      "id": "Patch Taktis",
      "ar": "رقعة تكتيكية"
    }
  ],
  [
    "Bookmarks",
    {
      "en": "Bookmarks",
      "de": "Lesezeichen",
      "fr": "Marque-Pages",
      "nl": "Boekenleggers",
      "es": "Marcapáginas",
      "it": "Segnalibri",
      "pt": "Marcadores de Livro",
      "sv": "Bokmärken",
      "da": "Bogmærker",
      "no": "Bokmerker",
      "fi": "Kirjanmerkit",
      "pl": "Zakładki do Książek",
      "cs": "Záložky do Knih",
      "ru": "Закладки для книг",
      "ja": "ブックマーク・しおり",
      "ko": "금속 책갈피",
      "id": "Pembatas Buku",
      "ar": "فواصل كتب"
    }
  ],
  [
    "Patches",
    {
      "en": "Patches",
      "de": "Aufnäher & Patches",
      "fr": "Écussons Brodés",
      "nl": "Badges & Patches",
      "es": "Parches",
      "it": "Toppe e Patch",
      "pt": "Patches Bordados",
      "sv": "Tygmärken",
      "da": "Stofmærker",
      "no": "Tøymerker",
      "fi": "Kangasmekit",
      "pl": "Naszywki",
      "cs": "Nášivky",
      "ru": "Шевроны и нашивки",
      "ja": "刺繍・PVCパッチ",
      "ko": "자수·PVC 패치",
      "id": "Patch Bordir",
      "ar": "رقع مطرزة"
    }
  ],
  [
    "Photo-Etched",
    {
      "en": "Photo-Etched",
      "de": "Fotogeätzt",
      "fr": "Photogravé",
      "nl": "Fotogeëtst",
      "es": "Fotograbado",
      "it": "Fotoinciso",
      "pt": "Fotogravado",
      "sv": "Fotoetsad",
      "da": "Fotoætset",
      "no": "Fotoetset",
      "fi": "Syövytetty",
      "pl": "Fototrawiony",
      "cs": "Fotoleptaný",
      "ru": "Фототравление",
      "ja": "フォトエッチング",
      "ko": "부식 인쇄",
      "id": "Etching Foto",
      "ar": "محفور ضوئياً"
    }
  ],
  [
    "Offset Printed",
    {
      "en": "Offset Printed",
      "de": "Offsetdruck",
      "fr": "Impression Offset",
      "nl": "Offset Bedrukt",
      "es": "Impresión Offset",
      "it": "Stampa Offset",
      "pt": "Impressão Offset",
      "sv": "Offsettryckt",
      "da": "Offsettrykt",
      "no": "Offsettrykt",
      "fi": "Offset-painettu",
      "pl": "Druk Offsetowy",
      "cs": "Ofsetový Tisk",
      "ru": "Офсетная печать",
      "ja": "オフセット印刷",
      "ko": "오프셋 인쇄",
      "id": "Cetak Offset",
      "ar": "طباعة أوفست"
    }
  ],
  [
    "Silk-Screen Printed",
    {
      "en": "Silk-Screen Printed",
      "de": "Siebdruck",
      "fr": "Sérigraphié",
      "nl": "Zeefdruk",
      "es": "Serigrafiado",
      "it": "Serigrafato",
      "pt": "Serigrafado",
      "sv": "Screentryckt",
      "da": "Silketrykt",
      "no": "Silketrykt",
      "fi": "Silkkipainettu",
      "pl": "Sitodruk",
      "cs": "Sítotisk",
      "ru": "Шелкография",
      "ja": "シルクスクリーン印刷",
      "ko": "실크스크린 인쇄",
      "id": "Cetak Sablon",
      "ar": "طباعة سلك سكرين"
    }
  ],
  [
    "Stamped",
    {
      "en": "Stamped",
      "de": "Geprägt",
      "fr": "Estampé",
      "nl": "Gestanst",
      "es": "Troquelado",
      "it": "Coniato",
      "pt": "Estampado",
      "sv": "Stansad",
      "da": "Præget",
      "no": "Preget",
      "fi": "Meistetty",
      "pl": "Tłoczony",
      "cs": "Ražený",
      "ru": "Штампованный",
      "ja": "プレス打抜",
      "ko": "스탬핑",
      "id": "Cetak Tekan",
      "ar": "مختوم"
    }
  ],
  [
    "Double-Sided",
    {
      "en": "Double-Sided",
      "de": "Zweiseitig",
      "fr": "Double Face",
      "nl": "Dubbelzijdig",
      "es": "Doble Cara",
      "it": "Doppia Faccia",
      "pt": "Dupla Face",
      "sv": "Dubbelsidig",
      "da": "Dobbeltsidet",
      "no": "Dobbeltsidig",
      "fi": "Kaksipuolinen",
      "pl": "Dwustronny",
      "cs": "Oboustranný",
      "ru": "Двусторонний",
      "ja": "両面",
      "ko": "양면",
      "id": "Dua Sisi",
      "ar": "مزدوج الوجه"
    }
  ],
  [
    "Epoxy Dome",
    {
      "en": "Epoxy Dome",
      "de": "Epoxidharz-Überzug",
      "fr": "Dôme Époxy",
      "nl": "Epoxy Dome",
      "es": "Cúpula Epoxi",
      "it": "Cupola Resina Epossidica",
      "pt": "Resina Epóxi",
      "sv": "Epoxikupol",
      "da": "Epoxy-Kuppel",
      "no": "Epoksykuppel",
      "fi": "Epoksipinnoite",
      "pl": "Żywica Epoksydowa",
      "cs": "Epoxidová Pryskyřice",
      "ru": "Эпоксидная смола",
      "ja": "クリアエポキシ盛り",
      "ko": "에폭시 돔 코팅",
      "id": "Lapisan Epoksi",
      "ar": "طلاء إيبوكسي"
    }
  ],
  [
    "Full-Color",
    {
      "en": "Full-Color",
      "de": "Vollfarbig",
      "fr": "Pleine Couleur",
      "nl": "Full-Color",
      "es": "A Todo Color",
      "it": "Quadricromia",
      "pt": "Colorido CMYK",
      "sv": "Fyrfärg",
      "da": "Fuld Farve",
      "no": "Fullfarge",
      "fi": "Nelivärinen",
      "pl": "Pełnokolorowy",
      "cs": "Plnobarevný",
      "ru": "Полноцветный",
      "ja": "フルカラー",
      "ko": "풀컬러",
      "id": "Penuh Warna",
      "ar": "ألوان كاملة"
    }
  ],
  [
    "Cut-Out",
    {
      "en": "Cut-Out",
      "de": "Ausgestanzt",
      "fr": "Découpé",
      "nl": "Uitgesneden",
      "es": "Calado",
      "it": "Traforato",
      "pt": "Vazado",
      "sv": "Utskuren",
      "da": "Udskåret",
      "no": "Utskåret",
      "fi": "Läpileikattu",
      "pl": "Ażurowy",
      "cs": "Prořezávaný",
      "ru": "Сквозная резка",
      "ja": "中抜き加工",
      "ko": "컷아웃 타공",
      "id": "Potong Berlubang",
      "ar": "مفرغ"
    }
  ],
  [
    "Dual-Plated",
    {
      "en": "Dual-Plated",
      "de": "Bicolor-Plattiert",
      "fr": "Double Placage",
      "nl": "Tweekleurig Verguld",
      "es": "Doble Baño",
      "it": "Doppia Placcatura",
      "pt": "Banho Duplo",
      "sv": "Tvåtonspläterad",
      "da": "To-Tone Belagt",
      "no": "To-Tonet Plettert",
      "fi": "Kaksiväripinnoitettu",
      "pl": "Podwójnie Platerowany",
      "cs": "Dvoubarevně Pokovený",
      "ru": "Двухцветное покрытие",
      "ja": "二色コンビメッキ",
      "ko": "투톤 도금",
      "id": "Lapisan Ganda",
      "ar": "طلاء مزدوج"
    }
  ],
  [
    "Die-Struck",
    {
      "en": "Die-Struck",
      "de": "Prägedruck",
      "fr": "Frappé",
      "nl": "Gestanst",
      "es": "Acuñado",
      "it": "Coniato",
      "pt": "Estampado",
      "sv": "Präglad",
      "da": "Præget",
      "no": "Preget",
      "fi": "Prässätty",
      "pl": "Tłoczony",
      "cs": "Ražený",
      "ru": "Штампованный",
      "ja": "プレス打ち",
      "ko": "프레스 금형",
      "id": "Stamping",
      "ar": "مضروب بالقالب"
    }
  ],
  [
    "Die-Cast",
    {
      "en": "Die-Cast",
      "de": "Druckguss",
      "fr": "Moulé",
      "nl": "Spuitgiet",
      "es": "Moldeado",
      "it": "Pressofuso",
      "pt": "Fundido",
      "sv": "Formgjuten",
      "da": "Trykstøbt",
      "no": "Trykkstøpt",
      "fi": "Painevalettu",
      "pl": "Odlewany",
      "cs": "Tlakově Litý",
      "ru": "Литой",
      "ja": "ダイキャスト",
      "ko": "다이캐스팅",
      "id": "Cetak Cor",
      "ar": "مصبوب"
    }
  ],
  [
    "Die-Struck Iron / Brass",
    {
      "en": "Die-Struck Iron / Brass",
      "de": "Geprägtes Eisen / Messing",
      "fr": "Fer / Laiton Frappé",
      "nl": "Gestanst IJzer / Messing",
      "es": "Hierro / Latón Acuñado",
      "it": "Ferro / Ottone Coniato",
      "pt": "Ferro / Latão Estampado",
      "sv": "Präglat Järn / Mässing",
      "da": "Præget Jern / Messing",
      "no": "Preget Jern / Messing",
      "fi": "Prässätty Rauta / Messinki",
      "pl": "Tłoczone Żelazo / Mosiądz",
      "cs": "Ražené Železo / Mosaz",
      "ru": "Штампованное железо / латунь",
      "ja": "鉄・真鍮プレス",
      "ko": "프레스 철재 / 황동",
      "id": "Besi / Kuningan Stamping",
      "ar": "حديد / نحاس مطروق"
    }
  ],
  [
    "Zamak #3 Zinc Alloy",
    {
      "en": "Zamak #3 Zinc Alloy",
      "de": "Zamak #3 Zinkdruckguss",
      "fr": "Alliage Zinc Zamak #3",
      "nl": "Zamak #3 Zinklegering",
      "es": "Aleación Zinc Zamak #3",
      "it": "Lega di Zinco Zamak #3",
      "pt": "Liga de Zinco Zamak #3",
      "sv": "Zamak #3 Zinklegering",
      "da": "Zamak #3 Zinklegering",
      "no": "Zamak #3 Sinklegering",
      "fi": "Zamak #3 Sinkkiseos",
      "pl": "Stop Cynku Zamak #3",
      "cs": "Slitina Zinku Zamak #3",
      "ru": "Цинковый сплав Zamak #3",
      "ja": "Zamak #3 亜鉛合金",
      "ko": "Zamak #3 아연 합금",
      "id": "Paduan Seng Zamak #3",
      "ar": "سبيكة الزنك Zamak #3"
    }
  ],
  [
    "Solid Mint Brass",
    {
      "en": "Solid Mint Brass",
      "de": "Massives Münzmessing",
      "fr": "Laiton Massif Frappé",
      "nl": "Massief Muntmessing",
      "es": "Latón Macizo Acuñado",
      "it": "Ottone Massiccio Coniato",
      "pt": "Latão Maciço Estampado",
      "sv": "Massiv Myntmässing",
      "da": "Massiv Møntmessing",
      "no": "Massiv Myntmessing",
      "fi": "Täysmessinki",
      "pl": "Masywny Mosiądz Menniczy",
      "cs": "Masivní Mincovní Mosaz",
      "ru": "Цельная чеканная латунь",
      "ja": "純真鍮コイン材",
      "ko": "순수 민트 황동",
      "id": "Kuningan Solid Stamping",
      "ar": "نحاس صلب مسكوك"
    }
  ],
  [
    "304 Stainless Steel",
    {
      "en": "304 Stainless Steel",
      "de": "Edelstahl 304",
      "fr": "Acier Inoxydable 304",
      "nl": "304 Roestvrij Staal",
      "es": "Acero Inoxidable 304",
      "it": "Acciaio Inox 304",
      "pt": "Aço Inox 304",
      "sv": "304 Rostfritt Stål",
      "da": "304 Rustfrit Stål",
      "no": "304 Rustfritt Stål",
      "fi": "304 Ruostumaton Teräs",
      "pl": "Stal Nierdzewna 304",
      "cs": "Nerezová Ocel 304",
      "ru": "Нержавеющая сталь 304",
      "ja": "304ステンレス鋼",
      "ko": "304 스테인리스 스틸",
      "id": "Baja Tahan Karat 304",
      "ar": "فولاذ مقاوم للصدأ 304"
    }
  ],
  [
    "Lead-Free Fine Pewter Alloy",
    {
      "en": "Lead-Free Fine Pewter Alloy",
      "de": "Bleifreie Zinnlegierung",
      "fr": "Étain Fin Sans Plomb",
      "nl": "Loodvrije Tinlegering",
      "es": "Peltre Fino Sin Plomo",
      "it": "Peltro Fine Senza Piombo",
      "pt": "Estanho Fino Sem Chumbo",
      "sv": "Blyfri Tennlegering",
      "da": "Blyfri Tinlegering",
      "no": "Blyfri Tinnlegering",
      "fi": "Lyijytön Tinaseos",
      "pl": "Bezołowiowy Stop Cyny",
      "cs": "Bezolovnatý Cín",
      "ru": "Бессвинцовый пьютер",
      "ja": "無鉛ピューター合金",
      "ko": "무납 주석 백납 합금",
      "id": "Logam Pewter Bebas Timbal",
      "ar": "سبيكة بيوتر خالية من الرصاص"
    }
  ],
  [
    "Eco Non-Phthalate Soft PVC",
    {
      "en": "Eco Non-Phthalate Soft PVC",
      "de": "Phthalatfreies Weich-PVC",
      "fr": "PVC Souple Sans Phtalates",
      "nl": "Ftalaatvrij Zacht PVC",
      "es": "PVC Blando Sin Ftalatos",
      "it": "PVC Morbido Senza Ftalati",
      "pt": "PVC Macio Sem Ftalatos",
      "sv": "Ftalatfri Mjuk PVC",
      "da": "Ftalatfri Blød PVC",
      "no": "Ftalatfri Myk PVC",
      "fi": "Ftalaatiton Pehmeä PVC",
      "pl": "Bezftalanowe Miękkie PVC",
      "cs": "Bezftalátové Měkké PVC",
      "ru": "Эко-ПВХ без фталатов",
      "ja": "フタル酸フリー軟質PVC",
      "ko": "무프탈레이트 친환경 연질 PVC",
      "id": "PVC Lunak Ramah Lingkungan",
      "ar": "PVC مرن خالٍ من الفثالات"
    }
  ],
  [
    "Zinc Alloy",
    {
      "en": "Zinc Alloy",
      "de": "Zinklegierung",
      "fr": "Alliage de Zinc",
      "nl": "Zinklegering",
      "es": "Aleación de Zinc",
      "it": "Lega di Zinco",
      "pt": "Liga de Zinco",
      "sv": "Zinklegering",
      "da": "Zinklegering",
      "no": "Sinklegering",
      "fi": "Sinkkiseos",
      "pl": "Stop Cynku",
      "cs": "Slitina Zinku",
      "ru": "Цинковый сплав",
      "ja": "亜鉛合金",
      "ko": "아연 합금",
      "id": "Paduan Seng",
      "ar": "سبيكة الزنك"
    }
  ],
  [
    "Solid Brass",
    {
      "en": "Solid Brass",
      "de": "Massivmessing",
      "fr": "Laiton Massif",
      "nl": "Massief Messing",
      "es": "Latón Macizo",
      "it": "Ottone Massiccio",
      "pt": "Latão Maciço",
      "sv": "Massiv Mässing",
      "da": "Massiv Messing",
      "no": "Massiv Messing",
      "fi": "Täysmessinki",
      "pl": "Masywny Mosiądz",
      "cs": "Masivní Mosaz",
      "ru": "Цельная латунь",
      "ja": "無垢真鍮",
      "ko": "순황동",
      "id": "Kuningan Solid",
      "ar": "نحاس أصفر صلب"
    }
  ],
  [
    "Stainless Steel",
    {
      "en": "Stainless Steel",
      "de": "Edelstahl",
      "fr": "Acier Inoxydable",
      "nl": "Roestvrij Staal",
      "es": "Acero Inoxidable",
      "it": "Acciaio Inossidabile",
      "pt": "Aço Inoxidável",
      "sv": "Rostfritt Stål",
      "da": "Rustfrit Stål",
      "no": "Rustfritt Stål",
      "fi": "Ruostumaton Teräs",
      "pl": "Stal Nierdzewna",
      "cs": "Nerezová Ocel",
      "ru": "Нержавеющая сталь",
      "ja": "ステンレス鋼",
      "ko": "스테인리스 스틸",
      "id": "Baja Tahan Karat",
      "ar": "فولاذ مقاوم للصدأ"
    }
  ],
  [
    "Aluminum Alloy",
    {
      "en": "Aluminum Alloy",
      "de": "Aluminiumlegierung",
      "fr": "Alliage d’Aluminium",
      "nl": "Aluminiumlegering",
      "es": "Aleación de Aluminio",
      "it": "Lega di Alluminio",
      "pt": "Liga de Alumínio",
      "sv": "Aluminiumlegering",
      "da": "Aluminiumslegering",
      "no": "Aluminiumslegering",
      "fi": "Alumiiniseos",
      "pl": "Stop Aluminium",
      "cs": "Slitina Hliníku",
      "ru": "Алюминиевый сплав",
      "ja": "アルミニウム合金",
      "ko": "알루미늄 합금",
      "id": "Paduan Aluminium",
      "ar": "سبيكة الألومنيوم"
    }
  ],
  [
    "Genuine Leather",
    {
      "en": "Genuine Leather",
      "de": "Echtleder",
      "fr": "Cuir Véritable",
      "nl": "Echt Leer",
      "es": "Cuero Genuino",
      "it": "Vera Pelle",
      "pt": "Couro Legítimo",
      "sv": "Äkta Läder",
      "da": "Ægte Læder",
      "no": "Ekte Skinn",
      "fi": "Aito Nahka",
      "pl": "Skóra Naturalna",
      "cs": "Pravá Kůže",
      "ru": "Натуральная кожа",
      "ja": "本革（牛革）",
      "ko": "천연 소가죽",
      "id": "Kulit Asli",
      "ar": "جلد طبيعي"
    }
  ],
  [
    "Butterfly Clutch",
    {
      "en": "Butterfly Clutch",
      "de": "Schmetterlingsverschluss",
      "fr": "Attache Papillon",
      "nl": "Vlindersluiting",
      "es": "Cierre Mariposa",
      "it": "Chiusura a Farfalla",
      "pt": "Fecho Borboleta",
      "sv": "Fjärilslås",
      "da": "Sommerfuglelås",
      "no": "Sommerfugllås",
      "fi": "Perhoslukko",
      "pl": "Zapięcie Motylkowe",
      "cs": "Zapínání Motýlek",
      "ru": "Застёжка-баттерфляй",
      "ja": "バタフライクラッチ",
      "ko": "버터플라이 클러치",
      "id": "Pengait Kupu-Kupu",
      "ar": "مشبك فراشة"
    }
  ],
  [
    "Lobster Clasp",
    {
      "en": "Lobster Clasp",
      "de": "Karabinerhaken",
      "fr": "Mousqueton Pivotant",
      "nl": "Karabijnhaak",
      "es": "Mosquetón Giratorio",
      "it": "Moschettone Girevole",
      "pt": "Mosquetão Giratório",
      "sv": "Karbinhake",
      "da": "Karabinhage",
      "no": "Karabinkrok",
      "fi": "Pistoolilukko",
      "pl": "Karabińczyk",
      "cs": "Karabinka",
      "ru": "Карабин",
      "ja": "ナスカン金具",
      "ko": "랍스터 고리",
      "id": "Kait Lobster",
      "ar": "خطاف قفل"
    }
  ],
  [
    "Split Ring",
    {
      "en": "Split Ring",
      "de": "Schlüsselring",
      "fr": "Anneau Brisé",
      "nl": "Sleutelring",
      "es": "Anilla Metálica",
      "it": "Anello Portachiavi",
      "pt": "Argola Metálica",
      "sv": "Nyckelring",
      "da": "Nøglering",
      "no": "Nøkkelring",
      "fi": "Avainrengas",
      "pl": "Kółko do Kluczy",
      "cs": "Kroužek na Klíče",
      "ru": "Заводное кольцо",
      "ja": "二重リング",
      "ko": "이중 분할 링",
      "id": "Cincin Gantungan",
      "ar": "حلقة مفاتيح"
    }
  ],
  [
    "Sublimated Ribbon",
    {
      "en": "Sublimated Ribbon",
      "de": "Sublimiertes Band",
      "fr": "Ruban Sublimé",
      "nl": "Gesublimeerd Lint",
      "es": "Cinta Sublimada",
      "it": "Nastro Sublimato",
      "pt": "Fita Sublimada",
      "sv": "Sublimerat Band",
      "da": "Sublimeret Bånd",
      "no": "Sublimert Bånd",
      "fi": "Sublimoitu Nauha",
      "pl": "Wstążka Sublimowana",
      "cs": "Sublimovaná Stuha",
      "ru": "Сублимационная лента",
      "ja": "昇華転写リボン",
      "ko": "풀컬러 전사 리본",
      "id": "Pita Sublimasi",
      "ar": "شريط مطبوع بالتسامي"
    }
  ],
  [
    "Acrylic Capsule",
    {
      "en": "Acrylic Capsule",
      "de": "Acrylkapsel",
      "fr": "Capsule Acrylique",
      "nl": "Acryl Muntcapsule",
      "es": "Cápsula Acrílica",
      "it": "Capsula Acrilica",
      "pt": "Cápsula Acrílica",
      "sv": "Akrylkapsel",
      "da": "Akrylkapsel",
      "no": "Akrylkapsel",
      "fi": "Akryylikapseli",
      "pl": "Kapsuła Akrylowa",
      "cs": "Akrylová Kapsle",
      "ru": "Акриловая капсула",
      "ja": "アクリルカプセル",
      "ko": "아크릴 캡슐",
      "id": "Kapsul Akrilik",
      "ar": "كبسولة أكريليك"
    }
  ],
  [
    "Velvet Gift Box",
    {
      "en": "Velvet Gift Box",
      "de": "Samt-Geschenkbox",
      "fr": "Écrin Velours",
      "nl": "Fluwelen Doosje",
      "es": "Estuche Terciopelo",
      "it": "Cofanetto Velluto",
      "pt": "Estojo Veludo",
      "sv": "Sammetsask",
      "da": "Fløjlsæske",
      "no": "Fløyelseske",
      "fi": "Samettirasia",
      "pl": "Etui Welurowe",
      "cs": "Sametová Krabička",
      "ru": "Бархатный футляр",
      "ja": "ベルベット化粧箱",
      "ko": "벨벳 선물 박스",
      "id": "Kotak Beludru",
      "ar": "علبة مخملية"
    }
  ],
  [
    "Magnetic",
    {
      "en": "Magnetic",
      "de": "Magnetisch",
      "fr": "Aimanté",
      "nl": "Magnetisch",
      "es": "Magnético",
      "it": "Magnetico",
      "pt": "Magnético",
      "sv": "Magnetisk",
      "da": "Magnetisk",
      "no": "Magnetisk",
      "fi": "Magneettinen",
      "pl": "Magnetyczny",
      "cs": "Magnetický",
      "ru": "Магнитный",
      "ja": "マグネット式",
      "ko": "마그네틱",
      "id": "Magnetik",
      "ar": "مغناطيسي"
    }
  ],
  [
    "Gold",
    {
      "en": "Gold",
      "de": "Gold",
      "fr": "Or",
      "nl": "Goud",
      "es": "Oro",
      "it": "Oro",
      "pt": "Ouro",
      "sv": "Guld",
      "da": "Guld",
      "no": "Gull",
      "fi": "Kulta",
      "pl": "Złoto",
      "cs": "Zlato",
      "ru": "Золото",
      "ja": "ゴールド",
      "ko": "금도금",
      "id": "Emas",
      "ar": "ذهبي"
    }
  ],
  [
    "Silver",
    {
      "en": "Silver",
      "de": "Silber",
      "fr": "Argent",
      "nl": "Zilver",
      "es": "Plata",
      "it": "Argento",
      "pt": "Prata",
      "sv": "Silver",
      "da": "Sølv",
      "no": "Sølv",
      "fi": "Hopea",
      "pl": "Srebro",
      "cs": "Stříbro",
      "ru": "Серебро",
      "ja": "シルバー",
      "ko": "은도금",
      "id": "Perak",
      "ar": "فضي"
    }
  ],
  [
    "Nickel",
    {
      "en": "Nickel",
      "de": "Nickel",
      "fr": "Nickel",
      "nl": "Nikkel",
      "es": "Níquel",
      "it": "Nichel",
      "pt": "Níquel",
      "sv": "Nickel",
      "da": "Nikkel",
      "no": "Nikkel",
      "fi": "Nikkeli",
      "pl": "Nikiel",
      "cs": "Nikl",
      "ru": "Никель",
      "ja": "ニッケル",
      "ko": "니켈",
      "id": "Nikel",
      "ar": "نيكل"
    }
  ],
  [
    "Antique Bronze",
    {
      "en": "Antique Bronze",
      "de": "Antikbronze",
      "fr": "Bronze Antique",
      "nl": "Antiek Brons",
      "es": "Bronce Antiguo",
      "it": "Bronzo Antico",
      "pt": "Bronze Antigo",
      "sv": "Antikbrons",
      "da": "Antik Bronze",
      "no": "Antikk Bronse",
      "fi": "Antiikkipronssi",
      "pl": "Antyczny Brąz",
      "cs": "Starobronz",
      "ru": "Античная бронза",
      "ja": "アンティークブロンズ",
      "ko": "엔틱 브론즈",
      "id": "Perunggu Antik",
      "ar": "برونز عتيق"
    }
  ],
  [
    "Antique Brass",
    {
      "en": "Antique Brass",
      "de": "Antikmessing",
      "fr": "Laiton Antique",
      "nl": "Antiek Messing",
      "es": "Latón Antiguo",
      "it": "Ottone Antico",
      "pt": "Latão Antigo",
      "sv": "Antikmässing",
      "da": "Antik Messing",
      "no": "Antikk Messing",
      "fi": "Antiikkimessinki",
      "pl": "Antyczny Mosiądz",
      "cs": "Staromosaz",
      "ru": "Античная латунь",
      "ja": "アンティーク真鍮",
      "ko": "엔틱 황동",
      "id": "Kuningan Antik",
      "ar": "نحاس عتيق"
    }
  ],
  [
    "Black Nickel",
    {
      "en": "Black Nickel",
      "de": "Schwarznickel",
      "fr": "Nickel Noir",
      "nl": "Zwart Nikkel",
      "es": "Níquel Negro",
      "it": "Nichel Nero",
      "pt": "Níquel Preto",
      "sv": "Svartnickel",
      "da": "Sort Nikkel",
      "no": "Svart Nikkel",
      "fi": "Musta Nikkeli",
      "pl": "Czarny Nikiel",
      "cs": "Černý Nikl",
      "ru": "Чёрный никель",
      "ja": "ブラックニッケル",
      "ko": "블랙 니켈",
      "id": "Nikel Hitam",
      "ar": "نيكل أسود"
    }
  ],
  [
    "Hard Enamel",
    {
      "en": "Hard Enamel",
      "de": "Hartemaille",
      "fr": "Émail Dur",
      "nl": "Harde Emaille",
      "es": "Esmalte Duro",
      "it": "Smalto Duro",
      "pt": "Esmalte Duro",
      "sv": "Hård Emalj",
      "da": "Hård Emalje",
      "no": "Hard Emalje",
      "fi": "Kova Emali",
      "pl": "Twarda Emalia",
      "cs": "Tvrdý Smalt",
      "ru": "Твёрдая эмаль",
      "ja": "本七宝・ハードエナメル",
      "ko": "하드 에나멜",
      "id": "Enamel Keras",
      "ar": "مينا صلبة"
    }
  ],
  [
    "Soft Enamel",
    {
      "en": "Soft Enamel",
      "de": "Weichemaille",
      "fr": "Émail Doux",
      "nl": "Zachte Emaille",
      "es": "Esmalte Blando",
      "it": "Smalto Morbido",
      "pt": "Esmalte Macio",
      "sv": "Mjuk Emalj",
      "da": "Blød Emalje",
      "no": "Myk Emalje",
      "fi": "Pehmeä Emali",
      "pl": "Miękka Emalia",
      "cs": "Měkký Smalt",
      "ru": "Мягкая эмаль",
      "ja": "ソフトエナメル",
      "ko": "소프트 에나멜",
      "id": "Enamel Lunak",
      "ar": "مينا ناعمة"
    }
  ],
  [
    "Enamel",
    {
      "en": "Enamel",
      "de": "Emaille",
      "fr": "Émail",
      "nl": "Emaille",
      "es": "Esmalte",
      "it": "Smalto",
      "pt": "Esmalte",
      "sv": "Emalj",
      "da": "Emalje",
      "no": "Emalje",
      "fi": "Emali",
      "pl": "Emalia",
      "cs": "Smalt",
      "ru": "Эмаль",
      "ja": "エナメル",
      "ko": "에나멜",
      "id": "Enamel",
      "ar": "مينا"
    }
  ],
  [
    "Lapel Pin",
    {
      "en": "Lapel Pin",
      "de": "Anstecknadel / Pin",
      "fr": "Pin’s de Revers",
      "nl": "Reversspeld",
      "es": "Pin de Solapa",
      "it": "Spilla da Bavero",
      "pt": "Broche de Lapela",
      "sv": "Kavajslagsnål",
      "da": "Reversnål",
      "no": "Jakkemerke",
      "fi": "Rintaneula",
      "pl": "Przypinka",
      "cs": "Klopový Odznak",
      "ru": "Нагрудный значок",
      "ja": "ラペルピン",
      "ko": "라펠 핀",
      "id": "Pin Kerah",
      "ar": "دبوس طية"
    }
  ],
  [
    "Marathon Finisher Medal",
    {
      "en": "Marathon Finisher Medal",
      "de": "Marathon-Finisher-Medaille",
      "fr": "Médaille Finisher Marathon",
      "nl": "Marathon Finisher Medaille",
      "es": "Medalla Finisher Maratón",
      "it": "Medaglia Finisher Maratona",
      "pt": "Medalha Finisher Maratona",
      "sv": "Maraton Finisher-Medalj",
      "da": "Maraton Finisher-Medalje",
      "no": "Maraton Finisher-Medalje",
      "fi": "Maraton Maaliinjuoksumitali",
      "pl": "Medal Finisher Maratonu",
      "cs": "Maratonská Finisher Medaile",
      "ru": "Медаль финишёра марафона",
      "ja": "マラソン完走メダル",
      "ko": "마라톤 완주 메달",
      "id": "Medali Finisher Maraton",
      "ar": "ميدالية إنهاء الماراثون"
    }
  ],
  [
    "Challenge Coin",
    {
      "en": "Challenge Coin",
      "de": "Challenge Coin",
      "fr": "Pièce Challenge",
      "nl": "Challenge Coin",
      "es": "Moneda Challenge",
      "it": "Moneta Challenge",
      "pt": "Moeda Challenge",
      "sv": "Challenge Coin",
      "da": "Challenge Coin",
      "no": "Challenge Coin",
      "fi": "Challenge-kolikko",
      "pl": "Moneta Challenge",
      "cs": "Challenge Mince",
      "ru": "Монета Challenge",
      "ja": "チャレンジコイン",
      "ko": "챌린지 코인",
      "id": "Koin Challenge",
      "ar": "عملة التحدي"
    }
  ],
  [
    "Trolley Coin",
    {
      "en": "Trolley Coin",
      "de": "Einkaufswagenchip",
      "fr": "Jeton Caddie",
      "nl": "Winkelwagenmunt",
      "es": "Ficha de Carro",
      "it": "Gettone Carrello",
      "pt": "Ficha de Carrinho",
      "sv": "Kundvagnspollett",
      "da": "Indkøbsvognspolet",
      "no": "Handlevognmynt",
      "fi": "Ostoskärrypoletti",
      "pl": "Żeton do Wózka",
      "cs": "Žeton do Vozíku",
      "ru": "Жетон для тележки",
      "ja": "トロリーコイン",
      "ko": "트롤리 코인",
      "id": "Koin Troli",
      "ar": "عملة عربة التسوق"
    }
  ],
  [
    "Police Badge",
    {
      "en": "Police Badge",
      "de": "Polizeiabzeichen",
      "fr": "Insigne de Police",
      "nl": "Politie-insigne",
      "es": "Placa Policial",
      "it": "Distintivo Polizia",
      "pt": "Distintivo Policial",
      "sv": "Polisbricka",
      "da": "Politiskilt",
      "no": "Politiskilt",
      "fi": "Poliisimerkki",
      "pl": "Odznaka Policyjna",
      "cs": "Policejní Odznak",
      "ru": "Полицейский жетон",
      "ja": "警察バッジ",
      "ko": "경찰 배지",
      "id": "Lencana Polisi",
      "ar": "شارة الشرطة"
    }
  ],
  [
    "Divot Tool",
    {
      "en": "Divot Tool",
      "de": "Golf-Pitchgabel",
      "fr": "Relève-Pitch Golf",
      "nl": "Golf Divot Tool",
      "es": "Arreglapiques Golf",
      "it": "Alzapitch Golf",
      "pt": "Reparador Divot",
      "sv": "Golflagare",
      "da": "Golf Divot Tool",
      "no": "Greengaffel",
      "fi": "Griinihaarukka",
      "pl": "Widełki Golfowe",
      "cs": "Vypichovátko",
      "ru": "Вилка для гольфа",
      "ja": "ディボットツール",
      "ko": "골프 디봇 툴",
      "id": "Alat Divot Golf",
      "ar": "أداة الجولف"
    }
  ],
  [
    "Ball Marker",
    {
      "en": "Ball Marker",
      "de": "Ballmarker",
      "fr": "Marque-Balle",
      "nl": "Balmarker",
      "es": "Marcador de Bola",
      "it": "Marcapallina",
      "pt": "Marcador de Bola",
      "sv": "Bollmarkör",
      "da": "Boldmarkør",
      "no": "Ballmarkør",
      "fi": "Pallomerkki",
      "pl": "Marker Piłki",
      "cs": "Markér Míčku",
      "ru": "Маркер мяча",
      "ja": "ボールマーカー",
      "ko": "골프 볼마커",
      "id": "Penanda Bola",
      "ar": "علامة الكرة"
    }
  ],
  [
    "Belt Buckle",
    {
      "en": "Belt Buckle",
      "de": "Gürtelschnalle",
      "fr": "Boucle de Ceinture",
      "nl": "Riemgesp",
      "es": "Hebilla de Cinturón",
      "it": "Fibbia Cintura",
      "pt": "Fivela de Cinto",
      "sv": "Bältesspänne",
      "da": "Bæltespænde",
      "no": "Beltespenne",
      "fi": "Vyönsolki",
      "pl": "Klamra Pasa",
      "cs": "Přezka Opasku",
      "ru": "Пряжка ремня",
      "ja": "ベルトバックル",
      "ko": "벨트 버클",
      "id": "Gesper Sabuk",
      "ar": "إبزيم الحزام"
    }
  ],
  [
    "Bookmark",
    {
      "en": "Bookmark",
      "de": "Lesezeichen",
      "fr": "Marque-Page",
      "nl": "Bladwijzer",
      "es": "Marcapáginas",
      "it": "Segnalibro",
      "pt": "Marcador de Livro",
      "sv": "Bokmärke",
      "da": "Bogmærke",
      "no": "Bokmerke",
      "fi": "Kirjanmerkki",
      "pl": "Zakładka",
      "cs": "Záložka",
      "ru": "Закладка",
      "ja": "しおり",
      "ko": "책갈피",
      "id": "Pembatas Buku",
      "ar": "فاصل كتاب"
    }
  ],
  [
    "Bottle Opener",
    {
      "en": "Bottle Opener",
      "de": "Flaschenöffner",
      "fr": "Décapsuleur",
      "nl": "Flesopener",
      "es": "Abridor de Botellas",
      "it": "Apribottiglie",
      "pt": "Abridor de Garrafas",
      "sv": "Flasköppnare",
      "da": "Oplukker",
      "no": "Flaskeåpner",
      "fi": "Pullonavaaja",
      "pl": "Otwieracz",
      "cs": "Otvírák",
      "ru": "Открывалка",
      "ja": "ボトルオープナー",
      "ko": "병따개",
      "id": "Pembuka Botol",
      "ar": "فتاحة زجاجات"
    }
  ],
  [
    "Keychain",
    {
      "en": "Keychain",
      "de": "Schlüsselanhänger",
      "fr": "Porte-Clés",
      "nl": "Sleutelhanger",
      "es": "Llavero",
      "it": "Portachiavi",
      "pt": "Porta-Chaves",
      "sv": "Nyckelring",
      "da": "Nøglering",
      "no": "Nøkkelring",
      "fi": "Avaimenperä",
      "pl": "Brelok",
      "cs": "Klíčenka",
      "ru": "Брелок",
      "ja": "キーホルダー",
      "ko": "키링",
      "id": "Gantungan Kunci",
      "ar": "ميدالية مفاتيح"
    }
  ],
  [
    "Cufflinks",
    {
      "en": "Cufflinks",
      "de": "Manschettenknöpfe",
      "fr": "Boutons de Manchette",
      "nl": "Manchetknopen",
      "es": "Gemelos",
      "it": "Gemelli",
      "pt": "Abotoaduras",
      "sv": "Manschettknappar",
      "da": "Manchetknapper",
      "no": "Mansjettknapper",
      "fi": "Kalvosinnapit",
      "pl": "Spinki Mankietowe",
      "cs": "Manžetové Knoflíčky",
      "ru": "Запонки",
      "ja": "カフスボタン",
      "ko": "커프스링크",
      "id": "Manset Kemeja",
      "ar": "أزرار الأكمام"
    }
  ],
  [
    "Tie Bar",
    {
      "en": "Tie Bar",
      "de": "Krawattenklammer",
      "fr": "Pince à Cravate",
      "nl": "Dasklem",
      "es": "Pisacorbatas",
      "it": "Fermacravatta",
      "pt": "Prendedor Gravata",
      "sv": "Slipsnål",
      "da": "Slipsenål",
      "no": "Slipsnål",
      "fi": "Solmioneula",
      "pl": "Spinka Krawata",
      "cs": "Spona na Kravatu",
      "ru": "Зажим для галстука",
      "ja": "ネクタイピン",
      "ko": "넥타이핀",
      "id": "Penjepit Dasi",
      "ar": "مشبك ربطة العنق"
    }
  ],
  [
    "Medal",
    {
      "en": "Medal",
      "de": "Medaille",
      "fr": "Médaille",
      "nl": "Medaille",
      "es": "Medalla",
      "it": "Medaglia",
      "pt": "Medalha",
      "sv": "Medalj",
      "da": "Medalje",
      "no": "Medalje",
      "fi": "Mitali",
      "pl": "Medal",
      "cs": "Medaile",
      "ru": "Медаль",
      "ja": "メダル",
      "ko": "메달",
      "id": "Medali",
      "ar": "ميدالية"
    }
  ],
  [
    "Pin",
    {
      "en": "Pin",
      "de": "Pin",
      "fr": "Pin’s",
      "nl": "Pin",
      "es": "Pin",
      "it": "Spilla",
      "pt": "Broche",
      "sv": "Pin",
      "da": "Pin",
      "no": "Pin",
      "fi": "Pinssi",
      "pl": "Przypinka",
      "cs": "Odznak",
      "ru": "Значок",
      "ja": "ピンバッジ",
      "ko": "핀",
      "id": "Pin",
      "ar": "دبوس"
    }
  ],
  [
    "Fridge Magnets",
    {
      "en": "Fridge Magnets",
      "de": "Kühlschrankmagnete",
      "fr": "Magnets Frigo",
      "nl": "Koelkastmagneten",
      "es": "Imanes de Nevera",
      "it": "Magneti da Frigo",
      "pt": "Ímãs de Geladeira",
      "sv": "Kylskåpsmagneter",
      "da": "Køleskabsmagneter",
      "no": "Kjøleskapsmagneter",
      "fi": "Jääkaappimagneetit",
      "pl": "Magnesy na Lodówkę",
      "cs": "Magnetky na Lednici",
      "ru": "Магниты на холодильник",
      "ja": "冷蔵庫マグネット",
      "ko": "냉장고 자석",
      "id": "Magnet Kulkas",
      "ar": "مغناطيس الثلاجة"
    }
  ],
  [
    "Fridge Magnet",
    {
      "en": "Fridge Magnet",
      "de": "Kühlschrankmagnet",
      "fr": "Magnet Frigo",
      "nl": "Koelkastmagneet",
      "es": "Imán de Nevera",
      "it": "Magnete da Frigo",
      "pt": "Ímã de Geladeira",
      "sv": "Kylskåpsmagnet",
      "da": "Køleskabsmagnet",
      "no": "Kjøleskapsmagnet",
      "fi": "Jääkaappimagneetti",
      "pl": "Magnes na Lodówkę",
      "cs": "Magnetka na Lednici",
      "ru": "Магнит на холодильник",
      "ja": "冷蔵庫マグネット",
      "ko": "냉장고 자석",
      "id": "Magnet Kulkas",
      "ar": "مغناطيس ثلاجة"
    }
  ],
  [
    "N45 Magnet",
    {
      "en": "N45 Magnet",
      "de": "N45-Magnet",
      "fr": "Aimant N45",
      "nl": "N45-Magneet",
      "es": "Imán N45",
      "it": "Magnete N45",
      "pt": "Ímã N45",
      "sv": "N45-Magnet",
      "da": "N45-Magnet",
      "no": "N45-Magnet",
      "fi": "N45-Magneetti",
      "pl": "Magnes N45",
      "cs": "Magnet N45",
      "ru": "Магнит N45",
      "ja": "N45ネオジム磁石",
      "ko": "N45 네오디뮴 자석",
      "id": "Magnet N45",
      "ar": "مغناطيس N45"
    }
  ],
  [
    "Iron",
    {
      "en": "Iron",
      "de": "Eisen",
      "fr": "Fer",
      "nl": "IJzer",
      "es": "Hierro",
      "it": "Ferro",
      "pt": "Ferro",
      "sv": "Järn",
      "da": "Jern",
      "no": "Jern",
      "fi": "Rauta",
      "pl": "Żelazo",
      "cs": "Železo",
      "ru": "Железо",
      "ja": "鉄",
      "ko": "철",
      "id": "Besi",
      "ar": "حديد"
    }
  ],
  [
    "Metal",
    {
      "en": "Metal",
      "de": "Metall",
      "fr": "Métal",
      "nl": "Metaal",
      "es": "Metal",
      "it": "Metallo",
      "pt": "Metal",
      "sv": "Metall",
      "da": "Metal",
      "no": "Metall",
      "fi": "Metalli",
      "pl": "Metal",
      "cs": "Kovový",
      "ru": "Металл",
      "ja": "金属製",
      "ko": "금속",
      "id": "Logam",
      "ar": "معدني"
    }
  ],
  [
    "Medals",
    {
      "en": "Medals",
      "de": "Medaillen",
      "fr": "Médailles",
      "nl": "Medailles",
      "es": "Medallas",
      "it": "Medaglie",
      "pt": "Medalhas",
      "sv": "Medaljer",
      "da": "Medaljer",
      "no": "Medaljer",
      "fi": "Mitalit",
      "pl": "Medale",
      "cs": "Medaile",
      "ru": "Медали",
      "ja": "メダル",
      "ko": "메달",
      "id": "Medali",
      "ar": "ميداليات"
    }
  ],
  [
    "Badges",
    {
      "en": "Badges",
      "de": "Abzeichen",
      "fr": "Insignes",
      "nl": "Emblemen",
      "es": "Insignias",
      "it": "Distintivi",
      "pt": "Distintivos",
      "sv": "Märken",
      "da": "Emblemer",
      "no": "Merker",
      "fi": "Merkit",
      "pl": "Odznaki",
      "cs": "Odznaky",
      "ru": "Значки",
      "ja": "バッジ",
      "ko": "배지",
      "id": "Lencana",
      "ar": "شارات"
    }
  ],
  [
    "Coins",
    {
      "en": "Coins",
      "de": "Münzen",
      "fr": "Pièces",
      "nl": "Munten",
      "es": "Monedas",
      "it": "Monete",
      "pt": "Moedas",
      "sv": "Mynt",
      "da": "Mønter",
      "no": "Mynter",
      "fi": "Kolikot",
      "pl": "Monety",
      "cs": "Mince",
      "ru": "Монеты",
      "ja": "コイン",
      "ko": "코인",
      "id": "Koin",
      "ar": "عملات"
    }
  ],
  [
    "Pins",
    {
      "en": "Pins",
      "de": "Pins",
      "fr": "Pins",
      "nl": "Spelden",
      "es": "Pines",
      "it": "Spille",
      "pt": "Pins",
      "sv": "Pins",
      "da": "Pins",
      "no": "Pins",
      "fi": "Pinssit",
      "pl": "Pinsy",
      "cs": "Odznaky",
      "ru": "Значки",
      "ja": "ピンズ",
      "ko": "핀",
      "id": "Pin",
      "ar": "دبابيس"
    }
  ],
  [
    "Rings",
    {
      "en": "Rings",
      "de": "Ringe",
      "fr": "Anneaux",
      "nl": "Ringen",
      "es": "Anillos",
      "it": "Anelli",
      "pt": "Anéis",
      "sv": "Ringar",
      "da": "Ringe",
      "no": "Ringer",
      "fi": "Sormukset",
      "pl": "Pierścienie",
      "cs": "Prsteny",
      "ru": "Кольца",
      "ja": "リング",
      "ko": "반지",
      "id": "Cincin",
      "ar": "خواتم"
    }
  ],
  [
    "Military",
    {
      "en": "Military",
      "de": "Militär",
      "fr": "Militaire",
      "nl": "Militair",
      "es": "Militar",
      "it": "Militare",
      "pt": "Militar",
      "sv": "Militär",
      "da": "Militær",
      "no": "Militær",
      "fi": "Sotilas",
      "pl": "Wojskowy",
      "cs": "Vojenský",
      "ru": "Военный",
      "ja": "ミリタリー",
      "ko": "밀리터리",
      "id": "Militer",
      "ar": "عسكري"
    }
  ],
  [
    "Firefighter",
    {
      "en": "Firefighter",
      "de": "Feuerwehr",
      "fr": "Pompier",
      "nl": "Brandweer",
      "es": "Bomberos",
      "it": "Vigili del Fuoco",
      "pt": "Bombeiros",
      "sv": "Brandkår",
      "da": "Brandvæsen",
      "no": "Brannvesen",
      "fi": "Palokunta",
      "pl": "Straż Pożarna",
      "cs": "Hasiči",
      "ru": "Пожарная служба",
      "ja": "消防",
      "ko": "소방",
      "id": "Pemadam",
      "ar": "الإطفاء"
    }
  ],
  [
    "Corporate",
    {
      "en": "Corporate",
      "de": "Firmen",
      "fr": "Entreprise",
      "nl": "Zakelijk",
      "es": "Corporativo",
      "it": "Aziendale",
      "pt": "Corporativo",
      "sv": "Företag",
      "da": "Firma",
      "no": "Bedrift",
      "fi": "Yritys",
      "pl": "Firmowy",
      "cs": "Firemní",
      "ru": "Корпоративный",
      "ja": "企業向け",
      "ko": "기업용",
      "id": "Korporat",
      "ar": "الشركات"
    }
  ],
  [
    "Commemorative",
    {
      "en": "Commemorative",
      "de": "Gedenk",
      "fr": "Commémoratif",
      "nl": "Herdenkings",
      "es": "Conmemorativo",
      "it": "Commemorativo",
      "pt": "Comemorativo",
      "sv": "Minnes",
      "da": "Minde",
      "no": "Minne",
      "fi": "Muisto",
      "pl": "Okolicznościowy",
      "cs": "Pamětní",
      "ru": "Памятный",
      "ja": "記念",
      "ko": "기념",
      "id": "Peringatan",
      "ar": "تذكاري"
    }
  ],
  [
    "Antique",
    {
      "en": "Antique",
      "de": "Antik",
      "fr": "Vieilli",
      "nl": "Antiek",
      "es": "Envejecido",
      "it": "Anticato",
      "pt": "Envelhecido",
      "sv": "Antik",
      "da": "Antik",
      "no": "Antikk",
      "fi": "Antiikki",
      "pl": "Antyczny",
      "cs": "Starožitný",
      "ru": "Антик",
      "ja": "アンティーク",
      "ko": "엔틱",
      "id": "Antik",
      "ar": "عتيق"
    }
  ],
  [
    "Spinner",
    {
      "en": "Spinner",
      "de": "Drehbar",
      "fr": "Tournant",
      "nl": "Draaiend",
      "es": "Giratorio",
      "it": "Girevole",
      "pt": "Giratório",
      "sv": "Snurrande",
      "da": "Drejelig",
      "no": "Roterende",
      "fi": "Pyörivä",
      "pl": "Obrotowy",
      "cs": "Otočný",
      "ru": "Вращающийся",
      "ja": "回転",
      "ko": "회전형",
      "id": "Putar",
      "ar": "دوار"
    }
  ],
  [
    "Glitter",
    {
      "en": "Glitter",
      "de": "Glitzer",
      "fr": "Pailleté",
      "nl": "Glitter",
      "es": "Brillantina",
      "it": "Glitter",
      "pt": "Glitter",
      "sv": "Glitter",
      "da": "Glitter",
      "no": "Glitter",
      "fi": "Glitter",
      "pl": "Brokatowy",
      "cs": "Třpytivý",
      "ru": "Глиттер",
      "ja": "ラメ入り",
      "ko": "글리터",
      "id": "Gliter",
      "ar": "لامع"
    }
  ],
  [
    "Brass",
    {
      "en": "Brass",
      "de": "Messing",
      "fr": "Laiton",
      "nl": "Messing",
      "es": "Latón",
      "it": "Ottone",
      "pt": "Latão",
      "sv": "Mässing",
      "da": "Messing",
      "no": "Messing",
      "fi": "Messinki",
      "pl": "Mosiądz",
      "cs": "Mosaz",
      "ru": "Латунь",
      "ja": "真鍮",
      "ko": "황동",
      "id": "Kuningan",
      "ar": "نحاس أصفر"
    }
  ],
  [
    "Copper",
    {
      "en": "Copper",
      "de": "Kupfer",
      "fr": "Cuivre",
      "nl": "Koper",
      "es": "Cobre",
      "it": "Rame",
      "pt": "Cobre",
      "sv": "Koppar",
      "da": "Kobber",
      "no": "Kobber",
      "fi": "Kupari",
      "pl": "Miedź",
      "cs": "Měď",
      "ru": "Медь",
      "ja": "銅製",
      "ko": "구리",
      "id": "Tembaga",
      "ar": "نحاس أحمر"
    }
  ],
  [
    "Pewter",
    {
      "en": "Pewter",
      "de": "Zinn",
      "fr": "Étain",
      "nl": "Tin",
      "es": "Peltre",
      "it": "Peltro",
      "pt": "Estanho",
      "sv": "Tenn",
      "da": "Tin",
      "no": "Tinn",
      "fi": "Tina",
      "pl": "Cyna",
      "cs": "Cín",
      "ru": "Олово",
      "ja": "ピューター",
      "ko": "퓨터 주석",
      "id": "Pewter",
      "ar": "بيوتر"
    }
  ],
  [
    "Custom",
    {
      "en": "Custom",
      "de": "Spezial",
      "fr": "Sur Mesure",
      "nl": "Maatwerk",
      "es": "A Medida",
      "it": "Su Misura",
      "pt": "Sob Medida",
      "sv": "Special",
      "da": "Special",
      "no": "Spesial",
      "fi": "Mittatilaus",
      "pl": "Na Zamówienie",
      "cs": "Zakázkové",
      "ru": "На заказ",
      "ja": "特注",
      "ko": "맞춤 제작",
      "id": "Kustom",
      "ar": "مخصص"
    }
  ]
];

const INSIGHT_DEFAULT_TITLES: Record<string, string> = {
  "3d-relief-sculpting-vs-2d-multi-level-die-casting-mold-engineering": "True 3D Relief Sculpting vs. 2D Multi-Level Die-Casting: Mold Engraving & Shading Engineering",
  "academic-graduation-medallions-and-military-drape-ribbon-medals-guide": "Solid Brass Academic Graduation Medallions & Military Drape Ribbon Medals: Stamping & Presentation",
  "anodized-aluminum-carabiner-climb-loops-vs-laser-stainless-keyrings": "Low-Cost Trade Show Keychains: Anodized Aluminum Carabiners vs. Laser-Engraved 304 Stainless Rings",
  "boutique-hotel-vintage-stamped-brass-room-key-tags-and-fobs-guide": "Boutique Hotel Vintage Stamped Brass Room Key Tags: Patina Aging, Room Numbering & Ring Hardware",
  "china-direct-custom-pins-and-medals-manufacturing-lead-times-ddp-air-shipping": "China Direct Custom Pins & Medals Sourcing: Zhongshan Foundry Lead Times, HS Codes & DDP Air Freight",
  "corporate-years-of-service-award-pins-and-anniversary-commemorative-coins": "Corporate Years-of-Service Award Pins & Milestone Anniversary Coins: Tiered Recognition Playbook",
  "cpsia-lead-free-en71-reach-nickel-free-electroplating-metal-craft-compliance": "Global Metal Craft Compliance: US CPSIA Lead Limits, CA Prop 65, EU REACH & Nickel-Free Plating",
  "craft-brewery-heavy-zinc-bottle-openers-and-3d-souvenir-fridge-magnets": "Craft Brewery Metal Bottle Openers & 3D Landmark Souvenir Fridge Magnets: Structural Strength & Magnet Force",
  "custom-3d-curved-police-security-and-fire-department-badges-guide": "Custom 3D Curved Police Shields, Sheriff Stars & Fire Department Badges: Stamping, Pins & Holsters",
  "custom-3d-western-rodeo-and-motorcycle-club-heavy-zinc-belt-buckles": "Custom 3D Western Rodeo Trophy & Motorcycle Club Belt Buckles: Heavy Zinc Casting & Loop Specs",
  "custom-3d-zinc-alloy-vs-soft-enamel-and-spinning-metal-keychains": "Custom Metal Keychains Selection Matrix: 3D Zinc Alloy vs. Soft Enamel, Spinner & Nail-Clipper Fobs",
  "custom-championship-rings-vs-trophy-medals-for-sports-tournaments": "Custom Sports Championship Rings vs. Heavy Trophy Medals: Tooling, Ring Sizing & Athlete Perception",
  "custom-embroidered-patches-vs-woven-and-3d-soft-pvc-morale-patches": "Custom Embroidered Patches vs. High-Density Woven & 3D Soft PVC Morale Patches: Coverage & Backings",
  "custom-enamel-and-3d-cufflinks-tie-bars-executive-menswear-gift-sets": "Custom Brass Cufflinks, Tie Bars & Money Clips: Toggle Hardware, Rhodium Plating & Gift Box Sets",
  "custom-golf-divot-repair-tools-and-magnetic-hat-clip-ball-markers-guide": "Custom Golf Divot Repair Tools & Magnetic Ball Markers: Charity Tournament & Pro-Shop Playbook",
  "custom-marathon-and-5k-10k-finisher-medals-race-director-sourcing-guide": "Custom Marathon & 5K/10K Finisher Medals: Sizing, Thickness, Weight & Lead Time Planning for Race Directors",
  "custom-military-and-law-enforcement-challenge-coins-sizing-edge-guide": "Military & Law Enforcement Challenge Coins: Standard Diameters (1.75\"–2\"), Thickness & 6 Edge Cuts",
  "custom-mold-tooling-fees-explained-how-to-get-zero-mold-fee-wholesale": "Custom Mold & Tooling Fees Explained: 2D vs. 3D Die Costs, 500+ Bulk Waivers & 3-Year Storage",
  "custom-retail-backing-cards-velvet-boxes-and-acrylic-display-packaging": "Retail Pin Backing Cards, Velvet Gift Boxes & Acrylic Coin Capsules: Boosting Margin 35%+ at Checkout",
  "cut-out-hollow-design-and-inner-cut-mold-fees-for-medals-and-coins": "Cut-Out Hollow Design Engineering for Race Medals, Challenge Coins & Keychains: Wall Thickness Rules",
  "dual-plated-two-tone-gold-silver-challenge-coins-masking-process": "Dual-Plated Two-Tone Challenge Coins & Badges: How Selective Electroplating Masking Creates Contrast",
  "dye-sublimated-vs-woven-neck-ribbons-for-custom-sports-medals": "Custom Medal Neck Ribbons: Full-Color Dye-Sublimated Satin vs. Woven Jacquard & V-Stitch Hardware",
  "electroplating-finishes-guide-antique-brass-real-gold-black-nickel-pvd": "12 Electroplating & PVD Finishes for Custom Pins, Medals & Coins: Tarnish Resistance & Cost Matrix",
  "epoxy-dome-coating-on-soft-enamel-pins-keychains-pros-and-cons": "Epoxy Dome Coatings on Soft Enamel Pins & Keychains: Optical Depth, UV Yellowing & Cost Analysis",
  "european-trolley-coin-keyrings-1-euro-vs-12-sided-uk-pound-specs": "European Trolley Coin Keyrings: Exact 23.25mm €1 Euro vs. 12-Sided 23.43mm UK £1 Specs & Tolerances",
  "genuine-leather-metal-emblem-keychains-for-auto-dealerships-real-estate": "Genuine Leather & Metal Emblem Keychains for Automotive Dealerships, Car Clubs & Real Estate",
  "hard-enamel-vs-soft-enamel-pins-wholesale-cost-durability-guide": "Hard Enamel vs. Soft Enamel Pins: Process, Tactile Feel, Cost & Scratch Resistance Guide",
  "interactive-kinetic-pins-and-medals-spinner-slider-hinged-mechanisms": "Interactive Kinetic Pins, Medals & Keychains: Spinner Rivets, Linear Sliders & Hinged Mechanisms",
  "lapel-pin-backs-and-attachments-butterfly-clutch-rubber-magnet-locking": "Lapel Pin Backs & Hardware Attachments Guide: Butterfly Clutches, Rubber Caps, Locking Backs & Magnets",
  "magnetic-detachable-vs-lobster-clasp-and-pull-out-trolley-coin-holders": "Supermarket Trolley Coin Holders Compared: Magnetic Snap Frames, Lobster Clasps & Pull-Out Keys",
  "magnetic-vs-pin-back-metal-employee-name-plates-for-hotels-airlines": "Magnetic vs. Pin-Back Metal Employee Name Plates for Hospitality, Airlines & Corporate Uniforms",
  "military-stainless-steel-dog-tags-vs-3d-zinc-alloy-pendant-tags": "Embossed 304 Stainless Steel Military Dog Tags vs. 3D Zinc Alloy Pendant Tags: Retail & Club Uses",
  "photo-etched-brass-vs-offset-printed-silk-screen-lapel-pins": "Photo-Etched Brass vs. Offset CMYK & Silk-Screen Printed Pins: Resolving Fine Lines & Gradients",
  "photo-etched-hollow-brass-bookmarks-for-museums-universities-publishers": "Photo-Etched Hollow Brass Bookmarks for Museums, Publishers & Universities: Filigree & Packaging",
  "sequential-laser-numbering-and-acrylic-capsule-packaging-for-coins": "Sequential Laser Edge Numbering (001/500) & Collector Capsule Packaging for Limited-Edition Coins",
  "specialty-enamel-effects-glitter-glow-in-the-dark-stained-glass-translucent": "Specialty Enamel Pigments: Glitter, Glow-in-the-Dark & Translucent Stained-Glass Pin Engineering",
  "spinner-bottle-opener-and-magnetic-interlocking-race-medal-trends": "2026–2027 Race Medal Trends: 360° Spinners, Bottle Openers & Magnetic Interlocking Series Medals",
  "virtual-race-finisher-medals-lightweight-mailer-packaging-and-fulfillment": "Virtual Race Finisher Medals: Weight Optimization, Flat Mailer Envelopes & 3PL Fulfillment Prep",
  "youth-sports-tournament-medals-and-baseball-trading-pins-bulk-guide": "Youth Sports Tournament Medals & Oversized Baseball Trading Pins: High-Volume League Sourcing",
  "zinc-alloy-die-casting-vs-die-struck-brass-iron-medals-pins-cost": "Zinc Alloy Die-Casting vs. Die-Struck Brass & Iron: 3D Relief Depth, Tooling Fees & Unit Economics",
  "custom-metal-fridge-magnets-3d-zinc-vs-hard-soft-enamel-epoxy-guide": "Custom Metal Fridge Magnets: 3D Zinc Die-Cast vs. Cloisonne Hard Enamel, Soft Enamel & CMYK Epoxy",
  "museum-tourism-souvenir-metal-fridge-magnets-kinetic-stained-glass-multi-layer": "Museum & Tourism Collectible Metal Fridge Magnets: Spinners, Sliding Tracks, Stained Glass & 3D Layers",
  "fridge-magnet-pull-force-neodymium-vs-ferrite-rubber-backing-and-retail-cards": "Metal Fridge Magnet Engineering: N45 Neodymium vs. Ferrite & Soft Rubber Pull Force Plus Retail Packaging"
};

const ALL_INSIGHT_SLUGS: string[] = [
  "3d-relief-sculpting-vs-2d-multi-level-die-casting-mold-engineering",
  "academic-graduation-medallions-and-military-drape-ribbon-medals-guide",
  "anodized-aluminum-carabiner-climb-loops-vs-laser-stainless-keyrings",
  "boutique-hotel-vintage-stamped-brass-room-key-tags-and-fobs-guide",
  "china-direct-custom-pins-and-medals-manufacturing-lead-times-ddp-air-shipping",
  "corporate-years-of-service-award-pins-and-anniversary-commemorative-coins",
  "cpsia-lead-free-en71-reach-nickel-free-electroplating-metal-craft-compliance",
  "craft-brewery-heavy-zinc-bottle-openers-and-3d-souvenir-fridge-magnets",
  "custom-3d-curved-police-security-and-fire-department-badges-guide",
  "custom-3d-western-rodeo-and-motorcycle-club-heavy-zinc-belt-buckles",
  "custom-3d-zinc-alloy-vs-soft-enamel-and-spinning-metal-keychains",
  "custom-championship-rings-vs-trophy-medals-for-sports-tournaments",
  "custom-embroidered-patches-vs-woven-and-3d-soft-pvc-morale-patches",
  "custom-enamel-and-3d-cufflinks-tie-bars-executive-menswear-gift-sets",
  "custom-golf-divot-repair-tools-and-magnetic-hat-clip-ball-markers-guide",
  "custom-marathon-and-5k-10k-finisher-medals-race-director-sourcing-guide",
  "custom-military-and-law-enforcement-challenge-coins-sizing-edge-guide",
  "custom-mold-tooling-fees-explained-how-to-get-zero-mold-fee-wholesale",
  "custom-retail-backing-cards-velvet-boxes-and-acrylic-display-packaging",
  "cut-out-hollow-design-and-inner-cut-mold-fees-for-medals-and-coins",
  "dual-plated-two-tone-gold-silver-challenge-coins-masking-process",
  "dye-sublimated-vs-woven-neck-ribbons-for-custom-sports-medals",
  "electroplating-finishes-guide-antique-brass-real-gold-black-nickel-pvd",
  "epoxy-dome-coating-on-soft-enamel-pins-keychains-pros-and-cons",
  "european-trolley-coin-keyrings-1-euro-vs-12-sided-uk-pound-specs",
  "genuine-leather-metal-emblem-keychains-for-auto-dealerships-real-estate",
  "hard-enamel-vs-soft-enamel-pins-wholesale-cost-durability-guide",
  "interactive-kinetic-pins-and-medals-spinner-slider-hinged-mechanisms",
  "lapel-pin-backs-and-attachments-butterfly-clutch-rubber-magnet-locking",
  "magnetic-detachable-vs-lobster-clasp-and-pull-out-trolley-coin-holders",
  "magnetic-vs-pin-back-metal-employee-name-plates-for-hotels-airlines",
  "military-stainless-steel-dog-tags-vs-3d-zinc-alloy-pendant-tags",
  "photo-etched-brass-vs-offset-printed-silk-screen-lapel-pins",
  "photo-etched-hollow-brass-bookmarks-for-museums-universities-publishers",
  "sequential-laser-numbering-and-acrylic-capsule-packaging-for-coins",
  "specialty-enamel-effects-glitter-glow-in-the-dark-stained-glass-translucent",
  "spinner-bottle-opener-and-magnetic-interlocking-race-medal-trends",
  "virtual-race-finisher-medals-lightweight-mailer-packaging-and-fulfillment",
  "youth-sports-tournament-medals-and-baseball-trading-pins-bulk-guide",
  "zinc-alloy-die-casting-vs-die-struck-brass-iron-medals-pins-cost",
  "custom-metal-fridge-magnets-3d-zinc-vs-hard-soft-enamel-epoxy-guide",
  "museum-tourism-souvenir-metal-fridge-magnets-kinetic-stained-glass-multi-layer",
  "fridge-magnet-pull-force-neodymium-vs-ferrite-rubber-backing-and-retail-cards"
];

function applyPhraseTranslations(text: string, lang: SupportedLanguage): string {
  if (!text || lang === 'en') return text || '';
  let result = text;
  for (const [enPhrase, map] of PHRASE_TRANSLATIONS) {
    const target = map[lang];
    if (!target || target === enPhrase) continue;
    const escaped = enPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(`\\b${escaped}\\b`, 'gi'), target);
  }
  return result;
}

export function localizeMaterial(raw: string, lang: SupportedLanguage): string {
  return applyPhraseTranslations(raw, lang);
}

export function localizeHardwareOrMagnets(raw: string, lang: SupportedLanguage): string {
  return applyPhraseTranslations(raw, lang);
}

export function localizeColors(raw: string, lang: SupportedLanguage): string {
  return applyPhraseTranslations(raw, lang);
}

export function localizeTitle(raw: string, lang: SupportedLanguage): string {
  return applyPhraseTranslations(raw, lang);
}

export function getRelatedInsightSlugsForProduct(p: any): string[] {
  const slugs: string[] = [];
  const t = String(p.title || '').toLowerCase();
  const proc = String(p.process || '').toLowerCase();

  // Direct technical match
  if (/hard enamel|cloisonne|soft enamel/i.test(t + proc)) {
    slugs.push('hard-enamel-vs-soft-enamel-pins-wholesale-cost-durability-guide');
  }
  if (/photo-etched|offset|silk-screen/i.test(t + proc)) {
    slugs.push('photo-etched-brass-vs-offset-printed-silk-screen-lapel-pins');
  }
  if (/epoxy/i.test(t + proc)) {
    slugs.push('epoxy-dome-coating-on-soft-enamel-pins-keychains-pros-and-cons');
  }
  if (/spinner|slider|hinged|dangle|bobble/i.test(t + proc)) {
    slugs.push('interactive-kinetic-pins-and-medals-spinner-slider-hinged-mechanisms');
  }
  if (/glitter|glow|stained glass/i.test(t + proc)) {
    slugs.push('specialty-enamel-effects-glitter-glow-in-the-dark-stained-glass-translucent');
  }
  if (/marathon|5k|virtual|puzzle/i.test(t + proc)) {
    slugs.push('custom-marathon-and-5k-10k-finisher-medals-race-director-sourcing-guide');
    slugs.push('spinner-bottle-opener-and-magnetic-interlocking-race-medal-trends');
  }
  if (/euro|uk pound|trolley/i.test(t + proc)) {
    slugs.push('european-trolley-coin-keyrings-1-euro-vs-12-sided-uk-pound-specs');
    slugs.push('magnetic-detachable-vs-lobster-clasp-and-pull-out-trolley-coin-holders');
  }

  switch (p.primaryCollection) {
    case 'custom-enamel-pins':
      slugs.push('hard-enamel-vs-soft-enamel-pins-wholesale-cost-durability-guide');
      slugs.push('lapel-pin-backs-and-attachments-butterfly-clutch-rubber-magnet-locking');
      slugs.push('custom-mold-tooling-fees-explained-how-to-get-zero-mold-fee-wholesale');
      break;
    case 'custom-medals':
      slugs.push('custom-marathon-and-5k-10k-finisher-medals-race-director-sourcing-guide');
      slugs.push('dye-sublimated-vs-woven-neck-ribbons-for-custom-sports-medals');
      slugs.push('cut-out-hollow-design-and-inner-cut-mold-fees-for-medals-and-coins');
      break;
    case 'custom-challenge-coins':
      slugs.push('custom-military-and-law-enforcement-challenge-coins-sizing-edge-guide');
      slugs.push('dual-plated-two-tone-gold-silver-challenge-coins-masking-process');
      slugs.push('sequential-laser-numbering-and-acrylic-capsule-packaging-for-coins');
      break;
    case 'custom-metal-keychains':
      slugs.push('custom-3d-zinc-alloy-vs-soft-enamel-and-spinning-metal-keychains');
      slugs.push('genuine-leather-metal-emblem-keychains-for-auto-dealerships-real-estate');
      slugs.push('anodized-aluminum-carabiner-climb-loops-vs-laser-stainless-keyrings');
      break;
    case 'trolley-coin-keyrings':
      slugs.push('european-trolley-coin-keyrings-1-euro-vs-12-sided-uk-pound-specs');
      slugs.push('magnetic-detachable-vs-lobster-clasp-and-pull-out-trolley-coin-holders');
      slugs.push('electroplating-finishes-guide-antique-brass-real-gold-black-nickel-pvd');
      break;
    case 'police-badges-insignia':
      slugs.push('custom-3d-curved-police-security-and-fire-department-badges-guide');
      slugs.push('magnetic-vs-pin-back-metal-employee-name-plates-for-hotels-airlines');
      slugs.push('military-stainless-steel-dog-tags-vs-3d-zinc-alloy-pendant-tags');
      break;
    case 'executive-cufflinks-tie-bars':
      slugs.push('custom-enamel-and-3d-cufflinks-tie-bars-executive-menswear-gift-sets');
      slugs.push('custom-3d-western-rodeo-and-motorcycle-club-heavy-zinc-belt-buckles');
      slugs.push('corporate-years-of-service-award-pins-and-anniversary-commemorative-coins');
      break;
    case 'custom-golf-accessories':
      slugs.push('custom-golf-divot-repair-tools-and-magnetic-hat-clip-ball-markers-guide');
      slugs.push('electroplating-finishes-guide-antique-brass-real-gold-black-nickel-pvd');
      slugs.push('3d-relief-sculpting-vs-2d-multi-level-die-casting-mold-engineering');
      break;
    case 'custom-metal-fridge-magnets':
      slugs.push('custom-metal-fridge-magnets-3d-zinc-vs-hard-soft-enamel-epoxy-guide');
      slugs.push('museum-tourism-souvenir-metal-fridge-magnets-kinetic-stained-glass-multi-layer');
      slugs.push('fridge-magnet-pull-force-neodymium-vs-ferrite-rubber-backing-and-retail-cards');
      if (/(bottle-opener|brewery|3d-metal-souvenir)/.test(p.slug || '')) {
        slugs.push('craft-brewery-heavy-zinc-bottle-openers-and-3d-souvenir-fridge-magnets');
      }
      break;
    case 'metal-bookmarks-openers-souvenirs':
      slugs.push('photo-etched-hollow-brass-bookmarks-for-museums-universities-publishers');
      slugs.push('craft-brewery-heavy-zinc-bottle-openers-and-3d-souvenir-fridge-magnets');
      slugs.push('boutique-hotel-vintage-stamped-brass-room-key-tags-and-fobs-guide');
      break;
    case 'patches-pvc-packaging':
      slugs.push('custom-embroidered-patches-vs-woven-and-3d-soft-pvc-morale-patches');
      slugs.push('custom-retail-backing-cards-velvet-boxes-and-acrylic-display-packaging');
      slugs.push('fridge-magnet-pull-force-neodymium-vs-ferrite-rubber-backing-and-retail-cards');
      break;
    default:
      slugs.push('zinc-alloy-die-casting-vs-die-struck-brass-iron-medals-pins-cost');
  }

  // Always rotate through full 40-insight pool by rowId for even internal link distribution
  const idx = Number(p.rowId || 1);
  slugs.push(ALL_INSIGHT_SLUGS[idx % ALL_INSIGHT_SLUGS.length]);
  slugs.push(ALL_INSIGHT_SLUGS[(idx + 11) % ALL_INSIGHT_SLUGS.length]);
  slugs.push(ALL_INSIGHT_SLUGS[(idx + 23) % ALL_INSIGHT_SLUGS.length]);
  slugs.push('china-direct-custom-pins-and-medals-manufacturing-lead-times-ddp-air-shipping');

  return Array.from(new Set(slugs)).slice(0, 6);
}

const EDITORIAL_TEMPLATES: Record<string, any> = {
  de: {
    secTitle: (_s, t) => `${t} — Fertigung, Veredelung & Staffelpreise`,
    p1: (_s, t, m, sz, w) => `Im eigenen Werk in Zhongshan Xiaolan maßgefertigt: ${t} aus ${m} mit den Maßen ${sz} und einem Gewicht von ${w}.`,
    h3Mech: "1. Werkstoff, Prägetechnik & Befestigung",
    pMech: (att, proc, col) => `Fertigungsmethode: ${proc}. Befestigung/Ausstattung: ${att}. Standardgalvanik: ${col}. Erfüllt US CPSIA (<90 ppm Blei) & EU REACH.`,
    h3Logo: "2. Werkzeugkosten, Entwurf & Verpackung",
    logoBullets: [
  "<strong>12h Gratis-Vektorentwurf:</strong> Vorabansicht mit Ihren Pantone-Farben & Abmessungen kostenlos vor Werkzeugbau.",
  "<strong>Werkzeugkosten-Erstattung:</strong> 2D-Pin-Prägestempel ($55–$85) ab 500 Stk. kostenfrei, 3D-Druckgussformen ($95–$150) ab 1.000 Stk. kostenfrei.",
  "<strong>3 Jahre Gratis-Formlagerung:</strong> Nachbestellungen desselben Motivs innerhalb von 3 Jahren ohne erneute Formkosten.",
  "<strong>Einzelhandelsverpackung:</strong> Einzel-Polybag kostenlos, 400g Trägerkarten (+$0,12), Acrylkapseln (+$0,32) oder Samtbox (+$0,85)."
],
    h3Table: (_s) => `3. Produktions- & Staffelübersicht`,
    thOption: "Ausführung / Option",
    thMoq: "MOQ",
    thSetup: "Form / Setup",
    thUnitAdd: "Stückpreis",
    thLead: "Lieferzeit"
  },
  fr: {
    secTitle: (_s, t) => `${t} — Fabrication, Émaillage & Tarifs Usine`,
    p1: (_s, t, m, sz, w) => `Fabriqué sur mesure dans notre fonderie de Zhongshan Xiaolan : ${t} en ${m}, dimensions ${sz} pour ${w}.`,
    h3Mech: "1. Alliage, Procédé & Fixations",
    pMech: (att, proc, col) => `Procédé : ${proc}. Fixation incluse : ${att}. Placages : ${col}. Conforme CPSIA (<90 ppm plomb) et EU REACH.`,
    h3Logo: "2. Outillage, BAT Numérique & Conditionnement",
    logoBullets: [
  "<strong>BAT Vectoriel Gratuit en 12h :</strong> Validation des couleurs Pantone et dimensions sans engagement.",
  "<strong>Exonération de Moule :</strong> Matrices 2D (55–85 $) offertes dès 500 pcs ; moules 3D (95–150 $) offerts dès 1 000 pcs.",
  "<strong>Conservation Gratuite 3 Ans :</strong> Réassorts sans aucun frais d’outillage pendant 36 mois.",
  "<strong>Options Packaging :</strong> Sachet individuel gratuit, cartes 400g (+0,12 $), capsules (+0,32 $) ou écrins velours (+0,85 $)."
],
    h3Table: (_s) => `3. Matrice Tarifaire & Options`,
    thOption: "Mode de Production",
    thMoq: "MOQ",
    thSetup: "Outillage",
    thUnitAdd: "Prix Unitaire",
    thLead: "Délai"
  },
  nl: {
    secTitle: (_s, t) => `${t} — Productie, Afwerking & Prijzen`,
    p1: (_s, t, m, sz, w) => `Op maat geproduceerd in Zhongshan Xiaolan: ${t} in ${m}, formaat ${sz} en netto gewicht ${w}.`,
    h3Mech: "1. Materiaal, Techniek & Bevestiging",
    pMech: (att, proc, col) => `Techniek: ${proc}. Bevestiging: ${att}. Afwerkingen: ${col}. Voldoet aan VS CPSIA & EU REACH.`,
    h3Logo: "2. Matrijskosten, Proef & Verpakking",
    logoBullets: [
  "<strong>Gratis 12u Proefdruk:</strong> Vrijblijvende vectorproef met uw Pantone-kleuren binnen 12 uur.",
  "<strong>Vrijstelling Matrijskosten:</strong> 2D stempels ($55–$85) vervallen vanaf 500 st.; 3D matrijzen ($95–$150) vanaf 1.000 st.",
  "<strong>3 Jaar Matrijsopslag:</strong> Nabestellingen binnen 3 jaar zonder nieuwe opstartkosten.",
  "<strong>Verpakkingsopties:</strong> Gratis polybag, 400g backcards (+$0,12), muntcapsules (+$0,32) of fluwelen doosje (+$0,85)."
],
    h3Table: (_s) => `3. Staffeltabel & Opties`,
    thOption: "Productie-optie",
    thMoq: "MOQ",
    thSetup: "Matrijs",
    thUnitAdd: "Stuksprijs",
    thLead: "Levertijd"
  },
  es: {
    secTitle: (_s, t) => `${t} — Fabricación, Acabados y Precios de Fábrica`,
    p1: (_s, t, m, sz, w) => `Fabricado a medida en nuestra planta de Zhongshan Xiaolan: ${t} en ${m}, medidas ${sz} y peso neto de ${w}.`,
    h3Mech: "1. Aleación, Proceso y Herrajes",
    pMech: (att, proc, col) => `Proceso: ${proc}. Enganche incluido: ${att}. Baños disponibles: ${col}. Certificado US CPSIA y EU REACH.`,
    h3Logo: "2. Política de Troqueles, Pruebas y Empaque",
    logoBullets: [
  "<strong>Prueba Vectorial Gratis en 12h:</strong> Confirmación de colores Pantone y medidas antes de abrir molde.",
  "<strong>Exención de Molde:</strong> Troqueles 2D ($55–$85) gratis desde 500 uds; moldes 3D ($95–$150) gratis desde 1,000 uds.",
  "<strong>Custodia Gratuita 3 Años:</strong> Repeticiones exactas sin volver a pagar matricería.",
  "<strong>Empaque Opcional:</strong> Bolsa individual gratis, tarjetas 400g (+$0.12), cápsulas (+$0.32) o estuches (+$0.85)."
],
    h3Table: (_s) => `3. Tabla de Precios y Opciones`,
    thOption: "Opción / Volumen",
    thMoq: "MOQ",
    thSetup: "Troquel",
    thUnitAdd: "Precio Unitario",
    thLead: "Plazo"
  },
  it: {
    secTitle: (_s, t) => `${t} — Produzione, Finiture e Listino Fabbrica`,
    p1: (_s, t, m, sz, w) => `Prodotto su misura nella nostra fonderia di Zhongshan Xiaolan: ${t} in ${m}, dimensioni ${sz} con peso di ${w}.`,
    h3Mech: "1. Lega, Lavorazione e Fissaggio",
    pMech: (att, proc, col) => `Processo: ${proc}. Attacco: ${att}. Finiture galvaniche: ${col}. Conforme US CPSIA e EU REACH.`,
    h3Logo: "2. Stampi, Bozza Gratuita e Packaging",
    logoBullets: [
  "<strong>Bozza Vettoriale Gratis in 12h:</strong> Verifica grafica Pantone gratuita prima della coniatura.",
  "<strong>Esenzione Stampo:</strong> Conii 2D ($55–$85) gratuiti da 500 pz; stampi 3D ($95–$150) gratuiti da 1.000 pz.",
  "<strong>Archivio Stampo 3 Anni:</strong> Ristampe senza nuovi costi di attrezzatura per 36 mesi.",
  "<strong>Packaging Retail:</strong> Bustina inclusa gratis, cartoncini 400g (+$0,12), capsule (+$0,32) o box velluto (+$0,85)."
],
    h3Table: (_s) => `3. Matrice Prezzi e Varianti`,
    thOption: "Configurazione",
    thMoq: "MOQ",
    thSetup: "Stampo",
    thUnitAdd: "Prezzo Unitario",
    thLead: "Tempi"
  },
  pt: {
    secTitle: (_s, t) => `${t} — Fabricação, Banho Metálico e Preços`,
    p1: (_s, t, m, sz, w) => `Produzido sob medida em Zhongshan Xiaolan: ${t} em ${m} com dimensões de ${sz} e peso de ${w}.`,
    h3Mech: "1. Material, Processo e Fixação",
    pMech: (att, proc, col) => `Processo: ${proc}. Fecho/acessório: ${att}. Acabamentos: ${col}. Conformidade US CPSIA e EU REACH.`,
    h3Logo: "2. Política de Moldes, Prova Digital e Embalagem",
    logoBullets: [
  "<strong>Prova Digital Grátis em 12h:</strong> Aprovação Pantone completa antes da abertura do molde.",
  "<strong>Isenção de Molde:</strong> Cunhos 2D ($55–$85) isentos em 500+ un; moldes 3D ($95–$150) isentos em 1.000+ un.",
  "<strong>Guarda Gratuita 3 Anos:</strong> Reproduções futuras sem custo de matriz por 36 meses.",
  "<strong>Embalagens:</strong> Saquinho individual grátis, cartões 400g (+$0,12), cápsulas (+$0,32) ou estojos (+$0,85)."
],
    h3Table: (_s) => `3. Tabela de Escala e Custos`,
    thOption: "Modalidade",
    thMoq: "MOQ",
    thSetup: "Molde",
    thUnitAdd: "Valor Unitário",
    thLead: "Prazo"
  },
  ja: {
    secTitle: (_s, t) => `${t} — 製造プロセス・メッキ仕様・卸売単価表`,
    p1: (_s, t, m, sz, w) => `広東省中山市小欖鎮の直営工場でオーダー生産する「${t}」は、${m}素材・寸法 ${sz}・重量 ${w} の精密仕様です。`,
    h3Mech: "1. 基材・製造工法・付属留め具仕様",
    pMech: (att, proc, col) => `製法：${proc}。留め具/付属品：${att}。対応メッキ：${col}。米国CPSIA(鉛90ppm未満)・EU REACH準拠。`,
    h3Logo: "2. 金型免除ルール・無料校正・パッケージオプション",
    logoBullets: [
  "<strong>12時間無料デザイン校正：</strong> Pantone指定・サイズ図面を無料作成して事前確認いただけます。",
  "<strong>金型代免除制度：</strong> 2Dピン型($55〜$85)は500個以上、3Dメダル/コイン型($95〜$150)は1,000個以上で自動無料化。",
  "<strong>金型3年間無料保管：</strong> 同一デザインの追加リピート発注時は型代$0で再生産可能です。",
  "<strong>OEMパッケージ：</strong> 個別PP袋($0)、400gオリジナル台紙(+$0.12)、コインカプセル(+$0.32)、ベルベット箱(+$0.85)。"
],
    h3Table: (_s) => `3. 数量別単価＆カスタムオプション`,
    thOption: "仕様・発注帯",
    thMoq: "最小ロット",
    thSetup: "金型・型代",
    thUnitAdd: "単価 (USD)",
    thLead: "生産日数"
  },
  ko: {
    secTitle: (_s, t) => `${t} — 제조 공법 · 도금 마감 · 도매 단가표`,
    p1: (_s, t, m, sz, w) => `중국 중산 샤오란 직영 공장에서 맞춤 제작하는 ${t} 사양은 ${m} 소재, ${sz} 규격, 순중량 ${w}으로 생산됩니다.`,
    h3Mech: "1. 소재, 공법 및 부자재 사양",
    pMech: (att, proc, col) => `제조 공법: ${proc}. 기본 부자재: ${att}. 지원 도금: ${col}. 미국 CPSIA 및 EU REACH 무납 기준 충족.`,
    h3Logo: "2. 금형비 면제 기준, 무료 시안 및 패키징",
    logoBullets: [
  "<strong>12시간 무료 벡터 시안:</strong> 제작 전 팬톤 컬러와 규격 도면을 무료로 검토하실 수 있습니다.",
  "<strong>금형비 자동 면제:</strong> 2D 핀 금형($55–$85) 500개 이상, 3D 메달/코인 금형($95–$150) 1,000개 이상 발주 시 무료 면제.",
  "<strong>금형 3년 무료 보관:</strong> 동일 디자인 재주문 시 추가 금형 비용 없이 3년간 보관해 드립니다.",
  "<strong>패키징 옵션:</strong> 기본 폴리백($0), 400g 백킹 카드(+$0.12), 아크릴 캡슐(+$0.32), 벨벳 케이스(+$0.85)."
],
    h3Table: (_s) => `3. 수량별 단가 및 마감 옵션`,
    thOption: "생산 및 수량 구간",
    thMoq: "MOQ",
    thSetup: "금형비",
    thUnitAdd: "개당 단가",
    thLead: "제작 기간"
  },
  ar: {
    secTitle: (_s, t) => `${t} — التصنيع والطلاء المعدني وأسعار الجملة`,
    p1: (_s, t, m, sz, w) => `يُصنع ${t} حسب الطلب في مصنعنا بتشونغشان شياولان من ${m} بمقاس ${sz} ووزن صافي ${w}.`,
    h3Mech: "1. السبيكة، الحرفة والمرفقات",
    pMech: (att, proc, col) => `تقنية التصنيع: ${proc}. التثبيت والمرفق: ${att}. الطلاءات المتاحة: ${col}. مطابق لمعايير CPSIA و REACH.`,
    h3Logo: "2. سياسة القوالب والتصميم المجاني والتغليف",
    logoBullets: [
  "<strong>تصميم مجاني خلال 12 ساعة:</strong> بروفة فيكتور كاملة بألوان بانتون قبل حفر القالب.",
  "<strong>إعفاء رسوم القالب:</strong> قوالب 2D (55–85$) مجانية عند 500+ قطعة، وقوالب 3D (95–150$) مجانية عند 1,000+ قطعة.",
  "<strong>حفظ القالب مجاناً 3 سنوات:</strong> إعادة الطلب بدون أي رسوم قالب جديدة.",
  "<strong>خيارات التغليف:</strong> تغليف فردي مجاني، بطاقات عرض 400 جم (+0.12$)، كبسولات (+0.32$) أو علب مخملية (+0.85$)."
],
    h3Table: (_s) => `3. جدول الكميات والأسعار`,
    thOption: "الخيار / الكمية",
    thMoq: "الحد الأدنى",
    thSetup: "القالب",
    thUnitAdd: "سعر الوحدة",
    thLead: "المدة"
  },
  en: {
    secTitle: (_s, t) => `${t} — Craft Engineering & Wholesale Pricing`,
    p1: (_s, t, m, sz, w) => `Manufactured in Zhongshan Xiaolan, ${t} features ${m} construction sized at ${sz} (${w} net weight).`,
    h3Mech: "1. Alloy Substrate, Craft & Hardware",
    pMech: (att, proc, col) => `Production craft: ${proc}. Attachment hardware: ${att}. Electroplating options: ${col}. Meets US CPSIA & EU REACH.`,
    h3Logo: "2. Die Fee Waivers, 12h Proofs & Packaging",
    logoBullets: [
  "<strong>12-Hour Free Vector Proof:</strong> Pantone color layout and die-line proof included before production.",
  "<strong>Tooling Fee Waiver:</strong> $55–$85 2D pin dies waived at 500+ pcs; $95–$150 3D molds waived at 1,000+ pcs.",
  "<strong>3-Year Free Mold Storage:</strong> All custom dies archived 3 years for zero-fee reorders.",
  "<strong>Packaging Upgrades:</strong> Free polybag, 400gsm pin cards (+$0.12), capsules (+$0.32), or velvet boxes (+$0.85)."
],
    h3Table: (_s) => `3. Tiered Production Schedule`,
    thOption: "Order Tier / Packaging",
    thMoq: "MOQ",
    thSetup: "Tooling Policy",
    thUnitAdd: "Unit Price",
    thLead: "Lead Time"
  }
};

function getEditorialPack(lang: SupportedLanguage, t: (k: any) => string) {
  if (EDITORIAL_TEMPLATES[lang]) return EDITORIAL_TEMPLATES[lang];
  return {
    ...EDITORIAL_TEMPLATES.en,
    secTitle: (_s: string, title: string) => `${title} — ${t('pdp.specsTitle')}`,
    p1: (_s: string, title: string, m: string, sz: string, w: string) =>
      `${t('home.hero.badge1')}: ${title} (${m}, ${sz}, ${w}).`,
    h3Mech: `1. ${t('col.thMaterial')} & ${t('col.thMagnet')}`,
    pMech: (att: string, proc: string, col: string) =>
      `${proc}. ${att}. ${col}. ${t('pdp.trust1')} · ${t('pdp.trust2')}.`,
    h3Logo: `2. ${t('pdp.declTitle')}`,
    logoBullets: [
      `<strong>${t('geo.metricLogoMoq')}:</strong> ${t('geo.metricLogoMoqVal')}`,
      `<strong>${t('geo.metricTooling')}:</strong> ${t('geo.metricToolingVal')}`,
      `<strong>${t('pdp.noMoldFee')}:</strong> ${t('pdp.declQuote')}`,
      `<strong>${t('pkg.heroTitle')}:</strong> ${t('pdp.opt3Desc')}`
    ],
    h3Table: () => `3. ${t('pdp.variantMatrixTitle')}`,
    thOption: t('contact.brandingMode'),
    thMoq: 'MOQ',
    thSetup: t('col.thLogo'),
    thUnitAdd: t('pdp.pricingTitle'),
    thLead: t('col.stat4Label')
  };
}

function buildLocalizedEditorialHtml(
  p: any,
  locTitle: string,
  locMat: string,
  locAtt: string,
  locProc: string,
  locPlating: string,
  lang: SupportedLanguage
): string {
  const t = useTranslations(lang);
  const c = getEditorialPack(lang, t);
  const insightSlugs = getRelatedInsightSlugsForProduct(p);
  const insightLinksHtml = insightSlugs
    .map((slug) => {
      const meta = localizeInsightMeta({ slug, title: INSIGHT_DEFAULT_TITLES[slug] || slug, summary: '', category: '' }, lang);
      const href = getLocalizedPath(`/insights/${slug}`, lang);
      return `<li class="editorial-guide-item"><a href="${href}"><span class="guide-link-text">${meta.title}</span><span class="guide-link-arrow" aria-hidden="true">→</span></a></li>`;
    })
    .join('');

  const colHref = getLocalizedPath(`/collections/${p.primaryCollection}`, lang);
  const colName = t(`col.${p.primaryCollection}.name` as any);
  const toolingStr = applyPhraseTranslations(String(p.toolingFee || ''), lang);
  const kLabel = (k: string) => (lang === 'en' ? k : SPEC_KEY_MAP[k]?.[lang] || k);
  const prodMoq = Number(p.moqNum || 100);
  const tier1Start = Math.max(100, prodMoq);
  const tier1Range = tier1Start >= 499 ? `${tier1Start}` : `${tier1Start}–499`;

  return `
    <div class="editorial-header-block">
      <span class="editorial-sku-pill">${t('pdp.readyMold')} · ${p.size}</span>
      <h2>${c.secTitle('', locTitle)}</h2>
      <p class="editorial-lead">${c.p1('', locTitle, locMat, p.size, p.weight)}</p>
    </div>

    <div class="editorial-spec-grid">
      <div class="editorial-spec-box">
        <h3>${c.h3Mech} (${p.size})</h3>
        <div class="editorial-spec-dims">${p.size} · ${p.weight}</div>
        <ul class="editorial-spec-list">
          <li><strong>${kLabel('Base Material')}:</strong> ${locMat}</li>
          <li><strong>${kLabel('Manufacturing Craft')}:</strong> ${locProc}</li>
          <li><strong>${kLabel('Attachment & Hardware')}:</strong> ${locAtt}</li>
          <li><strong>${kLabel('Electroplating & Finishes')}:</strong> ${locPlating}</li>
          <li><strong>${kLabel('Compliance & Safety')}:</strong> ${t('pdp.trust1')} · ${t('pdp.trust2')}</li>
        </ul>
      </div>

      <div class="editorial-spec-box">
        <h3>${c.h3Logo}</h3>
        <ul class="editorial-check-list">
          ${c.logoBullets.map((b: string) => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="editorial-schedule-block">
      <h3>${c.h3Table('')} ($${p.tier2000} – $${p.tier100} USD)</h3>
      <div class="geo-table-wrap">
        <table class="geo-table">
          <thead>
            <tr>
              <th>${c.thOption}</th>
              <th>${c.thMoq}</th>
              <th>${c.thSetup}</th>
              <th>${c.thUnitAdd}</th>
              <th>${c.thLead}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>${tier1Range} ${t('unit.pcs')}</strong></td><td>${p.moq ? p.moq.replace(/\bpcs\b/i, t('unit.pcs')) : `${prodMoq} ${t('unit.pcs')}`}</td><td>${toolingStr}</td><td><strong>$${p.tier100} / ${t('unit.pc')}</strong></td><td>${p.leadTime || '7–12d'}</td></tr>
            <tr><td><strong>500–1,999 ${t('unit.pcs')}</strong></td><td>500 ${t('unit.pcs')}</td><td>${t('geo.metricToolingVal')}</td><td><strong>$${p.tier500} / ${t('unit.pc')}</strong></td><td>${p.leadTime || '7–12d'}</td></tr>
            <tr><td><strong>2,000+ ${t('unit.pcs')}</strong></td><td>2,000 ${t('unit.pcs')}</td><td>$0.00 (Waived)</td><td><strong>$${p.tier2000} / ${t('unit.pc')}</strong></td><td>${p.leadTime || '10–15d'}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="pricing-ref-notice" role="note">
        <span class="pricing-ref-notice-icon" aria-hidden="true">💡</span>
        <div class="pricing-ref-notice-body">
          <strong>${t('pdp.pricingRefBadge')}:</strong>
          <span>${t('pdp.pricingRefNote')}</span>
        </div>
      </div>
    </div>

    <div class="editorial-insights-block">
      <div class="editorial-insights-head">
        <h3>4. ${t('breadcrumb.guides')} — ${locTitle}</h3>
        <a class="editorial-hub-pill" href="${colHref}">${colName} →</a>
      </div>
      <ul class="editorial-guide-links">
        ${insightLinksHtml}
      </ul>
    </div>
  `;
}

const PROOF_12H_MAP: Record<SupportedLanguage, string> = {
  en: '12h free proof.',
  de: '12h Gratis-Entwurf.',
  fr: 'BAT 12h gratuit.',
  nl: 'Gratis 12u proefdruk.',
  es: 'Boceto gratis 12h.',
  it: 'Bozza gratuita 12h.',
  pt: 'Arte grátis 12h.',
  sv: 'Fri skiss 12h.',
  da: 'Gratis 12t udkast.',
  no: 'Gratis 12t skisse.',
  fi: 'Ilmainen 12h vedos.',
  pl: 'Darmowy projekt 12h.',
  cs: '12h náhled zdarma.',
  ru: 'Макет 12 ч бесплатно.',
  ja: '12時間無料校正。',
  ko: '12시간 무료 시안.',
  id: 'Desain gratis 12 jam.',
  ar: 'تصميم مجاني 12 ساعة.'
};

export function localizeProduct(p: any, lang: SupportedLanguage): LocalizedProductData {
  const t = useTranslations(lang);
  const locTitle = localizeTitle(p.title, lang);
  const locMat = localizeMaterial(p.material, lang);
  const locAtt = localizeHardwareOrMagnets(p.attachmentEn, lang);
  const locProc = applyPhraseTranslations(p.process || '', lang);
  const locPlating = localizeColors(p.platingEn, lang);

  const overview =
    lang === 'en'
      ? p.overview
      : `${locTitle}: ${locMat} (${p.size}, ${p.weight}). ${locProc}. ${t('pdp.readyMold')} · MOQ ${p.moqNum || 100} ${t('unit.pcs')}; $${p.tier2000}–$${p.tier100}/${t('unit.pc')}.`;

  const rawSpecs: Array<[string, string]> = [
    ['Custom Tooling Mode', t('pdp.readyMold')],
    ['Production Category', lang === 'en' ? p.primaryCollectionName : (t(`col.${p.primaryCollection}.short` as any) || p.primaryCollectionName)],
    ['Base Material', locMat],
    ['Manufacturing Craft', locProc],
    ['Standard Dimensions', p.size],
    ['Unit Net Weight', p.weight],
    ['Electroplating & Finishes', locPlating],
    ['Attachment & Hardware', locAtt],
    ['Tooling / Mold Policy', applyPhraseTranslations(String(p.toolingFee || ''), lang)],
    ['Wholesale MOQ', `${p.moqNum || 100} ${t('unit.pcs')}`],
    ['Digital Artwork Proof', t('geo.metricLogoMoqVal')],
    ['Pre-Production Sample', `${p.sampleTime || '7–10 Days'} (${t('pdp.orderSample')})`],
    ['Compliance & Safety', t('geo.metricSafetyVal')]
  ];

  const specs: Array<[string, string]> = rawSpecs.map(([k, v]) => [
    lang === 'en' ? k : SPEC_KEY_MAP[k]?.[lang] || k,
    v
  ]);

  const variants = (p.variants || []).map((v: any) => ({
    ...v,
    materialLocalized: localizeMaterial(v.materialEn, lang)
  }));

  const features =
    lang === 'en'
      ? p.features
      : [
          `${t('col.thMaterial')}: ${locMat} (${p.size}, ${p.weight})`,
          `${t('col.thMagnet')}: ${locAtt}`,
          `${t('geo.metricTooling')}: ${p.toolingFee} · ${t('pdp.noMoldFee')}`,
          `${t('geo.metricSafety')}: ${t('pdp.trust1')} · ${t('pdp.trust2')}`
        ];

  const editorialHtml = buildLocalizedEditorialHtml(p, locTitle, locMat, locAtt, locProc, locPlating, lang);

  const pcs = t('unit.pcs');
  const pc = t('unit.pc');
  const faqTier1Start = Math.max(100, Number(p.moqNum || 100));
  const faqTier1Range = faqTier1Start >= 499 ? `${faqTier1Start}` : `${faqTier1Start}–499`;
  const faqs =
    lang === 'en'
      ? p.faqs
      : [
          {
            question: `1. ${locTitle} — ${t('pdp.blankMoq')} & ${t('geo.metricTooling')}?`,
            answer: `MOQ: ${p.moqNum || 100} ${pcs}. ${p.toolingFee}. ${t('pdp.declQuote')}`
          },
          {
            question: `2. ${locTitle} — ${t('pdp.pricingTitle')} (${faqTier1Start} / 500 / 2,000+ ${pcs})?`,
            answer: `${faqTier1Range}: $${p.tier100}/${pc} · 500–1,999: $${p.tier500}/${pc} · 2,000+: $${p.tier2000}/${pc}.`
          },
          {
            question: `3. ${locTitle} — ${SPEC_KEY_MAP['Base Material'][lang]} & ${SPEC_KEY_MAP['Electroplating & Finishes'][lang]}?`,
            answer: `${locMat} (${p.size}, ${p.weight}). ${locPlating}.`
          },
          {
            question: `4. ${locTitle} — ${SPEC_KEY_MAP['Attachment & Hardware'][lang]}?`,
            answer: `${locAtt}. ${locProc}.`
          },
          {
            question: `5. ${locTitle} — ${t('brand.compTitle')}?`,
            answer: t('brand.geoAnswer')
          },
          {
            question: `6. ${locTitle} — ${t('pdp.orderSample')} & ${t('geo.metricLogoMoq')}?`,
            answer: `${t('geo.metricLogoMoqVal')}. ${t('pdp.opt4Desc')}.`
          },
          {
            question: `7. ${locTitle} — ${t('pkg.heroTitle')}?`,
            answer: t('pkg.geoAnswer')
          },
          {
            question: `8. ${locTitle} — ${t('comp.heroTitle')}?`,
            answer: t('comp.geoAnswer')
          },
          {
            question: `9. ${locTitle} — ${t('footer.trust4Title')}?`,
            answer: `${t('footer.trust4Sub')} (${t('contact.hubVal')} · DHL / FedEx DDP).`
          },
          {
            question: `10. ${locTitle} — ${t('contact.title')}?`,
            answer: `${t('contact.subtitle')} WhatsApp: +86 187 5012 6315 · sales@medalpinsupply.com.`
          }
        ];

  const shortMat = locMat.split('(')[0].trim();
  const shortSize = String(p.size || '').replace(/\s*\([^)]*\)/g, '').trim();
  const metaTitle =
    lang === 'en'
      ? p.metaTitle
      : `${locTitle} · $${p.tier2000}+ | MedalPinSupply`;

  const metaDescription =
    lang === 'en'
      ? (p.metaDescription && p.metaDescription.length <= 155 ? p.metaDescription : overview.slice(0, 152) + '.')
      : `${locTitle} ($${p.tier2000}–$${p.tier100}/${pc}, MOQ ${p.moqNum || 100} ${pcs}). ${PROOF_12H_MAP[lang] || '12h free proof.'} ${shortMat}, ${shortSize}.`;

  return {
    title: locTitle,
    metaTitle,
    metaDescription,
    overview,
    material: locMat,
    magnets: locAtt,
    accessories: locProc,
    colors: locPlating,
    specs,
    variants,
    features,
    editorialHtml,
    faqs
  };
}
