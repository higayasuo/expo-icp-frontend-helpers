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

### Deep Link Type Management

#### `DeepLinkType`

Type definition and validation for deep link types.

```typescript
import { DeepLinkType, isDeepLinkType } from 'expo-icp-frontend-helpers';

// Valid deep link types
const validTypes: DeepLinkType[] = ['icp', 'dev-server', 'expo-go', 'legacy', 'modern'];

// Type validation
const isValid = isDeepLinkType('icp'); // true
```

### Deep Link Type Determination

#### `getDeepLinkType`

Determines the type of deep link based on the URL and configuration.

```typescript
import { getDeepLinkType } from 'expo-icp-frontend-helpers';

const type = getDeepLinkType({
  easDeepLinkType: undefined, // optional
  deepLink: 'exp://localhost:8081',
  frontendCanisterId: 'your-canister-id',
});
```

Returns one of:
- `'expo-go'` - For Expo Go deep links (starts with 'exp://')
- `'dev-server'` - For development server (starts with 'http://localhost:8081')
- `'icp'` - For ICP canister URLs (contains frontendCanisterId)
- `'legacy'` or `'modern'` - When easDeepLinkType is provided and deepLink contains frontendCanisterId

### Deep Link Construction

#### `buildDeepLink`

Builds a deep link URL based on the type and configuration.

```typescript
import { buildDeepLink } from 'expo-icp-frontend-helpers';

const deepLink = buildDeepLink({
  deepLinkType: 'icp',
  localIPAddress: '192.168.1.1',
  dfxNetwork: 'local',
  frontendCanisterId: 'your-canister-id',
  expoScheme: 'yourapp',
});
```

Supports the following deep link types:
- `'icp'` - Returns the frontend canister URL
- `'dev-server'` - Returns 'http://localhost:8081/'
- `'expo-go'` - Returns 'exp://{localIPAddress}:8081/--/'
- `'legacy'` - Returns '{expoScheme}://'
- `'modern'` - Returns the frontend canister URL (requires HTTPS)

### Iframe Detection

#### `determineIframe`

Determines if the current environment is running in an iframe.

```typescript
import { determineIframe } from 'expo-icp-frontend-helpers';

const isIframe = determineIframe();
```

## License

MIT
