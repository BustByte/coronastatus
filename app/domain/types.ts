export interface CovidReport {
  yearOfBirth?: string; // Deprecated
  sex: Sex;
  postalCode: string;
  hasBeenTested: boolean;
  hasBeenInContactWithInfected: boolean;
  testedAt?: Date; // YYYY-MM-DD
  symptomStart?: string; // YYYY-MM-DD
  testResult?: TestResult;
  symptoms: { [key in Symptom]: boolean };
  submissionTimestamp: number;
  age: string;
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum TestResult {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  PENDING = 'PENDING'
}

export enum Symptom {
  DRY_COUGH = 'DRY_COUGH',
  EXHAUSTION = 'EXHAUSTION',
  FEVER = 'FEVER',
  HEAVY_BREATHING = 'HEAVY_BREATHING',
  MUSCLE_ACHING = 'MUSCLE_ACHING',
  DIARRHEA = 'DIARRHEA',
  HEADACHE = 'HEADACHE',
  SORE_THROAT = 'SORE_THROAT',
  NO_TASTE = 'NO_TASTE',
  NO_SMELL = 'NO_SMELL'
}

export interface AggregatedCovidReportData {
  numberOfReports: number;
  numberOfPeopleShowingSymptoms: number;
  numberOfConfirmedInfected: number;
  numberOfTested: number;
}
