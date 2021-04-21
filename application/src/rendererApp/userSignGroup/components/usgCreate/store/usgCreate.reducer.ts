/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import USG_CreateState from '../../../types/usgCreate.state';
import { createUSG_Action, createUSG_FailureAction,createUSG_SuccessAction } from './actions/createUSG.action';

const initialState: USG_CreateState = {
  isSubmitting: false,
  error: null,
};

const reducer = createReducer(initialState,
  on(createUSG_Action,
    (state: USG_CreateState): USG_CreateState => ({
      ...state,
      isSubmitting: true,
  })),
  on(createUSG_SuccessAction,
    (state: USG_CreateState): USG_CreateState => ({
      ...state,
      isSubmitting: false,
  })),
  on(createUSG_FailureAction,
    (state, action): USG_CreateState => ({
      ...state,
      isSubmitting: false,
      error: action.error
  })),
  on(routerNavigationAction, (): USG_CreateState => initialState),
);

export default function usgCreateReducer(state: USG_CreateState, action: Action): USG_CreateState {
  return reducer(state, action);
}
