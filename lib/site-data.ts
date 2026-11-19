export const SITE_INFO = {
  brandName: 'Hilal Tesisat',
  brandWordmark: 'HİLAL TESİSAT',
  tagline: 'Güvenli Yaşam, Profesyonel Çözümler.',
  phoneDisplay: '+90 555 078 44 18',
  phoneHref: 'tel:+905550784418',
  whatsappNumber: '905550784418',
  email: 'hilal.servicesss@gmail.com',
  addressLine1: 'Edebali Cd. 78, 06145',
  addressLine2: 'Pursaklar / Ankara',
  fullAddress: 'Edebali Cd. No:78, 06145 Pursaklar / Ankara',
  workingHours: '7/24 Acil Teknik Destek',
  experienceYears: '15+',
  happyClients: '1000+',
  supportHours: '7/24',
  mersisOrTaxNote: 'Yetkili Doğalgaz & Sıhhi Tesisat Mühendislik Hizmetleri',
  serviceDistricts: [
    'Pursaklar',
    'Keçiören',
    'Çankaya',
    'Yenimahalle',
    'Altındağ',
    'Mamak',
    'Etimesgut',
    'Sincan',
    'Gölbaşı',
  ],
} as const;

export function buildWhatsappHref(subject?: string): string {
  const baseText = subject
    ? `Merhaba Hilal Tesisat, ${subject} hakkında bilgi ve ücretsiz keşif randevusu almak istiyorum.`
    : 'Merhaba Hilal Tesisat, tesisat hizmetleriniz hakkında bilgi ve fiyat teklifi almak istiyorum.';
  return `https://wa.me/${SITE_INFO.whatsappNumber}?text=${encodeURIComponent(baseText)}`;
}

export const SITE_IMAGES = {
  heroVilla: '/images/hero_villa_grand_hilal.jpg',
  pearlRibbonBg: '/images/bg_silk_vivid_1795101487490.jpg',
  pearlSilkBackdrop: '/images/bg_silk_vivid_1795101487490.jpg',
  bannerHeating: '/images/subpage_banner_heating_1795100948517.jpg',
  bannerGas: '/images/subpage_banner_gas_engineering_1795100948428.jpg',
  bannerWater: '/images/subpage_banner_water_luxury_1795100948526.jpg',
  corporateTeam: '/images/subpage_corporate_team_1795100948395.jpg',
  waterSplash: '/images/water_vivid_1795101487866.jpg',
  emblemMetal: '/images/emblem_vivid_1795101488092.jpg',
  projectBoilerBathroom: '/images/project_boiler_bathroom_1795098584339.jpg',
  projectBathroomLuxury: '/images/project_bathroom_luxury_1795099756865.jpg',
  projectUnderfloorHeating: '/images/project_underfloor_heating_1795098583990.jpg',
  projectVillaExterior: '/images/project_villa_exterior_1795098584161.jpg',
  technicianPortrait: '/images/technician_rear_clean_1795099757031.jpg',
  phoneOrbital: '/images/phone_vivid_1795101488427.jpg',
  serviceCombi: '/images/service_boiler_vivid_1795101488015.jpg',
  serviceRadiator: '/images/service_radiator_panel_1795098583888.jpg',
  servicePurifier: '/images/service_water_purifier_1795098584188.jpg',
  servicePlumbing: '/images/service_plumbing_pipes_1795098583935.jpg',
  serviceGasFittings: '/images/service_gas_fittings_1795099756754.jpg',
  serviceGasWrench: '/images/service_gas_wrench_1795098584104.jpg',
  serviceDrainPipeS: '/images/service_drain_pipe_s_1795099756349.jpg',
  serviceDrainTurbine: '/images/service_drain_turbine_1795098583978.jpg',
  avatarMehmet: '/images/avatar_mehmet_1795099757000.jpg',
  avatarAyse: '/images/avatar_ayse_1795099757041.jpg',
  avatarAhmet: '/images/avatar_ahmet_1795099757077.jpg',
} as const;

export type ServiceCategory = 'tumu' | 'isitma' | 'dogalgaz' | 'su-tesisat';

export interface CategoryShowcase {
  id: ServiceCategory;
  label: string;
  headline: string;
  description: string;
  image: string;
  standardNote: string;
  responseNote: string;
}

export const SERVICE_CATEGORY_SHOWCASES: Record<ServiceCategory, CategoryShowcase> = {
  tumu: {
    id: 'tumu',
    label: 'Tüm Hizmetler',
    headline: 'Ankara Geneli Uçtan Uca Mekanik & Tesisat Çözümleri',
    description:
      'Yoğuşmalı ısıtma sistemlerinden Başkentgaz onaylı doğalgaz mühendisliğine, içme suyu arıtmadan kameralı tıkanıklık açmaya kadar her aşamada garantili uygulama.',
    image: SITE_IMAGES.bannerHeating,
    standardNote: 'TSE & Başkentgaz Standartlı',
    responseNote: 'Aynı Gün Ekip Yönlendirme',
  },
  isitma: {
    id: 'isitma',
    label: 'Isıtma Sistemleri',
    headline: 'Yüksek Verimli Yoğuşmalı Kombi, Petek ve Yerden Isıtma',
    description:
      'Yakıt tasarrufunu artıran baca gazı kalibrasyonu, çift yönlü darbeli petek yıkama ve oksijen bariyerli PEX-a yerden ısıtma kurulumu.',
    image: SITE_IMAGES.bannerHeating,
    standardNote: '%25’e Varan Yakıt Tasarrufu',
    responseNote: '1–2 Yıl Servis Garantisi',
  },
  dogalgaz: {
    id: 'dogalgaz',
    label: 'Doğalgaz Mühendislik',
    headline: 'Yetkili ZetaCAD Proje Çizimi, Gaz Açımı ve Emniyet Kontrolü',
    description:
      'Daire, villa ve ticari mutfaklar için Başkentgaz mevzuatına %100 uygun proje onayı, sızdırmazlık testi ve acil kaçak müdahalesi.',
    image: SITE_IMAGES.bannerGas,
    standardNote: 'Yetkili Mühendis Onaylı',
    responseNote: '30 Dk Acil Kaçak Ekibi',
  },
  'su-tesisat': {
    id: 'su-tesisat',
    label: 'Su & Sıhhi Tesisat',
    headline: 'Kırmadan Akustik Kaçak Tespiti, Robotik Açma ve Su Arıtma',
    description:
      'Termal ve akustik dinleme ile noktasal kaçak onarımı, endoskopik kameralı gider temizliği ve ters ozmoz sağlıklı su çözümleri.',
    image: SITE_IMAGES.bannerWater,
    standardNote: 'Kırmadan Görüntülü Çözüm',
    responseNote: '30–45 Dk Hızlı Müdahale',
  },
};

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  category: Exclude<ServiceCategory, 'tumu'>;
  categoryLabel: string;
  image: string;
  summary: string;
  details: string;
  warranty: string;
  responseTime: string;
  standards: string[];
  deliverables: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    slug: 'kombi-bakimi',
    title: 'Kombi Bakımı ve Yoğuşmalı Sistem Servisi',
    shortTitle: 'Kombi Bakımı',
    category: 'isitma',
    categoryLabel: 'Isıtma Sistemleri',
    image: SITE_IMAGES.serviceCombi,
    summary:
      'Yüksek verimli yoğuşmalı ve hermetik kombiler için yıllık periyodik bakım, yanma odası temizliği ve gaz ayarı.',
    details:
      'Cihazınızın kış aylarında maksimum verimle ve düşük yakıt tüketimiyle çalışması için genleşme tankı basınç kontrolü, fan ve brülör temizliği, eşanjör kontrolü ile baca gazı analizi gerçekleştirilir.',
    warranty: '1 Yıl İşçilik Garantisi',
    responseTime: 'Aynı Gün Servis',
    standards: ['TSE Standartlarına Uygun Kalibrasyon', 'Orijinal Yedek Parça Desteği'],
    deliverables: [
      'Genleşme tankı azot/hava basınç ölçümü',
      'Brülör, fan ve ateşleme elektrodu temizliği',
      'Gaz valfi emniyet ve sızdırmazlık testi',
      'NTC sensör ve üç yollu vana kontrolü',
    ],
  },
  {
    slug: 'petek-temizligi',
    title: 'İlaçlı ve Makineli Petek Temizliği',
    shortTitle: 'Petek Temizliği',
    category: 'isitma',
    categoryLabel: 'Isıtma Sistemleri',
    image: SITE_IMAGES.serviceRadiator,
    summary:
      'Özel darbeli yıkama makineleri ve koruyucu kimyasallar ile kireç, çamur ve tortuların evi kirletmeden temizlenmesi.',
    details:
      'Radyatörlerin alt kısımlarının ısınmaması ve kombinin yüksek devirde çalışmasına neden olan tortu birikimi, çift yönlü darbeli yıkama teknolojisiyle tamamen arındırılır; %25’e kadar doğalgaz tasarrufu sağlanır.',
    warranty: '2 Yıl Koruma Formülü',
    responseTime: '2 Saat İçinde Randevu',
    standards: ['Korozyon Önleyici Nötr Kimyasal', 'Sökmeden Kapalı Devre Yıkama'],
    deliverables: [
      'Çift yönlü basınçlı darbe ile çamur tahliyesi',
      'Tesisat koruyucu inhibitör sıvı uygulaması',
      'Reglaj ve hava alma balans ayarı',
      'Termal kamera ile ısı dağılım kontrolü',
    ],
  },
  {
    slug: 'su-aritma-cihazlari',
    title: 'Su Arıtma Cihazları Kurulum ve Filtre Bakımı',
    shortTitle: 'Su Arıtma Cihazları',
    category: 'su-tesisat',
    categoryLabel: 'Su & Sıhhi Tesisat',
    image: SITE_IMAGES.servicePurifier,
    summary:
      'Ters ozmoz (RO) sistemli alkalin ve mineral destekli ev/ofis tipi su arıtma cihazlarının montajı ve periyodik filtre değişimi.',
    details:
      'Şebeke suyundaki ağır metaller, klor, tortu ve kireci çok aşamalı membran filtrasyonla arındıran sistemlerin kurulumu, TDS su kalite ölçümü ve düzenli bakım takibi yapılır.',
    warranty: '2 Yıl Cihaz & Montaj Garantisi',
    responseTime: 'Aynı Gün Kurulum',
    standards: ['NSF Sertifikalı Filtre Kartuşları', 'Dijital TDS & pH Test Raporu'],
    deliverables: [
      'Tezgah altı veya sebil bağlantılı montaj',
      'Basınç düşürücü vana entegrasyonu',
      'İlk dolum sterilizasyonu ve TDS kalibrasyonu',
      '6 ve 12 aylık filtre değişim hatırlatma takibi',
    ],
  },
  {
    slug: 'sihhi-tesisat-isleri',
    title: 'Sıhhi Tesisat, Kaçak Tespiti ve Yenileme',
    shortTitle: 'Sıhhi Tesisat İşleri',
    category: 'su-tesisat',
    categoryLabel: 'Su & Sıhhi Tesisat',
    image: SITE_IMAGES.servicePlumbing,
    summary:
      'Temiz su, pis su, batarya, rezervuar, hidrofor ve kırmadan akustik/termal su kaçağı tespiti ile tesisat yenileme.',
    details:
      'Daire içi sıfır tesisat döşemeden acil boru patlaması onarımına kadar tüm sıhhi tesisat işlemlerinde PPRC ve bakır boru sistemleriyle uzun ömürlü, sızdırmaz çözümler sunuyoruz.',
    warranty: '2 Yıl Tesisat Garantisi',
    responseTime: '30–45 Dk Acil Müdahale',
    standards: ['TSE Belgeli PPRC & Pirinç Armatürler', 'Basınç Testi Onaylı Teslimat'],
    deliverables: [
      'Akustik dinleme ve termal kameralı kaçak tespiti',
      'Banyo, mutfak ve ıslak hacim komple tesisat yenileme',
      'Gömme rezervuar ve vitrifiye montajı',
      'Basınç düşürücü ve çekvalf sistemleri',
    ],
  },
  {
    slug: 'dogalgaz-projesi',
    title: 'Başkentgaz Onaylı Doğalgaz Proje & Açım',
    shortTitle: 'Doğalgaz Projesi',
    category: 'dogalgaz',
    categoryLabel: 'Doğalgaz Mühendislik',
    image: SITE_IMAGES.serviceGasFittings,
    summary:
      'Konut, iş yeri ve kazan daireleri için yetkili mühendis çizimi, Başkentgaz proje onayı ve gaz açım işlemleri.',
    details:
      'Sıfır binalar, tadilat gören daireler ve ticari işletmeler için yönetmeliğe %100 uygun iç tesisat projesi çizilir; sızdırmazlık testi ve Başkentgaz randevu süreçleri uçtan uca yönetilir.',
    warranty: 'Resmi Proje & Gaz Açım Güvencesi',
    responseTime: '24 Saatte Keşif & Çizim',
    standards: ['EPDK & Başkentgaz İç Tesisat Yönetmeliği', 'Yetkili Makine Mühendisi Onayı'],
    deliverables: [
      'Ücretsiz yerinde teknik keşif ve metraj',
      'ZetaCAD proje çizimi ve gaz dağıtım onayı',
      'Çelik ve bakır tesisat montajı',
      'Gaz açım randevusu ve uygunluk belgesi teslimi',
    ],
  },
  {
    slug: 'dogalgaz-bakim-onarim',
    title: 'Doğalgaz Tesisatı Bakım, Onarım ve Tadilat',
    shortTitle: 'Doğalgaz Bakım ve Onarım',
    category: 'dogalgaz',
    categoryLabel: 'Doğalgaz Mühendislik',
    image: SITE_IMAGES.serviceGasWrench,
    summary:
      'Gaz kaçağı tespiti, ocak/kombi fleks değişimi, vana yenileme, kollektör tadilatı ve periyodik sızdırmazlık kontrolü.',
    details:
      'Kalibre edilmiş dijital gaz dedektörleri ile tesisatınızdaki en küçük kaçaklar dahi tespit edilir; risk oluşturan eski bağlantı elemanları standartlara uygun çelik fleks ve emniyet vanalarıyla değiştirilir.',
    warranty: '1 Yıl Emniyet Garantisi',
    responseTime: '30 Dk Acil Ekip',
    standards: ['Dijital Manometre Basınç Testi', 'Deprem Vanası & Selenoid Vana Entegrasyonu'],
    deliverables: [
      'Hassas gaz dedektörü ile noktasal kaçak taraması',
      'TS EN standartlı çelik örgü fleks değişimi',
      'Gaz alarm cihazı ve selenoid vana montajı',
      'Tadilat sonrası kaçak test raporu',
    ],
  },
  {
    slug: 'pis-su-tikanikligi-acma',
    title: 'Kameralı ve Robotlu Pis Su Tıkanıklığı Açma',
    shortTitle: 'Pis Su Tıkanıklığı Açma',
    category: 'su-tesisat',
    categoryLabel: 'Su & Sıhhi Tesisat',
    image: SITE_IMAGES.serviceDrainPipeS,
    summary:
      'Kırmadan, dökmeden endoskopik gider kamerası ve yüksek torklu kanal açma robotu ile lavabo, tuvalet ve ana gider açma.',
    details:
      'Fayans ve zeminlere zarar vermeden gider hattı içi kamerayla görüntülenir; yağlanma, kireç, inşaat atığı veya kök kaynaklı tıkanıklıklar robotik yay ve hidro-jet başlıklarla kalıcı olarak açılır.',
    warranty: 'İşlem Sonrası Görüntülü Kontrol',
    responseTime: '45 Dk İçinde Adreste',
    standards: ['HD Endoskopik Boru Kamerası', 'Kırmadan Robotik Müdahale'],
    deliverables: [
      'Mutfak, banyo, klozet ve süzgeç tıkanıklığı açma',
      'Bina ana logar ve pimaş hattı yıkama',
      'HD kamera ile işlem sonrası hat kontrolü',
      'Eğim ve çökme tespiti raporlaması',
    ],
  },
  {
    slug: 'yerden-isitma-sistemleri',
    title: 'Yerden Isıtma Sistemleri & Kolektör Balans',
    shortTitle: 'Yerden Isıtma',
    category: 'isitma',
    categoryLabel: 'Isıtma Sistemleri',
    image: SITE_IMAGES.projectUnderfloorHeating,
    summary:
      'Oksijen bariyerli PEX-a borularla villa ve daireler için yüksek konforlu yerden ısıtma kurulumu ve debi ayarlı bakım.',
    details:
      'Homojen ısı dağılımı sağlayan modüler strafor ve oksijen bariyerli boru döşemesi ile mevcut yerden ısıtma tesisatlarının çamur temizliği ve debimetre ayarları profesyonelce uygulanır.',
    warranty: '10 Yıl Boru & 2 Yıl İşçilik Garantisi',
    responseTime: 'Proje Bazlı Planlama',
    standards: ['DIN 4726 Oksijen Bariyerli Boru', 'Otomatik Oda Termostatı Entegrasyonu'],
    deliverables: [
      'Isı kaybı hesabı ve zon planlaması',
      'Yüksek yoğunluklu strafor ve PEX-a borulama',
      'Debimetreli paslanmaz kolektör montajı',
      'Şap öncesi basınç altında sızdırmazlık testi',
    ],
  },
];

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  category: 'Villa & Konut' | 'Isıtma Sistemleri' | 'Banyo & Sıhhi' | 'Ticari Proje';
  year: string;
  image: string;
  description: string;
  metrics: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'cankaya-luxury-kombi',
    title: 'Çankaya Rezidans Yoğuşmalı Kombi & Bakır Kollektör',
    location: 'Çankaya / Ankara',
    category: 'Banyo & Sıhhi',
    year: '2026',
    image: SITE_IMAGES.projectBoilerBathroom,
    description:
      'Estetik mimari dokuya uyumlu bakır borulu yoğuşmalı kombi dönüşümü, gizli rezervuar ve termostatik duş sistemleri sıfır hata ile uygulandı.',
    metrics: ['A+ Yoğuşma Verimi', '40 Bar Test Onaylı', '5 Yıl Sistem Güvencesi'],
  },
  {
    id: 'pursaklar-villa-mep',
    title: 'Pursaklar Modern Villa Komple Mekanik & Doğalgaz',
    location: 'Pursaklar / Ankara',
    category: 'Villa & Konut',
    year: '2026',
    image: SITE_IMAGES.projectVillaExterior,
    description:
      '380 m² müstakil villa için kaskad yoğuşmalı kazan, yerden ısıtma, hidromasajlı banyo sıhhi tesisatı ve Başkentgaz onaylı doğalgaz iç tesisat projesi anahtar teslim tamamlandı.',
    metrics: ['380 m² Alan', '%32 Enerji Tasarrufu', '18 İş Günü Teslim'],
  },
  {
    id: 'kecioren-bina-kolon',
    title: 'Keçiören Rezidans Banyo & Sıhhi Tesisat Yenileme',
    location: 'Keçiören / Ankara',
    category: 'Banyo & Sıhhi',
    year: '2025',
    image: SITE_IMAGES.projectBathroomLuxury,
    description:
      'Modern traverten banyo iç mekanına uyumlu gömme armatür, lineer süzgeç, temiz su kollektörü ve sessiz pis su borulama sistemi teslim edildi.',
    metrics: ['Ses Yalıtımlı Pimaş', 'TSE Onaylı Armatür', '10 İş Günü Teslim'],
  },
  {
    id: 'oran-yerden-isitma',
    title: 'Oran Konut Projesi Akıllı Yerden Isıtma Uygulaması',
    location: 'Oran / Ankara',
    category: 'Isıtma Sistemleri',
    year: '2025',
    image: SITE_IMAGES.projectUnderfloorHeating,
    description:
      '8 zonlu oda termostatı kontrollü oksijen bariyerli PEX-a yerden ısıtma sistemi ve paslanmaz debimetreli kolektör kurulumu gerçekleştirildi.',
    metrics: ['8 Bağımsız Isı Zonu', '650 m PEX-a Boru', 'Eşit Zemin Dağılımı'],
  },
];

export interface TestimonialItem {
  id: string;
  name: string;
  district: string;
  service: string;
  rating: number;
  quote: string;
  initials: string;
  avatar: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Mehmet Yılmaz',
    district: 'Ankara',
    service: 'Kombi Bakımı',
    rating: 5,
    quote: 'Hilal Tesisat gerçekten işinin uzmanı. Hem hızlı hem kaliteli hizmet aldım.',
    initials: 'MY',
    avatar: SITE_IMAGES.avatarMehmet,
  },
  {
    id: 't2',
    name: 'Ayşe Demir',
    district: 'Pursaklar',
    service: 'Petek Temizliği',
    rating: 5,
    quote: 'Ekip çok profesyonel ve güler yüzlüydü. Kesinlikle tavsiye ederim.',
    initials: 'AD',
    avatar: SITE_IMAGES.avatarAyse,
  },
  {
    id: 't3',
    name: 'Ahmet Kaya',
    district: 'Ankara',
    service: 'Doğalgaz Projesi',
    rating: 5,
    quote: 'Doğalgaz projemizi sorunsuz şekilde tamamladılar.',
    initials: 'AK',
    avatar: SITE_IMAGES.avatarAhmet,
  },
  {
    id: 't4',
    name: 'Fatma Özkan',
    district: 'Keçiören',
    service: 'Su Kaçağı Tespiti',
    rating: 5,
    quote: 'Kırmadan akustik cihazla kaçağı 15 dakikada bulup tamir ettiler. Tertemiz çalıştılar.',
    initials: 'FÖ',
    avatar: SITE_IMAGES.avatarAyse,
  },
  {
    id: 't5',
    name: 'Murat Arslan',
    district: 'Çankaya',
    service: 'Yerden Isıtma Bakımı',
    rating: 5,
    quote: 'Yerden ısıtma hatlarımızın tüm devir ve kolektör ayarlarını yaptılar, yakıt faturamız düştü.',
    initials: 'MA',
    avatar: SITE_IMAGES.avatarMehmet,
  },
  {
    id: 't6',
    name: 'Zeynep Çelik',
    district: 'Yenimahalle',
    service: 'Su Arıtma Kurulumu',
    rating: 5,
    quote: 'Aynı gün gelip su arıtma cihazını kurdular ve su sertlik ölçümünü gözümüzün önünde yaptılar.',
    initials: 'ZÇ',
    avatar: SITE_IMAGES.avatarAhmet,
  },
];

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Kombi & Isıtma',
    question: 'Kombi bakımı ne sıklıkla yapılmalıdır?',
    answer:
      'Kombi bakımı her yıl kış sezonuna girmeden önce (tercihen Eylül-Kasım ayları arasında) yılda en az 1 kez yapılmalıdır. Düzenli bakım cihaz ömrünü uzatır, arıza riskini azaltır ve yakıt tüketiminde %15’e varan tasarruf sağlar.',
  },
  {
    id: 'faq-2',
    category: 'Kombi & Isıtma',
    question: 'Petek temizliği yapılırken ev kirlenir mi ve kaç saat sürer?',
    answer:
      'Hayır. Çift yönlü darbeli petek yıkama makinemiz kombinin veya banyodaki havlupanın bağlantı noktasından kapalı devre olarak bağlanır. Hiçbir radyatör yerinden sökülmeden ortalama 1,5–2 saat içinde işlem tertemiz tamamlanır.',
  },
  {
    id: 'faq-3',
    category: 'Doğalgaz',
    question: 'Başkentgaz doğalgaz proje çizimi ve gaz açma süreci kaç gün sürer?',
    answer:
      'Ücretsiz yerinde keşif sonrası ZetaCAD proje çizimi aynı gün Başkentgaz sistemine yüklenir. Proje onayının ardından montaj 1 iş günü içinde tamamlanır ve ortalama 3–5 iş günü içerisinde Başkentgaz kontrol randevusu ile gaz açımı gerçekleştirilir.',
  },
  {
    id: 'faq-4',
    category: 'Su & Sıhhi Tesisat',
    question: 'Su kaçağı tespiti için duvar veya fayans kırılıyor mu?',
    answer:
      'Hayır. Akustik dinleme cihazları, termal kameralar ve nem ölçerler kullanarak su sızıntısının noktasal yerini %99 doğrulukla tespit ediyoruz. Yalnızca arızalı bölgede minimal müdahale ile onarım yapılır.',
  },
  {
    id: 'faq-5',
    category: 'Fiyat & Garanti',
    question: 'Yapılan işlemler ve kullanılan parçalar garantili mi?',
    answer:
      'Evet. Hilal Tesisat tarafından gerçekleştirilen tüm işçilikler hizmet türüne göre 1 ila 2 yıl servis garantisi kapsamındadır; kullanılan TSE belgeli orijinal yedek parça ve armatürler üretici firma garantilidir.',
  },
  {
    id: 'faq-6',
    category: 'Acil Destek',
    question: 'Ankara’nın hangi ilçelerine 7/24 servis veriyorsunuz?',
    answer:
      'Merkezimiz Pursaklar başta olmak üzere Keçiören, Çankaya, Yenimahalle, Altındağ, Mamak, Etimesgut, Sincan ve Gölbaşı dahil Ankara genelinde 7 gün 24 saat acil teknik ekip desteği sağlıyoruz.',
  },
];
