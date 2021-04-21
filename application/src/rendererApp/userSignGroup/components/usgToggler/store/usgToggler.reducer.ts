/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import USG_TogglerState from '../../../types/usgToggler.state';
import { getUSG_MenuAction, getUSG_MenuFailureAction,getUSG_MenuSuccessAction } from './actions/getUSG_Menu.action';

const initialState: USG_TogglerState = {
  isLoading: false,
  error: null,
  data: null,
};

const reducer = createReducer(initialState,
  on(getUSG_MenuAction,
    (state: USG_TogglerState): USG_TogglerState => ({
      ...state,
      isLoading: true,
  })),
  on(getUSG_MenuSuccessAction,
    (state: USG_TogglerState, action): USG_TogglerState => ({
      ...state,
      isLoading: false,
      data: action.menuItems
  })),
  on(getUSG_MenuFailureAction,
    (state, action): USG_TogglerState => ({
      ...state,
      isLoading: false,
      error: action.error
  })),
  on(routerNavigationAction, (): USG_TogglerState => initialState),
);

export default function usgTogglerReducer(state: USG_TogglerState, action: Action): USG_TogglerState {
  return reducer(state, action);
}
