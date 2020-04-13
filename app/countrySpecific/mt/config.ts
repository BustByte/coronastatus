import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatusmt.com',
  COUNTRY_CODE: 'mt',
  DB_PATH: './covid_db',
  LOCALE: 'en-MT',
  MAP_CENTER: {
    lat: 35.94,
    lon: 14.36
  },
  MAP_MAX_ZOOM: 14,
  MAP_ZOOM: 10,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['en-MT'],
  THOUSAND_SEPARATOR: ',',
  ZIP_GUIDE: true,
  ZIP_PATTERN: '[A-Za-z]{2,3}',
  ZIP_PLACEHOLDER: 'Example: VLT (no numbers)'
};
