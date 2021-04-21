import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import SelectedMilSignInterface from '../../../../types/selectedMilSign.interface';
import CanvasActionTypes from '../canvas.action-types';

export const getSelectedSignAction = createAction(
  CanvasActionTypes.GET_SELECTED_SIGN,
);

export const getSelectedSignSuccessAction = createAction(
  CanvasActionTypes.GET_SELECTED_SIGN_SUCCESS,
  props<{ selectedSign: SelectedMilSignInterface }>()
);

export const getSelectedSignFailureAction = createAction(
  CanvasActionTypes.GET_SELECTED_SIGN_FAILURE,
  props<{ error: ErrorInterface }>()
);
