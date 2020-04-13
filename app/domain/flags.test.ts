import { readdirSync } from 'fs';
import { join } from 'path';
import { Locale, localeToFlagMap, localeToFlag } from './flags';

describe('flags', () => {
  it('should keep list of flag mappings sorted', () => {
    const keys = Object.keys(localeToFlagMap);
    const sortedKeys = [...keys].sort((a, b) =>
      a.localeCompare(b, 'en', { sensitivity: 'base' })
    );
    expect(keys).toEqual(sortedKeys);
  });

  const locales = readdirSync(join(__dirname, '..', 'locales'))
    .filter(fileName => fileName.includes('.json'))
    .map(fileName => fileName.split('.')[0]);

  locales.forEach(locale => {
    it(`should have a mapping to a flag for locale "${locale}"`, () => {
      const flag = localeToFlag(locale as Locale);
      expect(flag).toBeDefined();
    });
  });
});
