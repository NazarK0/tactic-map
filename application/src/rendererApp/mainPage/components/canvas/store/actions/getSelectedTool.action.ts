import { createAction, props } from '@ngrx/store';
import SelectedToolInterface from 'src/rendererApp/mainPage/types/selectedTool.interface';

import ErrorInterface from '../../../../../shared/types/error.interface';
import SelectedMilSignInterface from '../../../../types/selectedMilSign.interface';
import CanvasActionTypes from '../canvas.action-types';

export const getSelectedToolAction = createAction(
  CanvasActionTypes.GET_SELECTED_TOOL,
);

export const getSelectedToolSuccessAction = createAction(
  CanvasActionTypes.GET_SELECTED_TOOL_SUCCESS,
  props<{ selectedTool: SelectedToolInterface }>()
);

export const getSelectedToolFailureAction = createAction(
  CanvasActionTypes.GET_SELECTED_TOOL_FAILURE,
  props<{ error: ErrorInterface }>()
);
