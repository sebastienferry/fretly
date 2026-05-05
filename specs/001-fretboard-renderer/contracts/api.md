# API Contract: Fretboard Renderer Library

## Overview

This document defines the public API contract for the Fretboard Renderer Library. The library is a JavaScript/TypeScript library for rendering guitar fretboards as SVG elements.

---

## Library Entry Point

```typescript
import { Fretboard, FretboardOptions } from 'fretly';
// or
const { Fretboard } = require('fretly');
```

---

## Types

### FretboardOptions

Configuration options for creating a Fretboard instance.

```typescript
interface FretboardOptions {
  /** Number of frets to display (4-16) */
  fretCount?: number;
  
  /** Number of strings (4-8) */
  stringCount?: number;
  
  /** Layout direction: 'horizontal' or 'vertical' */
  orientation?: 'horizontal' | 'vertical';
  
  /** Distance between string centers in pixels */
  stringSpacing?: number;
  
  /** Visual thickness of strings in pixels */
  stringThickness?: number;
  
  /** Distance between fret centers in pixels */
  fretSpacing?: number;
  
  /** Visual thickness of frets in pixels */
  fretThickness?: number;
  
  /** Which fret numbers to display as inlays */
  inlayPositions?: number[];
  
  /** Whether to display inlay numbers */
  showInlays?: boolean;
}
```

**Defaults:**
```typescript
{
  fretCount: 12,
  stringCount: 6,
  orientation: 'horizontal',
  stringSpacing: 20,
  stringThickness: 2,
  fretSpacing: 30,
  fretThickness: 1,
  inlayPositions: [3, 5, 7, 9, 12],
  showInlays: true
}
```

---

### Position

2D coordinate representation.

```typescript
interface Position {
  /** X coordinate in pixels */
  x: number;
  /** Y coordinate in pixels */
  y: number;
}
```

---

### MarkerOptions

Options for custom markers (placeholder for v2).

```typescript
interface MarkerOptions {
  /** Marker color (CSS color value) */
  color?: string;
  /** Marker shape: 'circle', 'square', 'dot', etc. */
  shape?: string;
  /** Marker size in pixels */
  size?: number;
  /** Custom CSS classes */
  className?: string;
  /** Additional data attached to marker */
  data?: Record<string, unknown>;
}
```

---

### Marker

Represents a marker on the fretboard.

```typescript
interface Marker {
  /** Unique identifier */
  id: string;
  /** Fret position (1-based) */
  fretIndex: number;
  /** String position (0-based) */
  stringIndex: number;
  /** Marker options */
  options: MarkerOptions;
}
```

---

## Classes

### Fretboard

Main class for creating and manipulating fretboard visualizations.

#### Constructor

```typescript
class Fretboard {
  constructor(options?: Partial<FretboardOptions>);
}
```

**Parameters:**
- `options`: Partial configuration object. Missing properties use defaults.

**Throws:**
- `RangeError`: If `fretCount` is outside 4-16 range
- `RangeError`: If `stringCount` is outside 4-8 range
- `RangeError`: If spacing/thickness values are negative
- `TypeError`: If `orientation` is not 'horizontal' or 'vertical'

**Example:**
```typescript
const fretboard = new Fretboard({
  fretCount: 12,
  stringCount: 6,
  orientation: 'horizontal'
});
```

#### Methods

##### render()

Renders the fretboard as an SVG element.

```typescript
render(): SVGSVGElement;
```

**Returns:** SVG element with the following structure:
```svg
<svg viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Frets as <line> elements -->
  <g class="fretly-frets">
    <line x1="..." y1="..." x2="..." y2="..." />
    ...
  </g>
  
  <!-- Strings as <line> or <rect> elements -->
  <g class="fretly-strings">
    <line x1="..." y1="..." x2="..." y2="..." stroke-width="..." />
    ...
  </g>
  
  <!-- Inlays as <text> elements -->
  <g class="fretly-inlays">
    <text x="..." y="..." text-anchor="middle">3</text>
    ...
  </g>
</svg>
```

**CSS Classes:**
- `fretly` - Root SVG element
- `fretly-frets` - Container for fret elements
- `fretly-strings` - Container for string elements
- `fretly-inlays` - Container for inlay number elements
- `fretly-markers` - Container for custom markers (v2)

**Example:**
```typescript
const svg = fretboard.render();
document.body.appendChild(svg);
```

##### getFretPosition(fretIndex)

Returns the coordinates for a specific fret.

```typescript
getFretPosition(fretIndex: number): Position;
```

**Parameters:**
- `fretIndex`: 1-based index of the fret (1 to fretCount)

**Returns:** Position object with x and y coordinates

**Throws:**
- `RangeError`: If `fretIndex` is outside valid range

**Example:**
```typescript
const pos = fretboard.getFretPosition(5);
// { x: 120, y: 0 }
```

##### getStringPosition(stringIndex)

Returns the coordinates for a specific string.

```typescript
getStringPosition(stringIndex: number): Position;
```

**Parameters:**
- `stringIndex`: 0-based index of the string (0 to stringCount-1)

**Returns:** Position object with x and y coordinates

**Throws:**
- `RangeError`: If `stringIndex` is outside valid range

**Example:**
```typescript
const pos = fretboard.getStringPosition(2);
// { x: 0, y: 40 } (for stringSpacing: 20)
```

##### getMarkerPosition(fretIndex, stringIndex)

Returns the coordinates for placing a marker at a specific fret/string intersection.

```typescript
getMarkerPosition(fretIndex: number, stringIndex: number): Position;
```

**Parameters:**
- `fretIndex`: 1-based index of the fret (1 to fretCount)
- `stringIndex`: 0-based index of the string (0 to stringCount-1)

**Returns:** Position object with x and y coordinates at the intersection

**Throws:**
- `RangeError`: If `fretIndex` or `stringIndex` is outside valid range

**Example:**
```typescript
const pos = fretboard.getMarkerPosition(3, 2);
// { x: 60, y: 40 }
```

##### addMarker(fretIndex, stringIndex, options)

Adds a custom marker to the fretboard. (Placeholder for v2 - stores marker but doesn't render in v1)

```typescript
addMarker(fretIndex: number, stringIndex: number, options?: MarkerOptions): Marker;
```

**Parameters:**
- `fretIndex`: 1-based index of the fret (1 to fretCount)
- `stringIndex`: 0-based index of the string (0 to stringCount-1)
- `options`: Optional marker styling/behavior options

**Returns:** Marker object with id, fretIndex, stringIndex, and options

**Throws:**
- `RangeError`: If `fretIndex` or `stringIndex` is outside valid range

**Example:**
```typescript
const marker = fretboard.addMarker(5, 2, { color: 'red', shape: 'circle' });
// { id: 'abc-123', fretIndex: 5, stringIndex: 2, options: { color: 'red', shape: 'circle' } }
```

---

## SVG Output Specification

### ViewBox

The SVG element MUST have a `viewBox` attribute set to:
- Horizontal: `"0 0 {totalWidth} {totalHeight}"`
- Vertical: `"0 0 {totalHeight} {totalWidth}"`

Where:
- `totalWidth` = fretCount * fretSpacing + fretThickness
- `totalHeight` = (stringCount - 1) * stringSpacing + stringThickness

### Dimensions

The SVG element SHOULD have `width` and `height` attributes for explicit sizing, but this is optional (CSS can control size).

### String Elements

Each string MUST be rendered as a `<line>` element with:
- `x1`, `y1`, `x2`, `y2` attributes defining the line endpoints
- `stroke` attribute for color (default: black)
- `stroke-width` attribute equal to `stringThickness`
- `class` attribute including `fretly-string` and `fretly-string-{index}`

### Fret Elements

Each fret MUST be rendered as a `<line>` element with:
- `x1`, `y1`, `x2`, `y2` attributes defining the line endpoints
- `stroke` attribute for color (default: black)
- `stroke-width` attribute equal to `fretThickness`
- `class` attribute including `fretly-fret` and `fretly-fret-{index}`

### Inlay Elements

Each inlay number MUST be rendered as a `<text>` element with:
- `x`, `y` attributes for position
- `text-anchor: "middle"` for horizontal centering
- `dominant-baseline: "central"` for vertical centering
- Content equal to the fret number
- `class` attribute including `fretly-inlay` and `fretly-inlay-{fretNumber}`

---

## Error Handling

All methods MUST throw appropriate errors for invalid inputs:
- `RangeError` for out-of-range numeric indices
- `TypeError` for invalid types or enum values
- Error messages MUST be descriptive and include the invalid value

---

## Versioning

This API contract follows semantic versioning:
- **MAJOR**: Breaking changes to public API
- **MINOR**: Backward-compatible new features
- **PATCH**: Backward-compatible bug fixes

**v1 Stability:** The core API (`constructor`, `render`, `getFretPosition`, `getStringPosition`, `getMarkerPosition`, `addMarker`) is stable for v1. Additional methods may be added in minor versions.

---

## Examples

### Basic Usage

```typescript
import { Fretboard } from 'fretly';

// Create a standard 6-string, 12-fret fretboard
const fretboard = new Fretboard();

// Render to SVG
const svg = fretboard.render();
document.getElementById('app').appendChild(svg);
```

### Custom Configuration

```typescript
const fretboard = new Fretboard({
  fretCount: 24,
  stringCount: 7,
  orientation: 'vertical',
  stringSpacing: 25,
  stringThickness: 3,
  fretSpacing: 35,
  inlayPositions: [3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
});
```

### Position Queries

```typescript
const fretPos = fretboard.getFretPosition(12);
const stringPos = fretboard.getStringPosition(0);
const markerPos = fretboard.getMarkerPosition(5, 3);
```

### Future: Marker Management (v2)

```typescript
// These will be fully implemented in v2
const marker = fretboard.addMarker(5, 2, { color: 'red' });
// fretboard.removeMarker(marker.id);
// fretboard.updateMarker(marker.id, { color: 'blue' });
```
