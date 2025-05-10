import { describe, it, expect } from 'vitest';
import { parseParams } from '../parseParams';

describe('parseParams', () => {
  it('should parse query string to object', () => {
    const result = parseParams<{ id: string }>('id=123');
    expect(result).toEqual({ id: '123' });
  });

  it('should parse hash to object', () => {
    const result = parseParams<{ id: string }>('#id=123');
    expect(result).toEqual({ id: '123' });
  });

  it('should convert kebab-case keys to camelCase', () => {
    const result = parseParams<{ userId: string }>('user-id=123');
    expect(result).toEqual({ userId: '123' });
  });

  it('should handle multiple parameters', () => {
    const result = parseParams<{ userId: string; userName: string }>('user-id=123&user-name=john');
    expect(result).toEqual({ userId: '123', userName: 'john' });
  });

  it('should handle empty string values', () => {
    const result = parseParams<{ id: string }>('id=');
    expect(result).toEqual({ id: undefined });
  });

  it('should handle multiple empty string values', () => {
    const result = parseParams<{ id: string; name: string }>('id=&name=');
    expect(result).toEqual({ id: undefined, name: undefined });
  });

  it('should throw error when required parameter is missing', () => {
    expect(() => {
      parseParams<{ id: string }>('', 'id');
    }).toThrow('Missing required parameters: id');
  });

  it('should throw error when multiple required parameters are missing', () => {
    expect(() => {
      parseParams<{ id: string; name: string }>('', 'id', 'name');
    }).toThrow('Missing required parameters: id, name');
  });

  it('should handle required parameters in kebab-case', () => {
    const result = parseParams<{ userId: string }>('user-id=123', 'userId');
    expect(result).toEqual({ userId: '123' });
  });

  it('should handle required parameters in kebab-case', () => {
    const result = parseParams<{ userId: string; userName: string }>('user-id=123&user-name=john', 'userId', 'userName');
    expect(result).toEqual({ userId: '123', userName: 'john' });
  });

  it('should handle required parameters in camelCase', () => {
    const result = parseParams<{ userId: string }>('userId=123', 'userId');
    expect(result).toEqual({ userId: '123' });
  });

  it('should handle mixed case parameters', () => {
    const result = parseParams<{ userId: string; userName: string }>('user-id=123&userName=john');
    expect(result).toEqual({ userId: '123', userName: 'john' });
  });
});