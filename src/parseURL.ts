import { normalizePath } from './normalizePath';
import { StringRecord } from './types';
import { paramsToObject } from './paramsToObject';

/**
 * Parses a URL and returns the pathname and search parameters.
 * @template SearchParams - The type of search parameters to extract
 * @template HashParams - The type of hash parameters to extract
 * @param url - The URL to parse
 * @returns An object containing the pathname and search parameters.
 */
export const parseURL = <SearchParams extends StringRecord = StringRecord, HashParams extends StringRecord = StringRecord>(
  url: string
): {
  pathname: string;
  searchParams: SearchParams;
  hashParams: HashParams;
} => {
  const parsedUrl = new URL(url);
  const pathname = normalizePath(parsedUrl.pathname);

  const searchParams = paramsToObject(parsedUrl.searchParams) as SearchParams;
  const hashParams = paramsToObject(new URLSearchParams(parsedUrl.hash.slice(1))) as HashParams;

  return {
    pathname,
    searchParams,
    hashParams,
  };
};