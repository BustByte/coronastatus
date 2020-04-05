// Please keep locales sorted
export type Locale =
  | 'bd'
  | 'cs-CZ'
  | 'de-DE'
  | 'dk'
  | 'en'
  | 'en-AU'
  | 'en-CA'
  | 'en-IN'
  | 'en-MT'
  | 'en-MY'
  | 'en-NE'
  | 'en-NG'
  | 'en-PH'
  | 'en-SG'
  | 'en-US'
  | 'es-AR'
  | 'es-CL'
  | 'es-CO'
  | 'es-ES'
  | 'es-MX'
  | 'fr-FR'
  | 'id-ID'
  | 'it'
  | 'lt'
  | 'ms-MY'
  | 'ne'
  | 'nl'
  | 'no'
  | 'pt-BR'
  | 'pt-PT'
  | 'ro-RO'
  | 'se'
  | 'sk'
  | 'tr'
  | 'uk-UA'
  | 'zh-MY';

type LocaleToFlagMap = {
  [locale in Locale]: string;
};

export const localeToFlagMap: LocaleToFlagMap = {
  bd: 'bd',
  'cs-CZ': 'cz',
  'de-DE': 'de',
  dk: 'dk',
  en: 'gb',
  'en-AU': 'au',
  'en-CA': 'ca',
  'en-IN': 'gb',
  'en-MT': 'gb',
  'en-MY': 'gb',
  'en-NE': 'us',
  'en-NG': 'ng',
  'en-PH': 'ph',
  'en-SG': 'gb',
  'en-US': 'us',
  'es-AR': 'ar',
  'es-CL': 'cl',
  'es-CO': 'co',
  'es-ES': 'es',
  'es-MX': 'mx',
  'fr-FR': 'fr',
  'id-ID': 'id',
  it: 'it',
  lt: 'lt',
  'ms-MY': 'my',
  ne: 'np',
  nl: 'nl',
  no: 'no',
  'pt-BR': 'br',
  'pt-PT': 'pt',
  'ro-RO': 'ro',
  se: 'se',
  sk: 'sk',
  tr: 'tr',
  'uk-UA': 'ua',
  'zh-MY': 'cn'
};

export const localeToFlag = (locale: Locale): string => localeToFlagMap[locale];
