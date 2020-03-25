import defaults from './config.example.json';
import app from './config.json';

const {
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
} = { ...defaults, ...app };

export default {
  BASE_URL,
  LANGUAGE,
  COUNTRY,
  MAP_CENTER,
  MAP_ZOOM,
  TWITTER,
  ZIP_LENGTH,
  ZIP_PLACEHOLDER,
  REDIRECT_TO_GOVERNMENT,
  PASSCODE_LENGTH
};
