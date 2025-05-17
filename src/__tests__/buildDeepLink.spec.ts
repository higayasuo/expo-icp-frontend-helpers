import { describe, it, expect, vi } from 'vitest';
import { buildDeepLink, buildDeepLinkBaseURL } from '../buildDeepLink';
import { CanisterManager } from 'canister-manager';

// Mock CanisterManager
const mockCanisterManager = {
  getCanisterURL: vi.fn(),
  getBackendCanisterURL: vi.fn(),
  getFrontendCanisterURL: vi.fn().mockReturnValue('https://example.com/'),
  getIdentityCanisterURL: vi.fn(),
  getInternetIdentityCanisterURL: vi.fn(),
  getCanisterId: vi.fn(),
} as unknown as CanisterManager;

vi.mock('canister-manager', () => ({
  CanisterManager: vi.fn().mockImplementation(() => mockCanisterManager),
}));

const defaultArgs = {
  localIPAddress: '127.0.0.1',
  dfxNetwork: 'local',
  frontendCanisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
  expoScheme: 'myapp',
  pathname: '/',
};

describe('Deep Link URL Building', () => {
  describe('buildDeepLinkBaseURL', () => {
    const baseUrlArgs = {
      deepLinkType: 'icp' as const,
      localIPAddress: defaultArgs.localIPAddress,
      frontendCanisterURL: 'https://example.com/',
      expoScheme: defaultArgs.expoScheme,
    };

    it('should return frontend canister URL for icp deep link type', () => {
      const result = buildDeepLinkBaseURL({ ...baseUrlArgs, deepLinkType: 'icp' });
      expect(result.toString()).toBe('https://example.com/');
    });

    it('should return localhost URL for dev-server deep link type', () => {
      const result = buildDeepLinkBaseURL({
        ...baseUrlArgs,
        deepLinkType: 'dev-server',
      });
      expect(result.toString()).toBe('http://localhost:8081/');
    });

    it('should return expo URL for expo-go deep link type', () => {
      const result = buildDeepLinkBaseURL({ ...baseUrlArgs, deepLinkType: 'expo-go' });
      expect(result.toString()).toBe(`exp://${defaultArgs.localIPAddress}:8081/--/`);
    });

    it('should return expo scheme URL for legacy deep link type', () => {
      const result = buildDeepLinkBaseURL({ ...baseUrlArgs, deepLinkType: 'legacy' });
      expect(result.toString()).toBe(`${defaultArgs.expoScheme}://`);
    });

    it('should return frontend canister URL for modern deep link type when URL is HTTPS', () => {
      const result = buildDeepLinkBaseURL({ ...baseUrlArgs, deepLinkType: 'modern' });
      expect(result.toString()).toBe('https://example.com/');
    });

    it('should throw error for modern deep link type when URL is not HTTPS', () => {
      expect(() =>
        buildDeepLinkBaseURL({
          ...baseUrlArgs,
          deepLinkType: 'modern',
          frontendCanisterURL: 'http://example.com',
        }),
      ).toThrow('Modern deep links require HTTPS. Frontend URL is not HTTPS: http://example.com');
    });

    it('should throw error for unsupported deep link type', () => {
      expect(() =>
        buildDeepLinkBaseURL({ ...baseUrlArgs, deepLinkType: 'invalid-type' as any }),
      ).toThrow('Unsupported deep link type: invalid-type. Supported types are: icp, dev-server, expo-go, legacy, modern');
    });
  });

  describe('buildDeepLink', () => {
    describe('with root pathname', () => {
      it('should return frontend canister URL for icp deep link type', () => {
        const result = buildDeepLink({ ...defaultArgs, deepLinkType: 'icp' });
        expect(result.toString()).toBe('https://example.com/');
        expect(result.pathname).toBe('/');
      });

      it('should return localhost URL for dev-server deep link type', () => {
        const result = buildDeepLink({
          ...defaultArgs,
          deepLinkType: 'dev-server',
        });
        expect(result.toString()).toBe('http://localhost:8081/');
        expect(result.pathname).toBe('/');
      });

      it('should return expo URL for expo-go deep link type', () => {
        const result = buildDeepLink({ ...defaultArgs, deepLinkType: 'expo-go' });
        expect(result.toString()).toBe(`exp://${defaultArgs.localIPAddress}:8081/--/`);
        expect(result.pathname).toBe('/--/');
      });

      it('should return expo scheme URL for legacy deep link type', () => {
        const result = buildDeepLink({ ...defaultArgs, deepLinkType: 'legacy' });
        expect(result.toString()).toBe(`${defaultArgs.expoScheme}:///`);
        expect(result.pathname).toBe('/');
      });

      it('should return frontend canister URL for modern deep link type when URL is HTTPS', () => {
        const result = buildDeepLink({ ...defaultArgs, deepLinkType: 'modern' });
        expect(result.toString()).toBe('https://example.com/');
        expect(result.pathname).toBe('/');
      });
    });

    describe('with custom pathname', () => {
      describe('for icp, dev-server, legacy, and modern deep links', () => {
        it('should handle single level path', () => {
          const result = buildDeepLink({
            ...defaultArgs,
            deepLinkType: 'icp',
            pathname: '/home',
          });
          expect(result.toString()).toBe('https://example.com/home');
          expect(result.pathname).toBe('/home');
        });

        it('should handle multi-level path', () => {
          const result = buildDeepLink({
            ...defaultArgs,
            deepLinkType: 'icp',
            pathname: '/users/profile',
          });
          expect(result.toString()).toBe('https://example.com/users/profile');
          expect(result.pathname).toBe('/users/profile');
        });

        it('should handle path with trailing slash', () => {
          const result = buildDeepLink({
            ...defaultArgs,
            deepLinkType: 'icp',
            pathname: '/users/',
          });
          expect(result.toString()).toBe('https://example.com/users/');
          expect(result.pathname).toBe('/users/');
        });

        it('should handle path with special characters', () => {
          const result = buildDeepLink({
            ...defaultArgs,
            deepLinkType: 'icp',
            pathname: '/user/123/settings',
          });
          expect(result.toString()).toBe('https://example.com/user/123/settings');
          expect(result.pathname).toBe('/user/123/settings');
        });
      });

      describe('for expo-go deep link', () => {
        it('should handle single level path', () => {
          const result = buildDeepLink({
            ...defaultArgs,
            deepLinkType: 'expo-go',
            pathname: '/home',
          });
          expect(result.toString()).toBe(`exp://${defaultArgs.localIPAddress}:8081/--/home`);
          expect(result.pathname).toBe('/--/home');
        });

        it('should handle multi-level path', () => {
          const result = buildDeepLink({
            ...defaultArgs,
            deepLinkType: 'expo-go',
            pathname: '/users/profile',
          });
          expect(result.toString()).toBe(`exp://${defaultArgs.localIPAddress}:8081/--/users/profile`);
          expect(result.pathname).toBe('/--/users/profile');
        });

        it('should handle path with trailing slash', () => {
          const result = buildDeepLink({
            ...defaultArgs,
            deepLinkType: 'expo-go',
            pathname: '/users/',
          });
          expect(result.toString()).toBe(`exp://${defaultArgs.localIPAddress}:8081/--/users/`);
          expect(result.pathname).toBe('/--/users/');
        });

        it('should handle path with special characters', () => {
          const result = buildDeepLink({
            ...defaultArgs,
            deepLinkType: 'expo-go',
            pathname: '/user/123/settings',
          });
          expect(result.toString()).toBe(`exp://${defaultArgs.localIPAddress}:8081/--/user/123/settings`);
          expect(result.pathname).toBe('/--/user/123/settings');
        });
      });
    });

    describe('error cases', () => {
      it('should throw error for modern deep link type when URL is not HTTPS', () => {
        // Mock CanisterManager to return non-HTTPS URL
        vi.mocked(mockCanisterManager.getFrontendCanisterURL).mockReturnValue('http://example.com');

        expect(() =>
          buildDeepLink({ ...defaultArgs, deepLinkType: 'modern' }),
        ).toThrow('Modern deep links require HTTPS. Frontend URL is not HTTPS: http://example.com');
      });

      it('should throw error for unsupported deep link type', () => {
        expect(() =>
          buildDeepLink({ ...defaultArgs, deepLinkType: 'invalid-type' as any }),
        ).toThrow('Unsupported deep link type: invalid-type. Supported types are: icp, dev-server, expo-go, legacy, modern');
      });
    });
  });
});
