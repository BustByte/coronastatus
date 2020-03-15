import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.locals.metaDescription =
    'Her kan du legge inn informasjon om din helsetilstand, slik at vi kan få en bedre oversikt over totalbildet i Norge.';
  return res.render('pages/form');
});

enum Symptom {
  DRY_COUGH = 'DRY_COUGH',
  EXHAUSTION = 'EXHAUSTION',
  FEVER = 'FEVER',
  HEAVY_BREATHING = 'HEAVY_BREATHING',
  MUSCLE_ACHING = 'MUSCLE_ACHING',
  DIARRHEA = 'DIARRHEA'
}

router.post('/', (req, res) => {
  const requestBody = {
    fullName: req.body['full-name'],
    phoneNumber: req.body['phone-number'],
    birthYear: req.body['birth-year'],
    postalCode: req.body['postal-code'],
    sex: req.body['gender'] === 'male' ? 'male' : 'female',
    symptoms: {
      [Symptom.DRY_COUGH]: req.body['symptom-cough'] === 'on',
      [Symptom.EXHAUSTION]: req.body['symptom-fatigue'] === 'on',
      [Symptom.FEVER]: req.body['symptom-fever'] === 'on',
      [Symptom.HEAVY_BREATHING]: req.body['symptom-heavy-breath'] === 'on',
      [Symptom.MUSCLE_ACHING]: req.body['symptom-muscle-pain'] === 'on',
      [Symptom.DIARRHEA]: req.body['symptom-diarrhea'] === 'on'
    }
  };

  console.log(requestBody);
});

router.get('/elements', (req, res) => {
  return res.render('pages/elements');
});

export default router;
