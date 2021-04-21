import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import SharedUSG_Service from '../../../../../shared/services/usg.service';
import DSG_SignSelectedInterface from '../../../../../shared/types/dsgSignSelected.interface';
import { getDSG_Action, getDSG_FailureAction, getDSG_SuccessAction } from '../actions/getDSG.action';

@Injectable()
export default class GetDSG_Effect {
  getDSG$ = createEffect(() => this.actions$.pipe(
    ofType(getDSG_Action),
    switchMap(({ dsgId, usgId }) => {
      return combineLatest([
        this.sharedDSG_Service.getById(dsgId),
        this.sharedUSG_Service.getById(usgId)
      ])
        .pipe(
          map(([dsg, usg]) => {
            const usgSignIds = usg.signs.map((sign) => sign.id);
            const signsWithSelection: DSG_SignSelectedInterface[] = dsg.signs
              .filter((sign) => sign.usgFK === usgId || sign.usgFK === null)
              .map((sign) => {
                return {
                  ...sign,
                  isSelected: usgSignIds.includes(sign.id)
                };
              });
            // dsg.signs = signsWithSelection;

            return getDSG_SuccessAction({ dsg: { ...dsg, signs: signsWithSelection } });
          }),
          catchError((error) => of(getDSG_FailureAction({ error })))
        );
    })
  ));

  constructor(
    private actions$: Actions,
    private sharedDSG_Service: SharedDSG_Service,
    private sharedUSG_Service: SharedUSG_Service,
  ) {}
}
