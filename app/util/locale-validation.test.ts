/* eslint-disable no-undef */
import {
  checkIfValidLocaleJSON,
  LocaleValidationResult
} from './locale-validation';

it('should return success if locale is valid JSON', () => {
  const result: LocaleValidationResult = checkIfValidLocaleJSON(
    'it.json',
    '{"hello": "ciao"}'
  );
  expect(result).toEqual({ success: true, message: null });
});

it('should return error if locale is invalid JSON', () => {
  const result: LocaleValidationResult = checkIfValidLocaleJSON(
    'it.json',
    '{"hello": "ciao" "goodbye": "ciao"}'
  );
  const expectedMessage = [
    'it.json locale has a JSON syntax error. Have you forgotten a comma (,)?',
    'Unexpected string in JSON at position 17'
  ].join('\n');
  expect(result).toEqual({ success: false, message: expectedMessage });
});
