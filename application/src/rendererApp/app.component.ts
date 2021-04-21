import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'tm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export default class AppComponent {
  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('uk');
  }
}
