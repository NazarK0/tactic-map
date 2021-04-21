import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import USG_TogglerActionTypes from '../usgToggler.action-types';

export const deleteUSG_Action = createAction(
  USG_TogglerActionTypes.DELETE_MENU_ITEM,
  props<{ id: number }>(),
);

export const deleteUSG_SuccessAction = createAction(
  USG_TogglerActionTypes.DELETE_MENU_ITEM_SUCCESS,
);

export const deleteUSG_FailureAction = createAction(
  USG_TogglerActionTypes.DELETE_MENU_ITEM_FAILURE,
  props<{ error: ErrorInterface | null }>(),
);
