import express, { Request } from 'express';
import { Symptom, CovidReport, Sex, TestResult } from '../domain/types';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import { getPasscodeCreator } from '../util/PasscodeCreator';

const router = express.Router();
const reportRepo = new CovidReportRepository();
const passcodeCreator = getPasscodeCreator();

router.get('/', (req, res) => {
  res.locals.metaDescription =
    'Her kan du legge inn informasjon om din helsetilstand, slik at vi kan få en bedre oversikt over totalbildet i Norge.';
  return res.render('pages/report');
});

router.get('/numberOfReports', async (req, res) => {
  const numberOfReports = await reportRepo.countNumberOfReports();
  return res.json({ numberOfReports });
});

router.get('/profil/:passcode', async (req, res) => {
  const { passcode } = req.params;
  if (!passcode) {
    return res.redirect('/');
  }
  const profile = await reportRepo.getCovidReportByPasscode(passcode);
  if (profile) {
    res.locals.metaDescription =
      'Her kan du legge inn informasjon om din helsetilstand, slik at vi kan få en bedre oversikt over totalbildet i Norge.';
    return res.render('pages/report', { profile });
  }
  return res.redirect('/');
});

const extractTestResult = (req: Request): TestResult | undefined => {
  const testResponse = req.body['test-response'];
  if (testResponse === 'positive') {
    return TestResult.POSITIVE;
  }
  if (testResponse === 'negative') {
    return TestResult.NEGATIVE;
  }
  if (testResponse === 'pending') {
    return TestResult.PENDING;
  }
  return undefined;
};

router.post('/', async (req, res) => {
  const acceptPrivacyPolicy = req.body['accept-privacy-policy'] === 'on';
  if (!acceptPrivacyPolicy) {
    return res.render('pages/report', { didNotAcceptPrivacyPolicy: true });
  }
  const covidReport: CovidReport = {
    yearOfBirth: req.body['birth-year'],
    postalCode: req.body['postal-code'],
    hasBeenTested: req.body['been-tested'] === 'yes',
    testResult: extractTestResult(req),
    sex: req.body['gender'] === 'male' ? Sex.MALE : Sex.FEMALE,
    symptoms: {
      [Symptom.DRY_COUGH]: req.body['symptom-cough'] === 'on',
      [Symptom.EXHAUSTION]: req.body['symptom-fatigue'] === 'on',
      [Symptom.FEVER]: req.body['symptom-fever'] === 'on',
      [Symptom.HEAVY_BREATHING]: req.body['symptom-heavy-breath'] === 'on',
      [Symptom.MUSCLE_ACHING]: req.body['symptom-muscle-pain'] === 'on',
      [Symptom.DIARRHEA]: req.body['symptom-diarrhea'] === 'on',
      [Symptom.HEADACHE]: req.body['symptom-headache'] === 'on',
      [Symptom.SORE_THROAT]: req.body['symptom-sore-throat'] === 'on'
    },
    inQuarantine: req.body['in-quarantine'] === 'yes',
    hasBeenAbroadLastTwoWeeks: req.body['been-abroad'] === 'yes',
    symptomStart: req.body['symptom-start'],
    submissionTimestamp: new Date().getTime()
  };
  const passcode = passcodeCreator.createPasscode();
  reportRepo.addNewCovidReport(passcode, covidReport);
  return res.redirect(`/profil/${passcode}?success=true`);
});

router.get('/elements', (req, res) => {
  return res.render('pages/elements');
});

router.get('/personvern', (req, res) => {
  return res.render('pages/privacy-policy');
});

router.get('/frivillige', (req, res) => {
  return res.render('pages/frivillige');
});

export default router;
