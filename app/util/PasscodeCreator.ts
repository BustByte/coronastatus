import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import { LANGUAGE } from '../../config.json';

const hasEnglishCharsOnly = (word: string): boolean => {
  return word.match('^[a-zA-Z]+$') !== null;
};
class PasscodeCreator {
  private availableWords: string[];
  private separator: string;

  constructor(
    filePath = `../locales/${LANGUAGE}-word-list.txt`,
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
    return [
      this.selectRandomWord(),
      this.selectRandomWord(),
      this.selectRandomWord()
    ].join(this.separator);
  }
}

let instance: PasscodeCreator | undefined;
export const getPasscodeCreator = (): PasscodeCreator => {
  if (!instance) {
    instance = new PasscodeCreator();
  }
  return instance;
};
