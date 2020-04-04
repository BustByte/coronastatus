import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import config from '../config';

const hasEnglishCharsOnly = (word: string): boolean => {
  return word.match('^[a-zA-Z]+$') !== null;
};
class PasscodeCreator {
  private availableWords: string[];
  private separator: string;

  constructor(
    filePath = `../countrySpecific/${config.COUNTRY_CODE}/word-list.txt`,
    separator = '-'
  ) {
    this.availableWords = this.readAvailableWordsFromFile(filePath);
    this.separator = separator;
  }

  readAvailableWordsFromFile(filePath: string): string[] {
    const data = readFileSync(resolve(join(__dirname, filePath)), 'UTF-8');
    return data.split(/\r?\n/).filter(hasEnglishCharsOnly);
  }

  private selectRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * this.availableWords.length);
    return this.availableWords[randomIndex];
  }

  createPasscode(): string {
    return [...Array(config.PASSCODE_LENGTH)]
      .map(() => this.selectRandomWord())
      .join(this.separator);
  }
}

let instance: PasscodeCreator | undefined;
export const getPasscodeCreator = (): PasscodeCreator => {
  if (!instance) {
    instance = new PasscodeCreator();
  }
  return instance;
};
