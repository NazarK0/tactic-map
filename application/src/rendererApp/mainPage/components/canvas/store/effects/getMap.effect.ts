import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import UploadMapService from '../../../uploadMap/uploadMap.service';
import { getMapAction, getMapFailureAction,getMapSuccessAction } from '../actions/getMap.action';

@Injectable()
export default class GetMapEffect {
  getMap$ = createEffect(() => this.actions$
    .pipe(
      ofType(getMapAction),
      switchMap(() => {
        return this.uploadMapService.getMap()
          .pipe(
            map((mapUrl) => getMapSuccessAction({ mapUrl })),
            catchError((error) => of(getMapFailureAction({ error })))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private uploadMapService: UploadMapService,
  ) {}
}
