/**
 * Standalone FretlyMusic Catalog Entry Point
 */

import { ChordDefinition } from './types';

export const CHORD_CATALOG: ChordDefinition[] = [
  // C Chords
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
    name: "C Minor",
    key: "Cm",
    suffix: "minor",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 3, text: "G", finger: 1 },
      { string: 2, fret: 4, text: "D#", finger: 2 },
      { string: 3, fret: 5, text: "C", isRoot: true, finger: 4 },
      { string: 4, fret: 5, text: "G", finger: 3 },
      { string: 5, fret: 3, text: "C", isRoot: true, finger: 1 },
      { string: 6, fret: -1, text: "X" }
    ]
  },

  // C# / Db
  {
    name: "C# Major",
    key: "C#",
    suffix: "major",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 4, text: "G#", finger: 1 },
      { string: 2, fret: 6, text: "F", finger: 4 },
      { string: 3, fret: 6, text: "C#", isRoot: true, finger: 3 },
      { string: 4, fret: 6, text: "G#", finger: 2 },
      { string: 5, fret: 4, text: "C#", isRoot: true, finger: 1 },
      { string: 6, fret: -1, text: "X" }
    ]
  },

  // D Chords
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
    name: "D Minor",
    key: "Dm",
    suffix: "minor",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 1, text: "F", finger: 1 },
      { string: 2, fret: 3, text: "D", isRoot: true, finger: 3 },
      { string: 3, fret: 2, text: "A", finger: 2 },
      { string: 4, fret: 0, text: "D", isRoot: true },
      { string: 5, fret: -1, text: "X" },
      { string: 6, fret: -1, text: "X" }
    ]
  },

  // D# / Eb
  {
    name: "D# Major",
    key: "D#",
    suffix: "major",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 3, text: "G", finger: 1 },
      { string: 2, fret: 4, text: "D#", isRoot: true, finger: 2 },
      { string: 3, fret: 3, text: "A#", finger: 1 },
      { string: 4, fret: 5, text: "D#", isRoot: true, finger: 3 },
      { string: 5, fret: -1, text: "X" },
      { string: 6, fret: -1, text: "X" }
    ]
  },

  // E Chords
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
    name: "E Minor",
    key: "Em",
    suffix: "minor",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 0, text: "E", isRoot: true },
      { string: 2, fret: 0, text: "B" },
      { string: 3, fret: 0, text: "G" },
      { string: 4, fret: 2, text: "E", isRoot: true, finger: 3 },
      { string: 5, fret: 2, text: "B", finger: 2 },
      { string: 6, fret: 0, text: "E", isRoot: true }
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

  // F Chords
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
    name: "F Minor",
    key: "Fm",
    suffix: "minor",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 1, text: "F", isRoot: true, finger: 1 },
      { string: 2, fret: 1, text: "G#", finger: 1 },
      { string: 3, fret: 1, text: "C", finger: 1 },
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

  // F# / Gb
  {
    name: "F# Major",
    key: "F#",
    suffix: "major",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 2, text: "F#", isRoot: true, finger: 1 },
      { string: 2, fret: 2, text: "C#", finger: 1 },
      { string: 3, fret: 3, text: "A#", finger: 2 },
      { string: 4, fret: 4, text: "F#", isRoot: true, finger: 4 },
      { string: 5, fret: 4, text: "C#", finger: 3 },
      { string: 6, fret: 2, text: "F#", isRoot: true, finger: 1 }
    ]
  },
  {
    name: "F# Minor",
    key: "F#m",
    suffix: "minor",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 2, text: "F#", isRoot: true, finger: 1 },
      { string: 2, fret: 2, text: "A", finger: 1 },
      { string: 3, fret: 2, text: "C#", finger: 1 },
      { string: 4, fret: 4, text: "F#", isRoot: true, finger: 4 },
      { string: 5, fret: 4, text: "C#", finger: 3 },
      { string: 6, fret: 2, text: "F#", isRoot: true, finger: 1 }
    ]
  },

  // G Chords
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
    name: "G Minor",
    key: "Gm",
    suffix: "minor",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 3, text: "G", isRoot: true, finger: 1 },
      { string: 2, fret: 3, text: "A#", finger: 1 },
      { string: 3, fret: 3, text: "D", finger: 1 },
      { string: 4, fret: 5, text: "G", isRoot: true, finger: 4 },
      { string: 5, fret: 5, text: "D", finger: 3 },
      { string: 6, fret: 3, text: "G", isRoot: true, finger: 1 }
    ]
  },

  // G# / Ab
  {
    name: "G# Major",
    key: "G#",
    suffix: "major",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 4, text: "G#", isRoot: true, finger: 1 },
      { string: 2, fret: 4, text: "D#", finger: 1 },
      { string: 3, fret: 5, text: "C", finger: 2 },
      { string: 4, fret: 6, text: "G#", isRoot: true, finger: 4 },
      { string: 5, fret: 6, text: "D#", finger: 3 },
      { string: 6, fret: 4, text: "G#", isRoot: true, finger: 1 }
    ]
  },

  // A Chords
  {
    name: "A Major",
    key: "A",
    suffix: "major",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 0, text: "E" },
      { string: 2, fret: 2, text: "C#", finger: 3 },
      { string: 3, fret: 2, text: "A", isRoot: true, finger: 2 },
      { string: 4, fret: 2, text: "E", finger: 1 },
      { string: 5, fret: 0, text: "A", isRoot: true },
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
  },

  // A# / Bb
  {
    name: "A# Major",
    key: "A#",
    suffix: "major",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 1, text: "F", finger: 1 },
      { string: 2, fret: 3, text: "D", finger: 4 },
      { string: 3, fret: 3, text: "A#", isRoot: true, finger: 3 },
      { string: 4, fret: 3, text: "F", finger: 2 },
      { string: 5, fret: 1, text: "A#", isRoot: true, finger: 1 },
      { string: 6, fret: -1, text: "X" }
    ]
  },
  {
    name: "A# Minor",
    key: "A#m",
    suffix: "minor",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 1, text: "F", finger: 1 },
      { string: 2, fret: 2, text: "C#", finger: 2 },
      { string: 3, fret: 3, text: "A#", isRoot: true, finger: 4 },
      { string: 4, fret: 3, text: "F", finger: 3 },
      { string: 5, fret: 1, text: "A#", isRoot: true, finger: 1 },
      { string: 6, fret: -1, text: "X" }
    ]
  },

  // B Chords
  {
    name: "B Major",
    key: "B",
    suffix: "major",
    instrument: "guitar-6string",
    fingerings: [
      { string: 1, fret: 2, text: "F#", finger: 1 },
      { string: 2, fret: 4, text: "D#", finger: 4 },
      { string: 3, fret: 4, text: "B", isRoot: true, finger: 3 },
      { string: 4, fret: 4, text: "F#", finger: 2 },
      { string: 5, fret: 2, text: "B", isRoot: true, finger: 1 },
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
