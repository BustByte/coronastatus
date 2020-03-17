import express from 'express';
import { CovidReport, TestResult, Municipality } from '../domain/types';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import { MunicipalityRepository } from '../repository/MunicipalityRepository';
import { isShowingAtLeastOneSymptom } from '../util/report-aggregator';

const router = express.Router();
const reportRepo = new CovidReportRepository();
const municipalityRepo = new MunicipalityRepository();

interface MapFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    state: string;
  };
}

const mapReportToFeatureState = (report: CovidReport): string => {
  let state = 'HEALTHY';
  if (report.hasBeenTested && report.testResult === TestResult.POSITIVE) {
    state = 'POSITIVE';
  } else if (isShowingAtLeastOneSymptom(report)) {
    state = 'SYMPTOMS';
  }
  return state;
};

const mapFeatureFromMunicipalityAndReport = (
  municipality: Municipality,
  report: CovidReport
): MapFeature => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [
      Number(municipality.coordinates.lon),
      Number(municipality.coordinates.lat)
    ]
  },
  properties: {
    state: mapReportToFeatureState(report)
  }
});

router.get('/geojson', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  const features = allReports.map(report => {
    const municipality = municipalityRepo.getMunicipalityForPostalCode(
      report.postalCode
    );
    return municipality
      ? mapFeatureFromMunicipalityAndReport(municipality, report)
      : undefined;
  });

  res.send({
    type: 'FeatureCollection',
    features: features.filter(feature => !!feature)
  });
});

router.get('/', (req, res) => {
  res.locals.useWhiteLogo = true;
  return res.render('pages/map');
});

export default router;
