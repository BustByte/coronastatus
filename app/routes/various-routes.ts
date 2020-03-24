import express from 'express';
import { urls } from '../domain/urls';
import { LANGUAGE } from '../../config.json';

const router = express.Router();

router.get(`${urls.privacyPolicy}`, (req, res) => {
  return res.render(`privacy-statements/${LANGUAGE}-lang-privacy-statement`);
});

router.get(`${urls.contributors}`, (req, res) => {
  return res.render('pages/contributors');
});

router.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  return res.render('pages/robots');
});

export default router;
