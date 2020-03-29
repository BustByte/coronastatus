const { parse } = require('path');
const { readdirSync } = require('fs');
const { spawnSync } = require('child_process');
const { GoogleSpreadsheet } = require('google-spreadsheet');

/**
 * This script finds all the english translation keys across
 * all commits (including branches and pull requests) for each
 * locale.json in app/locales. Afterwards it looks at each locale
 * separately to see if it's missing any one the english keys.
 * Usage: node ops/lost-in-translation.js
 * Important: You need to run it from the root directory.
 */

/**
 * Calls git cli with arguments and returns stdout.
 */
function git(...args) {
  const { stdout } = spawnSync('git', args, { encoding: 'utf-8'});
  return stdout;
}

/**
 * Returns the commit hashes for a file path across all local branches.
 */
function findCommitHashesForFile(filePath) {
  const output = git('log', '--pretty=format:"%h"', '--all', '--', filePath);
  const hashes = output.split('\n').map(line => line.replace(/"/g, ''));
  return hashes;
}

/**
 * Returns the JSON representation of the contents of a file at certain commit hash.
 */
function retrieveJSONForFileAtCommitHash(filePath, commitHash) {
  const contentsAtCommitHash = git('show', `${commitHash}:${filePath}`);
  try {
    return JSON.parse(contentsAtCommitHash);
  } catch (error) {
    // Sometimes the file is not in a proper JSON format. Simply return nothing in that case.
    return {};
  }
}

/**
 * Normalizes translation key like we do in app/server.ts.
 */
function normalizeTranslationKey(translationKey) {
  return translationKey.replace(/[\s\n\t]+/g, ' ').trim();
}

/**
 * Find all the locales (ie. en-IN, no, se) in the provided directory.
 */
function retrieveAllLocales(directoryPath) {
  const filenames = readdirSync(directoryPath);
  const locales = filenames.map(filename => parse(filename).name);
  return locales;
}

/**
 * Add rows to a Google Spreadsheet that are not already added.
 */
async function addUniqueRowsToGoogleSheet(sheet, rowsToAdd) {
  const alreadyAddedRows = await sheet.getRows({ limit: 1000 });
  const uniqueRowsToAdd = rowsToAdd.filter(rowToAdd =>
    !alreadyAddedRows.find(alreadyAddedRow => alreadyAddedRow.key === rowToAdd.key));
  await sheet.addRows(uniqueRowsToAdd);
  return uniqueRowsToAdd;
}

/**
 * Step 1: Find all the (english) translation keys across all branches and PRs.
 *
 * If a Dutch developer has made a feature in a branch, we expect that him/her added a key
 * to one or many locale files (usually the english locale (en.json) or to their own locale
 * file (nl.json), or both).
 *
 * But they probably haven't added translations to all the other locales, because they don't
 * speak the other languages. And this is the problem, because now we need find people to help
 * translate the added keys to all the other locales.
 *
 * So what we do here is simply to find *all* the english translation keys across the entire
 * project. That means looking at all the english translations keys in all the locale files
 * since the start of the project across all branches and PRs. We throw them into a set that
 * we use in the next step.
 */
const allLocales = retrieveAllLocales('app/locales/');
const allEnglishTranslationKeys = new Set([]);
for (const locale of allLocales) {
  const filePath = `app/locales/${locale}.json`;
  for (const commitHash of findCommitHashesForFile(filePath)) {
    const translation = retrieveJSONForFileAtCommitHash(filePath, commitHash);
    for (const translationKey of Object.keys(translation)) {
      allEnglishTranslationKeys.add(normalizeTranslationKey(translationKey));
    }
  }
}

/**
 * Step 2: For each locale file check if there are any missing english translation keys
 *         across all branches and PRs and all commits/changes.
 *
 * If there's a missing english translation key, we know that we're most likely missing
 * a translation for that locale. So what we need to do is to translate it, or get help
 * to translate it.
 * 
 * We throw it into a dictionary where the key is the locale and the value is a set of 
 * missing translations from english to that locale.
 */
const translationKeysByLocale = {};
for (const locale of allLocales) {
  const filePath = `app/locales/${locale}.json`;
  for (const commitHash of findCommitHashesForFile(filePath)) {
    const translation = retrieveJSONForFileAtCommitHash(filePath, commitHash);
    const translationKeys = Object.keys(translation).map(key => normalizeTranslationKey(key));
    if (translationKeysByLocale[locale] === undefined) {
      translationKeysByLocale[locale] = new Set([]);
    }
    translationKeysByLocale[locale] = new Set([...translationKeysByLocale[locale], ...translationKeys]);
  }
}

/**
 * Step 3: Add rows of missing translations to Google Spreadsheet.
 * 
 * https://docs.google.com/spreadsheets/d/1ILFfc1DX4ujMnLnf9UqhwQGM9Ke3s1cAWciy8VqMHZw
 */
(async () => {
  const doc = new GoogleSpreadsheet('1ILFfc1DX4ujMnLnf9UqhwQGM9Ke3s1cAWciy8VqMHZw');
  await doc.useServiceAccountAuth(require('./coronastatus-translation-486cef09736e-credentials.json'));
  await doc.loadInfo();

  const allLocales = retrieveAllLocales('app/locales/');
  for (let sheetIndex = 0; sheetIndex < doc.sheetCount; sheetIndex++) {
    const sheet = doc.sheetsByIndex[sheetIndex];
    for (const locale of allLocales) {
      if (sheet.title !== locale) {
        continue;
      }

      try {
        // Create a sheet if it doesn't already exist.
        await doc.addSheet({ title: locale, headerValues: ['key', 'translation'] });
        await new Promise(resolve => setTimeout(resolve, 10*1000));
      } catch (error) {
        // We don't do anything if the sheet for this locale exists.
      }

      // Add the missing rows by looking at the key column.
      const rows = [];
      for (const englishTranslationKey of allEnglishTranslationKeys) {
        if (!translationKeysByLocale[locale].has(englishTranslationKey)) {
          const row = { 'key': englishTranslationKey, translation: '' };
          rows.push(row);
        }
      }

      // Print out how many rows we added.
      const addedRows = await addUniqueRowsToGoogleSheet(sheet, rows);
      console.log(`Added ${addedRows.length} of ${rows.length} missing translations to the ${locale} sheet.`);

      // Avoid getting rate limited by Google's API (max writes per 100 seconds).
      console.log('Waiting before processing the next sheet.');
      await new Promise(resolve => setTimeout(resolve, 20*1000));
    }
  }

})();
