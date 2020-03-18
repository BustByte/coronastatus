import {
  CovidReport,
  Symptom,
  Symptoms,
  TotalReportsStats,
  SymptomStats,
  DateStat,
  InContactWithInfectedStat,
  TestResult,
  InfectedAndInContactStats,
  TestResultStats
} from '../domain/types';

const symptomToLabelMap = {
  [Symptom.DRY_COUGH]: 'Tørrhoste',
  [Symptom.EXHAUSTION]: 'Slitenhet eller utmattelse',
  [Symptom.FEVER]: 'Feber',
  [Symptom.HEAVY_BREATHING]: 'Tung pust',
  [Symptom.MUSCLE_ACHING]: 'Muskelsmerter',
  [Symptom.DIARRHEA]: 'Diaré',
  [Symptom.HEADACHE]: 'Hodepine',
  [Symptom.SORE_THROAT]: 'Vondt i halsen',
  [Symptom.NO_TASTE]: 'Tap av smakssans',
  [Symptom.NO_SMELL]: 'Tap av luktesans',
  [Symptom.SLIME_COUGH]: 'Slimhoste',
  [Symptom.RUNNY_NOSE]: 'Tett eller rennende nese'
};

const symptomKeyToLabel = (symptomKey: Symptom): string =>
  symptomToLabelMap[symptomKey];

export function groupBySymptoms(reports: CovidReport[]): SymptomStats {
  const symptoms = reports.map(report => report.symptoms);
  const symptomStats = {
    [Symptom.DRY_COUGH]: 0,
    [Symptom.EXHAUSTION]: 0,
    [Symptom.FEVER]: 0,
    [Symptom.HEAVY_BREATHING]: 0,
    [Symptom.MUSCLE_ACHING]: 0,
    [Symptom.DIARRHEA]: 0,
    [Symptom.HEADACHE]: 0,
    [Symptom.SORE_THROAT]: 0,
    [Symptom.NO_TASTE]: 0,
    [Symptom.NO_SMELL]: 0,
    [Symptom.SLIME_COUGH]: 0,
    [Symptom.RUNNY_NOSE]: 0
  };
  symptoms.forEach(symptom => {
    const symptomKeys = Object.keys(symptom) as Symptom[];
    symptomKeys.forEach(key => {
      if (symptom[key]) {
        symptomStats[key] += 1;
      }
    });
  });
  return {
    labels: (Object.keys(symptomStats) as Symptom[]).map(symptomKeyToLabel),
    values: Object.values(symptomStats)
  };
}

const hasSymptoms = (symptoms: Symptoms): boolean =>
  (Object.keys(symptoms) as Symptom[]).some(key => !!symptoms[key]);

function addMissingTimestamps(reports: CovidReport[]): CovidReport[] {
  const missingTimestampRange = [1584284400000, 1584316799000];
  const reportsMissingTimestamp = reports.filter(
    report => !report.submissionTimestamp
  );
  const timeBetweenReports =
    (missingTimestampRange[1] - missingTimestampRange[0]) /
    reportsMissingTimestamp.length;
  let index = 0;
  return reports.map(report => {
    if (!report.submissionTimestamp) {
      index += 1;
      return {
        ...report,
        submissionTimestamp:
          missingTimestampRange[0] + index * timeBetweenReports
      };
    }
    return report;
  });
}

const toDateStat = (report: CovidReport, reportIndex: number): DateStat => ({
  x: new Date(report.submissionTimestamp),
  y: reportIndex
});

export function calculateTotalReportsStats(
  reports: CovidReport[],
  numberOfPoints = 100
): TotalReportsStats {
  const reportsSortedByTimestamp = addMissingTimestamps(reports).sort(
    (a, b) => a.submissionTimestamp - b.submissionTimestamp
  );
  const numberBetweenEachSample = Math.ceil(
    reportsSortedByTimestamp.length / numberOfPoints
  );

  const numberOfReportsStat = reportsSortedByTimestamp
    .map(toDateStat)
    .filter((_, i) => i % numberBetweenEachSample === 0);

  const numberOfReportsWithSymptomsStat = reportsSortedByTimestamp
    .filter(report => hasSymptoms(report.symptoms))
    .map(toDateStat)
    .filter((_, i) => i % numberBetweenEachSample === 0);

  return {
    numberOfReportsStat,
    numberOfReportsWithSymptomsStat
  };
}

export function getInContactWithInfectedStats(
  reports: CovidReport[]
): InContactWithInfectedStat {
  const inContactWithInfected = reports.filter(
    report => !!report.hasBeenInContactWithInfected
  );

  const numberOfPeopleShowingSymptoms = inContactWithInfected.filter(report =>
    hasSymptoms(report.symptoms)
  ).length;

  const numberOfPeopleWithoutSymptoms =
    inContactWithInfected.length - numberOfPeopleShowingSymptoms;

  return {
    numberOfPeopleShowingSymptoms,
    numberOfPeopleWithoutSymptoms,
    total: inContactWithInfected.length
  };
}

export function getInfectedAndContactStats(
  reports: CovidReport[]
): InfectedAndInContactStats {
  const reportsSortedByTimestamp = addMissingTimestamps(reports).sort(
    (a, b) => a.submissionTimestamp - b.submissionTimestamp
  );
  const numberOfInfectedStat = reportsSortedByTimestamp
    .filter(report => report.testResult === TestResult.POSITIVE)
    .map(toDateStat);
  const numberOfInContactStat = reportsSortedByTimestamp
    .filter(report => report.hasBeenInContactWithInfected)
    .map(toDateStat);

  return {
    numberOfInfectedStat,
    numberOfInContactStat
  };
}

export const getTestResultStats = (
  reports: CovidReport[]
): TestResultStats => ({
  [TestResult.POSITIVE]: reports.filter(
    report => report.testResult === TestResult.POSITIVE
  ).length,
  [TestResult.NEGATIVE]: reports.filter(
    report => report.testResult === TestResult.NEGATIVE
  ).length,
  [TestResult.PENDING]: reports.filter(
    report => report.testResult === TestResult.PENDING
  ).length
});
