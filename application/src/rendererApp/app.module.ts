import { HttpClient,HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
// NG Translate
import { TranslateLoader,TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import AppComponent from './app.component';
import AppRoutingModule from './app-routing.module';
import DefaultSignGroupModule from './defaultSignGroup/dsg.module';
import MainPageModule from './mainPage/mainPage.module';
import SettingsModule from './settings/settings.module';
import LocalStorageService from './shared/services/localStorage.service';
import SessionStorageService from './shared/services/sessionStorage.service';
import UserSignGroupModule from './userSignGroup/usg.module';
import USG_AddSignsModule from './usgAddSigns/usgAddSigns.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
  
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    DefaultSignGroupModule,
    UserSignGroupModule,
    SettingsModule,
    MainPageModule,
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    USG_AddSignsModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        horizontalPosition: 'end',
      }
    },
    SessionStorageService,
    LocalStorageService,
  ],
  bootstrap: [AppComponent]
})
export default class AppModule {}
