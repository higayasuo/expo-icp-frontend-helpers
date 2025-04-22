import { describe, it, expect } from 'vitest';
import { IdentityError, AuthenticationExpiredError, SessionKeyMismatchError, ERROR_NAMES, isAuthenticationExpiredError, isSessionKeyMismatchError } from '../identityErrors';

describe('IdentityError', () => {
  it('should create an instance with the correct name and message', () => {
    const error = new IdentityError('Test error message');
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe(ERROR_NAMES.IDENTITY);
    expect(error.message).toBe('Test error message');
  });
});

describe('AuthenticationExpiredError', () => {
  it('should create an instance with the correct name and message', () => {
    const error = new AuthenticationExpiredError();
    expect(error).toBeInstanceOf(IdentityError);
    expect(error.name).toBe(ERROR_NAMES.AUTHENTICATION_EXPIRED);
    expect(error.message).toBe('Authentication has expired. Please log in again.');
  });
});

describe('SessionKeyMismatchError', () => {
  it('should create an instance with the correct name and message', () => {
    const error = new SessionKeyMismatchError();
    expect(error).toBeInstanceOf(IdentityError);
    expect(error.name).toBe(ERROR_NAMES.SESSION_KEY_MISMATCH);
    expect(error.message).toBe('Security Alert: The session key does not match the key authorized in the delegation chain. This could allow unauthorized access to your account. Please log out and log in again to establish a new, valid delegation chain.');
  });
});

describe('Type guard functions', () => {
  it('isAuthenticationExpiredError should correctly identify AuthenticationExpiredError', () => {
    const error = new AuthenticationExpiredError();
    expect(isAuthenticationExpiredError(error)).toBe(true);
    expect(isAuthenticationExpiredError(new Error('test'))).toBe(false);
    expect(isAuthenticationExpiredError(null)).toBe(false);
    expect(isAuthenticationExpiredError(undefined)).toBe(false);
  });

  it('isSessionKeyMismatchError should correctly identify SessionKeyMismatchError', () => {
    const error = new SessionKeyMismatchError();
    expect(isSessionKeyMismatchError(error)).toBe(true);
    expect(isSessionKeyMismatchError(new Error('test'))).toBe(false);
    expect(isSessionKeyMismatchError(null)).toBe(false);
    expect(isSessionKeyMismatchError(undefined)).toBe(false);
  });
});