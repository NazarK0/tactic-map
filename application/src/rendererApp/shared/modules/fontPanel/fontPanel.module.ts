import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import FontPanelComponent from './components/@fontPanel/fontPanel.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [FontPanelComponent],
  exports: [FontPanelComponent]
})
export default class FontPanelModule {}
