import { CountrySpecificTexts } from 'app/domain/types';

export const countrySpecificTexts: CountrySpecificTexts = {
  CONTACT_EMAIL: 'kontakt@coronastatus.sk', // Use kontakt@bustbyte.no if you don't have another one to use
  COUNTRY_NAME: 'Slovensku',
  FIND_ZIP_CODE_URL: 'https://psc.posta.sk', // Only required if ZIP_GUIDE is true in config.json
  LINK_TO_NATIONAL_HEALTH_SERVICES: 'www.uvzsr.sk', // If you don't know where to link, use https://who.int
  TWITTER_NAME: 'coronastatusSK' // Remove this line if you don't have set up a Twitter account
};
