import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import DSG_Interface from '../../../../../shared/types/dsg.interface';
import { getDSG_Action, getDSG_FailureAction,getDSG_SuccessAction } from '../actions/getDSG.action';

@Injectable()
export default class GetDSG_Effect {
  getDSG$ = createEffect(() => this.actions$.pipe(
    ofType(getDSG_Action),
    switchMap(({ id }) => {
      return this.sharedDSG_Service.getById(id).pipe(
        map((dsg: DSG_Interface) => getDSG_SuccessAction({ dsg })),
        catchError((error) => of(getDSG_FailureAction({ error })))
      );
    })
  ));
  constructor(
    private actions$: Actions,
    private sharedDSG_Service: SharedDSG_Service,
  ) {}
}
