/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import DSG_EditSignState from '../../../types/dsgEditSign.state';
import { DSG_GetSignAction, DSG_GetSignFailureAction,DSG_GetSignSuccessAction } from './actions/getSign.action';
import { DSG_UpdateSignAction, DSG_UpdateSignFailureAction,DSG_UpdateSignSuccessAction } from './actions/updateSign.action';

const initialState: DSG_EditSignState = {
  isSubmitting: false,
  isLoading: false,
  error: null,
  data: null,
};

const reducer = createReducer(initialState,
   on(DSG_UpdateSignAction,
    (state): DSG_EditSignState => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(DSG_UpdateSignSuccessAction,
    (state, action): DSG_EditSignState => ({
      ...state,
      data: action.signResponse,
      isSubmitting: false,
    })
  ),
  on(DSG_UpdateSignFailureAction,
    (state, action): DSG_EditSignState => ({
      ...state,
      isSubmitting: false,
      error: action.error,
    })
  ),
  on(DSG_GetSignAction,
    (state): DSG_EditSignState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(DSG_GetSignSuccessAction,
    (state, action): DSG_EditSignState => ({
      ...state,
      isLoading: false,
      data: action.signResponse,
    })
  ),
  on(DSG_GetSignFailureAction,
    (state): DSG_EditSignState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigationAction, (): DSG_EditSignState => initialState),
);

export default function dsgEditSignReducer(state: DSG_EditSignState, action: Action): DSG_EditSignState {
  return reducer(state, action);
}
