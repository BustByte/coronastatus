// Please keep the countries sorted
export type CountryCode =
  | 'ar'
  | 'au'
  | 'bd'
  | 'br'
  | 'ca'
  | 'cl'
  | 'co'
  | 'de'
  | 'cz'
  | 'dk'
  | 'en'
  | 'es'
  | 'fr'
  | 'id'
  | 'in'
  | 'it'
  | 'lt'
  | 'mt'
  | 'mx'
  | 'my'
  | 'ng'
  | 'nl'
  | 'no'
  | 'np'
  | 'ph'
  | 'pt'
  | 'ro'
  | 'se'
  | 'sg'
  | 'sk'
  | 'tr'
  | 'ua'
  | 'us';

interface CountrySpecificUrls {
  submitReport: string;
  profile: string;
  privacyPolicy: string;
  map: string;
  contributors: string;
  api: string;
  apiDocs: string;
  statistics: string;
  limit: string;
}

type Urls = {
  [countryCode in CountryCode]: CountrySpecificUrls;
};

export const countrySpecificUrls: Urls = {
  ar: {
    submitReport: '/',
    profile: '/estadosalud',
    privacyPolicy: '/aviso-privacidad',
    map: '/mapa',
    contributors: '/colaboradores',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/estadisticas',
    limit: '/limit'
  },
  au: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    limit: '/limit'
  },
  bd: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    limit: '/limit'
  },
  br: {
    submitReport: '/',
    profile: '/condicaosaude',
    privacyPolicy: '/declaracao-privacidade',
    map: '/mapa',
    contributors: '/contribuidores',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/estatisticas',
    limit: '/limit'
  },
  ca: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    limit: '/limit'
  },
  cl: {
    submitReport: '/',
    profile: '/estadosalud',
    privacyPolicy: '/aviso-privacidad',
    map: '/mapa',
    contributors: '/colaboradores',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/estadisticas',
    limit: '/limit'
  },
  co: {
    submitReport: '/',
    profile: '/estadosalud',
    privacyPolicy: '/aviso-privacidad',
    map: '/mapa',
    contributors: '/colaboradores',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/estadisticas',
    limit: '/limit'
  },
  cz: {
    submitReport: '/',
    profile: '/zdravotni-stav',
    privacyPolicy: '/ochrana-soukromi',
    map: '/mapa',
    contributors: '/prispevatele',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistiky',
    limit: '/limit'
  },
  de: {
    submitReport: '/',
    profile: '/gesundheitszustand',
    privacyPolicy: '/datenschutzerklaerung',
    map: '/karte',
    contributors: '/mitwirkende',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistiken',
    limit: '/limit'
  },
  dk: {
    submitReport: '/',
    profile: '/helbredstilstand',
    privacyPolicy: '/privat-politik',
    map: '/kort',
    contributors: '/frivillige',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistikker',
    limit: '/limit'
  },
  en: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    limit: '/limit'
  },
  es: {
    submitReport: '/',
    profile: '/estadosalud',
    privacyPolicy: '/aviso-privacidad',
    map: '/mapa',
    contributors: '/colaboradores',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/estadisticas',
    limit: '/limit'
  },
  fr: {
    submitReport: '/',
    profile: '/profil',
    privacyPolicy: '/politique-de-confidentialite',
    map: '/carte',
    contributors: '/contributeurs',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistiques',
    limit: '/limit'
  },
  id: {
    submitReport: '/',
    profile: '/kondisikesehatan',
    privacyPolicy: '/kebijakan-privasi',
    map: '/peta',
    contributors: '/kontributor',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistik',
    limit: '/limit'
  },
  in: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    limit: '/limit'
  },
  it: {
    submitReport: '/',
    profile: '/profilo',
    privacyPolicy: '/privacy',
    map: '/mappa',
    contributors: '/contributori',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistiche',
    limit: '/limit'
  },
  lt: {
    submitReport: '/',
    profile: '/sveikatos-bukle',
    privacyPolicy: '/privatumo-politika',
    map: '/zemelapis',
    contributors: '/autoriai',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistika',
    limit: '/limit'
  },
  mt: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    limit: '/limit'
  },
  mx: {
    submitReport: '/',
    profile: '/estadosalud',
    privacyPolicy: '/aviso-privacidad',
    map: '/mapa',
    contributors: '/colaboradores',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/estadisticas',
    limit: '/limit'
  },
  my: {
    submitReport: '/',
    profile: '/keadaankesihatan',
    privacyPolicy: '/kenyataan-privasi',
    map: '/peta',
    contributors: '/penyumbang',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistik',
    limit: '/limit'
  },
  ng: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    limit: '/limit'
  },
  nl: {
    submitReport: '/',
    profile: '/melding',
    privacyPolicy: '/privacy-policy',
    map: '/kaart',
    contributors: '/bijdragers',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistieken',
    limit: '/limit'
  },
  no: {
    submitReport: '/',
    profile: '/helsetilstand',
    privacyPolicy: '/personvern',
    map: '/kart',
    contributors: '/frivillige',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistikk',
    limit: '/limit'
  },
  np: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    limit: '/limit'
  },
  ph: {
    submitReport: '/',
    profile: '/submission',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    limit: '/limit'
  },
  pt: {
    submitReport: '/',
    profile: '/estadosaude',
    privacyPolicy: '/politica-privacidade',
    map: '/mapa',
    contributors: '/voluntarios',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/estatistica',
    limit: '/limit'
  },
  ro: {
    submitReport: '/',
    profile: '/staresanatate',
    privacyPolicy: '/protectia-datelor',
    map: '/harta',
    contributors: '/contributori',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistici',
    limit: '/limit'
  },
  se: {
    submitReport: '/',
    profile: '/halsotillstand',
    privacyPolicy: '/integritetspolicy',
    map: '/karta',
    contributors: '/medverkare',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistik',
    limit: '/limit'
  },
  sg: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    limit: '/limit'
  },
  sk: {
    submitReport: '/',
    profile: '/zdravotny-stav',
    privacyPolicy: '/ochrana-sukromia',
    map: '/mapa',
    contributors: '/prispievatelia',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistiky',
    limit: '/limit'
  },
  tr: {
    submitReport: '/',
    profile: '/profil',
    privacyPolicy: '/gizlilik-bildirimi',
    map: '/harita',
    contributors: '/katkida-bulunanlar',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/istatistikler',
    limit: '/limit'
  },
  ua: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    limit: '/limit'
  },
  us: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    limit: '/limit'
  }
};

export const countryCodeToUrls = (
  countryCode: CountryCode
): CountrySpecificUrls => countrySpecificUrls[countryCode];
