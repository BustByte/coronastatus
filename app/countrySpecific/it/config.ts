import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.it',
  COUNTRY_CODE: 'it',
  DB_PATH: './covid_db',
  LOCALE: 'it',
  MAP_CENTER: {
    lat: 42.75,
    lon: 11.45
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 5,
  PASSCODE_LENGTH: 4,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['it'],
  THOUSAND_SEPARATOR: '.',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[a-zA-Z0-9-]{5}',
  ZIP_PLACEHOLDER: '12345'
};
