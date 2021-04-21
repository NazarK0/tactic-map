import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import DSG_SignInterface from '../../../../../shared/types/dsgSign.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import { DSG_UpdateSignAction, DSG_UpdateSignFailureAction,DSG_UpdateSignSuccessAction } from '../actions/updateSign.action';

@Injectable()
export default class DSG_UpdateSignEffect {
  updateSign$ = createEffect(() => this.actions$.pipe(
    ofType(DSG_UpdateSignAction),
    switchMap(({ id, signInput }) => {
      return this.sharedDSG_Service.updateSignById(id, signInput).pipe(
        map((signResponse: DSG_SignInterface) => DSG_UpdateSignSuccessAction({ signResponse })),
        catchError((error: ErrorInterface) => {
          return of(DSG_UpdateSignFailureAction({ error }));
        })
      );
    })
  ));

  redirectAfterUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(DSG_UpdateSignSuccessAction),
    tap(({ signResponse: { dsgFK } }) => {
      this.router.navigate(['/settings/default-sign-group'], { queryParams: { id: dsgFK }});
    })
  ), {
    dispatch: false,
  });

  constructor(
    private actions$: Actions,
    private sharedDSG_Service: SharedDSG_Service,
    private router: Router,
  ) {}

}
