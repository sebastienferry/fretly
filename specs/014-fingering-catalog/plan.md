# Implementation Plan: Decoupled Music Catalog

**Branch**: `feat/018-fingering-catalog` | **Date**: 2026-08-07 | **Spec**: [spec.md](spec.md)

## Summary

Create a completely decoupled, independent music catalog module under `src/music/` (`FretlyMusic`). Core `Fretboard` renderer has ZERO dependencies on `src/music/`. Client HTML pages can include both scripts independently.

## Technical Context

**Files to create/modify**:
- `src/music/chords.json` — Decoupled JSON chord catalog
- `src/music/types.ts` — Catalog types (`ChordDefinition`, `MusicFingering`)
- `src/music/index.ts` — `FretlyMusic` export (`getChord`, `listChords`)
- `rollup.config.js` — Output `dist/music.umd.js` alongside core engine
- `tests/unit/MusicCatalog.test.ts` — Independent unit tests

## Project Structure

```text
src/
├── music/               # Standalone Music Catalog Module
│   ├── chords.json      # Decoupled chord definitions
│   ├── types.ts         # Chord interfaces
│   └── index.ts         # FretlyMusic catalog entry point
├── fretboard/           # Core Fretboard Engine (0 dependency on music/)
```
