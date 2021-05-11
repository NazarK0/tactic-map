import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import UploadMapService from '../../../uploadMap/uploadMap.service';
import SessionStorageService from '../../../../../shared/services/sessionStorage.service';
import { getSvgSourceAction, getSvgSourceSuccessAction, getSvgSourceFailureAction } from '../actions/getSvgSource.action';

@Injectable()
export default class GetSvgSourceEffect {
  getSvgSource$ = createEffect(() => this.actions$
    .pipe(
      ofType(getSvgSourceAction),
      switchMap(() => {
        return this.sessionStorage.getSelectedTool()
          .pipe(
            map((tool) => getSvgSourceSuccessAction({ tool })),
            catchError((error) => of(getSvgSourceFailureAction({ error })))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionStorage: SessionStorageService,
  ) {}
}
