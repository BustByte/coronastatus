import express from 'express';
import { Coordinate, CovidReport, TestResult } from '../domain/types';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import { MunicipalityRepository } from '../repository/MunicipalityRepository';
import { isShowingAtLeastOneSymptom } from '../util/report-aggregator';

const router = express.Router();
const reportRepo = new CovidReportRepository();
const municipalityRepo = new MunicipalityRepository();

const mapReportToFeatureState = (report: CovidReport): string => {
  let state = 'HEALTHY';
  if (report.hasBeenTested && report.testResult === TestResult.POSITIVE) {
    state = 'POSITIVE';
  } else if (isShowingAtLeastOneSymptom(report)) {
    state = 'SYMPTOMS';
  }
  return state;
};

const mapFeatureFromCoordinateAndReport = (
  coordinate: Coordinate,
  report: CovidReport
) => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [coordinate.lon, coordinate.lat]
  },
  properties: {
    state: mapReportToFeatureState(report)
  }
});

router.get('/kart/geojson', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  const features = allReports
    .map(report => {
      const coordinate = municipalityRepo.getCoordinateForPostalCode(
        report.postalCode
      );
      return coordinate
        ? mapFeatureFromCoordinateAndReport(coordinate, report)
        : undefined;
    })
    .filter(feature => !!feature);

  res.json({
    type: 'FeatureCollection',
    features
  });
});

router.get('/', (req, res) => {
  res.locals.useWhiteLogo = true;
  return res.render('pages/map');
});

router.get('/kart', (req, res) => {
  return res.redirect('/');
});

export default router;
