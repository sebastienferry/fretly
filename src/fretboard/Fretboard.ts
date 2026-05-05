/**
 * Fretboard class - Main class for rendering guitar fretboards
 */

import type { FretboardOptions, Position } from './types';
import { Marker } from './Marker';
import { String } from './String';
import { Fret } from './Fret';
import { Inlay } from './Inlay';
import { SvgRenderer } from '../renderers/svg';
import {
  DEFAULT_FRET_COUNT,
  DEFAULT_STRING_COUNT,
  DEFAULT_ORIENTATION,
  DEFAULT_STRING_SPACING,
  DEFAULT_STRING_THICKNESS,
  DEFAULT_FRET_SPACING,
  DEFAULT_FRET_THICKNESS,
  DEFAULT_SHOW_INLAYS,
  DEFAULT_INLAY_POSITIONS
} from './constants';
import { validateOptions } from '../utils/validation';
import {
  getHorizontalStringY,
  getHorizontalFretX,
  getVerticalStringX,
  getVerticalFretY,
  getHorizontalMarkerPosition,
  getVerticalMarkerPosition,
  getHorizontalFretPosition,
  getHorizontalStringPosition,
  getVerticalFretPosition,
  getVerticalStringPosition,
  calculateHorizontalWidth,
  calculateHorizontalHeight,
  calculateVerticalWidth,
  calculateVerticalHeight
} from '../utils/geometry';

// Re-export types for convenience
export type { FretboardOptions };

/**
 * Main Fretboard class for rendering guitar necks as SVG
 */
export class Fretboard {
  /** Configuration options */
  private readonly options: Required<FretboardOptions>;

  /** SVG renderer instance */
  private readonly renderer: SvgRenderer;

  /** Cached strings */
  private strings: String[] = [];

  /** Cached frets */
  private frets: Fret[] = [];

  /** Cached inlays */
  private inlays: Inlay[] = [];

  /** Custom markers */
  private markers: Marker[] = [];

  /** SVG element cache */
  private svgCache?: SVGSVGElement;

  /**
   * Creates a new Fretboard instance
   * @param options - Partial configuration (missing values use defaults)
   */
  constructor(options: Partial<FretboardOptions> = {}) {
    // Merge options with defaults
    this.options = {
      fretCount: DEFAULT_FRET_COUNT,
      stringCount: DEFAULT_STRING_COUNT,
      orientation: DEFAULT_ORIENTATION,
      stringSpacing: DEFAULT_STRING_SPACING,
      stringThickness: DEFAULT_STRING_THICKNESS,
      fretSpacing: DEFAULT_FRET_SPACING,
      fretThickness: DEFAULT_FRET_THICKNESS,
      inlayPositions: [...DEFAULT_INLAY_POSITIONS],
      showInlays: DEFAULT_SHOW_INLAYS,
      ...options
    };

    // Validate all provided options
    validateOptions(options);

    // Initialize renderer
    this.renderer = new SvgRenderer(this.options);

    // Initialize geometry
    this.initializeGeometry();
  }

  /**
   * Initializes strings, frets, and inlays based on configuration
   */
  private initializeGeometry(): void {
    this.initializeStrings();
    this.initializeFrets();
    this.initializeInlays();
    this.svgCache = undefined; // Invalidate cache
  }

  /**
   * Creates string objects with positions
   */
  private initializeStrings(): void {
    this.strings = [];
    const isHorizontal = this.options.orientation === 'horizontal';

    for (let i = 0; i < this.options.stringCount; i++) {
      const position = isHorizontal
        ? getHorizontalStringY(i, this.options.stringSpacing)
        : getVerticalStringX(i, this.options.stringSpacing);

      this.strings.push(new String(
        i,
        position,
        this.options.stringThickness,
        this.options.stringCount
      ));
    }
  }

  /**
   * Creates fret objects with positions
   */
  private initializeFrets(): void {
    this.frets = [];
    const isHorizontal = this.options.orientation === 'horizontal';

    for (let i = 1; i <= this.options.fretCount; i++) {
      const position = isHorizontal
        ? getHorizontalFretX(i, this.options.fretSpacing)
        : getVerticalFretY(i, this.options.fretSpacing);

      this.frets.push(new Fret(i, position, this.options.fretThickness));
    }
  }

  /**
   * Creates inlay objects at specified positions
   */
  private initializeInlays(): void {
    this.inlays = [];
    const isHorizontal = this.options.orientation === 'horizontal';

    for (const fretNumber of this.options.inlayPositions) {
      if (fretNumber > this.options.fretCount) continue;

      if (isHorizontal) {
        const x = getHorizontalFretX(fretNumber, this.options.fretSpacing);
        const y = -20; // Above fretboard
        this.inlays.push(new Inlay(fretNumber, x, y, 'above'));
      } else {
        const x = -20; // Left of fretboard
        const y = getVerticalFretY(fretNumber, this.options.fretSpacing);
        this.inlays.push(new Inlay(fretNumber, x, y, 'left'));
      }
    }
  }

  /**
   * Renders the fretboard as an SVG element
   */
  render(): SVGSVGElement {
    if (this.svgCache) {
      return this.svgCache;
    }

    this.svgCache = this.renderer.render(
      this.strings,
      this.frets,
      this.inlays,
      this.markers
    );

    return this.svgCache;
  }

  /**
   * Returns the coordinates for a specific fret
   */
  getFretPosition(fretIndex: number): Position {
    if (fretIndex < 1 || fretIndex > this.options.fretCount) {
      throw new RangeError(
        `fretIndex must be between 1 and ${this.options.fretCount}, got ${fretIndex}`
      );
    }

    const isHorizontal = this.options.orientation === 'horizontal';

    if (isHorizontal) {
      return getHorizontalFretPosition(
        fretIndex,
        this.options.fretSpacing,
        calculateHorizontalHeight(
          this.options.stringCount,
          this.options.stringSpacing,
          this.options.stringThickness
        )
      );
    } else {
      return getVerticalFretPosition(
        fretIndex,
        this.options.fretSpacing,
        calculateVerticalWidth(
          this.options.stringCount,
          this.options.stringSpacing,
          this.options.stringThickness
        )
      );
    }
  }

  /**
   * Returns the coordinates for a specific string
   */
  getStringPosition(stringIndex: number): Position {
    if (stringIndex < 0 || stringIndex >= this.options.stringCount) {
      throw new RangeError(
        `stringIndex must be between 0 and ${this.options.stringCount - 1}, got ${stringIndex}`
      );
    }

    const isHorizontal = this.options.orientation === 'horizontal';

    if (isHorizontal) {
      return getHorizontalStringPosition(
        stringIndex,
        this.options.stringSpacing,
        calculateHorizontalWidth(
          this.options.fretCount,
          this.options.fretSpacing
        )
      );
    } else {
      return getVerticalStringPosition(
        stringIndex,
        this.options.stringSpacing,
        calculateVerticalHeight(
          this.options.fretCount,
          this.options.fretSpacing
        )
      );
    }
  }

  /**
   * Returns the coordinates for placing a marker at a specific fret/string intersection
   */
  getMarkerPosition(fretIndex: number, stringIndex: number): Position {
    if (fretIndex < 1 || fretIndex > this.options.fretCount) {
      throw new RangeError(
        `fretIndex must be between 1 and ${this.options.fretCount}, got ${fretIndex}`
      );
    }
    if (stringIndex < 0 || stringIndex >= this.options.stringCount) {
      throw new RangeError(
        `stringIndex must be between 0 and ${this.options.stringCount - 1}, got ${stringIndex}`
      );
    }

    const isHorizontal = this.options.orientation === 'horizontal';

    if (isHorizontal) {
      return getHorizontalMarkerPosition(
        fretIndex,
        stringIndex,
        this.options.fretSpacing,
        this.options.stringSpacing
      );
    } else {
      return getVerticalMarkerPosition(
        fretIndex,
        stringIndex,
        this.options.fretSpacing,
        this.options.stringSpacing
      );
    }
  }

  /**
   * Adds a custom marker to the fretboard
   */
  addMarker(
    fretIndex: number,
    stringIndex: number,
    options: Partial<Marker['options']> = {}
  ): Marker {
    if (fretIndex < 1 || fretIndex > this.options.fretCount) {
      throw new RangeError(
        `fretIndex must be between 1 and ${this.options.fretCount}, got ${fretIndex}`
      );
    }
    if (stringIndex < 0 || stringIndex >= this.options.stringCount) {
      throw new RangeError(
        `stringIndex must be between 0 and ${this.options.stringCount - 1}, got ${stringIndex}`
      );
    }

    const marker = new Marker(fretIndex, stringIndex, options);
    this.markers.push(marker);
    this.svgCache = undefined; // Invalidate cache
    return marker;
  }

  /**
   * Removes a marker by ID (for v2)
   */
  removeMarker(id: string): boolean {
    const index = this.markers.findIndex(m => m.id === id);
    if (index === -1) {
      return false;
    }
    this.markers.splice(index, 1);
    this.svgCache = undefined; // Invalidate cache
    return true;
  }

  /**
   * Clears all markers
   */
  clearMarkers(): void {
    this.markers = [];
    this.svgCache = undefined; // Invalidate cache
  }

  /**
   * Returns all markers
   */
  getMarkers(): Marker[] {
    return [...this.markers];
  }

  /**
   * Returns configuration options
   */
  getOptions(): Required<FretboardOptions> {
    return { ...this.options };
  }

  /**
   * Returns number of frets
   */
  get fretCount(): number {
    return this.options.fretCount;
  }

  /**
   * Returns number of strings
   */
  get stringCount(): number {
    return this.options.stringCount;
  }

  /**
   * Returns orientation
   */
  get orientation(): 'horizontal' | 'vertical' {
    return this.options.orientation;
  }

  /**
   * Invalidates the SVG cache (call after external modifications)
   */
  invalidateCache(): void {
    this.svgCache = undefined;
  }
}
