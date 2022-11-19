import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleSelectionComponent } from './scale-selection.component';

describe('ScaleSelectionComponent', () => {
  let component: ScaleSelectionComponent;
  let fixture: ComponentFixture<ScaleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
