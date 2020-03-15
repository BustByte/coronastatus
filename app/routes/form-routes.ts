import express from 'express';
import { Symptom, CovidReport, Sex } from '../domain/types';
import { CovidReportRepository } from '../repository/CovidReportRepository';

const router = express.Router();
const reportRepo = new CovidReportRepository();

router.get('/', (req, res) => {
  res.locals.metaDescription =
    'Her kan du legge inn informasjon om din helsetilstand, slik at vi kan få en bedre oversikt over totalbildet i Norge.';
  return res.render('pages/form');
});

router.post('/', (req, res) => {
  const phoneNumber = req.body['phone-number'];
  const covidReport: CovidReport = {
    phoneNumber: phoneNumber,
    yearOfBirth: req.body['birth-year'],
    postalCode: req.body['postal-code'],
    sex: req.body['gender'] === 'male' ? Sex.MALE : Sex.FEMALE,
    symptoms: {
      [Symptom.DRY_COUGH]: req.body['symptom-cough'] === 'on',
      [Symptom.EXHAUSTION]: req.body['symptom-fatigue'] === 'on',
      [Symptom.FEVER]: req.body['symptom-fever'] === 'on',
      [Symptom.HEAVY_BREATHING]: req.body['symptom-heavy-breath'] === 'on',
      [Symptom.MUSCLE_ACHING]: req.body['symptom-muscle-pain'] === 'on',
      [Symptom.DIARRHEA]: req.body['symptom-diarrhea'] === 'on'
    },
    hasBeenAbroadLastTwoWeeks: false // TODO
  };
  console.log(covidReport);
  reportRepo.addNewCovidReportForPhoneNumber(phoneNumber, covidReport);
});

router.get('/elements', (req, res) => {
  return res.render('pages/elements');
});

export default router;
