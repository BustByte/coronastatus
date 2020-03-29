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
    symptomStart: '2020-03-02', // YYYY-MM-DD
    testResult: TestResult.POSITIVE,
    hasBeenInContactWithInfected: false,
    symptoms: {
      [Symptom.DRY_COUGH]: true,
      [Symptom.EXHAUSTION]: false,
      [Symptom.FEVER]: false,
      [Symptom.HEAVY_BREATHING]: false,
      [Symptom.MUSCLE_ACHING]: false,
      [Symptom.DIARRHEA]: false,
      [Symptom.HEADACHE]: false,
      [Symptom.SORE_THROAT]: false,
      [Symptom.NO_TASTE]: false,
      [Symptom.NO_SMELL]: false,
      [Symptom.SLIME_COUGH]: false,
      [Symptom.RUNNY_NOSE]: false,
      [Symptom.NAUSEA_OR_VOMITING]: false
    },
    submissionTimestamp: 123123123,
    age: '50'
  },
  {
    yearOfBirth: '1993', // Deprecated
    sex: Sex.MALE,
    postalCode: '1234',
    hasBeenTested: false,
    symptomStart: '2020-03-02', // YYYY-MM-DD
    testResult: undefined,
    hasBeenInContactWithInfected: false,
    symptoms: {
      [Symptom.DRY_COUGH]: true,
      [Symptom.EXHAUSTION]: true,
      [Symptom.FEVER]: true,
      [Symptom.HEAVY_BREATHING]: false,
      [Symptom.MUSCLE_ACHING]: false,
      [Symptom.DIARRHEA]: false,
      [Symptom.HEADACHE]: false,
      [Symptom.SORE_THROAT]: false,
      [Symptom.NO_TASTE]: false,
      [Symptom.NO_SMELL]: false,
      [Symptom.SLIME_COUGH]: false,
      [Symptom.RUNNY_NOSE]: false,
      [Symptom.NAUSEA_OR_VOMITING]: false
    },
    submissionTimestamp: 123123123,
    age: '50'
  },
  {
    yearOfBirth: '1993', // Deprecated
    sex: Sex.MALE,
    postalCode: '1234',
    hasBeenTested: false,
    symptomStart: '2020-03-02', // YYYY-MM-DD
    testResult: TestResult.PENDING,
    hasBeenInContactWithInfected: false,
    symptoms: {
      [Symptom.DRY_COUGH]: false,
      [Symptom.EXHAUSTION]: false,
      [Symptom.FEVER]: false,
      [Symptom.HEAVY_BREATHING]: false,
      [Symptom.MUSCLE_ACHING]: false,
      [Symptom.DIARRHEA]: false,
      [Symptom.HEADACHE]: false,
      [Symptom.SORE_THROAT]: false,
      [Symptom.NO_TASTE]: false,
      [Symptom.NO_SMELL]: false,
      [Symptom.SLIME_COUGH]: false,
      [Symptom.RUNNY_NOSE]: false,
      [Symptom.NAUSEA_OR_VOMITING]: false
    },
    submissionTimestamp: 123123123,
    age: '50'
  },
  {
    yearOfBirth: '1993', // Deprecated
    sex: Sex.MALE,
    postalCode: '1234',
    hasBeenTested: false,
    symptomStart: '2020-03-02', // YYYY-MM-DD
    testResult: TestResult.NEGATIVE,
    hasBeenInContactWithInfected: false,
    symptoms: {
      [Symptom.DRY_COUGH]: true,
      [Symptom.EXHAUSTION]: false,
      [Symptom.FEVER]: false,
      [Symptom.HEAVY_BREATHING]: false,
      [Symptom.MUSCLE_ACHING]: false,
      [Symptom.DIARRHEA]: false,
      [Symptom.HEADACHE]: false,
      [Symptom.SORE_THROAT]: false,
      [Symptom.NO_TASTE]: false,
      [Symptom.NO_SMELL]: false,
      [Symptom.SLIME_COUGH]: false,
      [Symptom.RUNNY_NOSE]: false,
      [Symptom.NAUSEA_OR_VOMITING]: false
    },
    submissionTimestamp: 123123123,
    age: '50'
  }
];

/* eslint-disable no-undef */
it('should count all correctly', () => {
  const aggregated: AggregatedCovidReportData = aggregateCovidReports(reports);

  expect(aggregated.numberOfReports).toBe(4);
  expect(aggregated.numberOfPeopleShowingSymptoms).toBe(3);
  expect(aggregated.numberOfConfirmedInfected).toBe(1);
  expect(aggregated.numberOfTested).toBe(3);
});
