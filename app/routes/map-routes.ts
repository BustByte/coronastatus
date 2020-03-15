import express from 'express';
import { CovidReport, TestResult } from '../domain/types';
import postalCodeCoordinates from '../domain/postalCodeCoordinates';
import { CovidReportRepository } from '../repository/CovidReportRepository';

const router = express.Router();
const reportRepo = new CovidReportRepository();

router.get('/geojson', async (req, res) => {
  const allReports = await reportRepo.getAllCovidReports();

  const features: any[] =
    allReports.reduce((list: any[], report: CovidReport) => {
      const coordinates = postalCodeCoordinates(report.postalCode);
      if (coordinates.length !== 0) {
        let state = 'HEALTHY';
        if (report.hasBeenTested && report.testResult === TestResult.POSITIVE) {
          state = 'POSITIVE';
        } else if (Object.values(report.symptoms).includes(true)) {
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
