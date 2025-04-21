# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
  - `vitest`
  - `vite-plugin-dts`
  - `jsdom`
  - `@types/node`