# Data Model: Fretboard Renderer Library

## Overview

This document describes the domain entities, their properties, relationships, and validation rules for the Fretboard Renderer Library.

---

## Entities

### Fretboard

The main container representing a guitar neck.

**Fields:**

| Field | Type | Default | Validation | Description |
|-------|------|---------|------------|-------------|
| `fretCount` | number | 12 | 4 ≤ value ≤ 16 | Number of frets to display |
| `stringCount` | number | 6 | 4 ≤ value ≤ 8 | Number of strings |
| `orientation` | 'horizontal' \| 'vertical' | 'horizontal' | enum | Layout direction |
| `stringSpacing` | number | 20 | value > 0 | Distance between string centers (px) |
| `stringThickness` | number | 2 | value ≥ 0 | Visual thickness of strings (px) |
| `fretSpacing` | number | 30 | value > 0 | Distance between fret centers (px) |
| `fretThickness` | number | 1 | value ≥ 0 | Visual thickness of frets (px) |
| `inlayPositions` | number[] | [3, 5, 7, 9, 12] | All values ≤ fretCount | Fret numbers to display as inlays |
| `showInlays` | boolean | true | - | Whether to display inlay numbers |

**Relationships:**
- Contains `String[]` (one per stringCount)
- Contains `Fret[]` (one per fretCount + 1 for each fret line)
- Contains `Inlay[]` (one per inlayPositions that is ≤ fretCount)
- Contains `Marker[]` (for future custom markers)

**State:**
- Immutable after construction (configuration cannot be changed)
- Position calculations derived from configuration

---

### String

Represents a single guitar string.

**Fields:**

| Field | Type | Default | Validation | Description |
|-------|------|---------|------------|-------------|
| `index` | number | - | 0 ≤ value < stringCount | Zero-based string index (0 = highest/thinnest) |
| `tuningNote` | string | - | Optional | Standard tuning note (E, B, G, D, A, E) |
| `x` | number | - | - | X coordinate (horizontal) or constant (vertical) |
| `y` | number | - | - | Y coordinate (vertical) or constant (horizontal) |
| `thickness` | number | Inherited from Fretboard | value ≥ 0 | Visual thickness |

**Relationships:**
- Belongs to one `Fretboard`
- Has position at intersection with `Fret`

**Derived Properties:**
- `position`: { x: number, y: number } - Center line coordinates

**Validation Rules:**
- Index must be within stringCount range
- Tuning note is optional (for reference, doesn't affect rendering)

---

### Fret

Represents a single fret wire on the neck.

**Fields:**

| Field | Type | Default | Validation | Description |
|-------|------|---------|------------|-------------|
| `index` | number | - | 0 ≤ value ≤ fretCount | Zero-based fret index (0 = nut, but v1 starts at 1) |
| `x` | number | - | - | X coordinate |
| `y` | number | - | - | Y coordinate |
| `thickness` | number | Inherited from Fretboard | value ≥ 0 | Visual thickness |

**Relationships:**
- Belongs to one `Fretboard`
- Intersects with all `String` elements

**Derived Properties:**
- `position`: { x: number, y: number } - Center line coordinates

**Validation Rules:**
- Index must be within 1 to fretCount range (v1 excludes nut at 0)

---

### Inlay

Represents a position marker displaying the fret number.

**Fields:**

| Field | Type | Default | Validation | Description |
|-------|------|---------|------------|-------------|
| `fretNumber` | number | - | Must be in inlayPositions | The fret number to display |
| `label` | string | String(fretNumber) | - | Text to display |
| `x` | number | - | - | X coordinate for label |
| `y` | number | - | - | Y coordinate for label |
| `position` | 'above' \| 'left' | - | - | Position relative to fretboard |

**Relationships:**
- Belongs to one `Fretboard`
- Associated with one `Fret` (at fretNumber)

**Derived Properties:**
- `coordinates`: { x: number, y: number } - Label placement position

**Validation Rules:**
- fretNumber must be ≤ fretCount
- Position determined by Fretboard.orientation

---

### Marker

Represents a custom marker that can be added to the fretboard (placeholder for v2).

**Fields:**

| Field | Type | Default | Validation | Description |
|-------|------|---------|------------|-------------|
| `id` | string | UUID | - | Unique identifier |
| `fretIndex` | number | - | 1 ≤ value ≤ fretCount | Fret position |
| `stringIndex` | number | - | 0 ≤ value < stringCount | String position |
| `options` | object | {} | - | Custom options (color, shape, size, etc.) |

**Relationships:**
- Belongs to one `Fretboard`
- Positioned at intersection of one `Fret` and one `String`

**Derived Properties:**
- `position`: { x: number, y: number } - Calculated from Fretboard coordinate system

**Validation Rules:**
- fretIndex must be within valid fret range
- stringIndex must be within valid string range

---

## Coordinate System

### Horizontal Orientation

```
(0,0) ——————————————————————————————————————► x (fret direction)
      |
      ▼
  y (string direction)

String 0 (high E): y = 0
String 1 (B):       y = stringSpacing
String 2 (G):       y = stringSpacing * 2
...
String N:           y = stringSpacing * N

Fret 1:             x = 0
Fret 2:             x = fretSpacing
Fret 3:             x = fretSpacing * 2
...
Fret M:             x = fretSpacing * (M-1)

Inlay positions:   y = -(inlayOffset) [above fretboard]
```

### Vertical Orientation

```
(0,0) ▼
      y (fret direction)
      |
      ► x (string direction)

String 0 (high E): x = 0
String 1 (B):       x = stringSpacing
String 2 (G):       x = stringSpacing * 2
...
String N:           x = stringSpacing * N

Fret 1:             y = 0
Fret 2:             y = fretSpacing
Fret 3:             y = fretSpacing * 2
...
Fret M:             y = fretSpacing * (M-1)

Inlay positions:   x = -(inlayOffset) [left of fretboard]
```

---

## Validation Rules Summary

1. **Fretboard Configuration**:
   - fretCount: integer between 4 and 16 inclusive
   - stringCount: integer between 4 and 8 inclusive
   - All spacing/thickness values must be positive numbers
   - inlayPositions must be array of numbers ≤ fretCount

2. **Coordinate Calculation**:
   - All positions must be finite numbers
   - No overlapping of string/fret elements
   - Inlay labels must not overlap with fretboard elements

3. **Immutability**:
   - Configuration cannot be modified after construction
   - Position calculations are derived, not stored

---

## State Transitions

The library is stateless for rendering. Marker management (v2) will support:

1. **Initial State**: Empty marker list
2. **Add Marker**: Marker added to list, positioned at (fret, string)
3. **Remove Marker**: Marker removed from list by id
4. **Update Marker**: Marker options updated

No state transitions affect the base fretboard rendering.
