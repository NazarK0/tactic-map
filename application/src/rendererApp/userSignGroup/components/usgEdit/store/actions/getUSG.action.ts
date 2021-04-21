import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import USG_Interface from '../../../../../shared/types/usg.interface';
import USG_EditActionTypes from '../usgEdit.action-types';


export const getUSG_Action = createAction(
  USG_EditActionTypes.GET_USG,
  props<{ id: number }>()
);

export const getUSG_SuccessAction = createAction(
  USG_EditActionTypes.GET_USG_SUCCESS,
  props<{ usg: USG_Interface }>()
);

export const getUSG_FailureAction = createAction(
  USG_EditActionTypes.GET_USG_FAILURE,
  props<{ error: ErrorInterface | null }>(),
);
