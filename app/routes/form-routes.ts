import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.locals.metaDescription =
    'Her kan du legge inn informasjon om din helsetilstand, slik at vi kan få en bedre oversikt over totalbildet i Norge.';
  return res.render('pages/form');
});

router.post('/', (req, res) => {
  const requestBody = {
    fullName: req.body['full-name']
  };
  console.log(requestBody);
});

router.get('/elements', (req, res) => {
  return res.render('pages/elements');
});

export default router;
