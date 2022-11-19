import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { ScaleSelectionComponent } from './components/scale-selection/scale-selection.component';
import { ModeService } from './services/mode.service';

const materialModules = [
  MatButtonModule,
  MatButtonModule,
  MatCardModule,
  MatOptionModule,
  MatSelectModule,
  MatTabsModule,
  MatRadioModule,
  MatFormFieldModule,
];

@NgModule({
  declarations: [AppComponent, ContainerComponent, ScaleSelectionComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
  providers: [ModeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
