/**
 * Determines if the current window is an iframe.
 *
 * @returns {boolean} True if the current window is an iframe, false otherwise.
 */
export const determineIframe = (): boolean => {
  return typeof window !== 'undefined' && window.parent !== undefined && window.parent !== window;
};
