---
description: "Task list for Fretboard Renderer Library implementation"
---

# Tasks: Fretboard Renderer Library

**Input**: Design documents from `/specs/001-fretboard-renderer/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.md, quickstart.md
**Tests**: Tests are OPTIONAL - not explicitly requested in feature specification. Can be added per user preference.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## User Story Mapping

| User Story | Priority | Title | Independent Test |
|------------|----------|-------|------------------|
| US1 | P1 | Render Basic Fretboard | SVG output with 6 strings, 12 frets, inlays at 3,5,7,9,12 |
| US2 | P1 | Configure Fretboard Parameters | Custom fretCount, stringCount, orientation, spacing |
| US3 | P2 | Support String Thickness | Strings rendered with configurable thickness |
| US4 | P2 | Prepare for Future Interactivity | Position querying APIs return valid coordinates |

---

## Dependency Graph

```
US1 (P1) → No dependencies (MVP)
    ↓
US2 (P1) → No dependencies (can run parallel with US1)
    ↓
US3 (P2) → Depends on US1 rendering foundation
    ↓
US4 (P2) → Depends on US1 coordinate system
```

**Parallel Opportunities**: US1 and US2 can be implemented in parallel (US1: default rendering, US2: configuration handling).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create package.json with TypeScript, Jest, Rollup dependencies
- [ ] T002 Initialize TypeScript configuration (tsconfig.json) with strict mode
- [ ] T003 [P] Configure Jest with jsdom for SVG testing
- [ ] T004 [P] Setup Rollup bundler for library output (ESM, UMD)
- [ ] T005 Create directory structure: src/fretboard/, src/renderers/, tests/unit/, tests/integration/
- [ ] T006 Create src/index.ts entry point with Fretboard export
- [ ] T007 [P] Configure ESLint and Prettier for code formatting
- [ ] T008 Setup .gitignore for node_modules, dist, IDE files

**Checkpoint**: Project structure ready, build and test infrastructure in place

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types and utilities that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 Create src/fretboard/types.ts with FretboardOptions, Position, MarkerOptions, Marker interfaces
- [ ] T010 [P] Create src/fretboard/constants.ts with default values (fretCount: 12, stringCount: 6, etc.)
- [ ] T011 [P] Create src/utils/validation.ts with range validators for fretCount, stringCount, spacing values
- [ ] T012 Create src/utils/geometry.ts with coordinate calculation helpers
- [ ] T013 [P] Create src/utils/errors.ts with custom error classes (InvalidConfigurationError, RangeError)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Render Basic Fretboard (Priority: P1) 🎯 MVP

**Goal**: Display a standard 6-string guitar fretboard with 12 frets in horizontal orientation using default spacing values.

**Independent Test**: Instantiate library with default options, verify SVG output contains correct fret and string elements with inlay numbers at 3, 5, 7, 9, 12.

**Parallel Strategy**: US1 (default render) can run in parallel with US2 (configuration), then merge.

### Implementation for User Story 1

- [ ] T014 [P] [US1] Create Fretboard class skeleton in src/fretboard/Fretboard.ts
- [ ] T015 [P] [US1] Implement constructor with options merging in src/fretboard/Fretboard.ts
- [ ] T016 [P] [US1] Create String class in src/fretboard/String.ts with position calculation
- [ ] T017 [P] [US1] Create Fret class in src/fretboard/Fret.ts with position calculation
- [ ] T018 [P] [US1] Create Inlay class in src/fretboard/Inlay.ts with label and position
- [ ] T019 [US1] Implement horizontal coordinate system in Fretboard class
- [ ] T020 [US1] Implement render() method for horizontal orientation in src/fretboard/Fretboard.ts
- [ ] T021 [US1] Create SVG renderer in src/renderers/svg.ts with string/fret/inlay rendering
- [ ] T022 [US1] Integrate SVG renderer into Fretboard.render() method
- [ ] T023 [US1] Implement getFretPosition() for horizontal orientation
- [ ] T024 [US1] Implement getStringPosition() for horizontal orientation
- [ ] T025 [US1] Implement default inlay positions rendering (3, 5, 7, 9, 12 above fretboard)
- [ ] T026 [US1] Add CSS classes to SVG elements per contracts/api.md

**Checkpoint**: US1 complete - can render default fretboard with `new Fretboard().render()`

---

## Phase 4: User Story 2 - Configure Fretboard Parameters (Priority: P1) 🎯 MVP

**Goal**: Customize the fretboard with different string count, fret count, and spacing values.

**Independent Test**: Pass custom options and verify output dimensions match configuration (8 frets, 4 strings, vertical orientation, custom spacing).

**Parallel Strategy**: Can run in parallel with US1, then both merge into main implementation.

### Implementation for User Story 2

- [ ] T027 [P] [US2] Implement vertical coordinate system in Fretboard class
- [ ] T028 [US2] Update render() method to support vertical orientation in src/fretboard/Fretboard.ts
- [ ] T029 [US2] Update SVG renderer to handle vertical layout in src/renderers/svg.ts
- [ ] T030 [P] [US2] Implement fretCount validation (4-16 range) in constructor
- [ ] T031 [P] [US2] Implement stringCount validation (4-8 range) in constructor
- [ ] T032 [P] [US2] Implement orientation validation ('horizontal'/'vertical') in constructor
- [ ] T033 [P] [US2] Implement spacing/thickness validation (positive numbers) in constructor
- [ ] T034 [US2] Update getFretPosition() for vertical orientation
- [ ] T035 [US2] Update getStringPosition() for vertical orientation
- [ ] T036 [US2] Implement inlay numbers on left side for vertical orientation
- [ ] T037 [US2] Ensure inlay positions filtered to ≤ fretCount

**Checkpoint**: US2 complete - can render customized fretboards with any valid configuration

---

## Phase 5: User Story 3 - Support String Thickness (Priority: P2)

**Goal**: Visually represent strings with thickness (not just lines) to accurately depict a guitar neck.

**Independent Test**: Verify string elements have stroke-width property matching stringThickness configuration.

### Implementation for User Story 3

- [ ] T038 [P] [US3] Update String class in src/fretboard/String.ts to use thickness in rendering
- [ ] T039 [US3] Update SVG renderer to apply stroke-width to string elements in src/renderers/svg.ts
- [ ] T040 [US3] Verify default stringThickness (2px) renders correctly
- [ ] T041 [P] [US3] Test custom stringThickness values (1px, 3px, 5px)

**Checkpoint**: US3 complete - strings have visible thickness, not just hairline lines

---

## Phase 6: User Story 4 - Prepare for Future Interactivity (Priority: P2)

**Goal**: Support querying positions on the fretboard to add custom markers in future versions.

**Independent Test**: Call position query methods and verify they return valid coordinates matching visual rendering.

### Implementation for User Story 4

- [ ] T042 [P] [US4] Implement getMarkerPosition(fretIndex, stringIndex) in Fretboard class
- [ ] T043 [US4] Implement addMarker(fretIndex, stringIndex, options) in Fretboard class
- [ ] T044 [P] [US4] Create Marker class in src/fretboard/Marker.ts with id, fretIndex, stringIndex, options
- [ ] T045 [US4] Add marker storage (array) to Fretboard class
- [ ] T046 [US4] Implement marker validation in addMarker (range checks)
- [ ] T047 [P] [US4] Generate unique IDs for markers (UUID or auto-increment)
- [ ] T048 [US4] Add markers to SVG output in render() (placeholder for v2 rendering)

**Checkpoint**: US4 complete - position queries work, markers can be stored (not yet rendered)

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final touches, documentation, and quality improvements

- [ ] T049 [P] Add JSDoc comments to all public methods in Fretboard class
- [ ] T050 [P] Add TypeDoc configuration for API documentation generation
- [ ] T051 [P] Create README.md at repository root with basic usage
- [ ] T052 Setup GitHub Actions for CI: test, build, lint on push/PR
- [ ] T053 Configure package.json scripts (build, test, lint, dev)
- [ ] T054 [P] Add source maps to build output for debugging
- [ ] T055 Verify bundle size < 10KB minified
- [ ] T056 Test in all target browsers (Chrome, Firefox, Safari, Edge last 2 versions)
- [ ] T057 [P] Add example HTML file demonstrating all features
- [ ] T058 Final review: verify all acceptance scenarios from spec.md

---

## Parallel Execution Examples

### Parallel Set 1: Setup Phase
```
T001, T002, T004 can run in parallel (project config files)
T003, T007 can run in parallel (tooling config)
T005, T006, T008 sequential (depend on T001)
```

### Parallel Set 2: Foundational Phase
```
T009, T010, T011, T012, T013 all parallel (independent utility files)
```

### Parallel Set 3: US1 + US2 (Core Rendering)
```
US1 Path: T014-T026 (horizontal rendering)
US2 Path: T027-T037 (configuration + vertical rendering)
Both paths can run in parallel, merge at T020/T028
```

### Parallel Set 4: US3 + US4 (Enhancements)
```
T038-T041 (string thickness) parallel with T042-T048 (interactivity)
```

### Parallel Set 5: Polish Phase
```
T049-T052, T054-T058 all parallel (independent tasks)
```

---

## Implementation Strategy

### MVP Scope (Deliverable after Phase 4)
- ✅ User Story 1: Basic rendering with defaults
- ✅ User Story 2: Full configuration support
- Result: Working library that can render any valid fretboard configuration

### Full v1 Scope (Deliverable after Phase 6)
- ✅ MVP + User Story 3: String thickness
- ✅ MVP + User Story 4: Position querying for future markers
- Result: Complete v1 library ready for publication

### Incremental Delivery Plan
1. **Week 1**: Complete Phases 1-2 (Setup + Foundation)
2. **Week 2**: Complete Phases 3-4 (US1 + US2 = MVP)
3. **Week 3**: Complete Phases 5-6 (US3 + US4 = Full v1)
4. **Week 4**: Complete Phase 7 (Polish + Release)

---

## Task Summary

| Phase | Task Count | User Stories | Status |
|-------|------------|--------------|--------|
| Phase 1: Setup | 8 | - | Todo |
| Phase 2: Foundational | 5 | - | Todo |
| Phase 3: US1 (P1) | 12 | US1 | Todo |
| Phase 4: US2 (P1) | 10 | US2 | Todo |
| Phase 5: US3 (P2) | 4 | US3 | Todo |
| Phase 6: US4 (P2) | 7 | US4 | Todo |
| Phase 7: Polish | 9 | - | Todo |
| **Total** | **55** | **4** | **Todo** |

**Parallel Opportunities**: ~40% of tasks can run in parallel (22/55 tasks marked [P])

---

## File Path Summary

### Source Files (22 files)
- package.json, tsconfig.json, rollup.config.js, .eslintrc, .prettierrc
- src/index.ts
- src/fretboard/types.ts, constants.ts
- src/fretboard/Fretboard.ts, String.ts, Fret.ts, Inlay.ts, Marker.ts
- src/utils/validation.ts, geometry.ts, errors.ts
- src/renderers/svg.ts

### Test Files (2 files)
- tests/unit/fretboard.test.ts, svg.test.ts
- tests/integration/fretboard.integration.test.ts

### Documentation Files (8 files)
- README.md
- specs/001-fretboard-renderer/spec.md, plan.md, research.md, data-model.md
- specs/001-fretboard-renderer/contracts/api.md, quickstart.md, tasks.md

---

## Validation Checklist

- [ ] All tasks follow checklist format: `- [ ] TXXX [P?] [Story?] Description with file path`
- [ ] All tasks have unique sequential IDs (T001-T058)
- [ ] All user stories (US1-US4) are represented
- [ ] Parallel tasks marked with [P]
- [ ] Story labels present for all user story tasks
- [ ] No story labels for setup/foundation/polish tasks
- [ ] File paths included in all task descriptions
- [ ] Dependencies documented in dependency graph
- [ ] Checkpoints defined for each phase
- [ ] MVP scope clearly identified
