let config = {}
try {  
  config = require('../config.json');
} catch (err) {
  console.log('No config file found....fallback to env/defaults')
}
import { Config } from './domain/types';

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
  MAP_CENTER: process.env.BASE_URL || '10.7522, 63.9139',
  MAP_ZOOM: parseInt(process.env.MAP_ZOOM || '4'),
  TWITTER: process.env.TWITTER ||'coronastatusNO',
  ZIP_LENGTH: parseInt(process.env.ZIP_LENGTH || '4'),
  ZIP_PLACEHOLDER: process.env.ZIP_PLACEHOLDER || '1234',
  REDIRECT_TO_GOVERNMENT: process.env.REDIRECT_TO_GOVERNMENT === 'true' ||  false,
  PASSCODE_LENGTH: parseInt(process.env.PASSCODE_LENGTH || '3'),
  DB_PATH: process.env.BASE_DB_PATHURL || './covid_db'
};

export default {
  ...fallbackConfig,
  ...config
};
