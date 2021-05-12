import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest,of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import SessionStorageService from '../../../../../shared/services/sessionStorage.service';
import SharedUSG_Service from '../../../../../shared/services/usg.service';
import USG_WithStateInterface from '../../../../types/usgWithState.interface';
import { getUSG_ListAction, getUSG_ListFailureAction, getUSG_ListSuccessAction } from '../actions/getUSG_List.action';

@Injectable()
export default class GetUSG_ListEffect {
  getUSG_List$ = createEffect(() => this.actions$.pipe(
    ofType(getUSG_ListAction),
    switchMap(() => {
      return combineLatest([this.sharedUSG_Service.getAll(), this.sessionStorage.getSelectedMilSign()]).pipe(
        map(([usgList, selected]) => {
          const usgListWithState: USG_WithStateInterface[] = usgList.map((usg) => {

            return {
              ...usg,
              isSelected: selected ? selected.usgId === usg.id : false,
              selectedSign: selected && selected.usgId === usg.id ? selected : null,
            };
          });

          return getUSG_ListSuccessAction({ usgList: usgListWithState });
        }
        ),
        catchError((error) => of(getUSG_ListFailureAction({ error })))
      );
    })
  ));
  constructor(
    private actions$: Actions,
    private sharedUSG_Service: SharedUSG_Service,
    private sessionStorage: SessionStorageService
  ) {}
}
