const puppeteer = require('puppeteer');
const { LANGUAGE, LOCALE } = require('../config.json');

if (!LOCALE) {
  if (!LANGUAGE) {
    console.warn(
      "WARNING: no LOCALE or LANGUAGE found in config.json. falling back to 'en'."
    );
  } else {
    console.warn(
      `WARNING: no LOCALE found in config.json. falling back to LANGUAGE (${LANGUAGE}).`
    );
  }
}

const currentLanguage = LOCALE || LANGUAGE || 'en';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 3000, height: 3000 });

  await page.goto('http://localhost:7272/social-images').catch(() => {
    console.error(
      "ERROR: Run the server first, eg with `yarn dev` or 'npm run dev'."
    );
    process.exit(1);
  });

  const ogImage = await page.$('.twitter-card');
  await ogImage.screenshot({
    path: `static/${currentLanguage}/social-media.png`
  });

  const twitterHeader = await page.$('.twitter-header');
  await twitterHeader.screenshot({
    path: `static/${currentLanguage}/twitter-header.png`
  });

  const banner = await page.$('.banner');
  await banner.screenshot({ path: `static/${currentLanguage}/banner.png` });

  await browser.close();
})();
