import {
  CovidReport,
  AggregatedCovidReportData,
  TestResult
} from '../domain/types';

const isShowingAtLeastOneSymptom = (report: CovidReport): boolean => {
  return Object.values(report.symptoms).filter(value => !!value).length > 0;
};

export const aggregateCovidReports = (
  reports: CovidReport[]
): AggregatedCovidReportData => {
  const aggredatedData: AggregatedCovidReportData = {
    numberOfReports: 0,
    numberOfPeopleShowingSymptoms: 0,
    numberOfConfirmedInfected: 0,
    numberOfTested: 0
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
  }
  return aggredatedData;
};
