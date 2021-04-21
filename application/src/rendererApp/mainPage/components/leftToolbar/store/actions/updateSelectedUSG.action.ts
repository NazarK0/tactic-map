import { createAction, props } from '@ngrx/store';

import DSG_SignSelectedInterface from '../../../../../shared/types/dsgSignSelected.interface';
import DSG_WithSelectedSignsInterface from '../../../../../shared/types/dsgWithSelectedSigns.interface';
import ErrorInterface from '../../../../../shared/types/error.interface';
import SelectedMilSignInterface from '../../../../types/selectedMilSign.interface';
import USG_WithStateInterface from '../../../../types/usgWithState.interface';
import LeftToolbarActionTypes from '../leftToolbar.action-types';

export const updateSelectedUSG_Action = createAction(
  LeftToolbarActionTypes.UPDATE_SELECTED_USG,
  props<{ selected: SelectedMilSignInterface }>()
);

export const updateSelectedUSG_SuccessAction = createAction(
  LeftToolbarActionTypes.UPDATE_SELECTED_USG_SUCCESS,
  props<{ usgList: USG_WithStateInterface[] }>()
);

export const updateSelectedUSG_FailureAction = createAction(
  LeftToolbarActionTypes.UPDATE_SELECTED_USG_FAILURE,
  props<{ error: ErrorInterface }>()
);
