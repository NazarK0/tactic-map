import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import DSG_TogglerActionTypes from '../dsgToggler.action-types';

export const deleteDSG_Action = createAction(
  DSG_TogglerActionTypes.DELETE_MENU_ITEM,
  props<{ id: number }>(),
);

export const deleteDSG_SuccessAction = createAction(
  DSG_TogglerActionTypes.DELETE_MENU_ITEM_SUCCESS,
);

export const deleteDSG_FailureAction = createAction(
  DSG_TogglerActionTypes.DELETE_MENU_ITEM_FAILURE,
  props<{ error: ErrorInterface | null }>(),
);
