export interface CovidReport {
  yearOfBirth?: string; // Deprecated
  sex: Sex;
  postalCode: string;
  hasBeenTested: boolean;
  hasBeenInContactWithInfected: boolean;
  symptomStart?: string; // YYYY-MM-DD
  testResult?: TestResult;
  symptoms: Symptoms;
  submissionTimestamp: number;
  age: string;
  bodyTemperature?: string;
  smokingHabit?: SmokingHabit;
  isolationStatus?: IsolationStatus;
  diagnosedWithOtherConditions?: boolean;
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

export enum SmokingHabit {
  CURRENTLY = 'CURRENTLY',
  USED_TO = 'USED_TO',
  NEVER = 'NEVER'
}

export enum IsolationStatus {
  NOT_IN_ISOLATION = 'NOT_IN_ISOLATION',
  ISOLATION_DUE_TO_TRAVEL = 'ISOLATION_DUE_TO_TRAVEL',
  ISOLATION_DUE_TO_CONTACT = 'ISOLATION_DUE_TO_CONTACT'
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
  RUNNY_NOSE = 'RUNNY_NOSE',
  NAUSEA_OR_VOMITING = 'NAUSEA_OR_VOMITING'
}

export interface AggregatedCovidReportData {
  numberOfReports: number;
  numberOfPeopleShowingSymptoms: number;
  numberOfConfirmedInfected: number;
  numberOfTested: number;
  numberOfContacts: number;
}

export interface SymptomStat {
  symptom: Symptom;
  count: number;
}

export interface SymptomStats {
  symptoms: Symptom[];
  labels: string[];
  values: number[];
  total: number;
}

export interface DateStat {
  x: Date;
  y: number;
}

export interface InfectedStat {
  symptomStats: SymptomStats;
}

export interface InContactWithInfectedStat {
  numberOfPeopleShowingSymptoms: number;
  numberOfPeopleWithoutSymptoms: number;
  percentageWithTwoMostCommonSymptoms: string;
  percentageWithThreeMostCommonSymptoms: string;
  total: number;
}

export interface AllSymptomsStat {
  symptomStats: SymptomStats;
  percentageWithTwoMostCommonSymptoms: string;
  percentageWithThreeMostCommonSymptoms: string;
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
  lat: number;
  lon: number;
}

export interface Municipality {
  name: string;
  population: string;
  postalCodes?: PostalCode[];
}

export interface AggregatedCovidReportWithPostalCodeData {
  municipality: string | undefined;
  postalCode: string;
  numberOfReports: number;
  numberOfPeopleShowingSymptoms: number;
  numberOfConfirmedInfected: number;
  numberOfTested: number;
}

export interface Config {
  BASE_URL: string;
  LANGUAGE: string;
  COUNTRY: string;
  MAP_CENTER: string;
  MAP_ZOOM: number;
  TWITTER: string;
  ZIP_LENGTH: number;
  ZIP_PLACEHOLDER: string;
  ZIP_GUIDE: boolean;
  REDIRECT_TO_GOVERNMENT: boolean;
  PASSCODE_LENGTH: number;
  DB_PATH: string;
}

export type DatabaseType = 'pg' | 'sqlite';
