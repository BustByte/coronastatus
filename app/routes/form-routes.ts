import express from 'express';
import { Symptom, CovidReport, Sex } from '../domain/types';
import { CovidReportRepository } from '../repository/CovidReportRepository';
import { loginPinIssuer } from '../sms/loginPinIssuer';
import { stripPhoneNumber } from '../sms/utils';
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

router.post('/', async (req, res) => {
  const phoneNumber = req.body['phone-number'];
  const covidReport: CovidReport = {
    phoneNumber,
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
    hasBeenAbroadLastTwoWeeks: req.body['been-abroad'] === 'yes'
  };
  const strippedPhoneNumber = stripPhoneNumber(phoneNumber);
  const pin = loginPinIssuer.issue(strippedPhoneNumber);

  const gateway = new SmsGatewayService(
    SVEVE_USERNAME,
    SVEVE_PASSWORD,
    SHOULD_USE_SMS_LOGIN
  );
  const success = await gateway.sendSmsWithPin(phoneNumber, pin);
  if (success) {
    reportRepo.addNewCovidReportForPhoneNumber(
      strippedPhoneNumber,
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

export default router;
