import { parse } from '@angular/compiler/src/render3/view/style_parser';
import { Injectable } from '@angular/core';
import {
  Chord,
  ChordType,
  Mode,
  Scale,
  ScaleType,
  Interval,
  RomanNumeral,
} from '@tonaljs/tonal';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  Filters,
  ModeObj,
  allModes,
  modeMajorEnum,
  modeMajor,
} from '../models/constants';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  // Selected Root Note
  public selectedRootNote$: BehaviorSubject<any> = new BehaviorSubject<any>(
    'C'
  );
  // Selected Mode
  public selectedMode$: BehaviorSubject<any> = new BehaviorSubject<any>(
    'ionian'
  );
  public selectedScale$: BehaviorSubject<any> = new BehaviorSubject<any>(
    'major pentatonic'
  );

  public selectedChord$: BehaviorSubject<any> = new BehaviorSubject<any>(
    'major'
  );
  // Notes of the Selected Mode
  public modeObj$: BehaviorSubject<ModeObj | null> =
    new BehaviorSubject<ModeObj | null>(null);
  public scaleObj$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public selectedFilter$: BehaviorSubject<Filters> =
    new BehaviorSubject<Filters>(Filters.notes);
  public selectedTab$: BehaviorSubject<any> = new BehaviorSubject<any>('mode');
  public romanNumeralArray$: BehaviorSubject<any[] | null> =
    new BehaviorSubject<any[] | null>(null);
  public test: allModes;

  constructor() {
    // console.log('**** ', Mode.all());
    console.log('**** ', ScaleType.all());
    // console.log('^^^^ ', Scale.get("c minor six pentatonic"))
    // console.log('!!!! ', ChordType.names());
    console.log('********: ', Scale.get('a ultralocrian'));
    console.log('------------------- ', modeMajorEnum);
    this.test = 'dorian';
    this.createModeObj();
    this.createScaleObj();
    // this.createMelodicMinorModes();
  }

  public createModeObj() {
    combineLatest(this.selectedMode$, this.selectedRootNote$).subscribe(
      ([selectedMode, selectedRootNote]) => {
        if (modeMajor.includes(selectedMode)) {
          console.log('MAJOR');
        }
        let newMode: ModeObj = {};
        let mode = Mode.get(selectedMode);
        let triads = Mode.triads(selectedMode, selectedRootNote);
        let notes = Mode.notes(selectedMode, selectedRootNote);
        let sevenths = Mode.seventhChords(selectedMode, selectedRootNote);

        // this.createIntervalTranslation(mode.intervals);
        this.createRomanNumeralFromInterval(mode.intervals);
        newMode.name = mode.name;
        newMode.intervals = mode.intervals;
        newMode.intervalRoman = this.romanNumeralArray$;
        newMode.degree = this.createDegrees(mode.intervals);
        newMode.seventh = mode.seventh;
        newMode.sevenths = sevenths;
        newMode.triads = triads;
        newMode.notes = notes;
        newMode.triadMap = this.createChordToneMap(newMode.triads);
        newMode.seventhMap = this.createChordToneMap(newMode.sevenths);
        newMode.isActive = true;

        // newMode.aliases = mode.aliases;
        // newMode.intervals = this.createIntervalTranslation(mode.intervals);
        // newMode.modeNum = mode.modeNum;
        // newMode.alt = mode.alt;

        console.log('new Mode:', newMode);

        this.modeObj$.next(newMode);
      }
    );
  }

  public createScaleObj() {
    combineLatest(this.selectedRootNote$, this.selectedScale$).subscribe(
      ([rootNote, scale]) => {
        let selectedScale = Scale.get(rootNote + ' ' + scale);
        // console.log(selectedScale)
        this.scaleObj$.next(selectedScale);
      }
    );
  }

  public createScaleSelector() {}

  public createChordObj() {
    combineLatest(this.selectedRootNote$, this.selectedChord$).subscribe();
  }

  public getAllScales() {
    return Scale.names();
  }

  public getAllChordTypes() {
    return ChordType.names();
  }

  public createChordToneMap(triads: any[]) {
    let chordToneMap: any = [];
    triads.forEach((triad: any) => {
      let newNoteObj: any = {};
      newNoteObj[triad] = Chord.get(triad).notes;
      chordToneMap.push(newNoteObj);
    });
    return chordToneMap;
  }

  public createDegrees(interval: any[]) {
    let degreeArray: any = [];
    interval.forEach((i, index) => {
      let degree = (index + 1).toString();
      if (i.includes('P') || i.includes('M')) {
        degreeArray.push(degree);
      } else if (i.includes('m')) {
        let flatString;
        flatString = 'b' + degree;
        degreeArray.push(flatString);
      } else if (i.includes('A')) {
        let sharpString;
        sharpString = degree + '#';
        degreeArray.push(sharpString);
      }
    });
    return degreeArray;
  }

  public createRomanNumeralFromInterval(interval: any[]) {
    // todo: look into pipe
    this.modeObj$.pipe().subscribe((mode) => {
      let romanArray: any = [];
      interval.forEach((i) => {
        romanArray.push(RomanNumeral.get(Interval.get(i)).name);
      });
      console.log('roman array 1: ', romanArray);
      console.log(mode?.triads);
      romanArray.forEach((x: any, index: number) => {
        if (
          // @ts-ignore
          mode?.triads[index].includes('dim')
        ) {
          romanArray[index] = x.toLowerCase() + 'º';
        } else if (
          // @ts-ignore
          mode?.triads[index].includes('m')
        ) {
          romanArray[index] = x.toLowerCase();
        }

        if (
          // @ts-ignore
          romanArray[index].includes('b') ||
          romanArray[index].includes('#')
        ) {
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$');
          romanArray[index] = romanArray[index].substring(1);
        }

        // console.log(' xxx  ', x.toLowerCase());
      });
      console.log('roman array: ', romanArray);
      this.romanNumeralArray$.next(romanArray);
      // return romanArray;
    });
  }

  public createIntervalTranslation(intervals: any[]) {
    let newIntervalArray: any = [];
    intervals.forEach((interval) => {
      let root: number = parseInt(interval[0], 10);
      let degree: string = interval[1];
      let type;
      let finalValue = '';
      let additionalInfo = ''; // refers different degree compared to major scale ie. 3b
      if (degree === 'P' || degree === 'M') {
        type = 'Major';
      } else if (degree === 'm') {
        type = 'minor';
      } else if (degree === 'd') {
        type = 'diminished';
      }

      // construct roman numerals
      if (root <= 3) {
        let x = 1;
        while (x <= root) {
          finalValue += 'I';
          x++;
        }
      } else if (root === 4) {
        finalValue = 'IV';
      } else if (root === 5) {
        finalValue = 'V';
      } else if (root >= 6) {
        let x = 6;
        finalValue = 'V';
        while (x <= root) {
          finalValue += 'I';
          x++;
        }
      }

      // convert to lowercase if mnior or diminished
      if (type === 'minor') {
        finalValue.toLowerCase();
        console.log('#######');
      } else if (type === 'diminished') {
        finalValue.toLowerCase();
      }
      newIntervalArray.push(finalValue);
    });
    // console.log('interval array: ', newIntervalArray);
  }

  private createMelodicMinorModes(): void {
    let minorModeNames: string[] = [
      'harmonic minor',
      'locrian 6',
      'major augmented',
      'dorian b2',
      'phrygian dominant',
      'lydian #9',
      'ultralocrian',
    ];
    let minorModeArray: any[] = [];
    minorModeNames.forEach((mode) => {
      let scale = Scale.get('c' + ' ' + mode);
      minorModeArray.push(scale);
    });
    // console.log('^   :', minorModeArray);
  }

  // public changeTabSelection

  // getNotesInTriad()
  // getNotesInSeventhChords()
  // getScaleDegree()
  // getAllScales()
  // getMajorScales()
  // getMinorScales()
  // getPentatonicScales()
}
