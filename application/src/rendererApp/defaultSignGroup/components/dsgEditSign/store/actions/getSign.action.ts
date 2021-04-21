import { createAction, props } from '@ngrx/store';

import DSG_SignInterface from '../../../../../shared/types/dsgSign.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import DSG_EditSignActionTypes from '../dsgEditSign.action-types';

export const DSG_GetSignAction = createAction(
  DSG_EditSignActionTypes.GET_DSG_SIGN,
  props<{ id: number }>()
);

export const DSG_GetSignSuccessAction = createAction(
  DSG_EditSignActionTypes.GET_DSG_SIGN_SUCCESS,
  props<{ signResponse: DSG_SignInterface }>()
);

export const DSG_GetSignFailureAction = createAction(
  DSG_EditSignActionTypes.GET_DSG_SIGN_FAILURE,
  props<{ error: ErrorInterface }>()
);