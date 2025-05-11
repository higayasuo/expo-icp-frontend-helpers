import { URLParamsObject } from "./types";
import { camelToKebab } from "./camelToKebab";

/**
 * Updates URLSearchParams with the properties of an object.
 * Converts camelCase keys to kebab-case and skips null, undefined, and empty string values.
 *
 * @template T - The type of the object to update the parameters with
 * @param params - The URLSearchParams to update
 * @param obj - The object containing values to add to the URLSearchParams
 *
 * @example
 * const params = new URLSearchParams();
 * updateParams(params, { userId: '123', userName: 'john' });
 * console.log(params.toString()); // 'user-id=123&user-name=john'
 *
 * @example
 * // Skip null, undefined, and empty string values
 * const params = new URLSearchParams();
 * updateParams(params, {
 *   userId: '123',
 *   userName: '',
 *   age: null,
 *   isActive: undefined
 * });
 * console.log(params.toString()); // 'user-id=123'
 */
export const updateParams = <T extends URLParamsObject>(
  params: URLSearchParams,
  obj: T
): void => {
  for (const [key, value] of Object.entries(obj)) {
    if (value != null && value !== '') {
      params.set(camelToKebab(key), String(value));
    }
  }
};

