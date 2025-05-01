import { describe, it, expect } from 'vitest';
import { paramsToObject } from '../paramsToObject';

describe('paramsToObject', () => {
  it('should convert URLSearchParams to an object', () => {
    const params = new URLSearchParams('a=1&b=2&c=3');
    const result = paramsToObject(params);

    expect(result).toEqual({
      a: '1',
      b: '2',
      c: '3',
    });
  });

  it('should convert empty values to undefined', () => {
    const params = new URLSearchParams('a=&b=2&c=');
    const result = paramsToObject(params);

    expect(result).toEqual({
      a: undefined,
      b: '2',
      c: undefined,
    });
  });

  it('should handle empty URLSearchParams', () => {
    const params = new URLSearchParams('');
    const result = paramsToObject(params);

    expect(result).toEqual({});
  });

  it('should handle URLSearchParams with duplicate keys', () => {
    const params = new URLSearchParams('a=1&a=2&b=3');
    const result = paramsToObject(params);

    expect(result).toEqual({
      a: '2', // Last value is kept
      b: '3',
    });
  });

  it('should handle URLSearchParams with special characters', () => {
    const params = new URLSearchParams('a=hello%20world&b=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF');
    const result = paramsToObject(params);

    expect(result).toEqual({
      a: 'hello world',
      b: 'こんにちは',
    });
  });
});