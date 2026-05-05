/**
 * SVG renderer for Fretboard Renderer Library
 */

import type { FretboardOptions, Position, Marker as MarkerInterface } from '../fretboard/types';
import { SVG_NS, CSS_CLASSES } from '../fretboard/constants';
import { String as GuitarString } from '../fretboard/String';
import { Fret } from '../fretboard/Fret';
import { Inlay } from '../fretboard/Inlay';
import type { Marker } from '../fretboard/Marker';
import {
  calculateHorizontalWidth,
  calculateHorizontalHeight,
  calculateVerticalWidth,
  calculateVerticalHeight
} from '../utils/geometry';

/**
 * SVG Renderer for creating fretboard SVG elements
 */
export class SvgRenderer {
  private readonly options: Required<FretboardOptions>;

  constructor(options: Required<FretboardOptions>) {
    this.options = options;
  }

  /**
   * Renders the complete fretboard as SVG element
   */
  render(
    strings: GuitarString[],
    frets: Fret[],
    inlays: Inlay[],
    markers: MarkerInterface[] = []
  ): SVGSVGElement {
    const isHorizontal = this.options.orientation === 'horizontal';
    
    // Calculate dimensions
    const width = isHorizontal
      ? calculateHorizontalWidth(this.options.fretCount, this.options.fretSpacing)
      : calculateVerticalWidth(this.options.stringCount, this.options.stringSpacing, this.options.stringThickness);
    
    const height = isHorizontal
      ? calculateHorizontalHeight(this.options.stringCount, this.options.stringSpacing, this.options.stringThickness)
      : calculateVerticalHeight(this.options.fretCount, this.options.fretSpacing);

    // Create SVG element
    const svg = this.createSvgElement(width, height);

    // Render components
    if (isHorizontal) {
      this.renderHorizontal(strings, frets, inlays, markers, svg);
    } else {
      this.renderVertical(strings, frets, inlays, markers, svg);
    }

    return svg;
  }

  /**
   * Creates the root SVG element with viewBox
   */
  private createSvgElement(width: number, height: number): SVGSVGElement {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));
    svg.setAttribute('class', CSS_CLASSES.root);
    svg.setAttribute('xmlns', SVG_NS);
    return svg;
  }

  /**
   * Renders fretboard in horizontal orientation
   */
  private renderHorizontal(
    strings: GuitarString[],
    frets: Fret[],
    inlays: Inlay[],
    markers: MarkerInterface[],
    svg: SVGSVGElement
  ): void {
    // Render strings (horizontal lines spanning fretboard width)
    const stringsGroup = this.createGroup(CSS_CLASSES.strings);
    for (const str of strings) {
      this.renderHorizontalString(str, svg.clientWidth, stringsGroup);
    }
    svg.appendChild(stringsGroup);

    // Render frets (vertical lines spanning fretboard height)
    const fretsGroup = this.createGroup(CSS_CLASSES.frets);
    for (const fret of frets) {
      this.renderHorizontalFret(fret, svg.clientHeight, fretsGroup);
    }
    svg.appendChild(fretsGroup);

    // Render inlays (above fretboard)
    if (this.options.showInlays) {
      const inlaysGroup = this.createGroup(CSS_CLASSES.inlays);
      for (const inlay of inlays) {
        this.renderHorizontalInlay(inlay, inlaysGroup);
      }
      svg.appendChild(inlaysGroup);
    }

    // Render markers (placeholder for v2)
    if (markers.length > 0) {
      const markersGroup = this.createGroup(CSS_CLASSES.markers);
      for (const marker of markers) {
        this.renderMarker(marker, markersGroup);
      }
      svg.appendChild(markersGroup);
    }
  }

  /**
   * Renders fretboard in vertical orientation
   */
  private renderVertical(
    strings: GuitarString[],
    frets: Fret[],
    inlays: Inlay[],
    markers: MarkerInterface[],
    svg: SVGSVGElement
  ): void {
    // Render strings (vertical lines spanning fretboard height)
    const stringsGroup = this.createGroup(CSS_CLASSES.strings);
    for (const str of strings) {
      this.renderVerticalString(str, svg.clientHeight, stringsGroup);
    }
    svg.appendChild(stringsGroup);

    // Render frets (horizontal lines spanning fretboard width)
    const fretsGroup = this.createGroup(CSS_CLASSES.frets);
    for (const fret of frets) {
      this.renderVerticalFret(fret, svg.clientWidth, fretsGroup);
    }
    svg.appendChild(fretsGroup);

    // Render inlays (left of fretboard)
    if (this.options.showInlays) {
      const inlaysGroup = this.createGroup(CSS_CLASSES.inlays);
      for (const inlay of inlays) {
        this.renderVerticalInlay(inlay, inlaysGroup);
      }
      svg.appendChild(inlaysGroup);
    }

    // Render markers (placeholder for v2)
    if (markers.length > 0) {
      const markersGroup = this.createGroup(CSS_CLASSES.markers);
      for (const marker of markers) {
        this.renderMarker(marker, markersGroup);
      }
      svg.appendChild(markersGroup);
    }
  }

  /**
   * Creates a grouped SVG element
   */
  private createGroup(className: string): SVGGElement {
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', className);
    return g;
  }

  /**
   * Renders a string in horizontal orientation
   */
  private renderHorizontalString(str: GuitarString, width: number, group: SVGElement): void {
    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('y1', String(str.y + str.thickness / 2));
    line.setAttribute('x2', String(width));
    line.setAttribute('y2', String(str.y + str.thickness / 2));
    line.setAttribute('stroke', '#000000');
    line.setAttribute('stroke-width', String(str.thickness));
    line.setAttribute('class', CSS_CLASSES.string(str.index));
    group.appendChild(line);
  }

  /**
   * Renders a fret in horizontal orientation
   */
  private renderHorizontalFret(fret: Fret, height: number, group: SVGElement): void {
    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', String(fret.x + fret.thickness / 2));
    line.setAttribute('y1', '0');
    line.setAttribute('x2', String(fret.x + fret.thickness / 2));
    line.setAttribute('y2', String(height));
    line.setAttribute('stroke', '#000000');
    line.setAttribute('stroke-width', String(fret.thickness));
    line.setAttribute('class', CSS_CLASSES.fret(fret.index));
    group.appendChild(line);
  }

  /**
   * Renders an inlay in horizontal orientation (above fretboard)
   */
  private renderHorizontalInlay(inlay: Inlay, group: SVGElement): void {
    const text = document.createElementNS(SVG_NS, 'text');
    text.setAttribute('x', String(inlay.x));
    text.setAttribute('y', String(inlay.y));
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'central');
    text.setAttribute('class', inlay.getCssClass());
    text.setAttribute('fill', '#000000');
    text.setAttribute('font-size', '14');
    text.setAttribute('font-family', 'sans-serif');
    text.textContent = inlay.label;
    group.appendChild(text);
  }

  /**
   * Renders a string in vertical orientation
   */
  private renderVerticalString(str: GuitarString, height: number, group: SVGElement): void {
    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', String(str.x + str.thickness / 2));
    line.setAttribute('y1', '0');
    line.setAttribute('x2', String(str.x + str.thickness / 2));
    line.setAttribute('y2', String(height));
    line.setAttribute('stroke', '#000000');
    line.setAttribute('stroke-width', String(str.thickness));
    line.setAttribute('class', CSS_CLASSES.string(str.index));
    group.appendChild(line);
  }

  /**
   * Renders a fret in vertical orientation
   */
  private renderVerticalFret(fret: Fret, width: number, group: SVGElement): void {
    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('y1', String(fret.y + fret.thickness / 2));
    line.setAttribute('x2', String(width));
    line.setAttribute('y2', String(fret.y + fret.thickness / 2));
    line.setAttribute('stroke', '#000000');
    line.setAttribute('stroke-width', String(fret.thickness));
    line.setAttribute('class', CSS_CLASSES.fret(fret.index));
    group.appendChild(line);
  }

  /**
   * Renders an inlay in vertical orientation (left of fretboard)
   */
  private renderVerticalInlay(inlay: Inlay, group: SVGElement): void {
    const text = document.createElementNS(SVG_NS, 'text');
    text.setAttribute('x', String(inlay.x));
    text.setAttribute('y', String(inlay.y));
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'central');
    text.setAttribute('class', inlay.getCssClass());
    text.setAttribute('fill', '#000000');
    text.setAttribute('font-size', '14');
    text.setAttribute('font-family', 'sans-serif');
    text.textContent = inlay.label;
    group.appendChild(text);
  }

  /**
   * Renders a marker (placeholder for v2)
   */
  private renderMarker(marker: MarkerInterface, group: SVGElement): void {
    // v1: Store marker but don't render
    // v2: Implement actual rendering with proper positioning
    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', String(marker.options.size ?? 4));
    circle.setAttribute('fill', marker.options.color ?? '#ff0000');
    circle.setAttribute('class', 'fretly-marker');
    group.appendChild(circle);
  }

  /**
   * Creates an SVG line element for a string
   */
  createStringElement(str: GuitarString, length: number, isHorizontal: boolean): SVGLineElement {
    const line = document.createElementNS(SVG_NS, 'line');
    
    if (isHorizontal) {
      line.setAttribute('x1', '0');
      line.setAttribute('y1', String(str.getCenterY()));
      line.setAttribute('x2', String(length));
      line.setAttribute('y2', String(str.getCenterY()));
    } else {
      line.setAttribute('x1', String(str.getCenterX()));
      line.setAttribute('y1', '0');
      line.setAttribute('x2', String(str.getCenterX()));
      line.setAttribute('y2', String(length));
    }
    
    line.setAttribute('stroke', '#000000');
    line.setAttribute('stroke-width', String(str.thickness));
    line.setAttribute('class', CSS_CLASSES.string(str.index));
    
    return line;
  }

  /**
   * Creates an SVG line element for a fret
   */
  createFretElement(fret: Fret, length: number, isHorizontal: boolean): SVGLineElement {
    const line = document.createElementNS(SVG_NS, 'line');
    
    if (isHorizontal) {
      line.setAttribute('x1', String(fret.getCenterX()));
      line.setAttribute('y1', '0');
      line.setAttribute('x2', String(fret.getCenterX()));
      line.setAttribute('y2', String(length));
    } else {
      line.setAttribute('x1', '0');
      line.setAttribute('y1', String(fret.getCenterY()));
      line.setAttribute('x2', String(length));
      line.setAttribute('y2', String(fret.getCenterY()));
    }
    
    line.setAttribute('stroke', '#000000');
    line.setAttribute('stroke-width', String(fret.thickness));
    line.setAttribute('class', CSS_CLASSES.fret(fret.index));
    
    return line;
  }
}
