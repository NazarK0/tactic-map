import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest,of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import SessionStorageService from '../../../../../shared/services/sessionStorage.service';
import SharedUSG_Service from '../../../../../shared/services/usg.service';
import DSG_SignInterface from '../../../../../shared/types/dsgSign.interface';
import USG_WithStateInterface from '../../../../types/usgWithState.interface';
import CanvasService from '../../../canvas/canvas.service';
import { updateSelectedUSG_Action, updateSelectedUSG_FailureAction, updateSelectedUSG_SuccessAction } from '../actions/updateSelectedUSG.action';


@Injectable()
export default class UpdateSelectedUSG_Effect {
  updateSignStatus$ = createEffect(() => this.actions$.pipe(
    ofType(updateSelectedUSG_Action),
    switchMap(({ selected }) => {
      return of ({
        ...selected,
        svgSrc: this.canvasService.getSvgSource(selected.value)
      })
    }),
    switchMap((svgSrc) => {
      console.log(svgSrc, 'SELECTED LT UPDATE SELECTED')
      return combineLatest([this.sharedUSG_Service.getAll(), this.sessionStorage.setSelectedMilSign(svgSrc)]).pipe(
        map(([usgList, selected]) => {
          const usgListWithState: USG_WithStateInterface[] = usgList.map((usg) => ({
            ...usg,
            isSelected: selected ? selected.usgId === usg.id : false,
            selectedSign: selected && selected.usgId === usg.id ? selected : null,
          }));

          return updateSelectedUSG_SuccessAction({ usgList: usgListWithState });
        }),
        catchError((error) => of(updateSelectedUSG_FailureAction({ error })))
      );
    })
  ));
 
  constructor(
    private actions$: Actions,
    private sharedDSG_Service: SharedDSG_Service,
    private sharedUSG_Service: SharedUSG_Service,
    private sessionStorage: SessionStorageService,
    private router: Router,
    private canvasService: CanvasService,
  ) {}

  

  
}
