import { CountrySpecificTexts } from 'app/domain/types';

export const countrySpecificTexts: CountrySpecificTexts = {
  CONTACT_EMAIL: 'kontakt@bustbyte.no', // Use kontakt@bustbyte.no if you don't have another one to use
  COUNTRY_NAME: 'France',
  FIND_ZIP_CODE_URL: 'https://www.whatismyzip.com', // Only required if ZIP_GUIDE is true in config.json
  LINK_TO_NATIONAL_HEALTH_SERVICES:
    'https://www.gouvernement.fr/info-coronavirus', // If you don't know where to link, use https://who.int
  TWITTER_NAME: 'coronastatusFR' // Remove this line if you don't have set up a Twitter account
};
