import { describe, it, expect } from 'vitest';
import {
  DeepLinkType,
  DEEP_LINK_TYPES,
  isDeepLinkType,
} from '../DeepLinkType';

describe('DeepLinkType', () => {
  describe('isDeepLinkType', () => {
    it('should return true for valid deep link type values', () => {
      DEEP_LINK_TYPES.forEach((type) => {
        expect(isDeepLinkType(type)).toBe(true);
      });
    });

    it('should return false for invalid deep link type values', () => {
      const invalidTypes = [
        '',
        'invalid',
        'ICP',
        'DEV_SERVER',
        'unknown',
        'web',
        'android',
      ];

      invalidTypes.forEach((invalidType) => {
        expect(isDeepLinkType(invalidType)).toBe(false);
      });
    });
  });
});
