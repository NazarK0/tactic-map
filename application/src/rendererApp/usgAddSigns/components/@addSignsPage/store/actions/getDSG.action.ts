import { createAction, props } from '@ngrx/store';

import DSG_WithSelectedSignsInterface from '../../../../../shared/types/dsgWithSelectedSigns.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import addSignsPageActionTypes from '../addSignsPage.action-types';

export const getDSG_Action = createAction(
  addSignsPageActionTypes.GET_DSG,
  props<{ dsgId: number, usgId: number }>()
);

export const getDSG_SuccessAction = createAction(
  addSignsPageActionTypes.GET_DSG_SUCCESS,
  props<{ dsg: DSG_WithSelectedSignsInterface}>()
);

export const getDSG_FailureAction = createAction(
  addSignsPageActionTypes.GET_DSG_FAILURE,
  props<{ error: ErrorInterface }>()
);
