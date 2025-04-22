# expo-icp-frontend-helpers

Helper functions for integrating Expo and ICP frontend. Provides deep linking, iframe detection, and other frontend utilities.

## Installation

```bash
npm install expo-icp-frontend-helpers
```

## Dependencies

This package requires the following dependencies:

- `canister-manager` (>=0.1.7) as peer dependency
- `@higayasuo/u8a-utils` (>=0.1.0) as dependency

Make sure they are installed in your project:

```bash
npm install canister-manager@^0.1.7
```

## Features

### Identity Management

#### `buildIdentity`

Builds a delegation identity from an app key and delegation chain, with security checks.

```typescript
import { buildIdentity } from 'expo-icp-frontend-helpers';
import { Ed25519KeyIdentity, DelegationChain } from '@dfinity/identity';

const identity = await buildIdentity({
  appKey: Ed25519KeyIdentity.generate(),
  delegationChain: await DelegationChain.create(
    delegationKey,
    appKey.getPublicKey(),
    expirationDate,
  ),
});
```

The function performs the following security checks:
- Validates the delegation chain is not expired
- Verifies the app key matches the public key in the delegation chain

Throws an error with a clear message if:
- Authentication has expired (please log in again) - `AuthenticationExpiredError`
- The app key does not match the delegation chain's public key - `SessionKeyMismatchError`

Example error handling:
```typescript
import { isAuthenticationExpiredError, isSessionKeyMismatchError } from 'expo-icp-frontend-helpers';

// Example of handling authentication expiration
async function handleIdentity() {
  try {
    const identity = await buildIdentity({ appKey, delegationChain });
    // Use the identity for authenticated operations
    return identity;
  } catch (error) {
    if (isAuthenticationExpiredError(error)) {
      // Clear any stored authentication data
      await clearStoredAuthData();

      // Show a user-friendly message
      showToast('Your session has expired. Please log in again.');

      // Redirect to login page
      navigateToLogin();

      // Optionally, you can return null or throw a different error
      return null;
    } else if (isSessionKeyMismatchError(error)) {
      // Handle session key mismatch
      // e.g., clear session and redirect to login
    } else {
      // Handle other errors
      throw error;
    }
  }
}

// Example helper functions
async function clearStoredAuthData() {
  // Clear local storage or secure storage
  await AsyncStorage.removeItem('authData');
  await AsyncStorage.removeItem('delegationChain');
}

function showToast(message: string) {
  // Show toast using your preferred toast library
  Toast.show({
    type: 'error',
    text1: 'Authentication Error',
    text2: message,
  });
}

function navigateToLogin() {
  // Navigate to login screen using your navigation library
  navigation.navigate('Login');
}
```

### Deep Link Management

#### `DeepLinkType`

```typescript
import { DeepLinkType } from 'expo-icp-frontend-helpers';

// Example usage
const linkType = DeepLinkType.ICP;
```

Available types:
- `'icp'`: For ICP canister URLs
- `'dev-server'`: For local development server (http://localhost:8081)
- `'expo-go'`: For Expo Go app (exp://)
- `'legacy'`: For legacy Expo deep links
- `'modern'`: For modern Expo deep links (HTTPS only)

#### `isDeepLinkType`

```typescript
import { isDeepLinkType } from 'expo-icp-frontend-helpers';

// Example usage
const isValid = isDeepLinkType('icp'); // true
const isInvalid = isDeepLinkType('unknown'); // false
```

Validates if a given string is a valid DeepLinkType.

#### `getDeepLinkType`

```typescript
import { getDeepLinkType } from 'expo-icp-frontend-helpers';

// Example usage
const linkType = await getDeepLinkType({
  easDeepLinkType: 'modern',
  deepLink: 'https://example.com',
  frontendCanisterId: 'abc123',
});
```

Determines the deep link type based on:
- URL scheme (exp://, http://localhost:8081)
- Frontend canister ID presence
- EAS deep link type (legacy or modern)

#### `buildDeepLink`

```typescript
import { buildDeepLink } from 'expo-icp-frontend-helpers';

// Example usage
const deepLink = buildDeepLink({
  deepLinkType: 'icp',
  localIPAddress: '192.168.1.1',
  dfxNetwork: 'local',
  frontendCanisterId: 'abc123',
  expoScheme: 'myapp',
});
```

Builds the appropriate deep link URL based on the provided configuration:
- For 'icp': Returns the frontend canister URL
- For 'dev-server': Returns 'http://localhost:8081/'
- For 'expo-go': Returns 'exp://{localIPAddress}:8081/--/'
- For 'legacy': Returns '{expoScheme}://'
- For 'modern': Returns the frontend canister URL (must be HTTPS)

### Iframe Detection

#### `determineIframe`

```typescript
import { determineIframe } from 'expo-icp-frontend-helpers';

// Example usage
const isIframe = determineIframe();
```

Returns `true` if the code is running inside an iframe, `false` otherwise.
