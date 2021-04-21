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
import { Router, RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import DSG_SignCardModule from '../shared/modules/dsgSignCard/dsgSignCard.module';
import DSG_SharedService from "../shared/services/dsg.service";
import UtilsService from "../shared/services/utils.service";
import DSG_PageComponent from './components/@dsgPage/dsgPage.component';
import dsgPageReducer from './components/@dsgPage/store/dsgPage.reducer';
import DSG_DeleteSignEffect from './components/@dsgPage/store/effects/deleteSign.effect';
import GetDSG_PageComponentEffect from './components/@dsgPage/store/effects/getDSG.effect';
import DSG_AddSignComponent from './components/dsgAddSign/dsgAddSign.component';
import dsgAddSignReducer from './components/dsgAddSign/store/dsgAddSign.reducer';
import AddDSG_SignEffect from './components/dsgAddSign/store/effects/addSign.effect';
import DSG_CreateComponent from './components/dsgCreate/dsgCreate.component';
import dsgCreateReducer from './components/dsgCreate/store/dsgCreate.reducer';
import CreateDSG_Effect from './components/dsgCreate/store/effects/createDSG.effect';
import DSG_EditComponent from './components/dsgEdit/dsgEdit.component';
import dsgEditReducer from './components/dsgEdit/store/dsgEdit.reducer';
import GetDSG_EditComponentEffect from './components/dsgEdit/store/effects/getDSG.effect';
import UpdateDSG_Effect from './components/dsgEdit/store/effects/updateDSG.effect';
import DSG_EditSignComponent from './components/dsgEditSign/dsgEditSign.component';
import dsgEditSignReducer from './components/dsgEditSign/store/dsgEditSign.reducer';
import DSG_GetSignEffect from './components/dsgEditSign/store/effects/getSign.effect';
import DSG_UpdateSignEffect from './components/dsgEditSign/store/effects/updateSign.effect';
import DSG_FormComponent from './components/dsgForm/dsgForm.component';
import DSG_SignFormComponent from './components/dsgSignForm/dsgSignForm.component';
import dsgSignFormReducer from './components/dsgSignForm/store/dsgSignForm.reducer';
import DSG_UploadImageEffect from './components/dsgSignForm/store/effects/uploadImage.effect';
import DSG_TogglerComponent from './components/dsgToggler/dsgToggler.component';
import dsgTogglerReducer from './components/dsgToggler/store/dsgToggler.reducer';
import DeleteDSG_Effect from './components/dsgToggler/store/effects/deleteDSG.effect';
import GetDSG_MenuEffect from './components/dsgToggler/store/effects/getDSG_Menu.effect';
import dsgRoutes from './dsg.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dsgRoutes),
    EffectsModule.forFeature([
      GetDSG_PageComponentEffect,
      GetDSG_EditComponentEffect,
      CreateDSG_Effect,
      UpdateDSG_Effect,
      GetDSG_MenuEffect,
      DeleteDSG_Effect,
      AddDSG_SignEffect,
      DSG_UploadImageEffect,
      DSG_DeleteSignEffect,
      DSG_GetSignEffect,
      DSG_UpdateSignEffect,
    ]),
    StoreModule.forFeature('dsgPage', dsgPageReducer),
    StoreModule.forFeature('dsgCreate', dsgCreateReducer),
    StoreModule.forFeature('dsgEdit', dsgEditReducer),
    StoreModule.forFeature('dsgToggler', dsgTogglerReducer),
    StoreModule.forFeature('dsgAddSign', dsgAddSignReducer),
    StoreModule.forFeature('dsgEditSign', dsgEditSignReducer),
    StoreModule.forFeature('dsgSignForm', dsgSignFormReducer),
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
    DSG_SignCardModule,
  ],
  declarations: [
    DSG_PageComponent,
    DSG_CreateComponent,
    DSG_EditComponent,
    DSG_TogglerComponent,
    DSG_FormComponent,
    DSG_SignFormComponent,
    DSG_AddSignComponent,
    DSG_EditSignComponent,
  ],
  providers: [
    UtilsService,
    DSG_SharedService,
  ],
})
export default class DefaultSignGroupModule {}
