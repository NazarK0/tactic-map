import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import UploadMapService from '../../uploadMap.service';
import { uploadMapAction, uploadMapFailureAction,uploadMapSuccessAction } from '../actions/uploadMap.action';

@Injectable()
export default class UploadMapEffect {
  uploadMap$ = createEffect(() => this.actions$
    .pipe(
      ofType(uploadMapAction),
      switchMap(() => {
        return this.uploadMapService.uploadMap()
          .pipe(
            map(() => uploadMapSuccessAction()),
            catchError((error) => of(uploadMapFailureAction({ error })))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private uploadMapService: UploadMapService,
  ) {}
}
