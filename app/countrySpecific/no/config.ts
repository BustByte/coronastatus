import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.no',
  COUNTRY_CODE: 'no',
  DB_PATH: './covid_db',
  LOCALE: 'no',
  MAP_CENTER: {
    lat: 63.91,
    lon: 10.75
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 4,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: true,
  SUPPORTED_LOCALES: ['no', 'en'],
  THOUSAND_SEPARATOR: ' ',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[0-9]{4}',
  ZIP_PLACEHOLDER: '1234'
};
