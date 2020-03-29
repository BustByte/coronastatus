/* eslint-disable no-param-reassign, no-plusplus */
import express from 'express';
import cors from 'cors';
import 'csv-express';

import { NotEnoughReportsError } from '../domain/errors';
import { CacheWithLifetime } from '../repository/CacheWithLifetime';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import {
  aggregateCovidReports,
  aggregateCovidReportsForPostalCode
} from '../util/report-aggregator';
import {
  Sex,
  TestResult,
  Symptoms,
  CovidReport,
  Symptom,
  SmokingHabit,
  IsolationStatus
} from '../domain/types';

const router = express.Router();
const reportRepo = new CovidReportRepository();

router.get('/aggregated', cors(), async (req, res) => {
  const reports = await reportRepo.getLatestCovidReports();
  const aggregated = aggregateCovidReports(reports);
  return res.json(aggregated);
});

router.get('/aggregated/:postalCode', async (req, res) => {
  const reports = await reportRepo.getLatestCovidReports();
  try {
    const aggregated = aggregateCovidReportsForPostalCode(
      reports,
      req.params.postalCode
    );
    return res.send(aggregated);
  } catch (e) {
    if (e instanceof NotEnoughReportsError) {
      return res.status(403).send({ message: e.message });
    }
    throw e;
  }
});

interface ExposedCovidReport {
  sex: Sex;
  hasBeenTested: boolean;
  hasBeenInContactWithInfected: boolean;
  symptomStart?: string; // YYYY-MM-DD
  testResult?: TestResult;
  symptoms: Symptoms;
  submissionDate: string; // YYYY-MM-DD
  age: string;
  bodyTemperature?: string;
  smokingHabit?: SmokingHabit;
  isolationStatus?: IsolationStatus;
  diagnosedWithOtherConditions?: boolean;
}

type ZeroOrOne = 0 | 1;

const toZeroOrOne = (bool?: boolean): ZeroOrOne => (bool ? 1 : 0);

interface ExposedCovidReportCSV extends Record<Symptom, ZeroOrOne> {
  profileId: number;
  submissionOrder: number;
  age: string;
  sex: Sex;
  hasBeenInContactWithInfected: ZeroOrOne;
  hasBeenTested: ZeroOrOne;
  testResult?: TestResult;
  symptomStart?: string; // YYYY-MM-DD
  submissionDate: string;
  bodyTemperature?: string;
  smokingHabit?: SmokingHabit;
  isolationStatus?: IsolationStatus;
  diagnosedWithOtherConditions?: ZeroOrOne;
}

const toISODate = (submissionTimestamp: number): string =>
  // We did not collect submission timestamps the first day (1584284400000)
  new Date(submissionTimestamp ?? 1584284400000).toISOString().substring(0, 10);

const reportToExposedFormat = (report: CovidReport): ExposedCovidReport => ({
  age: report.age,
  sex: report.sex,
  hasBeenTested: report.hasBeenTested,
  hasBeenInContactWithInfected: report.hasBeenInContactWithInfected,
  symptomStart: report.symptomStart,
  testResult: report.testResult,
  symptoms: report.symptoms,
  submissionDate: toISODate(report.submissionTimestamp),
  bodyTemperature: report.bodyTemperature,
  smokingHabit: report.smokingHabit,
  isolationStatus: report.isolationStatus,
  diagnosedWithOtherConditions: report.diagnosedWithOtherConditions
});

const extractSymptomsAsZeroOrOne = (
  symptoms: Symptoms
): Record<Symptom, ZeroOrOne> => ({
  [Symptom.DRY_COUGH]: toZeroOrOne(symptoms.DRY_COUGH),
  [Symptom.EXHAUSTION]: toZeroOrOne(symptoms.EXHAUSTION),
  [Symptom.FEVER]: toZeroOrOne(symptoms.FEVER),
  [Symptom.HEAVY_BREATHING]: toZeroOrOne(symptoms.HEAVY_BREATHING),
  [Symptom.MUSCLE_ACHING]: toZeroOrOne(symptoms.MUSCLE_ACHING),
  [Symptom.DIARRHEA]: toZeroOrOne(symptoms.DIARRHEA),
  [Symptom.HEADACHE]: toZeroOrOne(symptoms.HEADACHE),
  [Symptom.SORE_THROAT]: toZeroOrOne(symptoms.SORE_THROAT),
  [Symptom.NO_TASTE]: toZeroOrOne(symptoms.NO_TASTE),
  [Symptom.NO_SMELL]: toZeroOrOne(symptoms.NO_SMELL),
  [Symptom.SLIME_COUGH]: toZeroOrOne(symptoms.SLIME_COUGH),
  [Symptom.RUNNY_NOSE]: toZeroOrOne(symptoms.RUNNY_NOSE),
  [Symptom.NAUSEA_OR_VOMITING]: toZeroOrOne(symptoms.NAUSEA_OR_VOMITING)
});

const reportToExposedCsvFormat = (
  report: CovidReport,
  passCodeIndex: number,
  submissionIndex: number
): ExposedCovidReportCSV => ({
  profileId: passCodeIndex + 1,
  submissionOrder: submissionIndex + 1,
  age: report.age,
  sex: report.sex,
  hasBeenTested: toZeroOrOne(report.hasBeenTested),
  hasBeenInContactWithInfected: toZeroOrOne(
    report.hasBeenInContactWithInfected
  ),
  symptomStart: report.symptomStart,
  testResult: report.testResult,
  submissionDate: toISODate(report.submissionTimestamp),
  bodyTemperature: report.bodyTemperature,
  smokingHabit: report.smokingHabit,
  isolationStatus: report.isolationStatus,
  diagnosedWithOtherConditions: toZeroOrOne(
    report.diagnosedWithOtherConditions
  ),
  ...extractSymptomsAsZeroOrOne(report.symptoms)
});

const csvCache = new CacheWithLifetime<ExposedCovidReportCSV[]>(
  5, // Minutes
  'ExposedCovidReportCSVCache'
);

function shuffleArray<T>(inputArray: T[]): T[] {
  for (let i: number = inputArray.length - 1; i >= 0; i--) {
    const randomIndex: number = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = inputArray[randomIndex];

    inputArray[randomIndex] = inputArray[i];
    inputArray[i] = itemAtIndex;
  }
  return inputArray;
}

router.get('/reports/reports.csv', cors(), async (req, res) => {
  const csvReports = await csvCache.getCachedElements(async () => {
    const allReports = await reportRepo.getAllCovidReports();
    return shuffleArray(Object.values(allReports))
      .map((reportList, passCodeIndex) =>
        reportList.map((report, timestampIndex) =>
          reportToExposedCsvFormat(report, passCodeIndex, timestampIndex)
        )
      )
      .flat();
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return res.csv(csvReports, true);
});

router.get('/reports', cors(), async (req, res) => {
  const allReports = await reportRepo.getAllCovidReports();
  const result = Object.values(allReports)
    .map(reportList => reportList.map(reportToExposedFormat))
    .filter(list => list.length > 0);
  return res.json(result);
});

router.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page Not Found'
  });
});

export default router;
