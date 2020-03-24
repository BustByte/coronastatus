import { LANGUAGE } from '../../config.json';

export type Locale = 'no' | 'nl' | 'en' | 'sk';

type Urls = {
  [locale in Locale]: {
    submitReport: string;
    profile: string;
    privacyPolicy: string;
    map: string;
    contributors: string;
    api: string;
    apiDocs: string;
    statistics: string;
  };
};

const localeAwareUrls: Urls = {
  no: {
    submitReport: '/',
    profile: '/helsetilstand',
    privacyPolicy: '/personvern',
    map: '/kart',
    contributors: '/frivillige',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistikk'
  },
  nl: {
    submitReport: '/',
    profile: '/melding',
    privacyPolicy: '/privacy-policy',
    map: '/kaart',
    contributors: '/bijdragers',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistieken'
  },
  en: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics'
  },
  sk: {
    submitReport: '/',
    profile: '/zdravotny-stav',
    privacyPolicy: '/ochrana-udajov',
    map: '/mapa',
    contributors: '/prispievatelia',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistiky'
  }
};

export const urls = localeAwareUrls[LANGUAGE as Locale];
