import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import DSG_Interface from '../../../../../shared/types/dsg.interface';
import { createDSG_Action, createDSG_FailureAction,createDSG_SuccessAction } from '../actions/createDSG.action';

@Injectable()
export default class CreateDSG_Effect {
  createDSG$ = createEffect(() => this.actions$.pipe(
    ofType(createDSG_Action),
    switchMap(({ dsgInput }) => {
      return this.sharedDSG_Service.create(dsgInput).pipe(
        map((dsg: DSG_Interface) => createDSG_SuccessAction({ dsg })),
        catchError((error) => {
          return of(createDSG_FailureAction(error));
        })
      );
    })
  ));
  redirectAfterCreate$ = createEffect(() => this.actions$.pipe(
    ofType(createDSG_SuccessAction),
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
