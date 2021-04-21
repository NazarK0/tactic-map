import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import { deleteDSG_Action, deleteDSG_FailureAction, deleteDSG_SuccessAction } from '../actions/deleteDSG.action';

@Injectable()
export default class DeleteDSG_Effect {
  deleteDSG$ = createEffect(() => this.actions$
    .pipe(
      ofType(deleteDSG_Action),
      switchMap(({ id }) => {
        return this.sharedDSG_Service
          .deleteById(id)
          .pipe(
            map(() => deleteDSG_SuccessAction()),
            catchError((error) => of(deleteDSG_FailureAction({ error })))
          );
      })
    )
  );

  redirectAfterDelete$ = createEffect(() => this.actions$.pipe(
    ofType(deleteDSG_SuccessAction),
    tap(() => {
      this.router.navigate(['/settings/default-sign-group']);
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
