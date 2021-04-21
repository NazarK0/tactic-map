import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import SharedUSG_Service from '../../../../../shared/services/usg.service';
import { deleteUSG_Action, deleteUSG_FailureAction, deleteUSG_SuccessAction } from '../actions/deleteUSG.action';

@Injectable()
export default class DeleteUSG_Effect {
  deleteUSG$ = createEffect(() => this.actions$
    .pipe(
      ofType(deleteUSG_Action),
      switchMap(({ id }) => {
        return this.sharedUSG_Service
          .deleteById(id)
          .pipe(
            map(() => deleteUSG_SuccessAction()),
            catchError((error) => of(deleteUSG_FailureAction({ error })))
          );
      })
    )
  );

  redirectAfterDelete$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUSG_SuccessAction),
    tap(() => {
      this.router.navigate(['/settings/user-sign-group']);
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
