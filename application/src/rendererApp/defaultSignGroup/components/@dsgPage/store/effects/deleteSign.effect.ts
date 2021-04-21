import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import { DSG_DeleteSignAction, DSG_DeleteSignFailureAction,DSG_DeleteSignSuccessAction } from '../actions/deleteSign.action';

@Injectable()
export default class DSG_DeleteSignEffect {
  deleteSign$ = createEffect(() => this.actions$
    .pipe(
      ofType(DSG_DeleteSignAction),
      switchMap(({ signId }) => {
        return this.sharedDSG_Service
          .deleteSignById(signId)
          .pipe(
            map((signList) => DSG_DeleteSignSuccessAction({ signList })),
            catchError((error) => of(DSG_DeleteSignFailureAction({ error })))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sharedDSG_Service: SharedDSG_Service,
  ) {}
}
