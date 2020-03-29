import { Config } from './domain/types';

let config = {};
try {
  /* eslint-disable-next-line */
  config = require('../config.json');
} catch (err) {
  console.log('No config file found....fallback to env/defaults');
}

/**
 * The values in this file are just fallback values, in case someone forgets to update
 * the config in production when new config fields are added.
 * This file should not be modified, only add new fallback values when a new config
 * field is added
 * */
const fallbackConfig: Config = {
  BASE_URL: process.env.BASE_URL || 'coronastatus.no',
  LANGUAGE: process.env.LANGUAGE || 'no',
  COUNTRY: process.env.COUNTRY || 'Norway',
  MAP_CENTER: process.env.MAP_CENTER || '10.7522, 63.9139',
  MAP_ZOOM: parseInt(process.env.MAP_ZOOM || '4', 10),
  MAP_MAX_ZOOM: parseInt(process.env.MAP_MAX_ZOOM || '13', 10),
  TWITTER: process.env.TWITTER || 'coronastatusNO',
  ZIP_LENGTH: parseInt(process.env.ZIP_LENGTH || '4', 10),
  ZIP_PLACEHOLDER: process.env.ZIP_PLACEHOLDER || '1234',
  ZIP_GUIDE: process.env.ZIP_GUIDE === 'true' || false,
  REDIRECT_TO_GOVERNMENT:
    process.env.REDIRECT_TO_GOVERNMENT === 'true' || false,
  PASSCODE_LENGTH: parseInt(process.env.PASSCODE_LENGTH || '3', 10),
  DB_PATH: process.env.DB_PATH || './covid_db'
};

export default {
  ...fallbackConfig,
  ...config
};
