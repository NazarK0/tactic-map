import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import USG_Interface from '../../../../../shared/types/usg.interface';
import USG_InputInterface from '../../../../types/usgInput.interface';
import USG_ActionTypes from '../usgCreate.action-types';

export const createUSG_Action = createAction(
  USG_ActionTypes.CREATE_USG,
  props<{ usgInput: USG_InputInterface }>()
);

export const createUSG_SuccessAction = createAction(
  USG_ActionTypes.CREATE_USG_SUCCESS,
  props<{ usg: USG_Interface }>(),
);

export const createUSG_FailureAction = createAction(
  USG_ActionTypes.CREATE_USG_FAILURE,
  props<{ error: ErrorInterface }>()
);
