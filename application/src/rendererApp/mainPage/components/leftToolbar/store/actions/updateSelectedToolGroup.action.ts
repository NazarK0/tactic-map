import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import MilSignReqInterface from '../../../../types/milSignReq.interface';
import USG_WithStateInterface from '../../../../types/toolGroupWithState.interface';
import LeftToolbarActionTypes from '../leftToolbar.action-types';

export const updateSelectedToolGroupAction = createAction(
  LeftToolbarActionTypes.UPDATE_SELECTED_TOOL_GROUP,
  props<{ selected: MilSignReqInterface }>()
);

export const updateSelectedToolGroupSuccessAction = createAction(
  LeftToolbarActionTypes.UPDATE_SELECTED_TOOL_GROUP_SUCCESS,
  props<{ toolGroups: USG_WithStateInterface[] }>()
);

export const updateSelectedToolGroupFailureAction = createAction(
  LeftToolbarActionTypes.UPDATE_SELECTED_TOOL_GROUP_FAILURE,
  props<{ error: ErrorInterface }>()
);
