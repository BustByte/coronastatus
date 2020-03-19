import {
  CovidReport,
  AggregatedCovidReportData,
  TestResult
} from '../domain/types';

export const isShowingAtLeastOneSymptom = (report: CovidReport): boolean => {
  return Object.values(report.symptoms).includes(true);
};

export const aggregateCovidReports = (
  reports: CovidReport[]
): AggregatedCovidReportData => {
  const aggredatedData: AggregatedCovidReportData = {
    numberOfReports: 0,
    numberOfPeopleShowingSymptoms: 0,
    numberOfConfirmedInfected: 0,
    numberOfTested: 0,
    numberOfContacts: 0
  };
  for (const report of reports) {
    aggredatedData.numberOfReports += 1;
    if (isShowingAtLeastOneSymptom(report)) {
      aggredatedData.numberOfPeopleShowingSymptoms += 1;
    }
    if (report.testResult) {
      aggredatedData.numberOfTested += 1;
    }
    if (report.testResult === TestResult.POSITIVE) {
      aggredatedData.numberOfConfirmedInfected += 1;
    }
    if (report.hasBeenInContactWithInfected) {
      aggredatedData.numberOfContacts += 1;
    }
  }
  return aggredatedData;
};
