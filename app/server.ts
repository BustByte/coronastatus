import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import i18n, { Replacements } from 'i18n';
import swaggerUi from 'swagger-ui-express';
import reportRoutes from './routes/report-routes';
import mapRoutes from './routes/map-routes';
import apiRoutes from './routes/api-routes';
import statisticsRoutes from './routes/statistics-routes';
import variousRoutes, { localeCookieName } from './routes/various-routes';
import { getInstance } from './repository/Database';
import { swaggerDocument } from './swagger';
import { countryCodeToUrls } from './domain/urls';
import { localeToFlag } from './domain/flags';
import config from './config';
import { ensureAllLocalesAreValidJSON } from './util/locale-validation';
import { createNumberFormatter } from './util/number-formatter';
import { getCountrySpecificTextVariables } from './countrySpecific/country-specific-text-variables';

const app = express();
const port = process.env.PORT || 7272;
const isDevelopmentEnv = process.env.NODE_ENV === 'dev';

i18n.configure({
  defaultLocale: config.LOCALE,
  locales: config.SUPPORTED_LOCALES,
  cookie: localeCookieName,
  updateFiles: false,
  directory: `${__dirname}/locales`,
  queryParameter: 'lang'
});

app.use(cookieParser());
app.use(i18n.init);

app.use((req, res, next) => {
  const translate = (
    text: string,
    ...options: string[] | [Replacements]
  ): string => {
    const replaced = text.replace(/[\s\n\t]+/g, ' ').trim();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return i18n.__.apply(req, [replaced, ...options]);
  };
  res.locals.__ = translate;
  res.__ = translate;
  next();
});

const urls = countryCodeToUrls(config.COUNTRY_CODE);

app.use(
  urls.apiDocs,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customJs: 'https://cdn.simpleanalytics.io/hello.js'
  })
);
const cacheKey = process.env.CACHE_KEY || `${Math.random()}`.replace('.', '');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  res.locals.activePage = `/${req.path.split('/')[1]}`;
  res.locals.currentPath = req.path;
  res.locals.cacheKey = cacheKey;
  res.locals.lastCommit = process.env.CACHE_KEY || null;
  res.locals.imageSubfolder = config.COUNTRY_CODE;
  res.locals.htmlLang = config.LOCALE;
  res.locals.supportedLocales = config.SUPPORTED_LOCALES;
  res.locals.baseUrl = config.BASE_URL;
  res.locals.zipGuide = config.ZIP_GUIDE;
  res.locals.mapCenter = config.MAP_CENTER;
  res.locals.mapZoom = config.MAP_ZOOM;
  res.locals.mapMaxZoom = config.MAP_MAX_ZOOM;
  res.locals.urls = urls;
  res.locals.zipPattern = config.ZIP_PATTERN;
  res.locals.zipPlaceHolder = config.ZIP_PLACEHOLDER;
  res.locals.redirectToGovernment = config.REDIRECT_TO_GOVERNMENT;
  res.locals.localeToFlag = localeToFlag;
  res.locals.currentLocale = req.getLocale();
  res.locals.formatNumber = createNumberFormatter(config.THOUSAND_SEPARATOR);
  res.locals.textVariables = getCountrySpecificTextVariables(
    config.COUNTRY_CODE
  );

  next();
});

app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views', 'errors')
]);

app.use(urls.submitReport, reportRoutes);
app.use(urls.map, mapRoutes);
app.use(urls.api, apiRoutes);
app.use(urls.statistics, statisticsRoutes);
app.use('/', variousRoutes);

app.use(
  '/static',
  express.static('static', {
    ...(!isDevelopmentEnv && {
      setHeaders(res): void {
        res.set(
          'Cache-Control',
          'max-age=86400, no-cache="Set-Cookie", public'
        );
      }
    })
  })
);

// Fallback error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).render('pages/500');
    next();
  }
);

// Handling 404
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).render('pages/404');
    next();
  }
);

async function initializeDatabase(): Promise<void> {
  const db = getInstance(config.DB_PATH);

  const numberOfTables = (await db.listTables()).length;
  if (numberOfTables === 0) {
    await db.applyMigrationScripts(
      path.join(__dirname, 'migrations', `schema_${db.type}`)
    );
    console.info('Database was clean, applying migration scripts');
  } else {
    console.info('Migration scripts already applied, skipping');
  }
}

initializeDatabase().then(() => {
  ensureAllLocalesAreValidJSON();
  app.listen(port);
  console.log(`API up and running on port ${port}`);
});
