import express from 'express';
import { urls } from '../domain/urls';
import config from '../config';

export const localeCookieName = 'coronastatusLocale';

const router = express.Router();

const cookieOptions = {
  maxAge: 31557600000, // maxAge is set to 1 year in ms
  httpOnly: true, // httpOnly means the cookie is only accessible by the web server
  signed: false // signed indicates if the cookie should be signed
};

router.get(`${urls.privacyPolicy}`, (req, res) => {
  return res.render(
    `privacy-statements/${config.COUNTRY_CODE}-privacy-statement`
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

router.get('/lang/:locale', (req, res) => {
  const { locale } = req.params;
  const { redirectTo } = req.query;
  if (locale) {
    res.cookie(localeCookieName, locale, cookieOptions);
  }
  res.redirect(redirectTo || '/');
});

export default router;
