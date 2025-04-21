# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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