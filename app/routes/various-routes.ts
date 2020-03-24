import express from 'express';
import { urls } from '../domain/urls';
import { LANGUAGE } from '../../config.json';

const router = express.Router();

// When the government have their systems ready, this should be used on "/" instead.
router.get('/move-to-root-when-helsenorge-is-ready', async (req, res) => {
  return res.render('pages/government');
});

router.get(`${urls.privacyPolicy}`, (req, res) => {
  return res.render(`pages/${LANGUAGE}-lang-privacy-policy`);
});

router.get(`${urls.contributors}`, (req, res) => {
  return res.render('pages/contributors');
});

router.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  return res.render('pages/robots');
});

export default router;
