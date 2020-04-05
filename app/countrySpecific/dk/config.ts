import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.dk',
  COUNTRY_CODE: 'dk',
  DB_PATH: './covid_db',
  LOCALE: 'dk',
  MAP_CENTER: '10.399100, 55.463329', // NB! Lat/lng is opposite of what you find on Google Maps
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 5,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['dk'],
  THOUSAND_SEPARATOR: '.',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[0-9]{4}',
  ZIP_PLACEHOLDER: '2100'
};
