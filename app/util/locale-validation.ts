import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';

/**
 * Check that a locale (or "translation") contains valid JSON. Returns the
 * JSONParseError if the provided JSON is invalid.
 *
 * This is a common mistake developers make in this project, so we check each
 * JSON locale translation and notify developer when starting server if any errors
 * in the JSON are present.
 */
export function checkIfValidLocaleJSON(
  filename: string,
  json: string
): string | null {
  try {
    JSON.parse(json);
    return null;
  } catch (error) {
    const hint = `${filename} locale has a JSON syntax error. Have you forgotten a comma (,)?`;
    return [hint, error.message].join('\n');
  }
}

/**
 * Throw exception if function above fails. Called on server boot.
 */
export function ensureAllLocalesAreValidJSON(): void {
  const localesPath = 'app/locales';
  readdirSync(localesPath)
    .filter((filename: string) => filename.endsWith('.json'))
    .map((localeFilename: string) => join(localesPath, localeFilename))
    .forEach((localePath: string) => {
      const json = readFileSync(localePath, 'utf-8');
      const message = checkIfValidLocaleJSON(localePath, json);
      if (message) {
        throw new Error(message);
      }
    });
}
