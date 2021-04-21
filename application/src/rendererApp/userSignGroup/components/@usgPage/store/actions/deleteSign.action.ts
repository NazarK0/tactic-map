import { createAction, props } from '@ngrx/store';

import DSG_SignInterface from '../../../../../shared/types/dsgSign.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import USG_PageActionTypes from '../usgPage.action-types';

export const USG_DeleteSignAction = createAction(
  USG_PageActionTypes.DELETE_SIGN,
  props<{ signId: number }>()
);

export const USG_DeleteSignSuccessAction = createAction(
  USG_PageActionTypes.DELETE_SIGN_SUCCESS,
  props<{ signList: DSG_SignInterface[] }>()
);

export const USG_DeleteSignFailureAction = createAction(
  USG_PageActionTypes.DELETE_SIGN_FAILURE,
  props<{ error: ErrorInterface }>()
);
