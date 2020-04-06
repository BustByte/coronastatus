import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.co',
  COUNTRY_CODE: 'co',
  DB_PATH: './covid_db',
  LOCALE: 'es-CO',
  MAP_CENTER: {
    lat: 5.05,
    lon: -73.57
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 5,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['es-CO'],
  THOUSAND_SEPARATOR: '.',
  ZIP_GUIDE: true,
  ZIP_PATTERN: '[a-zA-Z0-9-]{6}',
  ZIP_PLACEHOLDER: '123456'
};
