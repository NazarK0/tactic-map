import { createAction, props } from '@ngrx/store';
import MenuItemInterface from '../../../../types/menuItem.interface';
import VerticalMenuActionTypes from '../verticalMenu.action-types';

export const getVerticalMenuItemsAction = createAction(
  VerticalMenuActionTypes.GET_MENU_ITEMS,
);

export const getVerticalMenuItemsSuccessAction = createAction(
  VerticalMenuActionTypes.GET_MENU_ITEMS_SUCCESS,
  props<{ items: MenuItemInterface[] }>(),
);

export const getVerticalMenuItemsFailureAction = createAction(
  VerticalMenuActionTypes.GET_MENU_ITEMS_FAILURE,
);