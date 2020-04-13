import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatusnp.com',
  COUNTRY_CODE: 'np',
  DB_PATH: './covid_db',
  LOCALE: 'ne',
  MAP_CENTER: {
    lat: 27.71,
    lon: 85.29
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 4,
  PASSCODE_LENGTH: 4,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['ne', 'en-NE'],
  THOUSAND_SEPARATOR: ' ',
  ZIP_GUIDE: true,
  ZIP_PATTERN: '[A-Za-z0-9]{5}',
  ZIP_PLACEHOLDER: '44600'
};
