import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest,of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import SessionStorageService from '../../../../../shared/services/sessionStorage.service';
import CanvasService from '../../../../../shared/services/canvas.service';
import { updateSelectedToolGroupAction, updateSelectedToolGroupFailureAction, updateSelectedToolGroupSuccessAction } from '../actions/updateSelectedToolGroup.action';
import ToolGroupWithStateInterface from '../../../../types/toolGroupWithState.interface';

@Injectable()
export default class UpdateSelectedToolGroupEffect {
  updateSelectedToolGroup$ = createEffect(() => this.actions$.pipe(
    ofType(updateSelectedToolGroupAction),
    switchMap(({ selected }) => {
      return of (this.sharedCanvasService.addToolExtraData(selected))
    }),
    switchMap((selectedTool) => {
      return combineLatest([this.sharedCanvasService.getAllToolGroups(), this.sessionStorage.setSelectedTool(selectedTool)]).pipe(
        map(([toolGroups, selected]) => {
          const toolGroupsWithState: ToolGroupWithStateInterface[] = toolGroups.map((group) => ({
            ...group,
            isSelected: selected ? selected.usgId === group.id : false,
            selectedTool: selected && selected.usgId === group.id ? selected : null,
          }));

          return updateSelectedToolGroupSuccessAction({ toolGroups: toolGroupsWithState });
        }),
        catchError((error) => of(updateSelectedToolGroupFailureAction({ error })))
      );
    })
  ));
 
  constructor(
    private actions$: Actions,
    private sessionStorage: SessionStorageService,
    private sharedCanvasService: CanvasService,
  ) {}

  

  
}
