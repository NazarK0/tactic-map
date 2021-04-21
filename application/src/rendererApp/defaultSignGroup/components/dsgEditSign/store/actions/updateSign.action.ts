import { createAction, props } from '@ngrx/store';

import DSG_SignInterface from '../../../../../shared/types/dsgSign.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import DSG_SignInputInterface from '../../../../types/dsgSignInput.interface';
import DSG_EditSignActionTypes from '../dsgEditSign.action-types';

export const DSG_UpdateSignAction = createAction(
  DSG_EditSignActionTypes.UPDATE_DSG_SIGN,
  props<{ id: number, signInput: DSG_SignInputInterface }>()
);

export const DSG_UpdateSignSuccessAction = createAction(
  DSG_EditSignActionTypes.UPDATE_DSG_SIGN_SUCCESS,
  props<{ signResponse: DSG_SignInterface }>()
);

export const DSG_UpdateSignFailureAction = createAction(
  DSG_EditSignActionTypes.UPDATE_DSG_SIGN_FAILURE,
  props<{ error: ErrorInterface }>()
);