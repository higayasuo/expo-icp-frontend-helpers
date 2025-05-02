import { describe, it, expect } from 'vitest';
import { parseURL } from '../parseURL';

describe('parseURL', () => {
  it('should correctly parse URL with pathname, search params, and hash params when used without type parameters', () => {
    const url = 'https://example.com/aaa/bbb/?bbb=xxx&ccc=yyy#ddd=zzz&eee=www';
    const result = parseURL(url);

    expect(result).toEqual({
      pathname: '/aaa/bbb/',
      searchParams: {
        bbb: 'xxx',
        ccc: 'yyy',
      },
      hashParams: {
        ddd: 'zzz',
        eee: 'www',
      },
    });

    // Type checking
    expect(result.searchParams.bbb).toBe('xxx');
    expect(result.searchParams.ccc).toBe('yyy');
    expect(result.hashParams.ddd).toBe('zzz');
    expect(result.hashParams.eee).toBe('www');
  });

  it('should correctly parse URL with pathname, search params, and hash params', () => {
    type SearchParams = {
      bbb?: string;
      ccc?: string;
    };

    type HashParams = {
      ddd?: string;
      eee?: string;
    };

    const url = 'https://example.com/aaa/bbb/?bbb=xxx&ccc=yyy#ddd=zzz&eee=www';
    const result = parseURL<SearchParams, HashParams>(url);

    expect(result).toEqual({
      pathname: '/aaa/bbb/',
      searchParams: {
        bbb: 'xxx',
        ccc: 'yyy',
      },
      hashParams: {
        ddd: 'zzz',
        eee: 'www',
      },
    });
  });

  it('should handle URLs with only search params', () => {
    const url = 'https://example.com/aaa/bbb/?bbb=xxx&ccc=yyy';
    const result = parseURL(url);

    expect(result).toEqual({
      pathname: '/aaa/bbb/',
      searchParams: {
        bbb: 'xxx',
        ccc: 'yyy',
      },
      hashParams: {},
    });
  });

  it('should handle URLs with only hash params', () => {
    const url = 'https://example.com/aaa/bbb/#ddd=zzz&eee=www';
    const result = parseURL(url);

    expect(result).toEqual({
      pathname: '/aaa/bbb/',
      searchParams: {},
      hashParams: {
        ddd: 'zzz',
        eee: 'www',
      },
    });
  });

  it('should handle URLs with trailing slash in pathname', () => {
    const url = 'https://example.com/aaa/bbb/?';
    const result = parseURL(url);

    expect(result).toEqual({
      pathname: '/aaa/bbb/',
      searchParams: {},
      hashParams: {},
    });
  });

  it('should handle URLs with multiple consecutive slashes in pathname', () => {
    const url = 'https://example.com/aaa///bbb/?';
    const result = parseURL(url);

    expect(result).toEqual({
      pathname: '/aaa/bbb/',
      searchParams: {},
      hashParams: {},
    });
  });

  it('should handle URLs with empty pathname', () => {
    const url = 'https://example.com/?';
    const result = parseURL(url);

    expect(result).toEqual({
      pathname: '/',
      searchParams: {},
      hashParams: {},
    });
  });

  it('should handle URLs without search params', () => {
    const url = 'https://example.com/aaa';
    const result = parseURL(url);

    expect(result).toEqual({
      pathname: '/aaa',
      searchParams: {},
      hashParams: {},
    });
  });

  it('should handle URLs with empty search params', () => {
    const url = 'https://example.com/aaa?';
    const result = parseURL(url);

    expect(result).toEqual({
      pathname: '/aaa',
      searchParams: {},
      hashParams: {},
    });
  });

  it('should handle exp:// URLs', () => {
    const url = 'exp://192.168.0.210/--/';
    const result = parseURL(url);

    expect(result).toEqual({
      pathname: '/--/',
      searchParams: {},
      hashParams: {},
    });
  });
});