import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.locals.useWhiteLogo = true;
  return res.render('pages/international');
});

export default router;
