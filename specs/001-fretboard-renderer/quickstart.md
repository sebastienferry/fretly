# Quickstart: Fretboard Renderer Library

## Installation

```bash
npm install fretly
# or
pnpm add fretly
# or
yarn add fretly
```

## Basic Usage

### Browser (ES Modules)

```html
<script type="module">
  import { Fretboard } from 'https://unpkg.com/fretly@latest/dist/index.js';
  
  const fretboard = new Fretboard();
  const svg = fretboard.render();
  document.body.appendChild(svg);
</script>
```

### Browser (UMD)

```html
<script src="https://unpkg.com/fretly@latest/dist/index.umd.js"></script>
<script>
  const fretboard = new fretly.Fretboard();
  const svg = fretboard.render();
  document.body.appendChild(svg);
</script>
```

### Node.js / Build Tools

```typescript
import { Fretboard } from 'fretly';

const fretboard = new Fretboard();
const svg = fretboard.render();
```

---

## Examples

### Standard 6-String Guitar (12 Frets)

```typescript
import { Fretboard } from 'fretly';

const fretboard = new Fretboard({
  fretCount: 12,
  stringCount: 6,
  orientation: 'horizontal'
});

const svg = fretboard.render();
document.getElementById('fretboard-container').appendChild(svg);
```

### 4-String Bass (Horizontal)

```typescript
const bassFretboard = new Fretboard({
  fretCount: 24,
  stringCount: 4,
  stringSpacing: 25,
  stringThickness: 3,
  fretSpacing: 35
});
```

### 7-String Guitar (Vertical)

```typescript
const sevenString = new Fretboard({
  fretCount: 24,
  stringCount: 7,
  orientation: 'vertical',
  inlayPositions: [3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
});
```

### Custom Spacing

```typescript
const wideSpacing = new Fretboard({
  stringSpacing: 30,  // More space between strings
  fretSpacing: 40,    // More space between frets
  stringThickness: 4, // Thicker strings
  fretThickness: 2    // Thicker frets
});
```

---

## Position Queries

### Get Fret Position

```typescript
// Get the coordinates for fret 5
const fretPos = fretboard.getFretPosition(5);
console.log(fretPos); // { x: 120, y: 0 }
```

### Get String Position

```typescript
// Get the coordinates for the 3rd string (index 2, B string)
const stringPos = fretboard.getStringPosition(2);
console.log(stringPos); // { x: 0, y: 40 }
```

### Get Marker Position

```typescript
// Get the position for a marker at fret 5, string 3 (G string)
const markerPos = fretboard.getMarkerPosition(5, 2);
console.log(markerPos); // { x: 120, y: 40 }
```

---

## Adding Custom Markers (v2 Preview)

```typescript
// Add a marker at fret 5, string 3
const marker = fretboard.addMarker(5, 2, {
  color: 'red',
  shape: 'circle',
  size: 8
});

console.log(marker);
// {
//   id: 'abc-123-def',
//   fretIndex: 5,
//   stringIndex: 2,
//   options: { color: 'red', shape: 'circle', size: 8 }
// }
```

> **Note**: Marker rendering is planned for v2. In v1, markers are stored but not visually rendered.

---

## Configuration Reference

| Option | Type | Default | Range | Description |
|--------|------|---------|-------|-------------|
| `fretCount` | number | 12 | 4-16 | Number of frets |
| `stringCount` | number | 6 | 4-8 | Number of strings |
| `orientation` | string | 'horizontal' | 'horizontal' \| 'vertical' | Layout direction |
| `stringSpacing` | number | 20 | > 0 | Distance between strings (px) |
| `stringThickness` | number | 2 | >= 0 | String thickness (px) |
| `fretSpacing` | number | 30 | > 0 | Distance between frets (px) |
| `fretThickness` | number | 1 | >= 0 | Fret thickness (px) |
| `inlayPositions` | number[] | [3, 5, 7, 9, 12] | - | Fret numbers to show |
| `showInlays` | boolean | true | - | Show inlay numbers |

---

## Styling

### CSS Classes

The rendered SVG includes CSS classes for easy styling:

```css
/* Target all strings */
.fretly-string {
  stroke: #000000;
}

/* Target a specific string */
.fretly-string-0 {
  stroke: #ff0000;
}

/* Target all frets */
.fretly-fret {
  stroke: #333333;
}

/* Target inlay numbers */
.fretly-inlay {
  fill: #000000;
  font-size: 14px;
  font-family: sans-serif;
}

/* Target specific inlay */
.fretly-inlay-12 {
  fill: #ff0000;
  font-weight: bold;
}
```

### Inline Styles

You can also style the SVG directly:

```typescript
const svg = fretboard.render();
svg.style.backgroundColor = '#f5f5f5';
svg.style.border = '1px solid #ccc';
```

---

## Browser Support

| Browser | Supported Versions |
|---------|-------------------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |

---

## Troubleshooting

### SVG Not Rendering

```typescript
// Make sure to append to a visible DOM element
const svg = fretboard.render();
document.body.appendChild(svg); // Works
document.getElementById('hidden').appendChild(svg); // May not be visible
```

### Invalid Configuration

```typescript
// These will throw errors:
new Fretboard({ fretCount: 3 });      // RangeError: fretCount must be 4-16
new Fretboard({ stringCount: 9 });    // RangeError: stringCount must be 4-8
new Fretboard({ orientation: 'diagonal' }); // TypeError: orientation must be 'horizontal' or 'vertical'
```

### Position Out of Range

```typescript
const fretboard = new Fretboard({ fretCount: 12 });
fretboard.getFretPosition(13); // RangeError: fretIndex must be 1-12
fretboard.getStringPosition(6); // RangeError: stringIndex must be 0-5
```

---

## Contributing

See the main repository for contribution guidelines.

---

## License

MIT
