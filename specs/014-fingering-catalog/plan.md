# Implementation Plan: Real Fingering Catalog

**Branch**: `feat/018-fingering-catalog` | **Date**: 2026-08-07 | **Spec**: [spec.md](spec.md)

## Summary

Create JSON chord catalog files under `src/catalog/chords.json` containing comprehensive 6-string guitar chord definitions (open, barre, 7ths, suspended, diminished). Export `getChord()`, `listChords()`, and `ChordDefinition` interface from `src/catalog/index.ts` and main index.

## Technical Context

**Files to create/modify**:
- `src/catalog/chords.json` — JSON catalog dataset for chords
- `src/catalog/types.ts` — `ChordDefinition`, `CatalogFingering` interfaces
- `src/catalog/index.ts` — `getChord()`, `listChords()` catalog utilities
- `src/index.ts` — re-export catalog functions and types
- `tests/unit/Catalog.test.ts` — unit tests

## Project Structure

```text
src/
├── catalog/
│   ├── chords.json       # JSON chord catalog definitions
│   ├── types.ts          # Catalog interfaces
│   └── index.ts          # Catalog lookup utilities
```
