/**
 * Base class for identity-related errors
 */
export class IdentityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IdentityError';
  }
}

/**
 * Error name constants
 */
export const ERROR_NAMES = {
  IDENTITY: 'IdentityError',
  AUTHENTICATION_EXPIRED: 'AuthenticationExpiredError',
  SESSION_KEY_MISMATCH: 'SessionKeyMismatchError',
} as const;

/**
 * Error thrown when authentication has expired
 */
export class AuthenticationExpiredError extends IdentityError {
  constructor() {
    super('Authentication has expired. Please log in again.');
    this.name = ERROR_NAMES.AUTHENTICATION_EXPIRED;
  }
}

/**
 * Error thrown when the session key doesn't match the authorized key in the delegation chain
 */
export class SessionKeyMismatchError extends IdentityError {
  constructor() {
    super('Security Alert: The session key does not match the key authorized in the delegation chain. This could allow unauthorized access to your account. Please log out and log in again to establish a new, valid delegation chain.');
    this.name = ERROR_NAMES.SESSION_KEY_MISMATCH;
  }
}