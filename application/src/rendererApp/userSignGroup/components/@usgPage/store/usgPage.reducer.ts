/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import USG_PageState from '../../../types/usgPage.state';
import { USG_DeleteSignAction, USG_DeleteSignFailureAction, USG_DeleteSignSuccessAction } from './actions/deleteSign.action';
import { getUSG_Action, getUSG_FailureAction, getUSG_SuccessAction } from './actions/getUSG.action';

const initialState: USG_PageState = {
  isLoading: false,
  error: null,
  data: null,
};

const reducer = createReducer(initialState,
  on(getUSG_Action,
      (state): USG_PageState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(getUSG_SuccessAction,
      (state, action): USG_PageState => ({
        ...state,
        isLoading: false,
        data: action.usg,
      })
  ),
  on(getUSG_FailureAction,
      (state, action): USG_PageState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  on(USG_DeleteSignAction,
      (state): USG_PageState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(USG_DeleteSignSuccessAction,
    (state: USG_PageState, action): USG_PageState => {
      const data = state.data ? { ...state.data, signs: action.signList} : null;
      return {
      ...state,
      isLoading: false,
      data
    }
  }
  ),
  on(USG_DeleteSignFailureAction,
      (state, action): USG_PageState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  on(routerNavigationAction, (): USG_PageState => initialState),
);

export default function usgPageWithItemsReducer(state: USG_PageState, action: Action): USG_PageState {
  return reducer(state, action);
}
