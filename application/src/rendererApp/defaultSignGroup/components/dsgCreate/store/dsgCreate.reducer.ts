/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import DSG_CreateState from '../../../types/dsgCreate.state';
import { createDSG_Action, createDSG_FailureAction,createDSG_SuccessAction } from './actions/createDSG.action';

const initialState: DSG_CreateState = {
  isSubmitting: false,
  error: null,
};

const reducer = createReducer(initialState,
  on(createDSG_Action,
    (state: DSG_CreateState): DSG_CreateState => ({
      ...state,
      isSubmitting: true,
  })),
  on(createDSG_SuccessAction,
    (state: DSG_CreateState): DSG_CreateState => ({
      ...state,
      isSubmitting: false,
  })),
  on(createDSG_FailureAction,
    (state, action): DSG_CreateState => ({
      ...state,
      isSubmitting: false,
      error: action.error
  })),
  on(routerNavigationAction, (): DSG_CreateState => initialState),
);

export default function dsgCreateReducer(state: DSG_CreateState, action: Action): DSG_CreateState {
  return reducer(state, action);
}
