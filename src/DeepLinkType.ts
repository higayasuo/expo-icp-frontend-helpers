/**
 * Array of valid deep link types.
 */
export const DEEP_LINK_TYPES = Object.freeze([
  'icp',
  'dev-server',
  'expo-go',
  'legacy',
  'modern',
] as const);

/**
 * Type representing a valid deep link type.
 */
export type DeepLinkType = (typeof DEEP_LINK_TYPES)[number];

/**
 * Checks if a given value is a valid deep link type.
 *
 * @param {string} value - The value to check.
 * @returns {boolean} True if the value is a valid deep link type, false otherwise.
 */
export const isDeepLinkType = (value: string): value is DeepLinkType => {
  return DEEP_LINK_TYPES.includes(value as DeepLinkType);
};
