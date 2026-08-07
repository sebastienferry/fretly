# Tasks: Decoupled Music Catalog

**Input**: Design documents from `specs/014-fingering-catalog/`

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Implementation & Verification

- [ ] T001 [P] [US1] Create standalone music catalog types in `src/music/types.ts`
- [ ] T002 [P] [US1] Create JSON chord dataset in `src/music/chords.json` containing open, barre, and extended chords
- [ ] T003 [US1] Create standalone `FretlyMusic` catalog entry point in `src/music/index.ts` with ZERO dependencies on core renderer
- [ ] T004 [P] [US1] Update `rollup.config.js` to build separate `dist/music.umd.js` and `dist/music.esm.js` bundles
- [ ] T005 [P] [US1] Add independent unit tests in `tests/unit/MusicCatalog.test.ts`
- [ ] T006 Run automated verification (`npm run build`, `npm run lint`, `npm test`)
