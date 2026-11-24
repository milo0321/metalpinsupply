import { defaultLang, languages, supportedLanguages, type SupportedLanguage } from './config';
import { ui } from './ui';

export function getLanguageFromURL(urlOrPath: string | URL): SupportedLanguage {
  if (!urlOrPath) return defaultLang;
  const pathname = typeof urlOrPath === 'string' ? urlOrPath : urlOrPath.pathname;
  let clean = pathname.split('?')[0].split('#')[0];
  clean = clean.replace(/(\/index)?\.(html?|php)$/i, '');
  const segments = clean.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment && (supportedLanguages as string[]).includes(firstSegment)) {
    return firstSegment as SupportedLanguage;
  }
  return defaultLang;
}

export function useTranslations(lang: SupportedLanguage = defaultLang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    const langDict = ui[lang] as Record<string, string> | undefined;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    return (ui[defaultLang] as Record<string, string>)[key] || key;
  };
}

export function getLocalizedPath(pathname: string, targetLang: SupportedLanguage, sourceLang?: SupportedLanguage): string {
  if (!pathname) return targetLang === defaultLang ? '/' : `/${targetLang}`;

  const [pathPart, queryPart] = pathname.split('?');
  let cleanPath = pathPart.split('#')[0];

  cleanPath = cleanPath.replace(/(\/index)?\.(html?|php)$/i, '');

  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  let strippedPath = cleanPath;
  if (!strippedPath.startsWith('/')) {
    strippedPath = '/' + strippedPath;
  }

  const langPrefixRegex = new RegExp(`^\\/(${supportedLanguages.join('|')})(\\/|$)`);
  while (langPrefixRegex.test(strippedPath)) {
    strippedPath = strippedPath.replace(langPrefixRegex, '/');
  }
  if (strippedPath.length > 1 && strippedPath.endsWith('/')) {
    strippedPath = strippedPath.slice(0, -1);
  }
  if (strippedPath === '' || strippedPath === '/index' || strippedPath === '/404') {
    strippedPath = '/';
  }

  let finalPath: string;
  if (targetLang === defaultLang) {
    finalPath = strippedPath;
  } else if (strippedPath === '/') {
    finalPath = `/${targetLang}`;
  } else {
    finalPath = `/${targetLang}${strippedPath}`;
  }

  return queryPart ? `${finalPath}?${queryPart}` : finalPath;
}

export function getHreflangTags(currentUrl: URL | string) {
  const urlObj = typeof currentUrl === 'string' ? new URL(currentUrl, 'https://medalpinsupply.com') : currentUrl;
  const rawPath = urlObj.pathname;

  return supportedLanguages.map((lang) => {
    const localizedPath = getLocalizedPath(rawPath, lang);
    const href = localizedPath === '/' ? 'https://medalpinsupply.com' : `https://medalpinsupply.com${localizedPath}`.replace(/\/+$/, '');
    return {
      lang,
      hreflang: languages[lang].code,
      href
    };
  });
}

export function getDirection(lang: SupportedLanguage): 'ltr' | 'rtl' {
  return languages[lang]?.dir || 'ltr';
}

export function getLanguageMetadata(lang: SupportedLanguage) {
  return languages[lang] || languages[defaultLang];
}

export interface MicroHookLabels {
  sample1Pc: string;
  freeLogoProof: string;
  sheet140: string;
  lockPriceWa: string;
  orderSampleMockup: (sku: string) => string;
  getFullSheetPdf: string;
  mixMoqBadge: string;
  unitPriceLabel: string;
  estTotalLabel: string;
  pdpInputPlaceholder: string;
  pdpDirectSendBtn: string;
  pdpSentConfirm: string;
}

const MICRO_HOOK_MAP: Record<SupportedLanguage, MicroHookLabels> = {
  en: {
    sample1Pc: '📦 12h Free Proof',
    freeLogoProof: 'Free 1:1 Artwork',
    sheet140: '📊 Price Guide PDF',
    lockPriceWa: '💬 WhatsApp Quote →',
    orderSampleMockup: (sku) => `📦 Request Free 1:1 Artwork Proof + Sample (${sku}) →`,
    getFullSheetPdf: '📊 Get Custom Craft Wholesale Price Guide (PDF/Excel) →',
    mixMoqBadge: '✓ 12h Free Digital Proof · ✓ 100% Custom-Molded · ✓ Free 3-Yr Mold Storage',
    unitPriceLabel: 'Unit Factory Price',
    estTotalLabel: 'Est. Batch Subtotal',
    pdpInputPlaceholder: 'Work Email (name@company.com) for Quote & 12h Proof...',
    pdpDirectSendBtn: '⚡ Get Quote & Proof →',
    pdpSentConfirm: '✅ Received! Our Zhongshan export desk will email your quote & artwork proof within 2–12h.'
  },
  de: {
    sample1Pc: '📦 12h Gratis-Entwurf',
    freeLogoProof: '1:1 Druckvorlage gratis',
    sheet140: '📊 Preisliste (PDF)',
    lockPriceWa: '💬 WhatsApp Preis →',
    orderSampleMockup: (sku) => `📦 1:1 Grafikentwurf gratis + Muster (${sku}) →`,
    getFullSheetPdf: '📊 Maßanfertigungs-Preisliste (PDF/Excel) anfordern →',
    mixMoqBadge: '✓ 12h Gratis-Entwurf · ✓ 100% Einzelanfertigung · ✓ 3 Jahre Formlagerung',
    unitPriceLabel: 'Stückpreis ab Werk',
    estTotalLabel: 'Geschätzte Summe',
    pdpInputPlaceholder: 'Geschäftliche E-Mail (für Angebot & 12h-Entwurf)...',
    pdpDirectSendBtn: '⚡ Angebot & Entwurf →',
    pdpSentConfirm: '✅ Erhalten! Unser Export-Team sendet Ihr Angebot & Entwurf in 2–12 Std.'
  },
  fr: {
    sample1Pc: '📦 Maquette 12h gratuite',
    freeLogoProof: 'BAT 1:1 gratuit',
    sheet140: '📊 Grille Tarifaire PDF',
    lockPriceWa: '💬 Tarif WhatsApp →',
    orderSampleMockup: (sku) => `📦 Maquette 1:1 gratuite + Échantillon (${sku}) →`,
    getFullSheetPdf: '📊 Recevoir le guide tarifaire usine sur mesure (PDF/Excel) →',
    mixMoqBadge: '✓ BAT 12h gratuit · ✓ 100% sur mesure · ✓ Moule gardé 3 ans',
    unitPriceLabel: 'Prix unitaire usine',
    estTotalLabel: 'Sous-total estimé',
    pdpInputPlaceholder: 'E-mail pro (pour devis & maquette 12h)...',
    pdpDirectSendBtn: '⚡ Devis & Maquette →',
    pdpSentConfirm: '✅ Reçu ! Notre bureau export enverra votre devis et maquette sous 2–12h.'
  },
  nl: {
    sample1Pc: '📦 12u Gratis proef',
    freeLogoProof: 'Gratis 1:1 ontwerp',
    sheet140: '📊 Prijslijst PDF',
    lockPriceWa: '💬 WhatsApp Prijs →',
    orderSampleMockup: (sku) => `📦 Gratis 1:1 ontwerp + Monster (${sku}) →`,
    getFullSheetPdf: '📊 Ontvang maatwerk fabrieksprijslijst (PDF/Excel) →',
    mixMoqBadge: '✓ 12u Gratis proef · ✓ 100% op maat gemaakt · ✓ 3 jaar matrijsopslag',
    unitPriceLabel: 'Fabrieksprijs / st.',
    estTotalLabel: 'Geschat subtotaal',
    pdpInputPlaceholder: 'Zakelijke e-mail (voor offerte & ontwerp)...',
    pdpDirectSendBtn: '⚡ Offerte & Proef →',
    pdpSentConfirm: '✅ Ontvangen! Ons exportteam stuurt offerte en ontwerp binnen 2–12 uur.'
  },
  es: {
    sample1Pc: '📦 Boceto 12h gratis',
    freeLogoProof: 'Arte 1:1 gratis',
    sheet140: '📊 Guía de Precios PDF',
    lockPriceWa: '💬 Precio WhatsApp →',
    orderSampleMockup: (sku) => `📦 Solicitar boceto 1:1 gratis + muestra (${sku}) →`,
    getFullSheetPdf: '📊 Recibir guía de precios de fabricación a medida (PDF/Excel) →',
    mixMoqBadge: '✓ Boceto 12h gratis · ✓ 100% molde a medida · ✓ Molde guardado 3 años',
    unitPriceLabel: 'Precio unitario fábrica',
    estTotalLabel: 'Subtotal estimado',
    pdpInputPlaceholder: 'Correo corporativo (para cotización y boceto)...',
    pdpDirectSendBtn: '⚡ Cotización y Boceto →',
    pdpSentConfirm: '✅ ¡Recibido! Enviaremos su cotización y diseño en 2–12h.'
  },
  it: {
    sample1Pc: '📦 Bozza 12h gratuita',
    freeLogoProof: 'Grafica 1:1 gratis',
    sheet140: '📊 Listino Fabbrica PDF',
    lockPriceWa: '💬 Prezzo WhatsApp →',
    orderSampleMockup: (sku) => `📦 Bozza grafica 1:1 gratuita + campione (${sku}) →`,
    getFullSheetPdf: '📊 Scarica il listino fabbrica su misura (PDF/Excel) →',
    mixMoqBadge: '✓ Bozza 12h gratis · ✓ 100% su misura · ✓ Stampo custodito 3 anni',
    unitPriceLabel: 'Prezzo unitario fabbrica',
    estTotalLabel: 'Subtotale stimato',
    pdpInputPlaceholder: 'Email aziendale (per preventivo e bozza)...',
    pdpDirectSendBtn: '⚡ Preventivo e Bozza →',
    pdpSentConfirm: '✅ Ricevuto! Invieremo preventivo e grafica entro 2–12h.'
  },
  pt: {
    sample1Pc: '📦 Prova 12h grátis',
    freeLogoProof: 'Arte 1:1 grátis',
    sheet140: '📊 Tabela Preços PDF',
    lockPriceWa: '💬 Preço WhatsApp →',
    orderSampleMockup: (sku) => `📦 Arte 1:1 grátis + amostra (${sku}) →`,
    getFullSheetPdf: '📊 Receber tabela de preços fábrica sob medida (PDF/Excel) →',
    mixMoqBadge: '✓ Prova 12h grátis · ✓ 100% molde próprio · ✓ Molde guardado 3 anos',
    unitPriceLabel: 'Preço unitário fábrica',
    estTotalLabel: 'Subtotal estimado',
    pdpInputPlaceholder: 'E-mail corporativo (para cotação e arte)...',
    pdpDirectSendBtn: '⚡ Cotação e Arte →',
    pdpSentConfirm: '✅ Recebido! Enviaremos sua cotação e arte em 2–12h.'
  },
  sv: {
    sample1Pc: '📦 12h Gratis skiss',
    freeLogoProof: 'Gratis 1:1 korrektur',
    sheet140: '📊 Prisguide PDF',
    lockPriceWa: '💬 WhatsApp-pris →',
    orderSampleMockup: (sku) => `📦 Gratis 1:1 skiss + prov (${sku}) →`,
    getFullSheetPdf: '📊 Få fabriksprisguide för specialtillverkning (PDF/Excel) →',
    mixMoqBadge: '✓ 12h Gratis skiss · ✓ 100% kundunikt verktyg · ✓ Form lagrad 3 år',
    unitPriceLabel: 'Fabrikspris / st',
    estTotalLabel: 'Beräknad delsumma',
    pdpInputPlaceholder: 'Företagsmejl (för offert & korrektur)...',
    pdpDirectSendBtn: '⚡ Offert & Skiss →',
    pdpSentConfirm: '✅ Mottaget! Vårt exportteam skickar offert & korrektur inom 2–12 tim.'
  },
  da: {
    sample1Pc: '📦 12t Gratis skitse',
    freeLogoProof: 'Gratis 1:1 korrektur',
    sheet140: '📊 Prisliste PDF',
    lockPriceWa: '💬 WhatsApp-pris →',
    orderSampleMockup: (sku) => `📦 Gratis 1:1 skitse + prøve (${sku}) →`,
    getFullSheetPdf: '📊 Få fabriksprisliste for specialfremstilling (PDF/Excel) →',
    mixMoqBadge: '✓ 12t Gratis skitse · ✓ 100% kundespecifik · ✓ Form opbevaret 3 år',
    unitPriceLabel: 'Fabrikspris / stk.',
    estTotalLabel: 'Estimeret subtotal',
    pdpInputPlaceholder: 'Firma-e-mail (for tilbud & korrektur)...',
    pdpDirectSendBtn: '⚡ Tilbud & Skitse →',
    pdpSentConfirm: '✅ Modtaget! Vores eksportteam sender tilbud & korrektur inden for 2–12 timer.'
  },
  no: {
    sample1Pc: '📦 12t Gratis skisse',
    freeLogoProof: 'Gratis 1:1 korrektur',
    sheet140: '📊 Prisguide PDF',
    lockPriceWa: '💬 WhatsApp-pris →',
    orderSampleMockup: (sku) => `📦 Gratis 1:1 skisse + prøve (${sku}) →`,
    getFullSheetPdf: '📊 Få fabrikkprisliste for spesialtilpasning (PDF/Excel) →',
    mixMoqBadge: '✓ 12t Gratis skisse · ✓ 100% spesialverktøy · ✓ Lagres gratis 3 år',
    unitPriceLabel: 'Fabrikkpris / stk.',
    estTotalLabel: 'Estimert delsum',
    pdpInputPlaceholder: 'Firma-e-post (for tilbud & korrektur)...',
    pdpDirectSendBtn: '⚡ Tilbud & Skisse →',
    pdpSentConfirm: '✅ Mottatt! Vårt eksportteam sender tilbud & korrektur innen 2–12 timer.'
  },
  fi: {
    sample1Pc: '📦 12h Ilmainen vedos',
    freeLogoProof: 'Ilmainen 1:1 vedos',
    sheet140: '📊 Hinnasto PDF',
    lockPriceWa: '💬 WhatsApp-hinta →',
    orderSampleMockup: (sku) => `📦 Ilmainen 1:1 vedos + näyte (${sku}) →`,
    getFullSheetPdf: '📊 Tilaa räätälöidyn tuotannon tehdashinnasto (PDF/Excel) →',
    mixMoqBadge: '✓ 12h Ilmainen vedos · ✓ 100% mittatilaustyökalu · ✓ Muotti säilyy 3 v.',
    unitPriceLabel: 'Tehdashinta / kpl',
    estTotalLabel: 'Arvioitu välisumma',
    pdpInputPlaceholder: 'Työsähköposti (tarjous & vedos)...',
    pdpDirectSendBtn: '⚡ Tarjous & Vedos →',
    pdpSentConfirm: '✅ Vastaanotettu! Lähetämme tarjouksen ja vedoksen 2–12h sisällä.'
  },
  pl: {
    sample1Pc: '📦 Projekt 12h gratis',
    freeLogoProof: 'Darmowy projekt 1:1',
    sheet140: '📊 Cennik PDF',
    lockPriceWa: '💬 Cena WhatsApp →',
    orderSampleMockup: (sku) => `📦 Darmowy projekt 1:1 + próbka (${sku}) →`,
    getFullSheetPdf: '📊 Pobierz cennik fabryczny produkcji na zamówienie (PDF/Excel) →',
    mixMoqBadge: '✓ Projekt 12h gratis · ✓ 100% pod projekt klienta · ✓ Matryca 3 lata',
    unitPriceLabel: 'Cena fabryczna / szt.',
    estTotalLabel: 'Szacowana suma',
    pdpInputPlaceholder: 'Służbowy e-mail (wycena i projekt)...',
    pdpDirectSendBtn: '⚡ Wycena i Projekt →',
    pdpSentConfirm: '✅ Otrzymano! Wyślemy wycenę i projekt graficzny w 2–12 godz.'
  },
  cs: {
    sample1Pc: '📦 Náhled 12h zdarma',
    freeLogoProof: 'Náhled 1:1 zdarma',
    sheet140: '📊 Ceník PDF',
    lockPriceWa: '💬 Cena WhatsApp →',
    orderSampleMockup: (sku) => `📦 Náhled 1:1 zdarma + vzorek (${sku}) →`,
    getFullSheetPdf: '📊 Získat tovární ceník zakázkové výroby (PDF/Excel) →',
    mixMoqBadge: '✓ Náhled 12h zdarma · ✓ 100% forma na míru · ✓ Úschova formy 3 roky',
    unitPriceLabel: 'Tovární cena / ks',
    estTotalLabel: 'Odhadovaný mezisoučet',
    pdpInputPlaceholder: 'Firemní e-mail (nabídka a náhled)...',
    pdpDirectSendBtn: '⚡ Nabídka a Náhled →',
    pdpSentConfirm: '✅ Přijato! Zašleme nabídku a náhled do 2–12 hodin.'
  },
  ru: {
    sample1Pc: '📦 Макет 12ч бесплатно',
    freeLogoProof: 'Макет 1:1 бесплатно',
    sheet140: '📊 Прайс PDF',
    lockPriceWa: '💬 Цена в WhatsApp →',
    orderSampleMockup: (sku) => `📦 Бесплатный макет 1:1 + образец (${sku}) →`,
    getFullSheetPdf: '📊 Получить заводской прайс на изготовление под заказ (PDF/Excel) →',
    mixMoqBadge: '✓ Макет за 12ч · ✓ 100% оснастка под дизайн · ✓ Хранение 3 года',
    unitPriceLabel: 'Цена завода / шт.',
    estTotalLabel: 'Итоговая сумма',
    pdpInputPlaceholder: 'Рабочий Email (расчет и макет 12ч)...',
    pdpDirectSendBtn: '⚡ Расчет и Макет →',
    pdpSentConfirm: '✅ Принято! Наш отдел экспорта отправит расчет и макет за 2–12 часов.'
  },
  ja: {
    sample1Pc: '📦 12時間無料デザイン校正',
    freeLogoProof: '1:1無料版下作成',
    sheet140: '📊 価格表 PDF',
    lockPriceWa: '💬 WhatsApp見積 →',
    orderSampleMockup: (sku) => `📦 無料1:1デザイン校正・試作依頼（${sku}）→`,
    getFullSheetPdf: '📊 特注製造・工場直販価格ガイド（PDF/Excel）を請求 →',
    mixMoqBadge: '✓ 12時間無料校正 · ✓ 完全オリジナル金型製作 · ✓ 金型3年間無料保管',
    unitPriceLabel: '工場出荷単価',
    estTotalLabel: '概算小計',
    pdpInputPlaceholder: '法人メール（即時見積・12時間デザイン校正）...',
    pdpDirectSendBtn: '⚡ 見積＆無料校正 →',
    pdpSentConfirm: '✅ 受付完了！担当より2〜12時間以内にお見積りと校正データをお送りします。'
  },
  ko: {
    sample1Pc: '📦 12시간 무료 시안',
    freeLogoProof: '무료 1:1 도안',
    sheet140: '📊 단가표 PDF',
    lockPriceWa: '💬 WhatsApp 견적 →',
    orderSampleMockup: (sku) => `📦 무료 1:1 도안 + 샘플 문의 (${sku}) →`,
    getFullSheetPdf: '📊 맞춤형 제작 공장 직판 단가표 (PDF/Excel) 받기 →',
    mixMoqBadge: '✓ 12시간 무료 시안 · ✓ 100% 고객 금형 제작 · ✓ 금형 3년 무료 보관',
    unitPriceLabel: '공장 출고 단가',
    estTotalLabel: '예상 합계',
    pdpInputPlaceholder: '업무용 이메일 (즉시 견적 및 무료 시안)...',
    pdpDirectSendBtn: '⚡ 견적 및 시안 받기 →',
    pdpSentConfirm: '✅ 접수 완료! 2~12시간 내에 견적서와 무료 시안을 보내드립니다.'
  },
  id: {
    sample1Pc: '📦 Desain Gratis 12j',
    freeLogoProof: 'Mockup 1:1 Gratis',
    sheet140: '📊 Daftar Harga PDF',
    lockPriceWa: '💬 Harga WhatsApp →',
    orderSampleMockup: (sku) => `📦 Minta Mockup 1:1 Gratis + Sampel (${sku}) →`,
    getFullSheetPdf: '📊 Dapatkan Panduan Harga Pabrik Produksi Kustom (PDF/Excel) →',
    mixMoqBadge: '✓ Desain 12j Gratis · ✓ 100% cetakan kustom · ✓ Cetakan disimpan 3 thn',
    unitPriceLabel: 'Harga Satuan Pabrik',
    estTotalLabel: 'Estimasi Subtotal',
    pdpInputPlaceholder: 'Email Kerja (Penawaran & Desain 12j)...',
    pdpDirectSendBtn: '⚡ Penawaran & Desain →',
    pdpSentConfirm: '✅ Diterima! Tim ekspor kami akan mengirim penawaran & mockup dalam 2–12 jam.'
  },
  ar: {
    sample1Pc: '📦 تصميم مجاني 12س',
    freeLogoProof: 'بروفة 1:1 مجانية',
    sheet140: '📊 دليل الأسعار PDF',
    lockPriceWa: '💬 سعر واتساب →',
    orderSampleMockup: (sku) => `📦 اطلب تصميم 1:1 مجاني + عينة (${sku}) →`,
    getFullSheetPdf: '📊 احصل على دليل أسعار المصنع للتصنيع المخصص (PDF/Excel) →',
    mixMoqBadge: '✓ تصميم مجاني 12س · ✓ تصنيع مخصص 100% · ✓ حفظ القالب 3 سنوات',
    unitPriceLabel: 'سعر المصنع للقطعة',
    estTotalLabel: 'المجموع التقديري',
    pdpInputPlaceholder: 'البريد الإلكتروني للعمل (لعرض السعر والتصميم)...',
    pdpDirectSendBtn: '⚡ عرض السعر والتصميم →',
    pdpSentConfirm: '✅ تم الاستلام! سيرسل مكتب التصدير عرض السعر والبروفة خلال 2–12 ساعة.'
  }
};

export function getMicroHookLabels(lang: SupportedLanguage = defaultLang): MicroHookLabels {
  return MICRO_HOOK_MAP[lang] || MICRO_HOOK_MAP.en;
}
