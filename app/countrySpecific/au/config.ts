import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatusau.org',
  COUNTRY_CODE: 'au',
  DB_PATH: './covid_db',
  LOCALE: 'en-AU',
  MAP_CENTER: '133.77, -25.27', // NB! Lat/lng is opposite of what you find on Google Maps
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 4,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['en-AU'],
  THOUSAND_SEPARATOR: ',',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[a-zA-Z0-9-]{4}',
  ZIP_PLACEHOLDER: '2000'
};
