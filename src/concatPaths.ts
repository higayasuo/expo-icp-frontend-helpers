import { normalizePath } from "./normalizePath";

/**
 * Concatenates multiple paths into a single normalized path.
 * @param {...string} paths - The paths to concatenate.
 * @returns {string} The concatenated and normalized path.
 */
export const concatPaths = (...paths: string[]) => {
  return normalizePath(paths.join('/'));
};
