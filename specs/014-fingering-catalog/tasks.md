# Tasks: Real Fingering Catalog

**Input**: Design documents from `specs/014-fingering-catalog/`

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Implementation & Verification

- [ ] T001 [P] [US1] Create catalog type definitions in `src/catalog/types.ts`
- [ ] T002 [P] [US1] Create JSON chord dataset in `src/catalog/chords.json` containing open, barre, and extended chords
- [ ] T003 [US1] Create catalog lookup functions (`getChord`, `listChords`) in `src/catalog/index.ts` and export from `src/index.ts`
- [ ] T004 [P] [US1] Add unit tests in `tests/unit/Catalog.test.ts`
- [ ] T005 Run automated verification (`npm run build`, `npm run lint`, `npm test`)
