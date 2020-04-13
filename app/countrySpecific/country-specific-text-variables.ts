/* eslint-disable global-require, import/no-dynamic-require */
import { CountrySpecificTexts } from '../domain/types';
import { CountryCode } from '../domain/urls';

export const getCountrySpecificTextVariables = (
  countryCode: CountryCode
): CountrySpecificTexts => {
  try {
    const { countrySpecificTexts } = require(`./${countryCode}/text-variables`);
    return countrySpecificTexts;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Could not find country specific text variables for ${countryCode}`
    );
  }
};
