export const getAggregated = {
  tags: ['Aggregated'],
  description: 'Returns an aggregated report of the current covid-19 reports',
  operationId: 'getAggregated',
  version: '0.0.1',
  responses: {
    '200': {
      description: 'Aggregated report',
      content: {
        'application/json': {
          schema: {
            numberOfReports: {
              type: 'number',
              description: 'Total number of reports'
            },
            numberOfPeopleShowingSymptoms: {
              type: 'number',
              description: 'Number of reports with symptoms'
            },
            numberOfConfirmedInfected: {
              type: 'number',
              description: 'Number of reports with a confirmed infection'
            },
            numberOfTested: {
              type: 'number',
              description: 'Number of reports that have been tested'
            }
          }
        }
      }
    }
  }
};

export const getAggregatedPostalCode = {
  tags: ['Aggregated'],
  description:
    'Returns an aggregated report of the current covid-19 reports of the given postal code',
  operationId: 'getAggregatedPostalCode',
  version: '0.0.1',
  parameters: [
    {
      name: 'postalCode',
      in: 'path',
      description: 'The postal code to aggregate rersults for',
      required: true,
      schema: {
        type: 'string',
        format: 'd{4}'
      }
    }
  ],
  responses: {
    '200': {
      description: 'Aggregated report for postal code (zip code)',
      content: {
        'application/json': {
          schema: {
            numberOfReports: {
              type: 'number',
              description: 'Total number of reports'
            },
            numberOfPeopleShowingSymptoms: {
              type: 'number',
              description: 'Number of reports with symptoms'
            },
            numberOfConfirmedInfected: {
              type: 'number',
              description: 'Number of reports with a confirmed infection'
            },
            numberOfTested: {
              type: 'number',
              description: 'Number of reports that have been tested'
            }
          }
        }
      }
    },
    '403': {
      description: 'Not enough data in the requested postal code.',
      content: {
        'application/json': {
          schema: {
            message: {
              type: 'string',
              description: 'Error message'
            }
          }
        }
      }
    }
  }
};
