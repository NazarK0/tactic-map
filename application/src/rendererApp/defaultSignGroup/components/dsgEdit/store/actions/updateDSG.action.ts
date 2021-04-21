import { createAction, props } from '@ngrx/store';

import DSG_Interface from '../../../../../shared/types/dsg.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import DSG_InputInterface from '../../../../types/dsgInput.interface';
import DSG_EditActionTypes from '../dsgEdit.action-types';

export const updateDSG_Action = createAction(
  DSG_EditActionTypes.UPDATE_DSG,
  props<{ id: number, dsgInput: DSG_InputInterface }>()
);

export const updateDSG_SuccessAction = createAction(
  DSG_EditActionTypes.UPDATE_DSG_SUCCESS,
  props<{ dsg: DSG_Interface }>()
);

export const updateDSG_FailureAction = createAction(
  DSG_EditActionTypes.UPDATE_DSG_FAILURE,
  props<{ error: ErrorInterface | null }>(),
);
