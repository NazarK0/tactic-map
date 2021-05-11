import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { getSvgSourceAction, getSvgSourceSuccessAction, getSvgSourceFailureAction } from '../actions/getSvgSource.action';
import CanvasService from '../../canvas.service';

@Injectable()
export default class GetSvgSourceEffect {
  getSvgSource$ = createEffect(() => this.actions$
    .pipe(
      ofType(getSvgSourceAction),
      switchMap(({ url }) => {
        return this.canvasService.getSvgSource(url)
          .pipe(
            map((tool) => getSvgSourceSuccessAction({ tool })),
            catchError((error) => of(getSvgSourceFailureAction({ error })))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private canvasService: CanvasService,
  ) {}
}
