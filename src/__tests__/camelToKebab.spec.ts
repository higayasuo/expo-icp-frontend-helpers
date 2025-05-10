import { describe, it, expect } from 'vitest';
import { camelToKebab } from '../camelToKebab';

describe('camelToKebab', () => {
  it('should convert single camelCase word to kebab-case', () => {
    expect(camelToKebab('helloWorld')).toBe('hello-world');
  });

  it('should convert multiple camelCase words to kebab-case', () => {
    expect(camelToKebab('helloWorldToday')).toBe('hello-world-today');
  });

  it('should handle single word without camelCase', () => {
    expect(camelToKebab('hello')).toBe('hello');
  });

  it('should handle empty string', () => {
    expect(camelToKebab('')).toBe('');
  });

  it('should handle string with numbers', () => {
    expect(camelToKebab('hello123World')).toBe('hello123-world');
  });

  it('should handle string with consecutive uppercase letters', () => {
    expect(camelToKebab('helloWORLD')).toBe('hello-world');
  });

  it('should handle string with all uppercase letters', () => {
    expect(camelToKebab('HELLOWORLD')).toBe('helloworld');
  });
});