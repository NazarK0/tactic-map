import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import Page404Component from './components/page-404/page-404.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    Page404Component,
  ],
  exports: [
    Page404Component,
  ]
})
export default class ErrorPagesModule {}
