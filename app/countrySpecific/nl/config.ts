import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.nl',
  COUNTRY_CODE: 'nl',
  DB_PATH: './covid_db',
  LOCALE: 'nl',
  MAP_CENTER: {
    lat: 52.21,
    lon: 5.28
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 7,
  PASSCODE_LENGTH: 4,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['nl'],
  THOUSAND_SEPARATOR: '.',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[0-9]{4}',
  ZIP_PLACEHOLDER: '1234'
};
