import { describe, it, expect } from 'vitest';
import { comparePaths } from '../comparePaths';

describe('comparePaths', () => {
  it('should return true for identical paths', () => {
    expect(comparePaths('/aaa/bbb', '/aaa/bbb')).toBe(true);
    expect(comparePaths('/aaa/bbb/', '/aaa/bbb/')).toBe(true);
  });

  it('should return false for paths with different trailing slashes', () => {
    expect(comparePaths('/aaa/bbb/', '/aaa/bbb')).toBe(false);
    expect(comparePaths('/aaa/bbb', '/aaa/bbb/')).toBe(false);
  });

  it('should return true for paths with different leading slashes', () => {
    expect(comparePaths('aaa/bbb', '/aaa/bbb')).toBe(true);
    expect(comparePaths('/aaa/bbb', 'aaa/bbb')).toBe(true);
  });

  it('should return true for paths with multiple consecutive slashes', () => {
    expect(comparePaths('/aaa///bbb', '/aaa/bbb')).toBe(true);
    expect(comparePaths('/aaa/bbb', '/aaa///bbb')).toBe(true);
  });

  it('should return false for different paths', () => {
    expect(comparePaths('/aaa/bbb', '/aaa/ccc')).toBe(false);
    expect(comparePaths('/aaa/bbb', '/aaa/bbb/ccc')).toBe(false);
  });

  it('should handle empty paths', () => {
    expect(comparePaths('', '')).toBe(true);
    expect(comparePaths('', '/')).toBe(true);
    expect(comparePaths('/', '')).toBe(true);
  });

  it('should handle root path', () => {
    expect(comparePaths('/', '/')).toBe(true);
    expect(comparePaths('', '/')).toBe(true);
    expect(comparePaths('/', '')).toBe(true);
  });

  it('should treat paths with dots as different paths', () => {
    expect(comparePaths('/aaa/./bbb', '/aaa/bbb')).toBe(false);
    expect(comparePaths('/aaa/../bbb', '/bbb')).toBe(false);
  });
});