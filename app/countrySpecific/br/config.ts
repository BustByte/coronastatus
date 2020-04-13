import { Config } from '../../domain/types';

export const countrySpecificConfig: Config = {
  BASE_URL: 'coronastatus.net.br',
  COUNTRY_CODE: 'br',
  DB_PATH: './covid_db',
  LOCALE: 'pt-BR',
  MAP_CENTER: {
    lat: -15.47,
    lon: -47.05
  },
  MAP_MAX_ZOOM: 13,
  MAP_ZOOM: 4,
  PASSCODE_LENGTH: 3,
  RATE_LIMIT_COUNT: 20, // Maximum number of submissions per IP
  RATE_LIMIT_WINDOW: 86400000, // Time window in milliseconds for rate limiting
  REDIRECT_TO_GOVERNMENT: false,
  SUPPORTED_LOCALES: ['pt-BR'],
  THOUSAND_SEPARATOR: '.',
  ZIP_GUIDE: false,
  ZIP_PATTERN: '[0-9]{5}-[0-9]{3}',
  ZIP_PLACEHOLDER: '00000-000'
};
