# expo-icp-frontend-helpers

Helper functions for integrating Expo and ICP frontend. Provides deep linking, iframe detection, and other frontend utilities.

## Installation

```bash
npm install expo-icp-frontend-helpers
```

## Peer Dependencies

This package requires the following peer dependency:

- `canister-manager` (>=0.1.7)

Make sure it is installed in your project:

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
- The delegation chain has expired
- The app key does not match the delegation chain's public key

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

#### `isInIframe`

```typescript
import { isInIframe } from 'expo-icp-frontend-helpers';

// Example usage
const isIframe = isInIframe();
```

Returns `true` if the code is running inside an iframe, `false` otherwise.

### URL Validation

#### `isValidUrl`

```typescript
import { isValidUrl } from 'expo-icp-frontend-helpers';

// Example usage
const isValid = isValidUrl('https://example.com');
```

Returns `true` if the provided string is a valid URL, `false` otherwise.

### Environment Detection

#### `getEnvironment`

```typescript
import { getEnvironment } from 'expo-icp-frontend-helpers';

// Example usage
const env = getEnvironment();
```

Returns the current environment:
- `'development'`: When running in development mode
- `'production'`: When running in production mode
- `'test'`: When running in test mode
