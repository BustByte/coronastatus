import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatusmy.org',
  COUNTRY_CODE: 'my',
  DB_PATH: './covid_db',
  LOCALE: 'ms-MY',
  MAP_CENTER: '101.9757, 4.2104', // NB! Lat/lng is opposite of what you find on Google Maps
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 4,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['ms-MY', 'zh-MY', 'en-MY'],
  THOUSAND_SEPARATOR: '.',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[0-9]{5}',
  ZIP_PLACEHOLDER: '79000'
};
