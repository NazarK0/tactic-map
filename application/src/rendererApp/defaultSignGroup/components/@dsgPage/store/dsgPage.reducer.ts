/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';
import { sign } from 'node:crypto';

import DSG_PageState from '../../../types/dsgPage.state';
import { DSG_DeleteSignAction, DSG_DeleteSignFailureAction, DSG_DeleteSignSuccessAction } from './actions/deleteSign.action';
import { getDSG_Action, getDSG_FailureAction, getDSG_SuccessAction } from './actions/getDSG.action';

const initialState: DSG_PageState = {
  isLoading: false,
  error: null,
  data: null,
};

const reducer = createReducer(initialState,
  on(getDSG_Action,
      (state: DSG_PageState): DSG_PageState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(getDSG_SuccessAction,
      (state: DSG_PageState, action): DSG_PageState => ({
        ...state,
        isLoading: false,
        data: action.dsg,
      })
  ),
  on(getDSG_FailureAction,
      (state: DSG_PageState, action): DSG_PageState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  on(DSG_DeleteSignAction,
      (state: DSG_PageState): DSG_PageState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(DSG_DeleteSignSuccessAction,
      (state: DSG_PageState, action): DSG_PageState => {
        const data = state.data ? { ...state.data, signs: action.signList } : null;
        return {
        ...state,
        isLoading: false,
        data
      }
    }
  ),
  on(DSG_DeleteSignFailureAction,
      (state, action): DSG_PageState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  on(routerNavigationAction, (): DSG_PageState => initialState),
);

export default function dsgPageWithItemsReducer(state: DSG_PageState, action: Action): DSG_PageState {
  return reducer(state, action);
}
