import app from './config.json';

type Config = {
  BASE_URL: string;
  LANGUAGE: string;
  COUNTRY: string;
  MAP_CENTER: string;
  MAP_ZOOM: number;
  TWITTER: string;
  ZIP_LENGTH: number;
  ZIP_PLACEHOLDER: string;
  REDIRECT_TO_GOVERNMENT: boolean;
  PASSCODE_LENGTH: number;
};

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
}: Config = app;

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
