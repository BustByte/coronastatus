import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.ro',
  COUNTRY_CODE: 'ro',
  DB_PATH: './covid_db',
  LOCALE: 'ro-RO',
  MAP_CENTER: '22.7775903,45.9199635', // NB! Lat/lng is opposite of what you find on Google Maps
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 6,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['ro-RO'],
  THOUSAND_SEPARATOR: ' ',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[0-9]{6}',
  ZIP_PLACEHOLDER: '123456'
};
