import {
  CovidReport,
  Symptom,
  Symptoms,
  TotalReportsStats,
  SymptomStat,
  SymptomStats,
  DateStat,
  InfectedStat,
  InContactWithInfectedStat,
  AllSymptomsStat,
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

const hasSymptoms = (symptoms: Symptoms): boolean =>
  (Object.keys(symptoms) as Symptom[]).some(key => !!symptoms[key]);

function compareSymptomStats(a: SymptomStat, b: SymptomStat): number {
  if (a.count > b.count) {
    return -1;
  }

  if (a.count < b.count) {
    return 1;
  }

  return 0;
}

export function groupBySymptoms(
  reports: CovidReport[],
  reportFilter: (report: CovidReport) => boolean = () => true
): SymptomStats {
  const symptoms = reports
    .filter(report => hasSymptoms(report.symptoms))
    .filter(reportFilter)
    .map(report => report.symptoms);

  const symptomStats: SymptomStat[] = [];

  symptoms.forEach(symptom => {
    const symptomKeys = Object.keys(symptom) as Symptom[];
    symptomKeys.forEach(key => {
      if (!symptom[key]) {
        return;
      }

      const found = symptomStats.find(
        symptomStat => symptomStat.symptom === key
      );

      if (!found) {
        symptomStats.push({
          symptom: key,
          count: 1
        });
      } else {
        found.count += 1;
      }
    });
  });

  // Fill in the rest of the symptoms that have count = 0.
  const allSymptoms = Object.keys(Symptom) as Symptom[];

  allSymptoms.forEach(symptom => {
    const found = symptomStats.find(
      symptomStat => symptomStat.symptom === symptom
    );

    if (!found) {
      symptomStats.push({
        symptom,
        count: 0
      });
    }
  });

  const symptomStatsSorted = symptomStats.sort(compareSymptomStats);

  return {
    symptoms: symptomStatsSorted.map(symptomStat => symptomStat.symptom),
    labels: symptomStatsSorted
      .map(symptomStat => symptomStat.symptom)
      .map(symptomKeyToLabel),
    values: symptomStatsSorted.map(symptomStat => symptomStat.count),
    total: symptoms.length
  };
}

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

// Calculates the percentage of reports with the given symptoms (AND operand).
export const getPercentageWithSymptomsOfTotal = (
  reports: CovidReport[],
  symptoms: Symptom[]
): string => {
  const filteredReports = reports.filter(report =>
    symptoms.reduce(
      (acc: boolean, symptom) => acc && report.symptoms[symptom],
      true
    )
  );
  return ((filteredReports.length / reports.length) * 100).toFixed(0);
};

export function getInfectedStats(reports: CovidReport[]): InfectedStat {
  const symptomStats = groupBySymptoms(
    reports,
    report => report.testResult === TestResult.POSITIVE
  );

  return {
    symptomStats
  };
}

export function getInContactWithInfectedStats(
  reports: CovidReport[],
  symptoms: Symptom[]
): InContactWithInfectedStat {
  const inContactWithInfected = reports.filter(
    report => !!report.hasBeenInContactWithInfected
  );

  const numberOfPeopleShowingSymptoms = inContactWithInfected.filter(report =>
    hasSymptoms(report.symptoms)
  ).length;

  const numberOfPeopleWithoutSymptoms =
    inContactWithInfected.length - numberOfPeopleShowingSymptoms;

  const percentageWithTwoMostCommonSymptoms = getPercentageWithSymptomsOfTotal(
    inContactWithInfected,
    symptoms.slice(0, 2)
  );

  const percentageWithThreeMostCommonSymptoms = getPercentageWithSymptomsOfTotal(
    inContactWithInfected,
    symptoms.slice(0, 3)
  );

  return {
    numberOfPeopleShowingSymptoms,
    numberOfPeopleWithoutSymptoms,
    total: inContactWithInfected.length,
    percentageWithTwoMostCommonSymptoms,
    percentageWithThreeMostCommonSymptoms
  };
}

export function getAllSymptomsStats(
  reports: CovidReport[],
  symptoms: Symptom[]
): AllSymptomsStat {
  const symptomStats = groupBySymptoms(reports);

  const percentageWithTwoMostCommonSymptoms = getPercentageWithSymptomsOfTotal(
    reports,
    symptoms.slice(0, 2)
  );

  const percentageWithThreeMostCommonSymptoms = getPercentageWithSymptomsOfTotal(
    reports,
    symptoms.slice(0, 3)
  );

  return {
    symptomStats,
    percentageWithTwoMostCommonSymptoms,
    percentageWithThreeMostCommonSymptoms
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
