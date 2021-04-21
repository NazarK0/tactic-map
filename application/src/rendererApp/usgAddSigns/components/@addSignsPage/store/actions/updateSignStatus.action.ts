import { createAction, props } from '@ngrx/store';

import DSG_SignSelectedInterface from '../../../../../shared/types/dsgSignSelected.interface';
import DSG_WithSelectedSignsInterface from '../../../../../shared/types/dsgWithSelectedSigns.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import addSignsPageActionTypes from '../addSignsPage.action-types';

export const updateSignStatusAction = createAction(
  addSignsPageActionTypes.UPDATE_SIGN_STATUS,
  props<{ signId: number, usgId: number }>()
);

export const updateSignStatusSuccessAction = createAction(
  addSignsPageActionTypes.UPDATE_SIGN_STATUS_SUCCESS,
  props<{ sign: DSG_SignSelectedInterface}>()
);

export const updateSignStatusFailureAction = createAction(
  addSignsPageActionTypes.UPDATE_SIGN_STATUS_FAILURE,
  props<{ error: ErrorInterface }>()
);
