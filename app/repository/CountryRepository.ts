/* eslint-disable global-require, import/no-dynamic-require */
import { readdirSync, Dirent } from 'fs';
import path from 'path';
import { Config, CountrySpecificTexts, Coordinate } from '../domain/types';
import { CountryCode } from '../domain/urls';

const countriesDir = path.join(__dirname, '..', 'countrySpecific');

interface Country {
  url: string;
  countryCode: CountryCode;
  mapCenter: Coordinate;
  countryName: string;
}

interface ConfigFile {
  countrySpecificConfig: Config;
}

interface TextVariablesFile {
  countrySpecificTexts: CountrySpecificTexts;
}

const readFromFile = <T>(dirent: Dirent, fileName: string): T =>
  require(`../countrySpecific/${dirent.name}/${fileName}`);

export class CountryRepository {
  private countries: Country[];

  constructor() {
    console.log('Reading countries from files...');
    this.countries = this.readCountriesFromFiles();
  }

  private readCountriesFromFiles = (): Country[] =>
    readdirSync(countriesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => {
        const { countrySpecificConfig } = readFromFile<ConfigFile>(
          dirent,
          'config.ts'
        );
        const { countrySpecificTexts } = readFromFile<TextVariablesFile>(
          dirent,
          'text-variables.ts'
        );
        return {
          url: countrySpecificConfig.BASE_URL,
          countryCode: countrySpecificConfig.COUNTRY_CODE,
          mapCenter: countrySpecificConfig.MAP_CENTER,
          countryName: countrySpecificTexts.COUNTRY_NAME
        };
      });

  public getCountries(): Country[] {
    return this.countries;
  }
}
