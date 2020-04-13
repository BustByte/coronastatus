import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatusbd.com',
  COUNTRY_CODE: 'bd',
  DB_PATH: './covid_db',
  LOCALE: 'bd',
  MAP_CENTER: {
    lat: 23.98,
    lon: 90.01
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 5,
  PASSCODE_LENGTH: 4,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['bd', 'en'],
  THOUSAND_SEPARATOR: ',',
  ZIP_GUIDE: true,
  ZIP_PATTERN: '[A-Z0-9a-Z+]{2,10}',
  ZIP_PLACEHOLDER: '??????'
};
