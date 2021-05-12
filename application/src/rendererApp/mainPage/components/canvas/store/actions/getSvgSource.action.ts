import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import CanvasActionTypes from '../canvas.action-types';

export const getSvgSourceAction = createAction(
  CanvasActionTypes.GET_SVG_SOURCE,
  props<{ url: string }>()
);

export const getSvgSourceSuccessAction = createAction(
  CanvasActionTypes.GET_SVG_SOURCE_SUCCESS,
  props<{ toolSrc: string | null }>()
);

export const getSvgSourceFailureAction = createAction(
  CanvasActionTypes.GET_SVG_SOURCE_FAILURE,
  props<{ error: ErrorInterface }>()
);
