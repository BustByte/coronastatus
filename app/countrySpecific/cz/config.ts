import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'corona-status.cz',
  COUNTRY_CODE: 'cz',
  DB_PATH: './covid_db',
  LOCALE: 'cs-CZ',
  MAP_CENTER: {
    lat: 49.8,
    lon: 15.47
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 7,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['cs-CZ'],
  THOUSAND_SEPARATOR: ' ',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[0-9]{3} [0-9]{2}',
  ZIP_PLACEHOLDER: '12345'
};
