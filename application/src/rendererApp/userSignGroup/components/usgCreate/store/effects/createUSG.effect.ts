import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import SharedUSG_Service from '../../../../../shared/services/usg.service';
import USG_Interface from '../../../../../shared/types/usg.interface';
import { createUSG_Action, createUSG_FailureAction,createUSG_SuccessAction } from '../actions/createUSG.action';

@Injectable()
export default class CreateUSG_Effect {
  createUSG$ = createEffect(() => this.actions$.pipe(
    ofType(createUSG_Action),
    switchMap(({ usgInput }) => {
      return this.sharedUSG_Service.create(usgInput).pipe(
        map((usg: USG_Interface) => createUSG_SuccessAction({ usg })),
        catchError((error) => {
          return of(createUSG_FailureAction(error));
        })
      );
    })
  ));
  redirectAfterCreate$ = createEffect(() => this.actions$.pipe(
    ofType(createUSG_SuccessAction),
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
