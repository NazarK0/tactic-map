import { createAction, props } from '@ngrx/store';
import SelectedToolType from 'src/rendererApp/mainPage/types/selectedTool.type';
import SelectedToolReqType from 'src/rendererApp/mainPage/types/selectedToolReq.type';

import ErrorInterface from '../../../../../shared/types/error.interface';
import MilSignReqInterface from '../../../../types/milSignReq.interface';
import ToolGroupWithStateInterface from '../../../../types/toolGroupWithState.interface';
import USG_WithStateInterface from '../../../../types/toolGroupWithState.interface';
import LeftToolbarActionTypes from '../leftToolbar.action-types';

export const updateSelectedToolGroupAction = createAction(
  LeftToolbarActionTypes.UPDATE_SELECTED_TOOL_GROUP,
  props<{ selected: SelectedToolReqType }>()
);

export const updateSelectedToolGroupSuccessAction = createAction(
  LeftToolbarActionTypes.UPDATE_SELECTED_TOOL_GROUP_SUCCESS,
  props<{ toolGroups: ToolGroupWithStateInterface[] }>()
);

export const updateSelectedToolGroupFailureAction = createAction(
  LeftToolbarActionTypes.UPDATE_SELECTED_TOOL_GROUP_FAILURE,
  props<{ error: ErrorInterface }>()
);
