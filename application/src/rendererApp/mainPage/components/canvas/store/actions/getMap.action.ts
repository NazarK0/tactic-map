import { createAction, props } from '@ngrx/store';
import MapInterface from 'src/rendererApp/mainPage/types/map.interface';

import ErrorInterface from '../../../../../shared/types/error.interface';
import CanvasActionTypes from '../canvas.action-types';

export const getMapAction = createAction(
  CanvasActionTypes.GET_MAP,
);

export const getMapSuccessAction = createAction(
  CanvasActionTypes.GET_MAP_SUCCESS,
  props<{ map: MapInterface }>()
);

export const getMapFailureAction = createAction(
  CanvasActionTypes.GET_MAP_FAILURE,
  props<{ error: ErrorInterface }>()
);
