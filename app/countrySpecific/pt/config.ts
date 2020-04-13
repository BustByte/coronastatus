import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.pt',
  COUNTRY_CODE: 'pt',
  DB_PATH: './covid_db',
  LOCALE: 'pt-PT',
  MAP_CENTER: {
    lat: 38.78,
    lon: -9.41
  },
  MAP_MAX_ZOOM: 10,
  MAP_ZOOM: 4,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['pt-PT'],
  THOUSAND_SEPARATOR: ' ',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[0-9]{4}-[0-9]{3}',
  ZIP_PLACEHOLDER: '0000-000'
};
