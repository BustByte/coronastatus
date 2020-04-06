import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.us',
  COUNTRY_CODE: 'us',
  DB_PATH: './covid_db',
  LOCALE: 'en-US',
  MAP_CENTER: {
    lat: 36.21,
    lon: -113.68
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 3,
  PASSCODE_LENGTH: 4,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['en-US'],
  THOUSAND_SEPARATOR: ',',
  ZIP_GUIDE: true,
  ZIP_PATTERN: '[a-zA-Z0-9-]{5}',
  ZIP_PLACEHOLDER: '12345'
};
