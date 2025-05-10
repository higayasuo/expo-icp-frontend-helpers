import { StringRecord } from "./types";
import { kebabToCamel } from "./kebabToCamel";
import { camelToKebab } from "./camelToKebab";

/**
 * Parses a query string into an object with type safety and mandatory parameter validation.
 * Converts kebab-case parameter keys to camelCase.
 * @template T - The type of the parameters object
 * @param paramsStr - The query string to parse
 * @param requiredKeys - Keys that must be present in the query string (in camelCase)
 * @returns An object containing the parsed parameters with camelCase keys
 * @throws {Error} If any required parameter is missing
 */
export const parseParams = <T extends StringRecord>(paramsStr: string, ...requiredKeys: (keyof T)[]) => {
  // Remove hash if present
  const cleanStr = paramsStr.startsWith('#') ? paramsStr.slice(1) : paramsStr;
  const params = new URLSearchParams(cleanStr);
  const result: T = {} as T;

  // Check if all required parameters exist (check both kebab-case and camelCase)
  const missingParams = requiredKeys.filter(key => {
    const kebabKey = camelToKebab(key as string);
    return !params.has(key as string) && !params.has(kebabKey);
  });

  if (missingParams.length > 0) {
    throw new Error(`Missing required parameters: ${missingParams.join(', ')}`);
  }

  // Parse all parameters
  for (const [key, value] of params.entries()) {
    // Convert kebab-case keys to camelCase
    const camelKey = kebabToCamel(key);
    // Convert empty strings to undefined
    result[camelKey as keyof T] = (value === '' ? undefined : value) as T[keyof T];
  }

  return result;
};
