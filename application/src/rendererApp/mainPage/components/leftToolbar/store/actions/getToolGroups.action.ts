import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import ToolGroupWithStateInterface from '../../../../types/toolGroupWithState.interface';
import LeftToolbarActionTypes from '../leftToolbar.action-types';


export const getToolGroupsAction = createAction(
  LeftToolbarActionTypes.GET_SELECTED_TOOL,
);

export const getToolGroupsSuccessAction = createAction(
  LeftToolbarActionTypes.GET_SELECTED_TOOL_SUCCESS,
  props<{ toolGroups: ToolGroupWithStateInterface[] }>()
);

export const getToolGroupsFailureAction = createAction(
  LeftToolbarActionTypes.GET_SELECTED_TOOL_FAILURE,
  props<{ error: ErrorInterface }>()
);
