/**
 * Converts a kebab-case string to camelCase.
 *
 * @param str - The kebab-case string to convert.
 * @returns The camelCase equivalent of the input string.
 */
export const kebabToCamel = (str: string) => {
  // Remove leading and trailing hyphens
  const trimmed = str.replace(/^-+|-+$/g, '');
  // Replace all hyphens (including consecutive ones) and convert the following character to uppercase
  return trimmed.replace(/-+([a-zA-Z])/g, (_, char) => char.toUpperCase());
};
