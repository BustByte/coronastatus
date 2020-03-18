export interface CovidReport {
  yearOfBirth?: string; // Deprecated
  sex: Sex;
  postalCode: string;
  hasBeenTested: boolean;
  hasBeenInContactWithInfected: boolean;
  testedAt?: Date; // YYYY-MM-DD
  symptomStart?: string; // YYYY-MM-DD
  testResult?: TestResult;
  symptoms: Symptoms;
  submissionTimestamp: number;
  age: string;
}

export type Symptoms = {
  [key in Symptom]: boolean;
};

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
  NO_SMELL = 'NO_SMELL',
  SLIME_COUGH = 'SLIME_COUGH',
  RUNNY_NOSE = 'RUNNY_NOSE'
}

export interface AggregatedCovidReportData {
  numberOfReports: number;
  numberOfPeopleShowingSymptoms: number;
  numberOfConfirmedInfected: number;
  numberOfTested: number;
}

export interface SymptomStats {
  labels: string[];
  values: number[];
}

export interface DateStat {
  x: Date;
  y: number;
}

export interface InContactWithInfectedStat {
  numberOfPeopleShowingSymptoms: number;
  numberOfPeopleWithoutSymptoms: number;
  total: number;
}

export interface TotalReportsStats {
  numberOfReportsStat: DateStat[];
  numberOfReportsWithSymptomsStat: DateStat[];
}

export interface InfectedAndInContactStats {
  numberOfInfectedStat: DateStat[];
  numberOfInContactStat: DateStat[];
}

export type TestResultStats = {
  [key in TestResult]: number;
};

export type PostalCode = string;

export interface Coordinate {
  lat: string;
  lon: string;
}
export interface Municipality {
  name: string;
  population: string;
  postalcodes: PostalCode[];
  coordinates: Coordinate;
}
