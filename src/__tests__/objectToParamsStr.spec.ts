import { describe, it, expect } from 'vitest';
import { objectToParamsStr } from '../objectToParamsStr';

describe('objectToParamsStr', () => {
  it('should convert object to query string', () => {
    const result = objectToParamsStr({ id: '123' });
    expect(result).toBe('id=123');
  });

  it('should convert camelCase keys to kebab-case', () => {
    const result = objectToParamsStr({ userId: '123' });
    expect(result).toBe('user-id=123');
  });

  it('should handle multiple parameters', () => {
    const result = objectToParamsStr({ userId: '123', userName: 'john' });
    expect(result).toBe('user-id=123&user-name=john');
  });

  it('should handle undefined values', () => {
    const result = objectToParamsStr({ id: '123', name: undefined });
    expect(result).toBe('id=123');
  });

  it('should handle empty object', () => {
    const result = objectToParamsStr({});
    expect(result).toBe('');
  });

  it('should handle numbers', () => {
    const result = objectToParamsStr({ userId: 123 });
    expect(result).toBe('user-id=123');
  });

  it('should handle boolean values', () => {
    const result = objectToParamsStr({ isActive: true });
    expect(result).toBe('is-active=true');
  });

  it('should handle special characters in values', () => {
    const result = objectToParamsStr({ query: 'hello world' });
    expect(result).toBe('query=hello+world');
  });

  it('should handle multiple words in camelCase keys', () => {
    const result = objectToParamsStr({ userProfileId: '123' });
    expect(result).toBe('user-profile-id=123');
  });
});