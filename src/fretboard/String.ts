/**
 * String class representing a single guitar string
 */

import type { String as StringInterface } from './types';
import { STANDARD_TUNING } from './constants';

/**
 * Represents a single guitar string with position and thickness
 */
export class String implements StringInterface {
  /** Zero-based string index (0 = highest/thinnest) */
  readonly index: number;
  
  /** Standard tuning note (E, B, G, D, A, E) */
  readonly tuningNote?: string;
  
  /** X coordinate */
  readonly x: number;
  
  /** Y coordinate */
  readonly y: number;
  
  /** Visual thickness */
  readonly thickness: number;

  /**
   * Creates a new String instance
   * @param index - Zero-based string index
   * @param y - Y coordinate (horizontal) or X coordinate (vertical)
   * @param thickness - Visual thickness in pixels
   * @param stringCount - Total number of strings (for tuning note)
   */
  constructor(
    index: number,
    y: number,
    thickness: number,
    stringCount: number = 6
  ) {
    this.index = index;
    this.y = y;
    this.thickness = thickness;
    this.x = 0; // Will be set based on orientation
    
    // Assign tuning note if within standard 6-string range
    if (index < STANDARD_TUNING.length && index < stringCount) {
      this.tuningNote = STANDARD_TUNING[index];
    }
  }

  /**
   * Returns the center Y position for horizontal orientation
   */
  getCenterY(): number {
    return this.y + this.thickness / 2;
  }

  /**
   * Returns the center X position for vertical orientation
   */
  getCenterX(): number {
    return this.x + this.thickness / 2;
  }

  /**
   * Returns position as object
   */
  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  /**
   * Returns string identifier (e.g., "E", "B", "G")
   */
  getNote(): string | undefined {
    return this.tuningNote;
  }
}
