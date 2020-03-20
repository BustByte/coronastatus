import {
  getAggregated,
  getAggregatedPostalCode
} from './openAPI/aggregated.swagger';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '0.0.1',
    title: 'coronastatus.no API',
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
      url: 'http://localhost:7272/api',
      description: 'Local server'
    },
    {
      url: 'https://dev.coronastatus.no/api',
      description: 'DEV Env'
    },
    {
      url: 'https://coronastatus.no/api',
      description: 'Production environment'
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
    }
  }
};
