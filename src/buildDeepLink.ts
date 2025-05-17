import { CanisterManager } from 'canister-manager';

import { DeepLinkType } from './DeepLinkType';
import { concatPaths } from './concatPaths';

/**
 * Parameters for building a deep link URL
 */
type BuildDeepLinkParams = {
  /** Type of deep link to build */
  deepLinkType: DeepLinkType;
  /** Local IP address for development */
  localIPAddress: string;
  /** DFX network to use (e.g., 'local', 'ic') */
  dfxNetwork: string;
  /** Frontend canister ID */
  frontendCanisterId: string;
  /** Expo scheme for legacy deep links */
  expoScheme: string;
  /** Path to append to the deep link */
  pathname: string;
};

/**
 * Parameters for building a deep link base URL
 */
type BuildDeepLinkBaseURLParams = {
  /** Type of deep link to build */
  deepLinkType: DeepLinkType;
  /** Local IP address for development */
  localIPAddress: string;
  /** Frontend canister URL */
  frontendCanisterURL: string;
  /** Expo scheme for legacy deep links */
  expoScheme: string;
};

/**
 * Builds a deep link URL based on the provided configuration.
 *
 * @param params - Configuration for building the deep link
 * @returns A URL object representing the complete deep link
 * @throws Error if the deep link type is not supported or if the frontend URL is not HTTPS for modern deep links
 *
 * @example
 * const url = buildDeepLink({
 *   deepLinkType: 'icp',
 *   localIPAddress: '192.168.1.1',
 *   dfxNetwork: 'local',
 *   frontendCanisterId: 'abc123',
 *   expoScheme: 'myapp',
 *   pathname: '/home'
 * });
 * console.log(url.toString()); // 'https://abc123.ic0.app/home'
 * console.log(url.pathname); // '/home'
 */
export const buildDeepLink = ({
  deepLinkType,
  localIPAddress,
  dfxNetwork,
  frontendCanisterId,
  expoScheme,
  pathname,
}: BuildDeepLinkParams): URL => {
  const canisterManager = new CanisterManager({
    localIPAddress,
    dfxNetwork,
  });
  const frontendCanisterURL =
    canisterManager.getFrontendCanisterURL(frontendCanisterId);

  const baseUrl = buildDeepLinkBaseURL({
    deepLinkType,
    localIPAddress,
    frontendCanisterURL,
    expoScheme,
  });
  baseUrl.pathname = concatPaths(baseUrl.pathname, pathname);

  return baseUrl;
};

/**
 * Builds the base URL for a deep link based on its type.
 * This function returns the root URL for each deep link type without any path or query parameters.
 *
 * @param params - Configuration for building the base URL
 * @returns A URL object representing the base URL for the deep link type
 * @throws Error if the deep link type is not supported or if the frontend URL is not HTTPS for modern deep links
 *
 * @example
 * const baseUrl = buildDeepLinkBaseURL({
 *   deepLinkType: 'icp',
 *   localIPAddress: '192.168.1.1',
 *   frontendCanisterURL: 'https://abc123.ic0.app',
 *   expoScheme: 'myapp'
 * });
 * console.log(baseUrl.toString()); // 'https://abc123.ic0.app'
 */
export const buildDeepLinkBaseURL = ({
  deepLinkType,
  localIPAddress,
  frontendCanisterURL,
  expoScheme,
}: BuildDeepLinkBaseURLParams): URL => {
  switch (deepLinkType) {
    case 'icp':
      return new URL(frontendCanisterURL);
    case 'dev-server':
      return new URL(`http://localhost:8081/`);
    case 'expo-go':
      return new URL(`exp://${localIPAddress}:8081/--/`);
    case 'legacy':
      return new URL(`${expoScheme}://`);
    case 'modern':
      if (frontendCanisterURL.startsWith('https://')) {
        return new URL(frontendCanisterURL);
      }
      throw new Error(
        `Modern deep links require HTTPS. Frontend URL is not HTTPS: ${frontendCanisterURL}`
      );
    default:
      throw new Error(
        `Unsupported deep link type: ${deepLinkType}. Supported types are: icp, dev-server, expo-go, legacy, modern`
      );
  }
};
