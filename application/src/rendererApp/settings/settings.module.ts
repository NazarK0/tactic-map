import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";

import SettingsComponent from './components/@settings/settings.component';
import SettingsGeneralComponent from './components/general/general.component';
import SettingsTogglerComponent from './components/toggler/settingsToggler.component';
import settingsRoutes  from './settings.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(settingsRoutes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    SettingsComponent,
    SettingsGeneralComponent,
    SettingsTogglerComponent,
  ],
})
export default class SettingsModule { }
