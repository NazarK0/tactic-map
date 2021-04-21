import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import DSG_SignInterface from '../../../../../shared/types/dsgSign.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import { DSG_GetSignAction, DSG_GetSignFailureAction,DSG_GetSignSuccessAction } from '../actions/getSign.action';


@Injectable()
export default class DSG_GetSignEffect {
  getSign$ = createEffect(() => this.actions$.pipe(
    ofType(DSG_GetSignAction),
    switchMap(({ id }) => {
      return this.sharedDSG_Service.getSign(id).pipe(
        map((signResponse: DSG_SignInterface) => DSG_GetSignSuccessAction({ signResponse })),
        catchError((error: ErrorInterface) => of(DSG_GetSignFailureAction({ error })))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private sharedDSG_Service: SharedDSG_Service,
  ) {}

  
}
