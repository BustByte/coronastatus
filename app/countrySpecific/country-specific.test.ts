/* eslint-disable global-require, import/no-dynamic-require */
import { readdirSync } from 'fs';
import path from 'path';

type FileName = string;

describe('country specific files', () => {
  const countryFiles: { [countryCode: string]: FileName[] } = {};

  readdirSync(__dirname, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .forEach(directory => {
      const files = readdirSync(path.join(__dirname, directory.name));
      countryFiles[directory.name] = files;
    });

  if (!Object.keys(countryFiles)) {
    throw new Error('No country files found');
  }

  Object.keys(countryFiles).forEach(countryCode => {
    it(`should have all the required files for country code "${countryCode}"`, () => {
      expect(countryFiles[countryCode]).toEqual([
        'config.ts',
        'municipalities.json',
        'postalCodeCoordinates.json',
        'text-variables.ts',
        'word-list.txt'
      ]);
    });
  });
});
