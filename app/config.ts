import config from '../config.json';
import { Config } from './domain/types';

export const {
  BASE_URL = 'coronastatus.no',
  LANGUAGE = 'no',
  COUNTRY = 'Norway',
  MAP_CENTER = '10.7522, 63.9139',
  MAP_ZOOM = 4,
  TWITTER = 'coronastatusNO',
  ZIP_LENGTH = 4,
  ZIP_PLACEHOLDER = '1234',
  REDIRECT_TO_GOVERNMENT = false,
  PASSCODE_LENGTH = 3
}: Config = config;
