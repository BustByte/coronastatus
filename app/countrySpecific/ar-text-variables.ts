import { CountrySpecificTexts } from 'app/domain/types';

export const countrySpecificTexts: CountrySpecificTexts = {
  CONTACT_EMAIL: 'kontakt@bustbyte.no', // Use kontakt@bustbyte.no if you don't have another one to use
  COUNTRY_NAME: 'Argentina',
  FIND_ZIP_CODE_URL: 'https://www.correoargentino.com.ar/formularios/cpa', // Only required if ZIP_GUIDE is true in config.json
  LINK_TO_NATIONAL_HEALTH_SERVICES:
    'https://www.argentina.gob.ar/salud/coronavirus-COVID-19', // If you don't know where to link, use https://who.int
  TWITTER_NAME: 'coronastatusAR' // Remove this line if you don't have set up a Twitter account,
};
