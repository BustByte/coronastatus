export const getReports = {
  tags: ['Reports'],
  description: 'Returns a report',
  operationId: 'getReports',
  version: '0.0.1',
  responses: {
    '200': {
      description: 'Report',
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

export const getReportsCsv = {
  tags: ['Reports'],
  description: 'Returns all reports as a CSV file',
  operationId: 'getReports',
  version: '0.0.1',
  responses: {
    '200': {
      description: 'Report',
      content: {
        'text/csv': {
          schema: {}
        }
      }
    }
  }
};
