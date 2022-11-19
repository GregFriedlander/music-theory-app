import { BehaviorSubject } from 'rxjs';

export const chromaticScale = [
  'C',
  'C#',
  'D',
  'Eb',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'Bb',
  'B',
];

export const modeMajor = [
  'ionian',
  'dorian',
  'phrygian',
  'lydian',
  'mixolydian',
  'aeolian',
  'locrian',
];

export const modeHarmonicMinor = [
  'harmonic minor',
  'locrian 6',
  'major augmented',
  'lydian diminished',
  'phrygian dominant',
  'lydian #9',
  'ultralocrian',
];

export const modeMelodicMinor = [
  'melodic minor',
  'dorian b2',
  'lydian augmented',
  'lydian dominant',
  'mixolydian b6',
  'locrian #2',
  'altered',
];

export enum modeMajorEnum {
  IONIAN = 'ionian',
  DORIAN = 'dorian',
  PHRYGIAN = 'phrygian',
  LYDIAN = 'lydian',
  MIXOLYDIAN = 'mixolydian',
  AEOLIAN = 'aeolian',
  LOCRAIN = 'locrian',
}

export enum modeHarmonicMinorEnum {
  HARMONIC_MINOR = 'harmonic minor',
  LOCRIAN_6 = 'locrian 6',
  MAJOR_AUGMENTED = 'major augmented',
  LYDIAN_DIMINISHED = 'lydian diminished',
  PHRYGIAN_DOMINANT = 'phrygian dominant',
  LYDIAN_SHARP9 = 'lydian #9',
  ULTRALOCRIAN = 'ultralocrian',
}

export enum modeMelodicMinorEnum {
  MELODIC_MINOR = 'melodic minor',
  DORIAN_FLAT2 = 'dorian b2',
  LYDIAN_AUGMENTED = 'lydian augmented',
  LYDIAN_DOMINANT = 'lydian dominant',
  MIXOLYDIAN_FLAT6 = 'mixolydian b6',
  LOCRIAN_SHARP2 = 'locrian #2',
  ALTERED = 'altered',
}

export type allModes = `${
  | modeMajorEnum
  | modeHarmonicMinorEnum
  | modeMelodicMinorEnum}`;

export const scaleSelectValues = [
  { name: 'Major Modes', values: modeMajor },
  { name: 'Harmonic Minor Modes', values: modeHarmonicMinor },
  { name: 'Melodic Minor Modes', values: modeMelodicMinor },
];

export interface ModeObj {
  isActive?: boolean;
  name?: string; // todo create Mode enum
  aliases?: string[];
  // intervals?: string[];
  intervals?: any;
  intervalRoman?: BehaviorSubject<any[] | null>;
  modeNum?: number;
  alt?: number;
  triads?: string[]; // type
  seventh?: string; // type
  sevenths?: string[]; // type
  notes?: string[];
  empty?: boolean;
  triadMap?: any;
  seventhMap?: {};
  degree?: any;
}

export interface newScale {}

export interface DegreeInformation {
  triad: string[];
  triadValues: string[];
  sevenths: string[];
  intervals: string[];
}

export interface ScaleObj {
  isActive?: boolean;
  empty?: boolean;
  name?: string;
  type?: string;
  tonic?: string;
  notes?: string[];
  intervals?: string[];
  aliases?: string[];
}

export enum Filters {
  notes = 'Notes',
  triads = 'Triads',
  sevenths = 'Sevenths',
  scales = 'Scales',
  chords = 'Chords',
  key = 'Key',
  voices = 'Voices',
}

const noteValueTest: any = {
  note: 'C',
  triad: 'CMaj',
  triadValues: [
    { note: 'C', degree: 'Root' },
    { note: 'E', degree: 'Major Third' },
    { note: 'G', degree: 'Perfect Fifth' },
  ],
};
