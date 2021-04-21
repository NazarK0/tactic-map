import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import UploadMapService from '../../../uploadMap/uploadMap.service';
import SessionStorageService from '../../../../../shared/services/sessionStorage.service';
import { getMapAction, getMapFailureAction,getMapSuccessAction } from '../actions/getMap.action';
import { getSelectedSignAction, getSelectedSignSuccessAction, getSelectedSignFailureAction } from '../actions/getSelectedSign.action';

@Injectable()
export default class GetSelectedSignEffect {
  getSelectedSign$ = createEffect(() => this.actions$
    .pipe(
      ofType(getSelectedSignAction),
      switchMap(() => {
        return this.sessionStorage.getSelectedUSG()
          .pipe(
            map((selectedSign) => getSelectedSignSuccessAction({ selectedSign })),
            catchError((error) => of(getSelectedSignFailureAction({ error })))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionStorage: SessionStorageService,
  ) {}
}
