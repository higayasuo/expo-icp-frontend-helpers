import { describe, it, expect } from 'vitest';
import { kebabToCamel } from '../kebabToCamel';

describe('kebabToCamel', () => {
  it('should convert single kebab-case word to camelCase', () => {
    expect(kebabToCamel('hello-world')).toBe('helloWorld');
  });

  it('should convert multiple kebab-case words to camelCase', () => {
    expect(kebabToCamel('hello-world-today')).toBe('helloWorldToday');
  });

  it('should handle single word without kebab', () => {
    expect(kebabToCamel('hello')).toBe('hello');
  });

  it('should handle empty string', () => {
    expect(kebabToCamel('')).toBe('');
  });

  it('should handle string with multiple consecutive hyphens', () => {
    expect(kebabToCamel('hello--world')).toBe('helloWorld');
  });

  it('should handle string with hyphens at the beginning or end', () => {
    expect(kebabToCamel('-hello-world-')).toBe('helloWorld');
  });

  it('should handle string with uppercase letters after hyphens', () => {
    expect(kebabToCamel('hello-WORLD')).toBe('helloWORLD');
  });
});