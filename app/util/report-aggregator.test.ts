import { aggregateCovidReports } from './report-aggregator';
import {
  CovidReport,
  Sex,
  TestResult,
  Symptom,
  AggregatedCovidReportData
} from '../domain/types';

const reports: CovidReport[] = [
  {
    yearOfBirth: '1993', // Deprecated
    sex: Sex.MALE,
    postalCode: '1234',
    hasBeenTested: false,
    testedAt: new Date(), // Not in use
    symptomStart: '2020-03-02', // YYYY-MM-DD
    testResult: TestResult.POSITIVE,
    inQuarantine: true,
    hasBeenAbroadLastTwoWeeks: true,
    symptoms: {
      [Symptom.DRY_COUGH]: true,
      [Symptom.EXHAUSTION]: false,
      [Symptom.FEVER]: false,
      [Symptom.HEAVY_BREATHING]: false,
      [Symptom.MUSCLE_ACHING]: false,
      [Symptom.DIARRHEA]: false,
      [Symptom.HEADACHE]: false,
      [Symptom.SORE_THROAT]: false
    },
    submissionTimestamp: 123123123,
    age: '50'
  },
  {
    yearOfBirth: '1993', // Deprecated
    sex: Sex.MALE,
    postalCode: '1234',
    hasBeenTested: false,
    testedAt: new Date(), // YYYY-MM-DD
    symptomStart: '2020-03-02', // YYYY-MM-DD
    testResult: undefined,
    inQuarantine: false,
    hasBeenAbroadLastTwoWeeks: false,
    symptoms: {
      [Symptom.DRY_COUGH]: true,
      [Symptom.EXHAUSTION]: true,
      [Symptom.FEVER]: true,
      [Symptom.HEAVY_BREATHING]: false,
      [Symptom.MUSCLE_ACHING]: false,
      [Symptom.DIARRHEA]: false,
      [Symptom.HEADACHE]: false,
      [Symptom.SORE_THROAT]: false
    },
    submissionTimestamp: 123123123,
    age: '50'
  },
  {
    yearOfBirth: '1993', // Deprecated
    sex: Sex.MALE,
    postalCode: '1234',
    hasBeenTested: false,
    testedAt: new Date(), // YYYY-MM-DD
    symptomStart: '2020-03-02', // YYYY-MM-DD
    testResult: TestResult.PENDING,
    inQuarantine: false,
    hasBeenAbroadLastTwoWeeks: false,
    symptoms: {
      [Symptom.DRY_COUGH]: false,
      [Symptom.EXHAUSTION]: false,
      [Symptom.FEVER]: false,
      [Symptom.HEAVY_BREATHING]: false,
      [Symptom.MUSCLE_ACHING]: false,
      [Symptom.DIARRHEA]: false,
      [Symptom.HEADACHE]: false,
      [Symptom.SORE_THROAT]: false
    },
    submissionTimestamp: 123123123,
    age: '50'
  },
  {
    yearOfBirth: '1993', // Deprecated
    sex: Sex.MALE,
    postalCode: '1234',
    hasBeenTested: false,
    testedAt: new Date(), // YYYY-MM-DD
    symptomStart: '2020-03-02', // YYYY-MM-DD
    testResult: TestResult.NEGATIVE,
    inQuarantine: false,
    hasBeenAbroadLastTwoWeeks: false,
    symptoms: {
      [Symptom.DRY_COUGH]: true,
      [Symptom.EXHAUSTION]: false,
      [Symptom.FEVER]: false,
      [Symptom.HEAVY_BREATHING]: false,
      [Symptom.MUSCLE_ACHING]: false,
      [Symptom.DIARRHEA]: false,
      [Symptom.HEADACHE]: false,
      [Symptom.SORE_THROAT]: false
    },
    submissionTimestamp: 123123123,
    age: '50'
  }
];

it('should count all correctly', () => {
  const aggregated: AggregatedCovidReportData = aggregateCovidReports(reports);

  expect(aggregated.numberOfReports).toBe(4);
  expect(aggregated.numberOfPeopleShowingSymptoms).toBe(3);
  expect(aggregated.numberOfConfirmedInfected).toBe(1);
  expect(aggregated.numberOfTested).toBe(3);
});
