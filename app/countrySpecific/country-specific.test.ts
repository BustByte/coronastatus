/* eslint-disable global-require, import/no-dynamic-require */
import fs from 'fs';

const splitAt = (index: number, x: string): string[] => [
  x.slice(0, index),
  x.slice(index)
];

type FileName = string;

describe('country specific files', () => {
  const countryFiles: { [countryCode: string]: FileName[] } = {};

  fs.readdirSync(__dirname)
    .filter(
      fileName =>
        !fileName.includes('.py') &&
        !fileName.includes('test.ts') &&
        !fileName.includes('.md') &&
        !fileName.includes('country-specific-text-variables.ts')
    )
    .forEach(fileName => {
      const [country, file] = splitAt(2, fileName);
      if (!countryFiles[country]) {
        countryFiles[country] = [file];
      } else {
        countryFiles[country].push(file);
      }
    });

  if (!Object.keys(countryFiles)) {
    throw new Error('No country files found');
  }

  Object.keys(countryFiles).forEach(countryCode => {
    it(`should have all the required files for country code "${countryCode}"`, () => {
      expect(countryFiles[countryCode]).toEqual([
        '-municipalities.json',
        '-postalCodeCoordinates.json',
        '-text-variables.ts',
        '-word-list.txt'
      ]);
    });
  });
});
