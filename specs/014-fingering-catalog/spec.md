# Feature Specification: Real Fingering Catalog

**Feature Branch**: `feat/018-fingering-catalog`  
**Created**: 2026-08-07  
**Status**: Draft  
**Input**: User description & issue #18: "feed catalog with real fingerings"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Load & Query Chord Catalog Definitions (Priority: P1)

A developer wants to retrieve real guitar chord fingering definitions from a built-in catalog data source to populate fretboard diagrams easily.

**Why this priority**: Core requirement to provide standard chord fingering datasets out of the box.

**Independent Test**: Query chord definitions for `'C'`, `'Am'`, `'G'`, `'E7'` from catalog utility and verify returned fingering structures.

**Acceptance Scenarios**:

1. **Given** a chord query for standard open chords (e.g. `'C'`, `'G'`, `'Am'`), **When** loaded, **Then** valid fingering markers (strings, frets, finger labels, root markers) are returned.
2. **Given** a chord query for barre or extended chords (e.g. `'Bm'`, `'Fmaj7'`, `'E7'`), **When** loaded, **Then** correct multi-fret fingering definitions are returned.
3. **Given** an invalid or unknown chord name, **When** queried, **Then** undefined is returned without throwing errors.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide JSON catalog data files under `src/catalog/` containing real chord fingering definitions.
- **FR-002**: System MUST include open chords, barre chords, and extended chords (`maj7`, `dom7`, `m7`, `sus2`, `sus4`, `dim`, `aug`).
- **FR-003**: System MUST store `string`, `fret`, `text`, `finger`, and `isRoot` metadata for each catalog fingering marker.
- **FR-004**: System MUST export catalog helper functions (`getChord()`, `listChords()`) for easy lookup.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Catalog includes standard 6-string guitar chord definitions covering major, minor, 7th, and barre shapes.
- **SC-002**: Code passes `npm run build`, `npm run lint`, and `npm test`.
