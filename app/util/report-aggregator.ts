import {
  CovidReport,
  AggregatedCovidReportData,
  AggregatedCovidReportWithPostalCodeData,
  TestResult
} from '../domain/types';
import { MunicipalityRepository } from '../repository/MunicipalityRepository';
import { NotEnoughReportsError } from '../domain/errors';

const municipalityRepository = new MunicipalityRepository();

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

export const aggregateCovidReportsForPostalCode = (
  reports: CovidReport[],
  postalCode: string
): AggregatedCovidReportWithPostalCodeData => {
  const aggredatedData: AggregatedCovidReportWithPostalCodeData = {
    municipality: undefined,
    postalCode,
    numberOfReports: 0,
    numberOfPeopleShowingSymptoms: 0,
    numberOfConfirmedInfected: 0,
    numberOfTested: 0
  };

  aggredatedData.municipality = municipalityRepository.getMunicipalityForPostalCode(
    postalCode
  )?.name;

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
  if (aggredatedData.numberOfReports >= 3) {
    return aggredatedData;
  }
  throw new NotEnoughReportsError('Not enough data in the given postal code');
};
