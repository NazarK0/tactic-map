import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map,switchMap } from 'rxjs/operators';

import SharedUSG_Service from '../../../../../shared/services/usg.service';
import USG_Interface from '../../../../../shared/types/usg.interface';
import VMenuItemInterface from '../../../../../shared/types/vmenuItem.interface';
import { getUSG_MenuAction, getUSG_MenuFailureAction, getUSG_MenuSuccessAction } from '../actions/getUSG_Menu.action';

@Injectable()
export default class GetUSG_MenuEffect {
  getUSG_Menu$ = createEffect(() => this.actions$
    .pipe(
      ofType(getUSG_MenuAction),
      switchMap(() => {
        return this.sharedUSG_Service
          .getMenu()
          .pipe(
            map((menuItems: VMenuItemInterface[]) => {
              return getUSG_MenuSuccessAction({ menuItems });
            }),
            catchError((error) => of(getUSG_MenuFailureAction({ error })))
          );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private sharedUSG_Service: SharedUSG_Service,
  ) {}

  
}
