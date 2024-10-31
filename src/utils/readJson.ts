import * as fs from 'fs';

/**
 * Reads a JSON file and parses its content.
 *
 * @param filePath - The path to the JSON file to read.
 * @returns A promise that resolves to the parsed JSON object.
 * @throws Will throw an error if the file cannot be read or is not valid JSON.
 */
export function readJsonFile(filePath: string): JSON {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}
