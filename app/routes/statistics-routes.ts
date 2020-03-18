import express from 'express';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import {
  groupBySymptoms,
  calculateTotalReportsStats,
  getInContactWithInfectedStats,
  getInfectedAndContactStats,
  getTestResultStats
} from '../util/statistics';
import { TestResult } from '../domain/types';

const router = express.Router();
const reportRepo = new CovidReportRepository();

router.get('/data', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  res.send(allReports);
});

router.get('/', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  const allInfectedSymptomsStats = groupBySymptoms(
    allReports,
    report => report.testResult === TestResult.POSITIVE
  );
  const allSymptomsStats = groupBySymptoms(allReports);
  const totalReportStats = calculateTotalReportsStats(allReports);
  const inContactWithInfectedStats = getInContactWithInfectedStats(allReports);
  const infectedAndContactStats = getInfectedAndContactStats(allReports);
  const testResultStats = getTestResultStats(allReports);
  return res.render('pages/statistics', {
    allInfectedSymptomsStats,
    allSymptomsStats,
    totalReportStats,
    inContactWithInfectedStats,
    infectedAndContactStats,
    testResultStats
  });
});

export default router;
