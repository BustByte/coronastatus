import { readdirSync } from 'fs';
import { join } from 'path';
import { CountryCode, countryCodeToUrls, countrySpecificUrls } from './urls';

describe('urls', () => {
  it('should keep url mappings sorted by country code', () => {
    const keys = Object.keys(countrySpecificUrls);
    const sortedKeys = [...keys].sort((a, b) =>
      a.localeCompare(b, 'en', { sensitivity: 'base' })
    );
    expect(keys).toEqual(sortedKeys);
  });

  const countryCodes = readdirSync(join(__dirname, '..', 'countrySpecific'), {
    withFileTypes: true
  })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  countryCodes.forEach(countryCode => {
    it(`should have url mappings for country code "${countryCode}"`, () => {
      const urls = countryCodeToUrls(countryCode as CountryCode);
      expect(urls).toBeDefined();
    });
  });
});
