import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import CanvasActionTypes from '../canvas.action-types';

export const getMapAction = createAction(
  CanvasActionTypes.GET_MAP,
);

export const getMapSuccessAction = createAction(
  CanvasActionTypes.GET_MAP_SUCCESS,
  props<{ mapUrl: string }>()
);

export const getMapFailureAction = createAction(
  CanvasActionTypes.GET_MAP_FAILURE,
  props<{ error: ErrorInterface }>()
);
