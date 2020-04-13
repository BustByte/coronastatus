import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.ca',
  COUNTRY_CODE: 'ca',
  DB_PATH: './covid_db',
  LOCALE: 'en-CA',
  MAP_CENTER: {
    lat: 60.49,
    lon: -95.9
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 3,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['en-CA'],
  THOUSAND_SEPARATOR: ' ',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[A-Za-z0-9]{3}',
  ZIP_PLACEHOLDER: 'A1A'
};
