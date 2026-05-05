# Research: Fretboard Renderer Library

## Overview

Research tasks to resolve NEEDS CLARIFICATION items from Technical Context and Feature Spec.

---

## Decisions

### R-001: Implementation Language - TypeScript

**Decision**: Use TypeScript 4.9+

**Rationale**: 
- Strong typing improves API contracts and developer experience
- Better IDE support for library consumers
- Catches configuration errors at compile time
- Zero runtime overhead (compiles to plain JS)
- Industry standard for modern JS libraries

**Alternatives considered**:
- Plain JavaScript ES6+: Simpler setup but loses type safety
- Rejected because: TypeScript provides better long-term maintainability with minimal overhead

---

### R-002: Testing Framework - Jest

**Decision**: Jest with jsdom

**Rationale**:
- Most popular JS testing framework
- Built-in support for DOM testing via jsdom
- Excellent mocking capabilities
- Watch mode for development
- Good TypeScript integration

**Alternatives considered**:
- Vitest: Faster, but newer ecosystem
- Mocha + Chai: More boilerplate
- Rejected because: Jest offers the best balance of maturity, features, and community support

---

### R-003: String Thickness - Uniform

**Decision**: Uniform string thickness for v1

**Rationale**:
- Simpler implementation (single config value)
- Matches spec requirement for "string thickness representation"
- Variable thickness can be added in v2 as enhancement

**Alternatives considered**:
- Variable thickness per string: More realistic but adds complexity
- Rejected because: Out of scope for v1; can be added without breaking changes later

---

### R-004: Color Scheme - Default

**Decision**: Black (#000000) strings and frets on transparent background

**Rationale**:
- Maximum compatibility (visible on any background)
- Simple to implement
- Matches typical diagram conventions
- Can be overridden via CSS

**Alternatives considered**:
- White on dark: Less flexible for embedding
- Themed colors: Adds configuration complexity
- Rejected because: Transparent background with dark foreground is most flexible

---

### R-005: Nut Rendering - Exclude from v1

**Decision**: Do not render the nut (0th fret) in v1

**Rationale**:
- Spec explicitly states "The nut (0th fret) is out of scope for v1"
- Keeps initial implementation focused
- Can be added in future version

**Alternatives considered**:
- Include nut: More complete visualization
- Rejected because: Explicitly out of scope per spec assumptions

---

### R-006: Left-handed Support - Exclude from v1

**Decision**: Do not support left-handed (mirrored) orientation in v1

**Rationale**:
- Spec explicitly states "Left-handed orientation (mirrored) is out of scope for v1"
- Adds complexity to coordinate calculations
- Low priority for initial release

**Alternatives considered**:
- Include left-handed: Broader accessibility
- Rejected because: Explicitly out of scope per spec assumptions

---

### R-007: Note Names Display - Exclude from v1

**Decision**: Do not display note names (E, F, F#) in v1

**Rationale**:
- Spec explicitly states "Note names (E, F, F#) display is out of scope for v1"
- Requires music theory logic (note calculation per fret)
- Different tuning support needed for full implementation

**Alternatives considered**:
- Include note names: More useful for musicians
- Rejected because: Explicitly out of scope per spec assumptions

---

### R-008: Browser Support Matrix

**Decision**: Last 2 versions of Chrome, Firefox, Safari, Edge

**Rationale**:
- Covers ~95% of browser usage
- ES6+ features widely supported in these versions
- SVG support is stable and consistent
- Reasonable for a modern library

**Alternatives considered**:
- Last 1 version only: More restrictive, excludes some users
- Last 3 versions: Wider support but heavier polyfills
- All browsers: Impractical maintenance burden
- Rejected because: Last 2 versions balances coverage and maintenance

---

## External Research

### SVG Rendering Best Practices

**Findings**:
- Use `<svg>` with explicit `viewBox` for responsive scaling
- Group related elements with `<g>` for organization
- Use `stroke-width` for line thickness (strings, frets)
- Use `text-anchor: middle` for centered inlay numbers
- Set `dominant-baseline: central` for vertical text alignment

**Sources**:
- MDN SVG Documentation
- SVG 2 Specification

---

### Browser SVG Support

**Findings**:
- All modern browsers support SVG 1.1 and partial SVG 2
- `<line>`, `<rect>`, `<text>` elements universally supported
- `viewBox` attribute well-supported
- No polyfills needed for target browsers

**Sources**:
- Can I Use: SVG (caniuse.com/svg)
- MDN Browser Compatibility Data

---

### Bundle Size Optimization

**Findings**:
- Target < 10KB minified achievable with:
  - No external dependencies
  - Tree-shakable exports
  - Minimal type definitions in bundle
- Rollup or esbuild recommended for bundling
- Source maps for development

**Sources**:
- Bundlephobia.com benchmarks
- Webpack/bundler documentation

---

## Open Questions for User

1. **Project name**: What should the library be named? (Suggestion: `fretly` based on repo name)
2. **Package manager**: npm or pnpm for development?
3. **Bundler**: Rollup, esbuild, or vite for library bundling?
4. **TypeScript strict mode**: Enable all strict type checking options?

---

## Summary

All NEEDS CLARIFICATION items from Technical Context and Spec have been addressed with decisions. 4 open questions remain for user confirmation before proceeding to implementation.
