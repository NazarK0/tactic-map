import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import SharedUSG_Service from '../../../../../shared/services/usg.service';
import { USG_DeleteSignAction, USG_DeleteSignFailureAction,USG_DeleteSignSuccessAction } from '../actions/deleteSign.action';

@Injectable()
export default class USG_DeleteSignEffect {
  deleteSign$ = createEffect(() => this.actions$
    .pipe(
      ofType(USG_DeleteSignAction),
      switchMap(({ signId }) => {
        return this.sharedUSG_Service
          .deleteSignById(signId)
          .pipe(
            map((signList) => USG_DeleteSignSuccessAction({ signList })),
            catchError((error) => of(USG_DeleteSignFailureAction({ error })))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sharedUSG_Service: SharedUSG_Service,
  ) {}
}
