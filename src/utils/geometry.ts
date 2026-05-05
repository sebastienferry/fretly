/**
 * Coordinate geometry utilities for Fretboard Renderer Library
 */

import type { Position } from '../fretboard/types';

/**
 * Calculate total width of fretboard in horizontal orientation
 */
export function calculateHorizontalWidth(
  fretCount: number,
  fretSpacing: number
): number {
  // Frets are at positions: 0, fretSpacing, fretSpacing*2, ..., fretSpacing*(fretCount-1)
  // Total width = last fret position + fretSpacing for end
  // But we want the width to cover all frets, so it's fretSpacing * fretCount
  // Actually: if we have N frets, there are N-1 gaps between them
  // Plus we need space before first and after last
  // For simplicity: total width = fretSpacing * fretCount
  return fretSpacing * fretCount;
}

/**
 * Calculate total height of fretboard in horizontal orientation
 */
export function calculateHorizontalHeight(
  stringCount: number,
  stringSpacing: number,
  stringThickness: number
): number {
  // Strings are at positions: 0, stringSpacing, stringSpacing*2, ..., stringSpacing*(stringCount-1)
  // Total height = last string position + stringThickness
  return stringSpacing * (stringCount - 1) + stringThickness;
}

/**
 * Calculate total width of fretboard in vertical orientation
 */
export function calculateVerticalWidth(
  stringCount: number,
  stringSpacing: number,
  stringThickness: number
): number {
  // In vertical orientation, strings run horizontally
  return stringSpacing * (stringCount - 1) + stringThickness;
}

/**
 * Calculate total height of fretboard in vertical orientation
 */
export function calculateVerticalHeight(
  fretCount: number,
  fretSpacing: number
): number {
  return fretSpacing * fretCount;
}

/**
 * Get string Y position for horizontal orientation
 * String 0 (high E) is at top (y=0)
 * String N (low E) is at bottom
 */
export function getHorizontalStringY(
  stringIndex: number,
  stringSpacing: number
): number {
  return stringIndex * stringSpacing;
}

/**
 * Get string X position for vertical orientation
 * String 0 (high E) is at left (x=0)
 * String N (low E) is at right
 */
export function getVerticalStringX(
  stringIndex: number,
  stringSpacing: number
): number {
  return stringIndex * stringSpacing;
}

/**
 * Get fret X position for horizontal orientation
 * Fret 1 is at x=0, Fret 2 at x=fretSpacing, etc.
 */
export function getHorizontalFretX(
  fretIndex: number,
  fretSpacing: number
): number {
  return (fretIndex - 1) * fretSpacing;
}

/**
 * Get fret Y position for vertical orientation
 * Fret 1 is at y=0, Fret 2 at y=fretSpacing, etc.
 */
export function getVerticalFretY(
  fretIndex: number,
  fretSpacing: number
): number {
  return (fretIndex - 1) * fretSpacing;
}

/**
 * Get inlay X position for horizontal orientation (above fretboard)
 */
export function getHorizontalInlayX(
  fretIndex: number,
  fretSpacing: number
): number {
  return getHorizontalFretX(fretIndex, fretSpacing);
}

/**
 * Get inlay Y position for horizontal orientation (above fretboard)
 */
export function getHorizontalInlayY(
  stringCount: number,
  stringSpacing: number,
  inlayOffset: number = 20
): number {
  // Position above the fretboard
  return -inlayOffset;
}

/**
 * Get inlay X position for vertical orientation (left of fretboard)
 */
export function getVerticalInlayX(
  stringCount: number,
  stringSpacing: number,
  inlayOffset: number = 20
): number {
  // Position to the left of the fretboard
  return -inlayOffset;
}

/**
 * Get inlay Y position for vertical orientation (left of fretboard)
 */
export function getVerticalInlayY(
  fretIndex: number,
  fretSpacing: number
): number {
  return getVerticalFretY(fretIndex, fretSpacing);
}

/**
 * Get marker position for horizontal orientation
 */
export function getHorizontalMarkerPosition(
  fretIndex: number,
  stringIndex: number,
  fretSpacing: number,
  stringSpacing: number
): Position {
  return {
    x: getHorizontalFretX(fretIndex, fretSpacing),
    y: getHorizontalStringY(stringIndex, stringSpacing)
  };
}

/**
 * Get marker position for vertical orientation
 */
export function getVerticalMarkerPosition(
  fretIndex: number,
  stringIndex: number,
  fretSpacing: number,
  stringSpacing: number
): Position {
  return {
    x: getVerticalStringX(stringIndex, stringSpacing),
    y: getVerticalFretY(fretIndex, fretSpacing)
  };
}

/**
 * Get fret position for horizontal orientation
 */
export function getHorizontalFretPosition(
  fretIndex: number,
  fretSpacing: number,
  height: number
): Position {
  // Fret spans full height of fretboard
  return {
    x: getHorizontalFretX(fretIndex, fretSpacing),
    y: 0
  };
}

/**
 * Get fret position for vertical orientation
 */
export function getVerticalFretPosition(
  fretIndex: number,
  fretSpacing: number,
  width: number
): Position {
  // Fret spans full width of fretboard
  return {
    x: 0,
    y: getVerticalFretY(fretIndex, fretSpacing)
  };
}

/**
 * Get string position for horizontal orientation
 */
export function getHorizontalStringPosition(
  stringIndex: number,
  stringSpacing: number,
  width: number
): Position {
  // String spans full width of fretboard
  return {
    x: 0,
    y: getHorizontalStringY(stringIndex, stringSpacing)
  };
}

/**
 * Get string position for vertical orientation
 */
export function getVerticalStringPosition(
  stringIndex: number,
  stringSpacing: number,
  height: number
): Position {
  // String spans full height of fretboard
  return {
    x: getVerticalStringX(stringIndex, stringSpacing),
    y: 0
  };
}
