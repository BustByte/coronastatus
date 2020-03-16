import { readFileSync } from 'fs';
import { resolve, join } from 'path';

const hasEnglishCharsOnly = (word: string): boolean => {
  return word.match('^[a-zA-Z]+$') !== null;
};
class PasscodeCreator {
  availableWords: string[];
  digitsInNumber: number;
  separator: string;

  constructor(
    filePath = '../../wordList.txt',
    digitsInNumber = 2,
    separator = '-'
  ) {
    this.availableWords = this.readAvailableWordsFromFile(filePath);
    this.digitsInNumber = digitsInNumber;
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

  private getRandomDigitString(
    digitsInNumber: number = this.digitsInNumber
  ): string {
    return `${Math.random()}`.substring(2, 2 + digitsInNumber);
  }

  createPasscode(): string {
    return `${this.selectRandomWord()}-${this.selectRandomWord()}-${this.getRandomDigitString()}`;
  }
}

let instance: PasscodeCreator | undefined;
export const getPasscodeCreator = (): PasscodeCreator => {
  if (!instance) {
    instance = new PasscodeCreator();
  }
  return instance;
};
