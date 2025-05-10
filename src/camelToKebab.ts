/**
 * Converts a camelCase string to kebab-case.
 *
 * @param str - The camelCase string to convert.
 * @returns The kebab-case equivalent of the input string.
 */
export const camelToKebab = (str: string) => {
  // Insert a hyphen before any uppercase letter and convert it to lowercase
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};