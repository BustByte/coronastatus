import express, { Request } from 'express';
import { Symptom, CovidReport, Sex, TestResult } from '../domain/types';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import { loginPinIssuer } from '../sms/loginPinIssuer';
import { stripPhoneNumber, hashPhoneNumber } from '../sms/utils';
import { SmsGatewayService } from '../sms/smsGatewayService';

const {
  SVEVE_USERNAME,
  SVEVE_PASSWORD,
  SHOULD_USE_SMS_LOGIN
} = require('../../config.json');

const router = express.Router();
const reportRepo = new CovidReportRepository();

router.get('/', (req, res) => {
  const smsVerificationSuccess = req.query['success'] === 'true';
  res.locals.metaDescription =
    'Her kan du legge inn informasjon om din helsetilstand, slik at vi kan få en bedre oversikt over totalbildet i Norge.';
  return res.render('pages/form', { smsVerificationSuccess });
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
    return res.render('pages/form', { didNotAcceptPrivacyPolicy: true });
  }
  const phoneNumber = req.body['phone-number'];
  const strippedPhoneNumber = stripPhoneNumber(phoneNumber);
  const hashedPhoneNumber = hashPhoneNumber(strippedPhoneNumber);
  const covidReport: CovidReport = {
    phoneNumber: hashedPhoneNumber,
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
    hasBeenAbroadLastTwoWeeks: req.body['been-abroad'] === 'yes',
    symptomStart: req.body['symptom-start']
  };
  const pin = loginPinIssuer.issue(hashedPhoneNumber);

  const gateway = new SmsGatewayService(
    SVEVE_USERNAME,
    SVEVE_PASSWORD,
    SHOULD_USE_SMS_LOGIN
  );
  const success = await gateway.sendSmsWithPin(phoneNumber, pin);
  if (success) {
    reportRepo.addNewCovidReportForHashedPhoneNumber(
      hashedPhoneNumber,
      covidReport
    );
    return res.redirect(`/sms?nummer=${strippedPhoneNumber}`);
  }
  console.log('Sending SMS failed for ', covidReport);
  return res.render('pages/form', { smsSendingFailed: true });
});

router.get('/elements', (req, res) => {
  return res.render('pages/elements');
});

router.get('/personvern', (req, res) => {
  return res.render('pages/privacy-policy');
});

export default router;
