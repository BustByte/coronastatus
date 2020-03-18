import express from 'express';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import {
  groupBySymptoms,
  calculateTotalReportsStats,
  getInContactWithInfectedStats,
  getInfectedAndContactStats,
  getTestResultStats
} from '../util/statistics';

const router = express.Router();
const reportRepo = new CovidReportRepository();

router.get('/data', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  res.send(allReports);
});

router.get('/', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  const symptomStats = groupBySymptoms(allReports);
  const totalReportStats = calculateTotalReportsStats(allReports);
  const inContactWithInfectedStats = getInContactWithInfectedStats(allReports);
  const infectedAndContactStats = getInfectedAndContactStats(allReports);
  const testResultStats = getTestResultStats(allReports);
  return res.render('pages/statistics', {
    symptomStats,
    totalReportStats,
    inContactWithInfectedStats,
    infectedAndContactStats,
    testResultStats
  });
});

export default router;
