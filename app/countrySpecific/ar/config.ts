import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.com.ar',
  COUNTRY_CODE: 'ar',
  DB_PATH: './covid_db',
  LOCALE: 'es-AR',
  MAP_CENTER: {
    lat: -35.43,
    lon: -63.77
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 3,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['es-AR'],
  THOUSAND_SEPARATOR: '.',
  ZIP_GUIDE: true,
  ZIP_PATTERN: '[A-Za-z0-9-]{4}',
  ZIP_PLACEHOLDER: '1234'
};
