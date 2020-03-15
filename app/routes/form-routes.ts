import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  return res.render('pages/form');
});

router.get('/elements', (req, res) => {
  return res.render('pages/elements');
});

export default router;
