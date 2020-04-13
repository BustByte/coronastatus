import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.es',
  COUNTRY_CODE: 'es',
  DB_PATH: './covid_db',
  LOCALE: 'es-ES',
  MAP_CENTER: {
    lat: 40.12,
    lon: -8.2
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 5,
  PASSCODE_LENGTH: 4,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['es-ES', 'pt-PT'],
  THOUSAND_SEPARATOR: '.',
  ZIP_GUIDE: true,
  ZIP_PATTERN: '[a-zA-Z0-9-]{5}',
  ZIP_PLACEHOLDER: '12345'
};
