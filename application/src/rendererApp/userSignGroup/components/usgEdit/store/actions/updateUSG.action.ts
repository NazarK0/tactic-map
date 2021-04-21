import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import USG_Interface from '../../../../../shared/types/usg.interface';
import USG_InputInterface from '../../../../types/usgInput.interface';
import USG_EditActionTypes from '../usgEdit.action-types';

export const updateUSG_Action = createAction(
  USG_EditActionTypes.UPDATE_USG,
  props<{ id: number, usgInput: USG_InputInterface }>()
);

export const updateUSG_SuccessAction = createAction(
  USG_EditActionTypes.UPDATE_USG_SUCCESS,
  props<{ usg: USG_Interface }>()
);

export const updateUSG_FailureAction = createAction(
  USG_EditActionTypes.UPDATE_USG_FAILURE,
  props<{ error: ErrorInterface | null }>(),
);
