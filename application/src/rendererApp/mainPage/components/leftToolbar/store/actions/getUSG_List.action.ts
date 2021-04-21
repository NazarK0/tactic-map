import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import USG_Interface from '../../../../../shared/types/usg.interface';
import USG_WithStateInterface from '../../../../types/usgWithState.interface';
import LeftToolbarActionTypes from '../leftToolbar.action-types';


export const getUSG_ListAction = createAction(
  LeftToolbarActionTypes.GET_USG_LIST,
);

export const getUSG_ListSuccessAction = createAction(
  LeftToolbarActionTypes.GET_USG_LIST_SUCCESS,
  props<{ usgList: USG_WithStateInterface[] }>()
);

export const getUSG_ListFailureAction = createAction(
  LeftToolbarActionTypes.GET_USG_LIST_FAILURE,
  props<{ error: ErrorInterface }>()
);
