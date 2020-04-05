import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.co.uk',
  COUNTRY_CODE: 'en',
  DB_PATH: './covid_db',
  LOCALE: 'en',
  MAP_CENTER: '51.505485, -0.111218', // NB! Lat/lng is opposite of what you find on Google Maps
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 5,
  PASSCODE_LENGTH: 4,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['en', 'es-ES'],
  THOUSAND_SEPARATOR: ',',
  ZIP_GUIDE: true,
  ZIP_PATTERN: '[A-Z0-9 ]{5,8}',
  ZIP_PLACEHOLDER: 'A9A 9AA'
};
