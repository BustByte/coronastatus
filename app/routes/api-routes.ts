import express from 'express';
import cors from 'cors';
import 'csv-express';

import { CacheWithLifetime } from '../repository/CacheWithLifetime';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import { MunicipalityRepository } from '../repository/MunicipalityRepository';
import { aggregateCovidReports } from '../util/report-aggregator';
import {
  Sex,
  TestResult,
  Symptoms,
  CovidReport,
  Symptom
} from '../domain/types';

const router = express.Router();
const reportRepo = new CovidReportRepository();
const municipalityRepo = new MunicipalityRepository();

router.get('/aggregated', cors(), async (req, res) => {
  const reports = await reportRepo.getLatestCovidReports();
  const aggregated = aggregateCovidReports(reports);
  res.json(aggregated);
});

interface ExposedCovidReport {
  sex: Sex;
  municipality?: string;
  hasBeenTested: boolean;
  hasBeenInContactWithInfected: boolean;
  symptomStart?: string; // YYYY-MM-DD
  testResult?: TestResult;
  symptoms: Symptoms;
  submissionTimestamp: number;
  age: string;
}

type ZeroOrOne = 0 | 1;

const toZeroOrOne = (bool: boolean): ZeroOrOne => (bool ? 1 : 0);

interface ExposedCovidReportCSV extends Record<Symptom, ZeroOrOne> {
  profileId: number;
  age: string;
  sex: Sex;
  hasBeenInContactWithInfected: ZeroOrOne;
  municipality?: string;
  hasBeenTested: ZeroOrOne;
  testResult?: TestResult;
  symptomStart?: string; // YYYY-MM-DD
  submissionTimestamp: number;
}

const reportToExposedFormat = (report: CovidReport): ExposedCovidReport => ({
  age: report.age,
  sex: report.sex,
  municipality: municipalityRepo.getMunicipalityForPostalCode(report.postalCode)
    ?.name,
  hasBeenTested: report.hasBeenTested,
  hasBeenInContactWithInfected: report.hasBeenInContactWithInfected,
  symptomStart: report.symptomStart,
  testResult: report.testResult,
  symptoms: report.symptoms,
  submissionTimestamp: report.submissionTimestamp
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
  [Symptom.RUNNY_NOSE]: toZeroOrOne(symptoms.RUNNY_NOSE)
});

const reportToExposedCsvFormat = (
  report: CovidReport,
  index: number
): ExposedCovidReportCSV => ({
  profileId: index,
  age: report.age,
  sex: report.sex,
  municipality: municipalityRepo.getMunicipalityForPostalCode(report.postalCode)
    ?.name,
  hasBeenTested: toZeroOrOne(report.hasBeenTested),
  hasBeenInContactWithInfected: toZeroOrOne(
    report.hasBeenInContactWithInfected
  ),
  symptomStart: report.symptomStart,
  testResult: report.testResult,
  submissionTimestamp: report.submissionTimestamp,
  ...extractSymptomsAsZeroOrOne(report.symptoms)
});

const municipalityFilter = (
  municipalityQueryParam: string
): ((municipality: string | undefined) => boolean) => {
  if (municipalityQueryParam == null) {
    return (): boolean => true;
  }
  if (Array.isArray(municipalityQueryParam)) {
    const municipalities = municipalityQueryParam.map((s: string) =>
      s.toUpperCase()
    );
    return (m: string | undefined): boolean =>
      m !== undefined && municipalities.includes(m);
  }
  return (m: string | undefined): boolean =>
    m !== undefined && m === municipalityQueryParam.toUpperCase();
};

const csvCache = new CacheWithLifetime<ExposedCovidReportCSV[]>(
  5, // Minutes
  'ExposedCovidReportCSVCache'
);

router.get('/reports/csv', cors(), async (req, res) => {
  const csvReports = await csvCache.getCachedElements(async () => {
    const allReports = await reportRepo.getAllCovidReports();
    return Object.values(allReports)
      .map((reportList, index) =>
        reportList.map(report => reportToExposedCsvFormat(report, index))
      )
      .flat();
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return res.csv(csvReports, true);
});

router.get('/reports', cors(), async (req, res) => {
  const numQueryParams = Object.keys(req.query).length;
  if (
    numQueryParams > 1 ||
    (numQueryParams === 1 && !('municipality' in req.query))
  ) {
    return res.status(400).json({
      status: 400,
      message: 'Bad Request',
      error: '«municipality» is the only possible query param'
    });
  }

  const allReports = await reportRepo.getAllCovidReports();
  const result = Object.values(allReports)
    .map(reportList =>
      reportList
        .map(reportToExposedFormat)
        .filter(report =>
          municipalityFilter(req.query.municipality)(report.municipality)
        )
    )
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
