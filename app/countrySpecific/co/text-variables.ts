import { CountrySpecificTexts } from 'app/domain/types';

export const countrySpecificTexts: CountrySpecificTexts = {
  CONTACT_EMAIL: 'kontakt@bustbyte.no', // Use kontakt@bustbyte.no if you don't have another one to use
  COUNTRY_NAME: 'Colombia',
  FIND_ZIP_CODE_URL: 'https://codigo-postal.co/colombia/', // Only required if ZIP_GUIDE is true in config.json
  LINK_TO_NATIONAL_HEALTH_SERVICES:
    'https://www.minsalud.gov.co/portada-covid-19.html', // If you don't know where to link, use https://who.int
  TWITTER_NAME: 'coronastatusCO' // Remove this line if you don't have set up a Twitter account
};
