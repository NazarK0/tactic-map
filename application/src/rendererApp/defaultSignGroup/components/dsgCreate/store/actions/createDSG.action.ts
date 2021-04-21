import { createAction, props } from '@ngrx/store';

import DSG_Interface from '../../../../../shared/types/dsg.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import DSG_InputInterface from '../../../../types/dsgInput.interface';
import DSG_ActionTypes from '../dsgCreate.action-types';

export const createDSG_Action = createAction(
  DSG_ActionTypes.CREATE_DSG,
  props<{ dsgInput: DSG_InputInterface }>()
);

export const createDSG_SuccessAction = createAction(
  DSG_ActionTypes.CREATE_DSG_SUCCESS,
  props<{ dsg: DSG_Interface }>(),
);

export const createDSG_FailureAction = createAction(
  DSG_ActionTypes.CREATE_DSG_FAILURE,
  props<{ error: ErrorInterface }>()
);
