/**
 * Fret class representing a single fret wire
 */

import type { Fret as FretInterface } from './types';

/**
 * Represents a single fret wire with position and thickness
 */
export class Fret implements FretInterface {
  /** Zero-based fret index (1 to fretCount, v1 excludes nut at 0) */
  readonly index: number;
  
  /** X coordinate */
  readonly x: number;
  
  /** Y coordinate */
  readonly y: number;
  
  /** Visual thickness */
  readonly thickness: number;

  /**
   * Creates a new Fret instance
   * @param index - One-based fret index (1 to fretCount)
   * @param x - X coordinate (horizontal) or Y coordinate (vertical)
   * @param thickness - Visual thickness in pixels
   */
  constructor(index: number, x: number, thickness: number) {
    this.index = index;
    this.x = x;
    this.y = 0; // Will be set based on orientation
    this.thickness = thickness;
  }

  /**
   * Returns the center X position for horizontal orientation
   */
  getCenterX(): number {
    return this.x + this.thickness / 2;
  }

  /**
   * Returns the center Y position for vertical orientation
   */
  getCenterY(): number {
    return this.y + this.thickness / 2;
  }

  /**
   * Returns position as object
   */
  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  /**
   * Returns whether this is the first fret
   */
  isFirst(): boolean {
    return this.index === 1;
  }

  /**
   * Returns whether this is the last fret in a given count
   */
  isLast(fretCount: number): boolean {
    return this.index === fretCount;
  }
}
