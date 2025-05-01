import { normalizePath } from "./normalizePath";

/**
 * Compares two paths after normalizing them to ensure they are in a consistent format.
 * @param {string} path1 - The first path to compare.
 * @param {string} path2 - The second path to compare.
 * @returns {boolean} True if the paths are equal after normalization, false otherwise.
 */
export const comparePaths = (path1: string, path2: string) => {
  const normalizedPath1 = normalizePath(path1);
  const normalizedPath2 = normalizePath(path2);
  return normalizedPath1 === normalizedPath2;
};
