import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import VMenuItemInterface from '../../../../../shared/types/vmenuItem.interface';
import DSG_TogglerActionTypes from '../dsgToggler.action-types';

export const getDSG_MenuAction = createAction(
  DSG_TogglerActionTypes.GET_MENU,
);

export const getDSG_MenuSuccessAction = createAction(
  DSG_TogglerActionTypes.GET_MENU_SUCCESS,
  props<{ menuItems: VMenuItemInterface[] }>(),
);

export const getDSG_MenuFailureAction = createAction(
  DSG_TogglerActionTypes.GET_MENU_FAILURE,
  props<{ error: ErrorInterface | null }>(),
);
