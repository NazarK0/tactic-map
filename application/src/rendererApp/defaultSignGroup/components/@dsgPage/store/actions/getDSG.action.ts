import { createAction, props } from '@ngrx/store';

import DSG_Interface from '../../../../../shared/types/dsg.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import DSG_PageWithItemsActionTypes from '../dsgPage.action-types';

export const getDSG_Action = createAction(
  DSG_PageWithItemsActionTypes.GET_DSG,
  props<{ id: number }>()
);

export const getDSG_SuccessAction = createAction(
  DSG_PageWithItemsActionTypes.GET_DSG_SUCCESS,
  props<{ dsg: DSG_Interface }>()
);

export const getDSG_FailureAction = createAction(
  DSG_PageWithItemsActionTypes.GET_DSG_FAILURE,
  props<{ error: ErrorInterface }>()
);
