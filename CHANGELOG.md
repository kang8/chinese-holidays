# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-05-09

### Added

- Public APIs (`isHoliday`, `isWorkday`, `isPublicHoliday`, `isPublicWorkday`,
  `publicHolidayName`) now accept `'YYYY-MM-DD'` strings in addition to `Date`
  objects. String input is timezone-independent.
- Exported `Holiday` class and `DateInput` type for advanced consumers.
- `engines` field requires Node `>=18`.
- `.nvmrc` for local Node version alignment with CI.
- `vitest.config.ts` configures v8 coverage with thresholds.
- CI now runs tests under three timezones (`UTC`, `Asia/Shanghai`,
  `America/New_York`) to catch timezone regressions.
- New CI `Build` job validates `tsc` output before merge.
- CI uses a composite action (`.github/actions/setup`) to deduplicate setup
  steps across jobs.
- JSDoc on every public method.

### Changed

- Date inputs are now interpreted as moments and converted to the corresponding
  China-time calendar date (UTC+8). This makes results stable regardless of
  the host machine's timezone — `new Date('2025-01-01')` consistently resolves
  to Jan 1 in the China calendar even on US-timezone machines.
- Internal data structure flattened from nested `Map<year, Map<dateStr, info>>`
  to a single `Map<int, info>` keyed by `year*10000 + month*100 + day`.
- `package.json#exports` simplified: removed misleading `import` and `require`
  entries that both pointed to the same CommonJS file.
- Added `./package.json` to `exports` for metadata access.

### Removed

- `vite` from `devDependencies` (was unused — vitest pulls it in transitively).

### Fixed

- `publicHolidayName` no longer performs a duplicate lookup (previously it
  called `isPublicHoliday` and then re-resolved the date data).
- `scripts/build-data.ts` now validates date format and reports clear errors
  instead of silently writing malformed output.

## [1.0.1] - 2025-10-12

- Initial public release.
