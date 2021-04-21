import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map,switchMap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import DSG_Interface from '../../../../../shared/types/dsg.interface';
import VMenuItemInterface from '../../../../../shared/types/vmenuItem.interface';
import { getDSG_MenuAction, getDSG_MenuFailureAction, getDSG_MenuSuccessAction } from '../actions/getDSG_Menu.action';

@Injectable()
export default class GetDSG_MenuEffect {
  getDSG_Menu$ = createEffect(() => this.actions$
    .pipe(
      ofType(getDSG_MenuAction),
      switchMap(() => {
        return this.sharedDSG_Service
          .getMenu()
          .pipe(
            map((menuItems: VMenuItemInterface[]) => {
              return getDSG_MenuSuccessAction({ menuItems });
            }),
            catchError((error) => of(getDSG_MenuFailureAction({ error })))
          );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private sharedDSG_Service: SharedDSG_Service,
  ) {}

  
}
