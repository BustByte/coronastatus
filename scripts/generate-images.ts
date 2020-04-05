// eslint-disable-next-line import/no-extraneous-dependencies
import puppeteer from 'puppeteer';

const { COUNTRY_CODE, LOCALE } = require('../app/config.ts').default;

if (!COUNTRY_CODE) {
  console.warn(
    "WARNING: no COUNTRY_CODE found in config.json. falling back to 'en'."
  );
}

const countryCode = COUNTRY_CODE || 'en';

const ogImagePath = `static/${countryCode}/social-media.png`;
const twitterHeaderPath = `static/${countryCode}/twitter-header.png`;
const bannerPath = `static/${countryCode}/banner.png`;

(async (): Promise<void> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setExtraHTTPHeaders({
    'Accept-Language': LOCALE
  });

  await page.setViewport({ width: 3000, height: 3000 });

  await page.goto('http://localhost:7272/social-images').catch(() => {
    console.error(
      "ERROR: Run the server first, eg with `yarn dev` or 'npm run dev'."
    );
    process.exit(1);
  });

  const ogImage = await page.$('.twitter-card');
  if (ogImage) {
    await ogImage.screenshot({ path: ogImagePath });
    console.log(`Saved social media share image to ${ogImagePath}`);
  }

  const twitterHeader = await page.$('.twitter-header');
  if (twitterHeader) {
    await twitterHeader.screenshot({ path: twitterHeaderPath });
    console.log(`Saved twitter header image to ${twitterHeaderPath}`);
  }

  const banner = await page.$('.banner');
  if (banner) {
    await banner.screenshot({ path: bannerPath });
    console.log(`Saved banner image to ${bannerPath}`);
  }

  await browser.close();
})();
