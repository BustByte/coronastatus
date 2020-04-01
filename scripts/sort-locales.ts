// eslint-disable-next-line import/no-extraneous-dependencies
import fs from 'fs';
import * as path from 'path';

const localeDir = path.join(__dirname, '..', 'app', 'locales')
const localeFiles = fs
  .readdirSync(localeDir)
  .filter(fileName => fileName.includes('.json'))
  .map(fileName => ({
    fileName,
    content: require(path.join(localeDir, fileName))
  }));

if (!localeFiles || !localeFiles.length) {
  console.error('ERROR: No locale file found');
  process.exit(1);
}

localeFiles.forEach(localeFile => {
  console.log(`Sorting ${localeFile.fileName}`);
  const unsorted = localeFile.content;
  var sorted:any = {};
  Object.keys(unsorted).sort((a,b) =>
    a.localeCompare(b, 'en', { sensitivity: 'base'}))
    .forEach(function(key) {
      sorted[key] = unsorted[key]
    }
  );
    
  fs.writeFile(path.join(localeDir, localeFile.fileName), JSON.stringify(sorted, null, 2), function(err) {
    if (err) {
      return console.error(err);
    }
    console.log(`File ${localeFile.fileName} sorted!`);
  });
});