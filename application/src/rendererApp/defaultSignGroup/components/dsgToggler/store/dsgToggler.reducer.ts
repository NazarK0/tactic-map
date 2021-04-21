/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import DSG_TogglerState from '../../../types/dsgToggler.state';
import { getDSG_MenuAction, getDSG_MenuFailureAction,getDSG_MenuSuccessAction } from './actions/getDSG_Menu.action';

const initialState: DSG_TogglerState = {
  isLoading: false,
  error: null,
  data: null,
};

const reducer = createReducer(initialState,
  on(getDSG_MenuAction,
    (state: DSG_TogglerState): DSG_TogglerState => ({
      ...state,
      isLoading: true,
  })),
  on(getDSG_MenuSuccessAction,
    (state: DSG_TogglerState, action): DSG_TogglerState => ({
      ...state,
      isLoading: false,
      data: action.menuItems
  })),
  on(getDSG_MenuFailureAction,
    (state, action): DSG_TogglerState => ({
      ...state,
      isLoading: false,
      error: action.error
  })),
  on(routerNavigationAction, (): DSG_TogglerState => initialState),
);

export default function dsgTogglerReducer(state: DSG_TogglerState, action: Action): DSG_TogglerState {
  return reducer(state, action);
}
