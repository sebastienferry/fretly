# Feature Specification: Standalone Music Catalog Package (`@fretly/music` / `src/music`)

**Feature Branch**: `feat/018-fingering-catalog`  
**Created**: 2026-08-07  
**Status**: Draft  
**Input**: User description & issue #18: "feed catalog with real fingerings"

## Architectural Principle & Decoupling *(mandatory)*

- **Zero Coupling**: Core Fretly renderer (`Fretboard`, `SvgRenderer`) remains **100% decoupled** from music theory and chord catalog logic.
- **Standalone Module**: Music theory data and chord catalogs live independently in `src/music/` (or package `@fretly/music`).
- **Independent Usage**: Client HTML pages and applications consume `Fretboard` for SVG rendering and `FretlyMusic` for chord catalog data independently without inter-package dependencies.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Query Independent Music Catalog (Priority: P1)

A developer wants to load real guitar chord definitions from a standalone music catalog module (`FretlyMusic`) and feed the resulting fingering objects into `Fretboard` renderer without tight coupling.

**Why this priority**: Keeps core rendering engine minimal, zero-dependency, and flexible.

**Independent Test**: Load chord data from `FretlyMusic.getChord('C')` and verify it can be passed directly as `{ fingerings }` to `new Fretboard()`.

**Acceptance Scenarios**:

1. **Given** a query to `FretlyMusic.getChord('C')`, **When** evaluated, **Then** it returns standard fingering objects `[{ string: 2, fret: 1 }, ...]`.
2. **Given** `Fretboard` renderer, **When** instantiated, **Then** it has no import dependency on `FretlyMusic` or music theory modules.
3. **Given** client HTML pages (`demo.html`, `editor.html`), **When** loaded, **Then** both libraries can be included independently.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST decouple music catalog data into a standalone module (`src/music/` / `FretlyMusic`).
- **FR-002**: Core `Fretboard` class MUST NOT depend on `FretlyMusic` or contain hardcoded chord theory.
- **FR-003**: System MUST provide JSON catalog data for open chords, barre shapes, 7ths, suspended, and diminished chords.
- **FR-004**: System MUST export `FretlyMusic` global in UMD bundle and separate entry point.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Core `Fretboard` engine remains zero-dependency and completely independent of chord catalog logic.
- **SC-002**: `npm run build`, `npm run lint`, and `npm test` all pass cleanly.
