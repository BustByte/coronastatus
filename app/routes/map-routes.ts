import express from 'express';
import { CovidReport, TestResult } from '../domain/types';
import postalCodeCoordinates from '../util/postalCodeCoordinates';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import { isShowingAtLeastOneSymptom } from '../util/report-aggregator';

const router = express.Router();
const reportRepo = new CovidReportRepository();

router.get('/geojson', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();

  const features: any[] =
    allReports.reduce((list: any[], report: CovidReport) => {
      const coordinates = postalCodeCoordinates(report.postalCode);
      if (coordinates.length !== 0) {
        let state = 'HEALTHY';
        if (report.testResult === TestResult.POSITIVE) {
          state = 'POSITIVE';
        } else if (isShowingAtLeastOneSymptom(report)) {
          state = 'SYMPTOMS';
        }

        list.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates
          },
          properties: {
            state
          }
        });
      }
      return list;
    }, []) ?? [];

  res.send({
    type: 'FeatureCollection',
    features
  });
});

router.get('/', (req, res) => {
  return res.render('pages/map');
});

export default router;
