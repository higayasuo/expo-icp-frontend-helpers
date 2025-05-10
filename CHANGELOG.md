# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Browser Management
  - Added `openBrowser` function for opening URLs in the device's browser
  - Added `dismissBrowser` function for dismissing the browser with smooth transitions
  - Added comprehensive tests for both browser management functions
  - Added documentation for browser management in README.md

- URL Parsing
  - Added `objectToParamsStr` function for converting objects to query strings
  - Added support for camelCase to kebab-case conversion
  - Added support for numbers, booleans, and special characters
  - Added type-safe parameter handling with TypeScript generics
  - Added `parseParams` function for parsing query strings with type safety
  - Added support for required parameter validation
  - Added support for kebab-case to camelCase conversion
  - Added support for hash parameters
  - Added support for empty string values (converts to undefined)

### Removed
- Removed `parseURL` function as it's no longer needed
- Removed `paramsToObject` function as it's no longer needed

## [0.1.10] - 2025-05-09

### Changed
- Dependencies
  - Updated `@higayasuo/u8a-utils` from `^1.0.2` to `^1.0.3`

## [0.1.9] - 2025-05-09

### Changed
- Dependencies
  - Updated peer dependency for `@higayasuo/u8a-utils` to `^1.0.2`

## [0.1.8] - 2025-05-02

### Changed
- Path Manipulation
  - Modified `normalizePath` to preserve trailing slashes instead of removing them
  - Updated `comparePaths` to treat paths with different trailing slashes as different paths
  - Updated `concatPaths` to preserve trailing slashes in the output
  - Updated all related tests to reflect the new behavior
  - Updated documentation in README.md to reflect the changes

## [0.1.7] - 2025-05-02

### Added
- URL Parsing
  - Added hash parameter support to `parseURL` function
  - Added type-safe hash parameter handling with generics
  - Added comprehensive tests for hash parameter parsing
  - Updated documentation to include hash parameter examples

### Changed
- URL Parsing
  - Updated `parseURL` to use `paramsToObject` for consistent parameter handling
  - Improved parameter type safety with optional generic parameters
  - Enhanced documentation with more detailed examples
  - Made URL parameter required in `parseURL` function for better reusability
  - Removed browser environment dependency from `parseURL`
  - Updated tests to use explicit URL parameters

## [0.1.6] - 2025-05-02

### Added
- Path Manipulation
  - Added `normalizePath` function for path normalization
  - Added `comparePaths` function for path comparison
  - Added `concatPaths` function for path concatenation
  - Added comprehensive tests for all path manipulation functions
  - Added documentation for path manipulation in README.md

## [0.1.5] - 2025-05-01

### Added
- URL Parsing
  - Added `parseURL` function for type-safe URL parsing
  - Added comprehensive tests for URL parsing functionality
  - Added documentation for URL parsing in README.md

### Removed
- Iframe Detection
  - Removed `determineIframe` function and related tests
  - Removed iframe detection documentation from README.md

## [0.1.4] - 2025-04-22

### Added
- Identity Management
  - Added type guard functions for error handling:
    - `isAuthenticationExpiredError`
    - `isSessionKeyMismatchError`
  - Enhanced error handling documentation with type-safe examples

### Changed
- Identity Management
  - Improved error handling with type-safe type guards
  - Updated error handling examples in README.md to use type guard functions
- Tests
  - Added comprehensive tests for type guard functions
  - Improved test coverage for error handling

## [0.1.3] - 2025-04-22

### Added
- Identity Management
  - Added `ERROR_NAMES` constant for type-safe error name references
  - Improved error handling documentation with practical examples

### Changed
- Identity Management
  - Renamed `DelegationChainExpiredError` to `AuthenticationExpiredError` for better clarity
  - Updated error message for authentication expiration to be more user-friendly
  - Refactored error classes to use `ERROR_NAMES` constant
- Documentation
  - Updated README.md with detailed error handling examples
  - Added examples for handling `AuthenticationExpiredError`

## [0.1.2] - 2025-04-22

### Changed
- Dependencies
  - Modified peer dependency for `@dfinity/identity` to allow any version (`*`)

## [0.1.1] - 2025-04-22

### Added
- Identity Management
  - `buildIdentity` function to build delegation identity with security checks
  - Validation for delegation chain expiration
  - Verification of app key against delegation chain public key
- Dependencies
  - Added `@higayasuo/u8a-utils` as a dependency
  - Exported utility functions from `@higayasuo/u8a-utils`

### Changed
- Improved documentation in README.md
  - Added detailed descriptions for all functions
  - Updated DeepLinkType documentation to reflect actual types
  - Added examples for all functions
  - Fixed incorrect type information
  - Updated dependencies section

## [0.1.0] - 2025-04-21

### Added
- Initial release
- Deep link type management
  - `DeepLinkType` type definition
  - `isDeepLinkType` type guard
- Deep link type determination
  - `getDeepLinkType` function to determine deep link type
- Deep link construction
  - `buildDeepLink` function to build deep link URLs
- Iframe detection
  - `determineIframe` function to detect iframe environment

### Dependencies
- Added `canister-manager` as peer dependency
- Added development dependencies:
  - `typescript`
  - `vite`
  - `