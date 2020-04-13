import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.sk',
  COUNTRY_CODE: 'sk',
  DB_PATH: './covid_db',
  LOCALE: 'sk',
  MAP_CENTER: {
    lat: 48.73,
    lon: 19.27
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 6,
  PASSCODE_LENGTH: 4,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['sk'],
  THOUSAND_SEPARATOR: ' ',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[0-9a-zA-Z]{5}',
  ZIP_PLACEHOLDER: '12345'
};
