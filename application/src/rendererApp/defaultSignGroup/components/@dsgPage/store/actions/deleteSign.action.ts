import { createAction, props } from '@ngrx/store';

import DSG_SignInterface from '../../../../../shared/types/dsgSign.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import DSG_PageActionTypes from '../dsgPage.action-types';

export const DSG_DeleteSignAction = createAction(
  DSG_PageActionTypes.DELETE_SIGN,
  props<{ signId: number }>()
);

export const DSG_DeleteSignSuccessAction = createAction(
  DSG_PageActionTypes.DELETE_SIGN_SUCCESS,
  props<{ signList: DSG_SignInterface[] }>()
);

export const DSG_DeleteSignFailureAction = createAction(
  DSG_PageActionTypes.DELETE_SIGN_FAILURE,
  props<{ error: ErrorInterface }>()
);
