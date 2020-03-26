import config from '../config.json';
import { Config } from './domain/types';

/**
 * The values in this file are just fallback values, in case someone forgets to update
 * the config in production when new config fields are added.
 * This file should not be modified, only add new fallback values when a new config
 * field is added
 * */
const fallbackConfig: Config = {
  BASE_URL: 'coronastatus.no',
  LANGUAGE: 'no',
  COUNTRY: 'Norway',
  MAP_CENTER: '10.7522, 63.9139',
  MAP_ZOOM: 4,
  TWITTER: 'coronastatusNO',
  ZIP_LENGTH: 4,
  ZIP_PLACEHOLDER: '1234',
  REDIRECT_TO_GOVERNMENT: false,
  PASSCODE_LENGTH: 3,
  DB_PATH: './covid_db'
};

export default {
  ...fallbackConfig,
  ...config
};
