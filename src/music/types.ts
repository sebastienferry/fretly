/**
 * Standalone Music Catalog Type Definitions
 */

export interface MusicFingering {
  string: number;
  fret: number;
  text?: string;
  color?: string;
  textColor?: string;
  finger?: string | number;
  isRoot?: boolean;
}

export interface ChordDefinition {
  name: string;
  key: string;
  suffix: string;
  instrument?: string;
  fingerings: MusicFingering[];
}
