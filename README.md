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

### Path Manipulation

#### `normalizePath`

```typescript
import { normalizePath } from 'expo-icp-frontend-helpers';

// Example usage
const normalizedPath = normalizePath('aaa/bbb/'); // '/aaa/bbb/'
const normalizedPath2 = normalizePath('///aaa///bbb///'); // '/aaa/bbb/'
const normalizedPath3 = normalizePath(''); // '/'
```

Normalizes a path by:
- Ensuring it starts with a slash
- Preserving trailing slashes
- Handling multiple consecutive slashes
- Handling empty paths (returns '/')

#### `comparePaths`

```typescript
import { comparePaths } from 'expo-icp-frontend-helpers';

// Example usage
const isEqual = comparePaths('aaa/bbb/', '/aaa/bbb'); // false
const isEqual2 = comparePaths('///aaa///bbb', '/aaa/bbb'); // true
const isEqual3 = comparePaths('aaa/bbb', 'aaa/ccc'); // false
```

Compares two paths after normalizing them. Returns true if the paths are equal after normalization.
Note that paths with different trailing slashes are considered different paths.

#### `concatPaths`

```typescript
import { concatPaths } from 'expo-icp-frontend-helpers';

// Example usage
const path = concatPaths('aaa', 'bbb', 'ccc'); // '/aaa/bbb/ccc'
const path2 = concatPaths('/aaa', 'bbb/', 'ccc'); // '/aaa/bbb/ccc'
const path3 = concatPaths('aaa', '', 'bbb'); // '/aaa/bbb'
const path4 = concatPaths(); // '/'
```

Concatenates multiple paths into a single normalized path. Handles:
- Multiple paths
- Leading and trailing slashes
- Multiple consecutive slashes
- Empty paths
- Root path
- No paths (returns '/')

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

### URL Parsing

#### `objectToParamsStr`

```typescript
import { objectToParamsStr } from 'expo-icp-frontend-helpers';

// Example usage
const params = objectToParamsStr({ id: '123' }); // 'id=123'
const params2 = objectToParamsStr({ userId: '123' }); // 'user-id=123'
const params3 = objectToParamsStr({ userId: '123', userName: 'john' }); // 'user-id=123&user-name=john'

// With undefined values
const params4 = objectToParamsStr({ id: '123', name: undefined }); // 'id=123'

// With numbers
const params5 = objectToParamsStr({ userId: 123 }); // 'user-id=123'

// With boolean values
const params6 = objectToParamsStr({ isActive: true }); // 'is-active=true'

// With special characters
const params7 = objectToParamsStr({ query: 'hello world' }); // 'query=hello+world'

// With multiple words in camelCase
const params8 = objectToParamsStr({ userProfileId: '123' }); // 'user-profile-id=123'
```

Converts an object to a query string. Features:
- Converts camelCase keys to kebab-case
- Handles undefined values (skips them)
- Converts numbers and booleans to strings
- Handles special characters in values
- Supports multiple words in camelCase keys
- Type-safe parameters using TypeScript generics

#### `parseParams`

```typescript
import { parseParams } from 'expo-icp-frontend-helpers';

// Example usage
const params = parseParams<{ id: string }>('id=123'); // { id: '123' }
const params2 = parseParams<{ userId: string }>('user-id=123'); // { userId: '123' }
const params3 = parseParams<{ userId: string; userName: string }>('user-id=123&user-name=john'); // { userId: '123', userName: 'john' }

// With required parameters
const params4 = parseParams<{ userId: string }>('user-id=123', 'userId'); // { userId: '123' }
const params5 = parseParams<{ userId: string; userName: string }>('user-id=123&user-name=john', 'userId', 'userName'); // { userId: '123', userName: 'john' }

// Empty values
const params6 = parseParams<{ id: string }>('id='); // { id: undefined }
const params7 = parseParams<{ id: string; name: string }>('id=&name='); // { id: undefined, name: undefined }

// Hash parameters
const params8 = parseParams<{ id: string }>('#id=123'); // { id: '123' }
```

Parses a query string into an object with type safety and mandatory parameter validation. Features:
- Converts kebab-case parameter keys to camelCase
- Handles required parameters validation
- Converts empty string values to undefined
- Handles hash parameters (removes # prefix)
- Type-safe parameters using TypeScript generics
- Supports both kebab-case and camelCase for required parameters

Throws an error if any required parameter is missing:
```typescript
// This will throw: "Missing required parameters: userId"
parseParams<{ userId: string }>('', 'userId');

// This will throw: "Missing required parameters: userId, userName"
parseParams<{ userId: string; userName: string }>('', 'userId', 'userName');
```

### Case Conversion

#### `kebabToCamel`

```typescript
import { kebabToCamel } from 'expo-icp-frontend-helpers';

// Example usage
const camelCase = kebabToCamel('hello-world'); // 'helloWorld'
const camelCase2 = kebabToCamel('hello-world-today'); // 'helloWorldToday'
const camelCase3 = kebabToCamel('hello'); // 'hello'
const camelCase4 = kebabToCamel('hello--world'); // 'helloWorld'
const camelCase5 = kebabToCamel('-hello-world-'); // 'helloWorld'
const camelCase6 = kebabToCamel('hello-WORLD'); // 'helloWORLD'
```

Converts a kebab-case string to camelCase. Features:
- Converts single or multiple kebab-case words to camelCase
- Handles consecutive hyphens
- Handles hyphens at the beginning or end of the string
- Preserves uppercase letters after hyphens
- Returns the original string if no hyphens are present

#### `camelToKebab`

```typescript
import { camelToKebab } from 'expo-icp-frontend-helpers';

// Example usage
const kebabCase = camelToKebab('helloWorld'); // 'hello-world'
const kebabCase2 = camelToKebab('helloWorldToday'); // 'hello-world-today'
const kebabCase3 = camelToKebab('hello'); // 'hello'
const kebabCase4 = camelToKebab('hello123World'); // 'hello123-world'
const kebabCase5 = camelToKebab('helloWORLD'); // 'hello-world'
const kebabCase6 = camelToKebab('HELLOWORLD'); // 'helloworld'
```

Converts a camelCase string to kebab-case. Features:
- Converts single or multiple camelCase words to kebab-case
- Handles numbers in the string
- Handles consecutive uppercase letters
- Converts all characters to lowercase
- Returns the original string if no uppercase letters are present

### Browser Management

#### `openBrowser`

```typescript
import { openBrowser } from 'expo-icp-frontend-helpers';

// Example usage
await openBrowser('https://example.com');
```

Opens a URL in the device's browser. Features:
- Uses `expo-web-browser` for cross-platform browser handling
- Opens in the same window (`_self`)
- Returns a promise that resolves when the browser is opened

#### `dismissBrowser`

```typescript
import { dismissBrowser } from 'expo-icp-frontend-helpers';

// Example usage
await dismissBrowser();
```

Dismisses the currently open browser. Features:
- Uses `expo-web-browser` for cross-platform browser handling
- Waits 500ms before dismissing to ensure smooth transitions
- Returns a promise that resolves when the browser is dismissed
