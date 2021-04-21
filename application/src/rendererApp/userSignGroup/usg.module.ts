import { CommonModule } from "@angular/common";
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
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import USG_SignCardModule from '../shared/modules/usgSignCard/usgSignCard.module';
import USG_SharedService from "../shared/services/usg.service";
import UtilsService from "../shared/services/utils.service";
import USG_DeleteSignEffect from './components/@usgPage/store/effects/deleteSign.effect';
import GetUSG_PageComponentEffect from './components/@usgPage/store/effects/getUSG.effect';
import usgPageReducer from './components/@usgPage/store/usgPage.reducer';
import USG_PageComponent from './components/@usgPage/usgPage.component';
import CreateUSG_Effect from './components/usgCreate/store/effects/createUSG.effect';
import usgCreateReducer from './components/usgCreate/store/usgCreate.reducer';
import USG_CreateComponent from './components/usgCreate/usgCreate.component';
import GetUSG_EditComponentEffect from './components/usgEdit/store/effects/getUSG.effect';
import UpdateUSG_Effect from './components/usgEdit/store/effects/updateUSG.effect';
import usgEditReducer from './components/usgEdit/store/usgEdit.reducer';
import USG_EditComponent from './components/usgEdit/usgEdit.component';
import USG_FormComponent from './components/usgForm/usgForm.component';
import DeleteUSG_Effect from './components/usgToggler/store/effects/deleteUSG.effect';
import GetUSG_MenuEffect from './components/usgToggler/store/effects/getDSG_Menu.effect';
import usgTogglerReducer from './components/usgToggler/store/usgToggler.reducer';
import USG_TogglerComponent from './components/usgToggler/usgToggler.component';
import usgRoutes from './usg.routes';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      GetUSG_PageComponentEffect,
      GetUSG_EditComponentEffect,
      CreateUSG_Effect,
      UpdateUSG_Effect,
      GetUSG_MenuEffect,
      DeleteUSG_Effect,
      USG_DeleteSignEffect,
    ]),
    StoreModule.forFeature('usgPage', usgPageReducer),
    StoreModule.forFeature('usgCreate', usgCreateReducer),
    StoreModule.forFeature('usgEdit', usgEditReducer),
    StoreModule.forFeature('usgToggler', usgTogglerReducer),
    RouterModule.forChild(usgRoutes),
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
    USG_SignCardModule,
  ],
  declarations: [
    USG_PageComponent,
    USG_CreateComponent,
    USG_EditComponent,
    USG_TogglerComponent,
    USG_FormComponent,
  ],
  providers: [
    UtilsService,
    USG_SharedService,
  ],
})
export default class UserSignGroupModule {}
