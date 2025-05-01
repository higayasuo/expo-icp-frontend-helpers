import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { parseURL } from '../parseURL';

describe('parseURL', () => {
  const originalWindow = global.window;

  beforeEach(() => {
    // Mock window.location
    global.window = {
      location: {
        href: 'https://example.com/aaa/bbb/?bbb=xxx&ccc=yyy',
      },
    } as unknown as Window & typeof globalThis;
  });

  afterEach(() => {
    // Restore original window
    global.window = originalWindow;
  });

  it('should throw error when used in non-browser environment', () => {
    // @ts-expect-error - Testing window undefined case
    global.window = undefined;
    expect(() => parseURL()).toThrow('parseURL can only be used in browser environments');
  });

  it('should correctly parse URL with pathname and search params', () => {
    type SearchParams = {
      bbb?: string;
      ccc?: string;
    };

    const result = parseURL<SearchParams>();

    expect(result).toEqual({
      pathname: '/aaa/bbb',
      searchParams: {
        bbb: 'xxx',
        ccc: 'yyy',
      },
    });
  });

  it('should handle URLs with trailing slash in pathname', () => {
    global.window.location.href = 'https://example.com/aaa/bbb/?';

    type SearchParams = Record<string, string | undefined>;

    const result = parseURL<SearchParams>();

    expect(result).toEqual({
      pathname: '/aaa/bbb',
      searchParams: {},
    });
  });

  it('should handle URLs with multiple consecutive slashes in pathname', () => {
    global.window.location.href = 'https://example.com/aaa///bbb/?';

    type SearchParams = Record<string, string | undefined>;

    const result = parseURL<SearchParams>();

    expect(result).toEqual({
      pathname: '/aaa/bbb',
      searchParams: {},
    });
  });

  it('should handle URLs with empty pathname', () => {
    global.window.location.href = 'https://example.com/?';

    type SearchParams = Record<string, string | undefined>;

    const result = parseURL<SearchParams>();

    expect(result).toEqual({
      pathname: '/',
      searchParams: {},
    });
  });

  it('should handle URLs without search params', () => {
    global.window.location.href = 'https://example.com/aaa';

    type SearchParams = Record<string, string | undefined>;

    const result = parseURL<SearchParams>();

    expect(result).toEqual({
      pathname: '/aaa',
      searchParams: {},
    });
  });

  it('should handle URLs with empty search params', () => {
    global.window.location.href = 'https://example.com/aaa?';

    type SearchParams = Record<string, string | undefined>;

    const result = parseURL<SearchParams>();

    expect(result).toEqual({
      pathname: '/aaa',
      searchParams: {},
    });
  });

  it('should handle URLs with multiple search params', () => {
    global.window.location.href = 'https://example.com/aaa?a=1&b=2&c=3';

    type SearchParams = {
      a?: string;
      b?: string;
      c?: string;
    };

    const result = parseURL<SearchParams>();

    expect(result).toEqual({
      pathname: '/aaa',
      searchParams: {
        a: '1',
        b: '2',
        c: '3',
      },
    });
  });
});