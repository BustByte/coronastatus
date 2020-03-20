import {
  CovidReport,
  AggregatedCovidReportData,
  AggregatedCovidReportWithPostalCodeData,
  TestResult
} from '../domain/types';
import postalCodeCoordinates from './postalCodeCoordinates';
import postalCodeKommune from './postalCodeKommune';

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

export const aggregateCovidReportsForPostalCode = (
  reports: CovidReport[],
  postalCode: string
): AggregatedCovidReportWithPostalCodeData => {
  const aggredatedData: AggregatedCovidReportWithPostalCodeData = {
    poststed: '',
    koordinater: [],
    numberOfReports: 0,
    numberOfPeopleShowingSymptoms: 0,
    numberOfConfirmedInfected: 0,
    numberOfTested: 0
  };

  aggredatedData.poststed = postalCodeKommune(postalCode);
  aggredatedData.koordinater = postalCodeCoordinates(postalCode);

  for (const report of reports) {
    if (report.postalCode === postalCode) {
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
  }
  return aggredatedData;
};
