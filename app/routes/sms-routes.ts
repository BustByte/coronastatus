import express from 'express';
import { Symptom, CovidReport, Sex } from '../domain/types';

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.query);
  const phoneNumber = req.query['nummer'];
  res.locals.metaDescription = 'Verifiser ditt telefonnummer';
  if (!phoneNumber) {
    return res.redirect('/');
  }
  return res.render('pages/sms', {
    phoneNumber,
    invalidVerificationCode: false
  });
});

router.post('/', (req, res) => {
  const verificationCode = req.body['verification-code'];
  const phoneNumber = req.body['phone-number'];
  console.log(phoneNumber, verificationCode);

  // TODO: check if verification code is invalid
  if (phoneNumber === verificationCode) {
    return res.render('pages/sms', {
      phoneNumber,
      invalidVerificationCode: true
    });
  }

  // TODO: Save verification ok

  return res.redirect('/?success=true');
});

router.get('/elements', (req, res) => {
  return res.render('pages/elements');
});

export default router;
