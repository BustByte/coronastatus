/* eslint-disable global-require, import/no-dynamic-require, import/no-extraneous-dependencies */
import fs from 'fs';
import * as path from 'path';

type Translations = { [key: string]: string };

const localeDir = path.join(__dirname, '..', 'app', 'locales');
const localeFiles = fs
  .readdirSync(localeDir)
  .filter(fileName => fileName.includes('.json'))
  .map(fileName => ({
    fileName,
    content: require(path.join(localeDir, fileName)) as Translations
  }));

if (!localeFiles || !localeFiles.length) {
  console.error('ERROR: No locale file found');
  process.exit(1);
}

localeFiles.forEach(localeFile => {
  console.log(`Sorting ${localeFile.fileName}`);
  const unsorted: Translations = localeFile.content;
  const sorted: Translations = {};
  Object.keys(unsorted)
    .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
    .forEach(key => {
      sorted[key] = unsorted[key];
    });

  fs.writeFile(
    path.join(localeDir, localeFile.fileName),
    JSON.stringify(sorted, null, 2),
    err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`File ${localeFile.fileName} sorted!`);
      }
    }
  );
});
