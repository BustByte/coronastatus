import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.org.ua',
  COUNTRY_CODE: 'ua',
  DB_PATH: './covid_db',
  LOCALE: 'uk-UA',
  MAP_CENTER: {
    lat: 48.38,
    lon: 31.17
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 5,
  PASSCODE_LENGTH: 4,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['uk-UA'],
  THOUSAND_SEPARATOR: ' ',
  ZIP_GUIDE: true,
  ZIP_PATTERN: '[A-Za-z0-9-]{5}',
  ZIP_PLACEHOLDER: '01001'
};
