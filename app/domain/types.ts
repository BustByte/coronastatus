export interface CovidReport {
  phoneNumber: string;
  yearOfBirth: string;
  sex: Sex;
  postalCode: string;
  hasBeenTested: boolean;
  testedAt?: Date; // YYYY-MM-DD
  symptomStart?: string; // YYYY-MM-DD
  testResult?: TestResult;
  hasBeenAbroadLastTwoWeeks: boolean;
  symptoms: { [key in Symptom]: boolean };
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
