const { spawnSync } = require('child_process');

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
allLocales = new Set(['no', 'se']);
allEnglishTranslationKeys = new Set([]);
for (const locale of allLocales) {
  const filePath = `app/locales/${locale}.json`;
  for (const commitHash of findCommitHashesForFile(filePath)) {
    const translation = retrieveJSONForFileAtCommitHash(filePath, commitHash);
    for (const translationKey of Object.keys(translation)) {
      allEnglishTranslationKeys.add(translationKey);
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
    if (translationKeysByLocale[locale] === undefined) {
      translationKeysByLocale[locale] = new Set([]);
    }
    translationKeysByLocale[locale] = new Set([...translationKeysByLocale[locale], ...Object.keys(translation)]);
  }
}

/**
 * Step 3: Print out the missing keys for each locale.
 */
for (const locale of allLocales) {
  for (const englishTranslationKey of allEnglishTranslationKeys) {
    if (!translationKeysByLocale[locale].has(englishTranslationKey)) {
      console.log(locale, 'missing translation for:', englishTranslationKey);
    }
  }
}
