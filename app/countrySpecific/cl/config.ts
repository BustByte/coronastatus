import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.cl',
  COUNTRY_CODE: 'cl',
  DB_PATH: './covid_db',
  LOCALE: 'es-CL',
  MAP_CENTER: {
    lat: -33.47,
    lon: -70.64
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 4,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['es-CL', 'en-US'],
  THOUSAND_SEPARATOR: '.',
  ZIP_GUIDE: true,
  ZIP_PATTERN: '[A-Za-z0-9]{7}',
  ZIP_PLACEHOLDER: '8320000'
};
