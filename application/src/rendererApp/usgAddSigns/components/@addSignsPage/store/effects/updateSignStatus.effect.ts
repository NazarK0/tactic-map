import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import SharedUSG_Service from '../../../../../shared/services/usg.service';
import DSG_SignInterface from '../../../../../shared/types/dsgSign.interface';
import { updateSignStatusAction, updateSignStatusFailureAction, updateSignStatusSuccessAction } from '../actions/updateSignStatus.action';


@Injectable()
export default class UpdateSignStatus_Effect {
  updateSignStatus$ = createEffect(() => this.actions$.pipe(
    ofType(updateSignStatusAction),
    switchMap(({ signId, usgId }) => {
      return this.sharedUSG_Service.toggleSignStatus(signId, usgId).pipe(
        map((sign: DSG_SignInterface) => {
          return updateSignStatusSuccessAction({ sign: { ...sign, isSelected: sign.usgFK === usgId } });
        }),
        catchError((error) => of(updateSignStatusFailureAction({ error })))
      );
    })
  ));
 
  constructor(
    private actions$: Actions,
    private sharedDSG_Service: SharedDSG_Service,
    private sharedUSG_Service: SharedUSG_Service,
    private router: Router,
  ) {}

  

  
}
