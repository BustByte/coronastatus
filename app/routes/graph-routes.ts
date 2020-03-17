import express from 'express';
import { CovidReportRepository } from '../repository/CovidReportRepository';

const router = express.Router();
const reportRepo = new CovidReportRepository();

router.get('/data', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  res.send(allReports);
});

router.get('/', (req, res) => {
  return res.render('pages/graphs');
});

export default router;
