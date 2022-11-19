import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  chromaticScale,
  modeHarmonicMinor,
  modeMajor,
  modeMelodicMinor,
  ModeObj,
} from '../../models/constants';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-scale-selection',
  templateUrl: './scale-selection.component.html',
  styleUrls: ['./scale-selection.component.scss'],
})
export class ScaleSelectionComponent implements OnInit {
  public chromaticScale = chromaticScale;
  public modes = modeMajor.concat(modeHarmonicMinor, modeMelodicMinor);
  public mode$: BehaviorSubject<ModeObj | null> = this.modeService.modeObj$;
  public selecteRoot$: BehaviorSubject<any> =
    this.modeService.selectedRootNote$;

  root: any;
  selectedMode: any;

  constructor(private modeService: ModeService) {}

  ngOnInit(): void {
    this.mode$.subscribe((x) => {
      this.construcDisplayArray(x);
      console.log('--------', x);
    });
    this.selecteRoot$.pipe(take(1)).subscribe((x) => {
      this.root = x;
    });
    this.modeService.selectedMode$.pipe(take(1)).subscribe((x) => {
      this.selectedMode = x;
    });
  }

  construcDisplayArray(x: ModeObj | null) {}

  changeRoot(event: MatSelectChange) {
    this.modeService.selectedRootNote$.next(event.value);
    console.log(event.value);
  }

  changeMode(event: MatSelectChange) {
    this.modeService.selectedMode$.next(event.value);
    console.log(event.value);
  }
}
