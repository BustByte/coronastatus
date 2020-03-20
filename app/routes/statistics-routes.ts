import express from 'express';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import {
  calculateTotalReportsStats,
  getInContactWithInfectedStats,
  getInfectedAndContactStats,
  getTestResultStats,
  getInfectedStats,
  getAllSymptomsStats
} from '../util/statistics';

const router = express.Router();
const reportRepo = new CovidReportRepository();

router.get('/data', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  res.send(allReports);
});

router.get('/', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  const infectedStats = getInfectedStats(allReports);
  const inContactWithInfectedStats = getInContactWithInfectedStats(
    allReports,
    infectedStats.symptomStats.symptoms
  );
  const allSymptomsStats = getAllSymptomsStats(
    allReports,
    infectedStats.symptomStats.symptoms
  );
  const totalReportStats = calculateTotalReportsStats(allReports);
  const infectedAndContactStats = getInfectedAndContactStats(allReports);
  const testResultStats = getTestResultStats(allReports);

  return res.render('pages/statistics', {
    infectedStats,
    allSymptomsStats,
    totalReportStats,
    inContactWithInfectedStats,
    infectedAndContactStats,
    testResultStats
  });
});

export default router;
