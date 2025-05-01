import { StringRecord } from './types';

/**
 * Converts URLSearchParams to an object with optional string values.
 * Empty string values are converted to undefined.
 *
 * @param params - The URLSearchParams to convert
 * @returns An object with the same keys as params, where empty values are undefined
 */
export const paramsToObject = (params: URLSearchParams): StringRecord => {
  return Object.fromEntries(
    Array.from(params).map(([key, value]) => [key, value || undefined])
  );
};