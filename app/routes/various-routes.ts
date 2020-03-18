import express from 'express';

const router = express.Router();

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
