import {
  getAggregated,
  getAggregatedPostalCode
} from './openAPI/aggregated.swagger';
import config from './config';
import { countryCodeToUrls } from './domain/urls';
import { getReports, getReportsCsv } from './openAPI/reports.swagger';

const urls = countryCodeToUrls(config.COUNTRY_CODE);

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '0.0.1',
    title: 'Coronastatus API',
    description:
      'This API queries the COVID-19 health status reports submitted by users',
    termsOfService: '',
    contact: {
      name: 'BustByte',
      email: 'kontakt@bustbyte.no',
      url: 'https://github.com/BustByte/coronastatus.no'
    },
    license: {
      name: 'MIT License',
      url: 'https://github.com/BustByte/coronastatus.no/blob/master/LICENSE'
    }
  },
  servers: [
    {
      url: `https://${config.BASE_URL}${urls.api}`,
      description: 'Production environment'
    },
    {
      url: `http://localhost:7272${urls.api}`,
      description: 'Local server'
    }
  ],
  tags: [
    {
      name: 'Aggregated'
    }
  ],
  paths: {
    '/aggregated': {
      get: getAggregated
    },
    '/aggregated/{postalCode}': {
      get: getAggregatedPostalCode
    },
    '/reports': {
      get: getReports
    },
    '/reports/reports.csv': {
      get: getReportsCsv
    }
  }
};
