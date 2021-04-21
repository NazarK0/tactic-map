import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import DSG_SharedService from "../shared/services/dsg.service";
import UtilsService from "../shared/services/utils.service";
import AddSignsPageComponent from './components/@addSignsPage/addSignsPage.component';
import addSignsPageReducer from "./components/@addSignsPage/store/addSignsPage.reducer";
import GetDSG_PageComponentEffect from './components/@addSignsPage/store/effects/getDSG.effect';
import UpdateSignStatus_Effect from './components/@addSignsPage/store/effects/updateSignStatus.effect';
import DSG_TogglerComponent from './components/dsgToggler/dsgToggler.component';
// import GetDSG_EditComponentEffect from './components/dsgEdit/store/effects/getDSG.effect';
import dsgTogglerReducer from './components/dsgToggler/store/dsgToggler.reducer';
import GetDSG_MenuEffect from './components/dsgToggler/store/effects/getDSG_Menu.effect';
import UAS_SignCardComponent from './components/signCard/signCard.component';
import uasRoutes from './usgAddSigns.routes';

@NgModule({
  imports: [
  

    CommonModule,
    EffectsModule.forFeature([
      GetDSG_PageComponentEffect,
      // GetDSG_EditComponentEffect,
      GetDSG_MenuEffect,
      UpdateSignStatus_Effect,
    ]),
    StoreModule.forFeature('addSignsPage', addSignsPageReducer),
    StoreModule.forFeature('addSignsToggler', dsgTogglerReducer),

    RouterModule.forChild(uasRoutes),
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
    MatCheckboxModule,
  ],
  declarations: [
    AddSignsPageComponent,
    DSG_TogglerComponent,
    UAS_SignCardComponent,
  ],
  providers: [
    UtilsService,
    DSG_SharedService,
  ],
})
export default class USG_AddSignsModule {}
