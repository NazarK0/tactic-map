import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import DSG_Interface from '../../../../../shared/types/dsg.interface';
import { updateDSG_Action, updateDSG_FailureAction, updateDSG_SuccessAction } from '../actions/updateDSG.action';


@Injectable()
export default class UpdateDSG_Effect {
  updateDSG$ = createEffect(() => this.actions$.pipe(
    ofType(updateDSG_Action),
    switchMap(({ id, dsgInput }) => {
      return this.sharedDSG_Service.updateById(id, dsgInput).pipe(
        map((dsg: DSG_Interface) => updateDSG_SuccessAction({ dsg })),
        catchError((error) => of(updateDSG_FailureAction({ error })))
      );
    })
  ));
  redirectAfterUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(updateDSG_SuccessAction),
    tap(({ dsg }) => {
      this.router.navigate(['/settings/default-sign-group'], { queryParams: { id: dsg.id }});
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
