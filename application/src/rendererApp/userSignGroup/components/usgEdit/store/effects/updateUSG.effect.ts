import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import SharedUSG_Service from '../../../../../shared/services/usg.service';
import USG_Interface from '../../../../../shared/types/usg.interface';
import { updateUSG_Action, updateUSG_FailureAction, updateUSG_SuccessAction } from '../actions/updateUSG.action';


@Injectable()
export default class UpdateUSG_Effect {
  updateUSG$ = createEffect(() => this.actions$.pipe(
    ofType(updateUSG_Action),
    switchMap(({ id, usgInput }) => {
      return this.sharedUSG_Service.updateById(id, usgInput).pipe(
        map((usg: USG_Interface) => updateUSG_SuccessAction({ usg })),
        catchError((error) => of(updateUSG_FailureAction({ error })))
      );
    })
  ));
  redirectAfterUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(updateUSG_SuccessAction),
    tap(({ usg }) => {
      this.router.navigate(['/settings/user-sign-group'], { queryParams: { id: usg.id }});
    })
  ), {
    dispatch: false,
  });
  constructor(
    private actions$: Actions,
    private sharedUSG_Service: SharedUSG_Service,
    private router: Router,
  ) {}

  

  
}
