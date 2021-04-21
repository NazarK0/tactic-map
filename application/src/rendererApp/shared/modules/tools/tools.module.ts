import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

import ColorPickerComponent from './components/colorPicker/colorPicker.component';
import FontPanelComponent from './components/fontPanel/fontPanel.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FontPanelComponent,
    ColorPickerComponent,
  ],
  exports: [
    FontPanelComponent,
    ColorPickerComponent,
  ]
})
export default class ToolsModule {}
