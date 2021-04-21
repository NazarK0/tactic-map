import { createAction, props } from '@ngrx/store';

import DSG_SignInterface from '../../../../../shared/types/dsgSign.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import DSG_SignInputInterface from '../../../../types/dsgSignInput.interface';
import DSG_AddSignActionTypes from '../dsgAddSign.action-types';

export const addDSG_SignAction = createAction(
  DSG_AddSignActionTypes.ADD_DSG_SIGN,
  props<{ dsgId: number, sign: DSG_SignInputInterface }>()
);

export const addDSG_SignSuccessAction = createAction(
  DSG_AddSignActionTypes.ADD_DSG_SIGN_SUCCESS,
  props<{ sign: DSG_SignInterface }>()
);

export const addDSG_SignFailureAction = createAction(
  DSG_AddSignActionTypes.ADD_DSG_SIGN_FAILURE,
  props<{ error: ErrorInterface }>()
);
