export interface CovidReport {
  yearOfBirth?: string; // Deprecated
  sex: Sex;
  postalCode: string;
  hasBeenTested: boolean;
  testedAt?: Date; // YYYY-MM-DD
  symptomStart?: string; // YYYY-MM-DD
  testResult?: TestResult;
  inQuarantine?: boolean;
  hasBeenAbroadLastTwoWeeks: boolean;
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
  SORE_THROAT = 'SORE_THROAT'
}
