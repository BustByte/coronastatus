import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import formRoutes from './routes/form-routes';
import smsRoutes from './routes/sms-routes';
import { getInstance } from './repository/SqlLiteDatabase';

const { COOKIE_SECRET } = require('../config.json');

const SqLiteStore = require('connect-sqlite3')(session);

const app = express();
const port = process.env.PORT || 7272;
const isDevelopmentEnv = process.env.NODE_ENV === 'dev';

app.use(
  session({
    store: new SqLiteStore(),
    secret: COOKIE_SECRET,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
    },
    proxy: true
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views', 'errors')
]);

app.use('/', formRoutes);
app.use('/sms', smsRoutes);

app.use(
  '/static',
  express.static('static', {
    ...(!isDevelopmentEnv && {
      setHeaders(res) {
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
    res.status(500).json({ error: 'Internal server error' });
  }
);

async function initializeDatabase() {
  const db = getInstance('covid-db');
  const numberOfTables = (await db.listTables()).length;
  if (numberOfTables === 0) {
    await db.applyMigrationScripts(
      path.join(__dirname, 'migrations', 'schema')
    );
    console.info('Database was clean, applying migration scripts');
  } else {
    console.info('Migration scripts already applied, skipping');
  }
}

initializeDatabase().then(() => {
  app.listen(port);
  console.log(`API up and running on port ${port}`);
});
