import express from 'express';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import {
  calculateTotalReportsStats,
  getInContactWithInfectedStats,
  getInfectedAndContactStats,
  getTestResultStats,
  getInfectedStats,
  getAllSymptomsStats,
  getTotalTested
} from '../util/statistics';
import { aggregateCovidReports } from '../util/report-aggregator';

const router = express.Router();
const reportRepo = new CovidReportRepository();

router.get('/data', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  res.send(allReports);
});

router.get('/', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  const aggregated = aggregateCovidReports(allReports);
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
  const totalTested = getTotalTested(allReports);

  return res.render('pages/statistics', {
    infectedStats,
    aggregated,
    allSymptomsStats,
    totalReportStats,
    inContactWithInfectedStats,
    infectedAndContactStats,
    testResultStats,
    totalTested
  });
});

export default router;
