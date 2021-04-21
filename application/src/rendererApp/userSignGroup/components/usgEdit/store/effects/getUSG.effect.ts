import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import SharedUSG_Service from '../../../../../shared/services/usg.service';
import USG_Interface from '../../../../../shared/types/usg.interface';
import { getUSG_Action, getUSG_FailureAction,getUSG_SuccessAction } from '../actions/getUSG.action';

@Injectable()
export default class GetUSG_Effect {
  getUSG$ = createEffect(() => this.actions$.pipe(
    ofType(getUSG_Action),
    switchMap(({ id }) => {
      return this.sharedUSG_Service.getById(id).pipe(
        map((usg: USG_Interface) => getUSG_SuccessAction({ usg })),
        catchError((error) => of(getUSG_FailureAction({ error })))
      );
    })
  ));
  constructor(
    private actions$: Actions,
    private sharedUSG_Service: SharedUSG_Service,
  ) {}
}
