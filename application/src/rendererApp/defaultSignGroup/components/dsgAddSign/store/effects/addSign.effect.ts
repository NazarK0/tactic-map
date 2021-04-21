import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import DSG_SignInterface from '../../../../../shared/types/dsgSign.interface';
import { addDSG_SignAction, addDSG_SignFailureAction, addDSG_SignSuccessAction } from '../actions/addSign.action';

@Injectable()
export default class AddDSG_SignEffect {
  addDSG_Sign$ = createEffect(() => this.actions$.pipe(
    ofType(addDSG_SignAction),
    switchMap(({ dsgId, sign }) => {
      return this.sharedDSG_Service.addSign(dsgId, sign).pipe(
        map((sign: DSG_SignInterface) => addDSG_SignSuccessAction({ sign })),
        catchError((error) => of(addDSG_SignFailureAction({ error })))
      );
    })
  ));

  redirectAfterCreate$ = createEffect(() => this.actions$.pipe(
    ofType(addDSG_SignSuccessAction),
    tap(({ sign }) => {
      this.router.navigate(['/settings/default-sign-group'], { queryParams: { id: sign.dsgFK } });
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
