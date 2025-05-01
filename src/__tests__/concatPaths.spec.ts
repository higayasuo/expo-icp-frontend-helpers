import { describe, it, expect } from 'vitest';
import { concatPaths } from '../concatPaths';

describe('concatPaths', () => {
  it('should concatenate multiple paths', () => {
    expect(concatPaths('aaa', 'bbb', 'ccc')).toBe('/aaa/bbb/ccc');
  });

  it('should handle paths with leading slashes', () => {
    expect(concatPaths('/aaa', 'bbb', 'ccc')).toBe('/aaa/bbb/ccc');
    expect(concatPaths('aaa', '/bbb', 'ccc')).toBe('/aaa/bbb/ccc');
    expect(concatPaths('aaa', 'bbb', '/ccc')).toBe('/aaa/bbb/ccc');
  });

  it('should handle paths with trailing slashes', () => {
    expect(concatPaths('aaa/', 'bbb/', 'ccc/')).toBe('/aaa/bbb/ccc');
  });

  it('should handle paths with multiple consecutive slashes', () => {
    expect(concatPaths('aaa///', '///bbb', 'ccc')).toBe('/aaa/bbb/ccc');
  });

  it('should handle empty paths', () => {
    expect(concatPaths('', 'aaa', '')).toBe('/aaa');
    expect(concatPaths('aaa', '', 'bbb')).toBe('/aaa/bbb');
  });

  it('should handle root path', () => {
    expect(concatPaths('/', 'aaa', 'bbb')).toBe('/aaa/bbb');
    expect(concatPaths('aaa', '/', 'bbb')).toBe('/aaa/bbb');
  });

  it('should handle single path', () => {
    expect(concatPaths('aaa')).toBe('/aaa');
    expect(concatPaths('/aaa')).toBe('/aaa');
    expect(concatPaths('aaa/')).toBe('/aaa');
  });

  it('should handle no paths', () => {
    expect(concatPaths()).toBe('/');
  });
});