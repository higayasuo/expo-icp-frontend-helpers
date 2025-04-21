import { describe, it, expect, beforeEach } from 'vitest';
import { determineIframe } from '../determineIframe';

describe('determineIframe', () => {
  beforeEach(() => {
    // Initialize window object for each test
    global.window = {} as Window & typeof globalThis;
  });

  it('should return false when window is undefined', () => {
    // @ts-expect-error - Testing window undefined case
    global.window = undefined;
    expect(determineIframe()).toBe(false);
  });

  it('should return false when window.parent is undefined', () => {
    // @ts-expect-error - Testing parent undefined case
    global.window.parent = undefined;
    expect(determineIframe()).toBe(false);
  });

  it('should return false when window.parent is the same as window', () => {
    global.window.parent = global.window;
    expect(determineIframe()).toBe(false);
  });

  it('should return true when window.parent is different from window', () => {
    const mockParent = {} as Window & typeof globalThis;
    global.window.parent = mockParent;
    expect(determineIframe()).toBe(true);
  });
});
