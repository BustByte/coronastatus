import express from 'express';
import { urls } from '../domain/urls';
import config from '../config';

const router = express.Router();

router.get(`${urls.privacyPolicy}`, (req, res) => {
  return res.render(
    `privacy-statements/${config.LANGUAGE}-lang-privacy-statement`
  );
});

router.get(`${urls.contributors}`, (req, res) => {
  return res.render('pages/contributors');
});

if (process.env.NODE_ENV !== 'production') {
  router.get('/social-images', (req, res) => {
    return res.render('pages/social-images');
  });
}

router.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  return res.render('pages/robots');
});

export default router;
