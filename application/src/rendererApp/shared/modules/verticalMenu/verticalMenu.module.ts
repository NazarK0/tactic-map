import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import VerticalMenuComponent from './components/verticalMenu/verticalMenu.component';
import VerticalMenuService from './services/verticalMenu.service';
import GetVerticalMenuItemsEffect from './store/effects/getVerticalMenuItems.effect';
import verticalMenuReducer from './store/verticalMenu.reducer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('verticalMenu', verticalMenuReducer),
    EffectsModule.forFeature([
      GetVerticalMenuItemsEffect,
    ]),
  ],
  declarations: [VerticalMenuComponent],
  providers: [VerticalMenuService],
  exports: [VerticalMenuComponent],
})
export default class VerticalMenuModule {}
