import express from 'express';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import {
  groupBySymptoms,
  calculateTotalReportsStats,
  getInContactWithInfectedStats
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
  const InContactWithInfectedStats = getInContactWithInfectedStats(allReports);
  return res.render('pages/statistics', {
    symptomStats,
    totalReportStats,
    InContactWithInfectedStats
  });
});

export default router;
