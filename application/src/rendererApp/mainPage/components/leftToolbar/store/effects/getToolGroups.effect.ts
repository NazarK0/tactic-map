import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import CanvasService from 'src/rendererApp/shared/services/canvas.service';

import ToolGroupWithStateInterface from '../../../../types/toolGroupWithState.interface';
import { getToolGroupsAction, getToolGroupsFailureAction, getToolGroupsSuccessAction } from '../actions/getToolGroups.action';

@Injectable()
export default class GetToolGroupsEffect {
  getToolGroups$ = createEffect(() => this.actions$.pipe(
    ofType(getToolGroupsAction),
    switchMap(() => {
      return this.sharedCanvasService.getAllToolGroups().pipe(
        map((toolGroups) => {
          const toolGroupsWithState: ToolGroupWithStateInterface[] = toolGroups.map((group) => {
            return {
              ...group,
              isSelected: false,
              selectedTool: null,
            };
          });

          return getToolGroupsSuccessAction({ toolGroups: toolGroupsWithState });
        }
        ),
        catchError((error) => of(getToolGroupsFailureAction({ error })))
      );
    })
  ));
  constructor(
    private actions$: Actions,
    private sharedCanvasService: CanvasService,
  ) {}
}
