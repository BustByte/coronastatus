/* eslint-disable no-undef */
import { checkIfValidLocaleJSON } from './locale-validation';

it('should return success if locale is valid JSON', () => {
  const message = checkIfValidLocaleJSON('it.json', '{"hello": "ciao"}');
  expect(message).toEqual(null);
});

it('should return error if locale is invalid JSON', () => {
  const message = checkIfValidLocaleJSON(
    'it.json',
    '{"hello": "ciao" "goodbye": "ciao"}'
  );
  const expectedMessage = [
    'it.json locale has a JSON syntax error. Have you forgotten a comma (,)?',
    'Unexpected string in JSON at position 17'
  ].join('\n');
  expect(message).toEqual(expectedMessage);
});
