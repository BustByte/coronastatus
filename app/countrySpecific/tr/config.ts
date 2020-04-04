import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatustr.com',
  COUNTRY_CODE: 'tr',
  DB_PATH: './covid_db',
  LOCALE: 'tr',
  MAP_CENTER: '39.0100,30.6885', // NB! Lat/lng is opposite of what you find on Google Maps
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 4,
  PASSCODE_LENGTH: 4,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['tr'],
  THOUSAND_SEPARATOR: '.',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[0-9]{5}',
  ZIP_PLACEHOLDER: '34000'
};
