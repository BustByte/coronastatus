import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'corona-status.in',
  COUNTRY_CODE: 'in',
  DB_PATH: './covid_db',
  LOCALE: 'en-IN',
  MAP_CENTER: {
    lat: 20.77,
    lon: 73.71
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 4,
  PASSCODE_LENGTH: 4,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['en-IN'],
  THOUSAND_SEPARATOR: ',',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[a-zA-Z0-9-]{6}',
  ZIP_PLACEHOLDER: '400001'
};
