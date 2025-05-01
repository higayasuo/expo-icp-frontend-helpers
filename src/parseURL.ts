import { normalizePath } from "./normalizePath";

/**
 * Parses the current URL and returns an object containing the pathname and search parameters.
 * The search parameters are type-safe based on the provided generic type.
 *
 * @template T - The type of search parameters to extract
 * @returns {Object} An object containing pathname and search parameters
 * @returns {string} returns.pathname - The pathname part of the URL
 * @returns {T} returns.searchParams - The search parameters as an object of type T
 */
export const parseURL = <T extends Record<string, string | undefined>>(): {
  pathname: string;
  searchParams: T;
} => {
  if (typeof window === 'undefined') {
    throw new Error('parseURL can only be used in browser environments');
  }

  const url = new URL(window.location.href);
  const searchParams = Object.fromEntries(url.searchParams) as T;

  return {
    pathname: normalizePath(url.pathname),
    searchParams,
  };
};