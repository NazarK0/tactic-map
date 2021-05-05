import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import UploadMapService from '../../../uploadMap/uploadMap.service';
import SessionStorageService from '../../../../../shared/services/sessionStorage.service';
import { getMapAction, getMapFailureAction,getMapSuccessAction } from '../actions/getMap.action';
import { getSelectedToolAction, getSelectedToolSuccessAction, getSelectedToolFailureAction } from '../actions/getSelectedTool.action';

@Injectable()
export default class GetSelectedSignEffect {
  getSelectedSign$ = createEffect(() => this.actions$
    .pipe(
      ofType(getSelectedToolAction),
      switchMap(() => {
        return this.sessionStorage.getSelectedTool()
          .pipe(
            map((selectedTool) => getSelectedToolSuccessAction({ selectedTool })),
            catchError((error) => of(getSelectedToolFailureAction({ error })))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionStorage: SessionStorageService,
  ) {}
}
