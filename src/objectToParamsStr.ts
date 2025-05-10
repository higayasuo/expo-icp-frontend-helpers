import { StringRecord } from "./types";
import { camelToKebab } from "./camelToKebab";

/**
 * Converts an object to a query string.
 * @param obj - The object to convert
 * @returns The query string
 */
export const objectToParamsStr = <T extends Record<string, string | number | boolean | undefined>>(obj: T): string => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      params.set(camelToKebab(key), String(value));
    }
  }
  return params.toString();
};

