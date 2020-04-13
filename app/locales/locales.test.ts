/* eslint-disable global-require, import/no-dynamic-require */
import { readdirSync } from 'fs';

describe('locales', () => {
  const localeFiles = readdirSync(__dirname)
    .filter(fileName => fileName.includes('.json'))
    .map(fileName => ({
      fileName,
      content: require(`./${fileName}`)
    }));

  if (!localeFiles || !localeFiles.length) {
    throw new Error('No locales found');
  }

  localeFiles.forEach(localeFile => {
    it(`should keep locale keys sorted alphabetically in ${localeFile.fileName}`, () => {
      const keys = Object.keys(localeFile.content);
      const sortedKeys = [...keys].sort((a, b) =>
        a.localeCompare(b, 'en', { sensitivity: 'base' })
      );
      expect(keys).toEqual(sortedKeys);
    });
  });
});
