import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// import { NgxSvgModule } from 'ngx-svg';
import FontPanelModule from '../shared/modules/fontPanel/fontPanel.module';
import MainPageComponent from './components/@mainPage/mainPage.component';
import CanvasComponent from './components/canvas/canvas.component';
import CanvasService from '../shared/services/canvas.service';
import canvasReducer from './components/canvas/store/canvas.reducer';
import GetMapEffect from './components/canvas/store/effects/getMap.effect';
import GetSelectedToolEffect from './components/canvas/store/effects/getSelectedTool.effect';
import LeftToolbarComponent from './components/leftToolbar/leftToolbar.component';
import GetUSG_ListEffect from './components/leftToolbar/store/effects/getToolGroups.effect';
import UpdateSelectedUSG_Effect from './components/leftToolbar/store/effects/updateSelectedToolGroup.effect';
import leftToolbarReducer from './components/leftToolbar/store/leftToolbar.reducer';
import TopToolbarComponent from './components/topToolbar/topToolbar.component';
import UploadMapEffect from './components/uploadMap/store/effects/uploadMap.effect';
import uploadMapReducer from './components/uploadMap/store/uploadMap.reducer';
import UploadMapComponent from './components/uploadMap/uploadMap.component';
import UploadMapService from './components/uploadMap/uploadMap.service';
import USG_Component from './components/userSignGroup/usg.component';
import MainPageRoutes from './mainPage.routes';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      GetUSG_ListEffect,
      UpdateSelectedUSG_Effect,
      UploadMapEffect,
      GetMapEffect,
      GetSelectedToolEffect,
    ]),
    StoreModule.forFeature('leftToolbar', leftToolbarReducer),
    StoreModule.forFeature('uploadMap', uploadMapReducer),
    StoreModule.forFeature('canvas', canvasReducer),
    RouterModule.forChild(MainPageRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FontPanelModule,
  ],
  declarations: [
    MainPageComponent,
    TopToolbarComponent,
    LeftToolbarComponent,
    USG_Component,
    CanvasComponent,
    UploadMapComponent,
  ],
  providers: [
    // UtilsService,
    UploadMapService,
    CanvasService,
  ],
})
export default class MainPageModule {}
