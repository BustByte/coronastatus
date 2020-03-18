import express from 'express';
import cors from 'cors';

import { CovidReportRepository } from '../repository/CovidReportRepository';
import { MunicipalityRepository } from '../repository/MunicipalityRepository';
import { aggregateCovidReports } from '../util/report-aggregator';
import { Sex, TestResult, Symptoms, CovidReport } from '../domain/types';

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
  testedAt?: Date; // YYYY-MM-DD
  symptomStart?: string; // YYYY-MM-DD
  testResult?: TestResult;
  symptoms: Symptoms;
  submissionTimestamp: number;
  age: string;
}

const reportToExposedFormat = (report: CovidReport): ExposedCovidReport => ({
  age: report.age,
  sex: report.sex,
  municipality: municipalityRepo.getMunicipalityForPostalCode(report.postalCode)
    ?.name,
  hasBeenTested: report.hasBeenTested,
  hasBeenInContactWithInfected: report.hasBeenInContactWithInfected,
  testedAt: report.testedAt,
  symptomStart: report.symptomStart,
  testResult: report.testResult,
  symptoms: report.symptoms,
  submissionTimestamp: report.submissionTimestamp
});

const municipalityFilter = (municipalityQueryParam: any) => {
  if (municipalityQueryParam == null) {
    return () => true;
  }
  if (Array.isArray(municipalityQueryParam)) {
    const municipalities = municipalityQueryParam.map((s: string) =>
      s.toUpperCase()
    );
    return (m: string | undefined) =>
      m !== undefined && municipalities.includes(m);
  }
  return (m: string | undefined) =>
    m !== undefined && m === municipalityQueryParam.toUpperCase();
};

router.get('/reports', cors(), async (req, res) => {
  const numQueryParams = Object.keys(req.query).length;
  if (
    numQueryParams > 1 ||
    (numQueryParams === 1 && !('municipality' in req.query))
  ) {
    res.status(400).json({
      status: 400,
      message: 'Bad Request',
      error: '«municipality» is the only possible query param'
    });
    return;
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

  res.json(result);
});

router.get('*', function(req, res) {
  res.status(404).json({
    status: 404,
    message: 'Page Not Found'
  });
});

export default router;
