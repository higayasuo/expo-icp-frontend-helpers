import { describe, it, expect } from 'vitest';
import { normalizePath } from '../normalizePath';

describe('normalizePath', () => {
  it('should add leading slash when missing', () => {
    expect(normalizePath('hoge')).toBe('/hoge');
  });

  it('should keep leading slash when present', () => {
    expect(normalizePath('/hoge')).toBe('/hoge');
  });

  it('should keep trailing slash when present', () => {
    expect(normalizePath('/hoge/')).toBe('/hoge/');
  });

  it('should handle empty string', () => {
    expect(normalizePath('')).toBe('/');
  });

  it('should handle single slash', () => {
    expect(normalizePath('/')).toBe('/');
  });

  it('should handle multiple slashes', () => {
    expect(normalizePath('//hoge//')).toBe('/hoge/');
  });

  it('should handle nested paths', () => {
    expect(normalizePath('hoge/fuga/')).toBe('/hoge/fuga/');
  });
});
