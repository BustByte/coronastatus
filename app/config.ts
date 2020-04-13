/* eslint-disable import/no-dynamic-require, global-require */
import { Config } from './domain/types';
import { CountryCode } from './domain/urls';
import { Locale } from './domain/flags';

/**
 * The following section adds support for overriding configs
 * */
const configOverrides: Partial<Config> = {};

if (process.env.BASE_URL) {
  configOverrides.BASE_URL = process.env.BASE_URL;
}
if (process.env.COUNTRY_CODE) {
  configOverrides.COUNTRY_CODE = process.env.COUNTRY_CODE as CountryCode;
}
if (process.env.DB_PATH) {
  configOverrides.DB_PATH = process.env.DB_PATH;
}
if (process.env.LOCALE) {
  configOverrides.LOCALE = process.env.LOCALE as Locale;
}
if (process.env.MAP_MAX_ZOOM) {
  configOverrides.MAP_ZOOM = parseInt(process.env.MAP_MAX_ZOOM, 10);
}
if (process.env.MAP_ZOOM) {
  configOverrides.MAP_ZOOM = parseInt(process.env.MAP_ZOOM, 10);
}
if (process.env.PASSCODE_LENGTH) {
  configOverrides.PASSCODE_LENGTH = parseInt(process.env.PASSCODE_LENGTH, 10);
}
if (process.env.RATE_LIMIT_COUNT) {
  configOverrides.RATE_LIMIT_COUNT = parseInt(process.env.RATE_LIMIT_COUNT, 10);
}
if (process.env.RATE_LIMIT_WINDOW) {
  configOverrides.RATE_LIMIT_WINDOW = parseInt(
    process.env.RATE_LIMIT_WINDOW,
    10
  );
}
if (process.env.REDIRECT_TO_GOVERNMENT) {
  configOverrides.REDIRECT_TO_GOVERNMENT =
    process.env.REDIRECT_TO_GOVERNMENT === 'true';
}
if (process.env.SUPPORTED_LOCALES) {
  configOverrides.SUPPORTED_LOCALES = [process.env.LOCALE as Locale];
}
if (process.env.THOUSAND_SEPARATOR) {
  configOverrides.THOUSAND_SEPARATOR = process.env.THOUSAND_SEPARATOR;
}
if (process.env.ZIP_GUIDE) {
  configOverrides.ZIP_GUIDE = process.env.ZIP_GUIDE === 'true';
}
if (process.env.ZIP_PATTERN) {
  configOverrides.ZIP_PATTERN = process.env.ZIP_PATTERN;
}
if (process.env.ZIP_GUIDE) {
  configOverrides.ZIP_PLACEHOLDER = process.env.ZIP_PLACEHOLDER;
}

/**
 * Set up country config
 */
const getCountryCodeFromConfigOrEnv = (): CountryCode => {
  if (process.env.COUNTRY_CODE) {
    return process.env.COUNTRY_CODE as CountryCode;
  }
  const config = require('../config.json');
  if (config.COUNTRY_CODE) {
    return config.COUNTRY_CODE as CountryCode;
  }
  throw new Error('Missing COUNTRY_CODE in config.json');
};

const countryCode = getCountryCodeFromConfigOrEnv();
const {
  countrySpecificConfig
} = require(`./countrySpecific/${countryCode}/config`);

export default {
  ...countrySpecificConfig,
  ...configOverrides
} as Config;
