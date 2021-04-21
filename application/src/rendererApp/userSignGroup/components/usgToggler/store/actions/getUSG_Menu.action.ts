import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import VMenuItemInterface from '../../../../../shared/types/vmenuItem.interface';
import USG_TogglerActionTypes from '../usgToggler.action-types';

export const getUSG_MenuAction = createAction(
  USG_TogglerActionTypes.GET_MENU,
);

export const getUSG_MenuSuccessAction = createAction(
  USG_TogglerActionTypes.GET_MENU_SUCCESS,
  props<{ menuItems: VMenuItemInterface[] }>(),
);

export const getUSG_MenuFailureAction = createAction(
  USG_TogglerActionTypes.GET_MENU_FAILURE,
  props<{ error: ErrorInterface | null }>(),
);
