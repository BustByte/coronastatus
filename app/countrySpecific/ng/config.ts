import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.ng',
  COUNTRY_CODE: 'ng',
  DB_PATH: './covid_db',
  LOCALE: 'en-NG',
  MAP_CENTER: '9.077751, 8.6774567', // NB! Lat/lng is opposite of what you find on Google Maps
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 6,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['en-NG'],
  THOUSAND_SEPARATOR: ',',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[a-zA-Z0-9-]{6}',
  ZIP_PLACEHOLDER: '123456'
};
