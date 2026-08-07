/**
 * Standalone FretlyMusic Catalog Entry Point
 */

import { ChordDefinition } from './types';

export const CHORD_CATALOG: ChordDefinition[] = [
  {
    name: "C Major",
    key: "C",
    suffix: "major",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 0, text: "E" },
      { string: 2, fret: 1, text: "C", isRoot: true, finger: 1 },
      { string: 3, fret: 0, text: "G" },
      { string: 4, fret: 2, text: "E", finger: 2 },
      { string: 5, fret: 3, text: "C", isRoot: true, finger: 3 },
      { string: 6, fret: -1, text: "X" }
    ]
  },
  {
    name: "A Minor",
    key: "Am",
    suffix: "minor",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 0, text: "E" },
      { string: 2, fret: 1, text: "C", finger: 1 },
      { string: 3, fret: 2, text: "A", isRoot: true, finger: 3 },
      { string: 4, fret: 2, text: "E", finger: 2 },
      { string: 5, fret: 0, text: "A", isRoot: true },
      { string: 6, fret: -1, text: "X" }
    ]
  },
  {
    name: "G Major",
    key: "G",
    suffix: "major",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 3, text: "G", isRoot: true, finger: 4 },
      { string: 2, fret: 0, text: "B" },
      { string: 3, fret: 0, text: "G", isRoot: true },
      { string: 4, fret: 0, text: "D" },
      { string: 5, fret: 2, text: "B", finger: 1 },
      { string: 6, fret: 3, text: "G", isRoot: true, finger: 2 }
    ]
  },
  {
    name: "E Major",
    key: "E",
    suffix: "major",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 0, text: "E", isRoot: true },
      { string: 2, fret: 0, text: "B" },
      { string: 3, fret: 1, text: "G#", finger: 1 },
      { string: 4, fret: 2, text: "E", isRoot: true, finger: 3 },
      { string: 5, fret: 2, text: "B", finger: 2 },
      { string: 6, fret: 0, text: "E", isRoot: true }
    ]
  },
  {
    name: "D Major",
    key: "D",
    suffix: "major",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 2, text: "F#", finger: 2 },
      { string: 2, fret: 3, text: "D", isRoot: true, finger: 3 },
      { string: 3, fret: 2, text: "A", finger: 1 },
      { string: 4, fret: 0, text: "D", isRoot: true },
      { string: 5, fret: -1, text: "X" },
      { string: 6, fret: -1, text: "X" }
    ]
  },
  {
    name: "B Minor",
    key: "Bm",
    suffix: "minor",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 2, text: "F#", finger: 1 },
      { string: 2, fret: 3, text: "D", finger: 2 },
      { string: 3, fret: 4, text: "B", isRoot: true, finger: 4 },
      { string: 4, fret: 4, text: "F#", finger: 3 },
      { string: 5, fret: 2, text: "B", isRoot: true, finger: 1 },
      { string: 6, fret: -1, text: "X" }
    ]
  },
  {
    name: "F Major",
    key: "F",
    suffix: "major",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 1, text: "F", isRoot: true, finger: 1 },
      { string: 2, fret: 1, text: "C", finger: 1 },
      { string: 3, fret: 2, text: "A", finger: 2 },
      { string: 4, fret: 3, text: "F", isRoot: true, finger: 4 },
      { string: 5, fret: 3, text: "C", finger: 3 },
      { string: 6, fret: 1, text: "F", isRoot: true, finger: 1 }
    ]
  },
  {
    name: "F Major 7",
    key: "Fmaj7",
    suffix: "maj7",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 0, text: "E" },
      { string: 2, fret: 1, text: "C", finger: 1 },
      { string: 3, fret: 2, text: "A", finger: 2 },
      { string: 4, fret: 3, text: "F", isRoot: true, finger: 3 },
      { string: 5, fret: -1, text: "X" },
      { string: 6, fret: -1, text: "X" }
    ]
  },
  {
    name: "E Dominant 7",
    key: "E7",
    suffix: "dom7",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 0, text: "E", isRoot: true },
      { string: 2, fret: 0, text: "B" },
      { string: 3, fret: 1, text: "G#", finger: 1 },
      { string: 4, fret: 0, text: "D" },
      { string: 5, fret: 2, text: "B", finger: 2 },
      { string: 6, fret: 0, text: "E", isRoot: true }
    ]
  },
  {
    name: "A Dominant 7",
    key: "A7",
    suffix: "dom7",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 0, text: "E" },
      { string: 2, fret: 2, text: "C#", finger: 2 },
      { string: 3, fret: 0, text: "G" },
      { string: 4, fret: 2, text: "E", finger: 1 },
      { string: 5, fret: 0, text: "A", isRoot: true },
      { string: 6, fret: -1, text: "X" }
    ]
  }
];

/**
 * Returns a chord definition by key or name (e.g. 'C', 'Am', 'G', 'Fmaj7', 'E7')
 * 
 * @param keyOrName - Key identifier (e.g. 'Am') or full name (e.g. 'A Minor')
 * @returns ChordDefinition or undefined if not found
 */
export function getChord(keyOrName: string): ChordDefinition | undefined {
  if (!keyOrName || keyOrName.trim() === '') return undefined;
  const search = keyOrName.trim().toLowerCase();
  return CHORD_CATALOG.find(c => c.key.toLowerCase() === search || c.name.toLowerCase() === search);
}

/**
 * Returns all available chord definitions in the catalog
 */
export function listChords(): ChordDefinition[] {
  return [...CHORD_CATALOG];
}

export type { ChordDefinition, MusicFingering } from './types';
