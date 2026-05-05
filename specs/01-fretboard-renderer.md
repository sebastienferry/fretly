# Specification 01: Fretboard Renderer Library

## Overview

A library to render a guitar fretboard (neck) with configurable properties. The rendered fretboard must support user interaction to add markers in future versions.

---

## Requirements

### Core Features

| Property | Description | Default | Range |
|----------|-------------|---------|-------|
| `fretCount` | Number of frets to display | 12 | 4–16 |
| `stringCount` | Number of strings | 6 | 4–8 |
| `orientation` | Fretboard layout direction | `horizontal` | `horizontal` / `vertical` |

### Geometry & Spacing

| Property | Description | Default | Notes |
|----------|-------------|---------|-------|
| `stringSpacing` | Distance between string centers | `20px` | Configurable |
| `stringThickness` | Visual thickness of each string | `2px` | Must render as distinct lines with thickness |
| `fretSpacing` | Distance between fret centers | `30px` | Configurable |
| `fretThickness` | Visual thickness of each fret | `1px` | Metal fret appearance |

### Inlays (Position Markers)

Standard guitar inlay positions: **3, 5, 7, 9, 12**

- Must display fret numbers at these positions
- Position relative to fretboard:
  - **Horizontal orientation**: Numbers appear **above** the fretboard
  - **Vertical orientation**: Numbers appear on the **left side** of the fretboard
- Numbers must be clearly visible and not overlap with strings/frets

### Visual Output

```
Horizontal (default):
  3   5   7   9   12
  ┌─────────────────────────┐
  │ E │ │ │ │ │ │ │ │ │12│
  │ B │ │ │ │ │ │ │ │9│ │
  │ G │ │ │ │ │ │7│ │ │ │
  │ D │ │ │ │5│ │ │ │ │ │
  │ A │ │3│ │ │ │ │ │ │ │
  │ E │ │ │ │ │ │ │ │ │ │
  └─────────────────────────┘

Vertical:
  ┌─┐
12│ │E
  │ │B
9 │ │G
  │ │D
7 │ │A
  │ │E
5 └─┘
```

### Active Fretboard

The rendered fretboard **must** support future interactivity:
- Internal representation must store fret/string positions as selectable coordinates
- API must expose methods to:
  - Add custom markers at specific (fret, string) positions
  - Query positions by fret/string
- No visual interactivity required in v1, but data structure must support it

---

## API Design (Proposed)

### Constructor

```javascript
const fretboard = new Fretboard({
  fretCount: 12,
  stringCount: 6,
  orientation: 'horizontal',
  stringSpacing: 20,
  stringThickness: 2,
  fretSpacing: 30,
  fretThickness: 1,
  showInlays: true,
  inlayPositions: [3, 5, 7, 9, 12]
});
```

### Methods

| Method | Description |
|--------|-------------|
| `render()` | Returns SVG/Canvas element or data for rendering |
| `getFretPosition(fretIndex)` | Returns x/y coordinate for a fret |
| `getStringPosition(stringIndex)` | Returns x/y coordinate for a string |
| `addMarker(fretIndex, stringIndex, options)` | Adds a visual marker (placeholder for v2) |
| `getMarkerPosition(fretIndex, stringIndex)` | Returns position for marker placement |

---

## Default Tuning

Assumed standard guitar tuning (high E to low E):
```
String 1: E (thinnest)
String 2: B
String 3: G
String 4: D
String 5: A
String 6: E (thickest)
```

Note: Tuning does not affect visual rendering in v1, but positions must be consistent with string order.

---

## Output Format

Primary target: **SVG** (scalable, resolution-independent)

Secondary consideration: **Canvas API** wrapper for dynamic rendering

The library must expose raw coordinate data for custom rendering implementations.

---

## Constraints

- Must work in browser environments
- No external dependencies for core rendering logic
- Lightweight (< 10KB minified)
- Must not mutate input configuration

---

## Future Evolutions (Out of Scope for v1)

- Click/tap to add markers at (fret, string) positions
- Different inlay shapes (dots, blocks, custom)
- Nut and bridge visualization
- Multiple string sets (e.g., 7-string, bass)
- Scalloped fretboard support
- Fret position calculations based on scale length (real-world accuracy)

---

## Open Questions

1. Should the library handle note names (E, F, F#, etc.) at positions?
2. Should string thickness vary per string (thicker for lower strings)?
3. What color scheme for default rendering?
4. Should the nut (0th fret) be rendered?
5. Support for left-handed orientation (mirrored)?
