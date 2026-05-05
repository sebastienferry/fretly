# Feature Specification: Fretboard Renderer Library

**Feature Branch**: `001-fretboard-renderer`  
**Created**: 2025-05-05  
**Status**: Draft  
**Input**: User description: "A library to draw a guitar neck with configurable frets (4-16), strings (default 6), horizontal or vertical orientation, with default spacing between strings and frets, string thickness representation, and fret number markers at positions 3, 5, 7, 9, 12, 15. The neck must be active to support adding markers in future evolutions."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Render Basic Fretboard (Priority: P1)

A developer wants to display a standard 6-string guitar fretboard with 12 frets in horizontal orientation using default spacing values.

**Why this priority**: This is the core functionality - without basic rendering, the library has no value. This represents the minimal viable implementation.

**Independent Test**: Can be tested by instantiating the library with default options and verifying SVG output contains correct fret and string elements. Delivers a complete static visualization.

**Acceptance Scenarios**:

1. **Given** default configuration, **When** render() is called, **Then** SVG output displays 6 strings and 12 frets
2. **Given** default configuration, **When** render() is called, **Then** inlay numbers 3, 5, 7, 9, 12 appear below the fretboard, centered on each fret
3. **Given** default configuration, **When** getFretPosition(5) is called, **Then** returns valid x/y coordinates

---

### User Story 2 - Configure Fretboard Parameters (Priority: P1)

A developer wants to customize the fretboard with different string count, fret count, and spacing values.

**Why this priority**: Configuration is essential for the library to be useful across different guitar types (4-string bass, 7-string guitar, etc.).

**Independent Test**: Can be tested by passing custom options and verifying output dimensions match the configuration. Delivers flexible rendering for different instruments.

**Acceptance Scenarios**:

1. **Given** configuration with fretCount: 8, **When** render() is called, **Then** output displays exactly 8 frets
2. **Given** configuration with stringCount: 4, **When** render() is called, **Then** output displays exactly 4 strings
3. **Given** configuration with orientation: 'vertical', **When** render() is called, **Then** fretboard is rendered vertically with inlay numbers on the left side, centered on each fret
4. **Given** configuration with stringSpacing: 25, fretSpacing: 40, **When** render() is called, **Then** visual spacing matches specified values

---

### User Story 3 - Support String Thickness (Priority: P2)

A developer wants the strings to be visually represented with thickness (not just lines) to accurately depict a guitar neck.

**Why this priority**: String thickness is explicitly requested and differentiates this from a simple wireframe diagram.

**Independent Test**: Can be tested by verifying string elements have stroke-width or equivalent thickness property. Delivers realistic guitar neck appearance.

**Acceptance Scenarios**:

1. **Given** default configuration, **When** render() is called, **Then** each string has visible thickness of 2px
2. **Given** configuration with stringThickness: 3, **When** render() is called, **Then** each string has thickness of 3px

---

### User Story 4 - Prepare for Future Interactivity (Priority: P2)

A developer needs to query positions on the fretboard to add custom markers in future versions.

**Why this priority**: The "active" requirement means the data structure must support interactivity even if v1 doesn't implement visual interaction.

**Independent Test**: Can be tested by calling position query methods and verifying they return valid coordinates. Delivers foundation for v2 features.

**Acceptance Scenarios**:

1. **Given** rendered fretboard, **When** getStringPosition(2) is called, **Then** returns coordinate for the 3rd string (B string)
2. **Given** rendered fretboard, **When** getMarkerPosition(5, 3) is called, **Then** returns position for a marker at fret 5, string 3
3. **Given** rendered fretboard, **When** addMarker(3, 1, {color: 'red'}) is called, **Then** marker is stored in internal data structure

---

### Edge Cases

- What happens when fretCount is set to minimum (4)?
- What happens when fretCount is set to maximum (16)?
- What happens when stringCount is set to 4 (bass)?
- What happens when stringCount is set to 8?
- How does the system handle inlay position 12 when fretCount is less than 12?
- How does the system handle orientation changes after instantiation?

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Library MUST render a guitar fretboard as SVG with configurable fret count (4-16)
- **FR-002**: Library MUST render configurable string count (default 6, range 4-8)
- **FR-003**: Library MUST support horizontal and vertical orientation
- **FR-004**: Library MUST display fret number markers at positions 3, 5, 7, 9, 12
- **FR-005**: Library MUST render strings with configurable thickness (default 2px)
- **FR-006**: Library MUST render frets with configurable thickness (default 1px)
- **FR-007**: Library MUST use configurable spacing between strings (default 20px)
- **FR-008**: Library MUST use configurable spacing between frets (default 30px)
- **FR-009**: Library MUST position inlay numbers **below** the fretboard for horizontal orientation, centered on each fret, within the SVG viewBox
- **FR-010**: Library MUST position inlay numbers on the **left side** of the fretboard for vertical orientation, centered on each fret, within the SVG viewBox
- **FR-011a**: Library MUST extend SVG viewBox to include inlay labels in the visible canvas
- **FR-011b**: Library MUST center inlay text on the fret position (not at the fret start)
- **FR-011**: Library MUST expose getFretPosition(fretIndex) method returning coordinates
- **FR-012**: Library MUST expose getStringPosition(stringIndex) method returning coordinates
- **FR-013**: Library MUST expose addMarker(fretIndex, stringIndex, options) method for future interactivity
- **FR-014**: Library MUST expose getMarkerPosition(fretIndex, stringIndex) method returning coordinates
- **FR-015**: Library MUST work in browser environments without external dependencies
- **FR-016**: Library MUST be lightweight (< 10KB minified)
- **FR-017**: Library MUST NOT mutate input configuration

### Key Entities

- **Fretboard**: The main container representing the guitar neck, with properties for dimensions, orientation, and child elements
- **String**: A visual element representing a guitar string, with properties for position, thickness, and tuning note
- **Fret**: A visual element representing a fret wire, with properties for position and thickness
- **Inlay**: A marker element displaying fret numbers at specific positions (3, 5, 7, 9, 12)
- **Marker**: A placeholder entity for future custom annotations at (fret, string) positions

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Library renders a complete fretboard in under 50ms for default configuration
- **SC-002**: Library bundle size is under 10KB minified
- **SC-003**: Library passes all acceptance scenarios for P1 user stories
- **SC-004**: Library produces valid SVG output that renders correctly in Chrome, Firefox, Safari
- **SC-005**: All position query methods return accurate coordinates matching visual rendering

---

## Assumptions

- Users are web developers comfortable with JavaScript/TypeScript APIs
- Target environment is modern browsers (ES6+ support)
- String tuning follows standard guitar tuning (E-B-G-D-A-E from thinnest to thickest)
- Tuning does not affect visual rendering in v1 (only string order matters)
- Inlay positions are fixed at 3, 5, 7, 9, 12 (standard guitar markers)
- Inlay numbers appear below the fretboard for horizontal orientation
- Inlay numbers appear on the left side for vertical orientation
- The nut (0th fret) is not rendered in v1
- Left-handed orientation (mirrored) is out of scope for v1
- Note names (E, F, F#) display is out of scope for v1
- String thickness variation per string is out of scope for v1 (uniform thickness)
- Real-world scale length calculations for accurate fret spacing is out of scope for v1 (uniform spacing)
- Color scheme defaults to black strings on white background for v1
