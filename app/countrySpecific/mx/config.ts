import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.mx',
  COUNTRY_CODE: 'mx',
  DB_PATH: './covid_db',
  LOCALE: 'es-MX',
  MAP_CENTER: {
    lat: 27.08,
    lon: -100.48
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 4,
  PASSCODE_LENGTH: 4,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['es-MX'],
  THOUSAND_SEPARATOR: ',',
  ZIP_GUIDE: true,
  ZIP_PATTERN: '[a-zA-Z0-9-]{5}',
  ZIP_PLACEHOLDER: '12345'
};
