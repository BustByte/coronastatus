import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.lt',
  COUNTRY_CODE: 'lt',
  DB_PATH: './covid_db',
  LOCALE: 'lt',
  MAP_CENTER: '55.1735998, 23.8948016', // NB! Lat/lng is opposite of what you find on Google Maps
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 4,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['lt'],
  THOUSAND_SEPARATOR: ' ',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[0-9]{5}',
  ZIP_PLACEHOLDER: '12345'
};
