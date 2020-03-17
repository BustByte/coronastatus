import express from 'express';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import { CovidReport, Symptom } from '../domain/types';

const router = express.Router();
const reportRepo = new CovidReportRepository();

interface SymptomStats {
  labels: string[];
  values: number[];
}

const symptomToLabelMap = {
  [Symptom.DRY_COUGH]: 'Tørrhoste',
  [Symptom.EXHAUSTION]: 'Slitenhet eller utmattelse',
  [Symptom.FEVER]: 'Feber',
  [Symptom.HEAVY_BREATHING]: 'Tung pust',
  [Symptom.MUSCLE_ACHING]: 'Muskelsmerter',
  [Symptom.DIARRHEA]: 'Diaré',
  [Symptom.HEADACHE]: 'Hodepine',
  [Symptom.SORE_THROAT]: 'Vondt i halsen',
  [Symptom.NO_TASTE]: 'Tap av smakssans',
  [Symptom.NO_SMELL]: 'Tap av luktesans',
  [Symptom.SLIME_COUGH]: 'Slimhoste',
  [Symptom.RUNNY_NOSE]: 'Tett eller rennende nese'
};

const symptomKeyToLabel = (symptomKey: Symptom): string =>
  symptomToLabelMap[symptomKey];

function groupBySymptoms(reports: CovidReport[]): SymptomStats {
  const symptoms = reports.map(report => report.symptoms);
  const symptomStats = {
    [Symptom.DRY_COUGH]: 0,
    [Symptom.EXHAUSTION]: 0,
    [Symptom.FEVER]: 0,
    [Symptom.HEAVY_BREATHING]: 0,
    [Symptom.MUSCLE_ACHING]: 0,
    [Symptom.DIARRHEA]: 0,
    [Symptom.HEADACHE]: 0,
    [Symptom.SORE_THROAT]: 0,
    [Symptom.NO_TASTE]: 0,
    [Symptom.NO_SMELL]: 0,
    [Symptom.SLIME_COUGH]: 0,
    [Symptom.RUNNY_NOSE]: 0
  };
  symptoms.forEach(symptom => {
    const symptomKeys = Object.keys(symptom) as Symptom[];
    symptomKeys.forEach(key => {
      if (symptom[key]) {
        symptomStats[key] += 1;
      }
    });
  });
  return {
    labels: (Object.keys(symptomStats) as Symptom[]).map(symptomKeyToLabel),
    values: Object.values(symptomStats)
  };
}

router.get('/data', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  res.send(allReports);
});

router.get('/', async (req, res) => {
  const allReports = await reportRepo.getLatestCovidReports();
  const symptomStats = groupBySymptoms(allReports);
  return res.render('pages/statistics', { symptomStats });
});

export default router;
