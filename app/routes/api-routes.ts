import express from 'express';

import { CovidReportRepository } from '../repository/CovidReportRepository';
import { aggregateCovidReports } from '../util/report-aggregator';

const router = express.Router();
const reportRepo = new CovidReportRepository();

router.get('/aggregated', async (req, res) => {
  const reports = await reportRepo.getLatestCovidReports();
  const aggregated = aggregateCovidReports(reports);
  res.json(aggregated);
});

router.get('*', function(req, res) {
  res.status(404).json({
    status: 404,
    message: 'Page Not Found'
  });
});

export default router;
