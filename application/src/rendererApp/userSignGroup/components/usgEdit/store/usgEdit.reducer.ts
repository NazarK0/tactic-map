/* eslint-disable @typescript-eslint/indent */
import { Action,createReducer, on } from '@ngrx/store';

import USG_EditState from '../../../types/usgEdit.state';
import { getUSG_Action, getUSG_FailureAction,getUSG_SuccessAction } from './actions/getUSG.action';
import { updateUSG_Action, updateUSG_FailureAction,updateUSG_SuccessAction } from './actions/updateUSG.action';

const initialState: USG_EditState = {
  isSubmitting: false,
  isLoading: false,
  error: null,
  data: null,
};

const reducer = createReducer(initialState,
  on(updateUSG_Action,
    (state): USG_EditState => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(updateUSG_SuccessAction,
    (state): USG_EditState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(updateUSG_FailureAction,
    (state, action): USG_EditState => ({
      ...state,
      isSubmitting: false,
      error: action.error
    })
  ),
  on(getUSG_Action,
    (state): USG_EditState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(getUSG_SuccessAction,
    (state, action): USG_EditState => ({
      ...state,
      isLoading: false,
      data: action.usg,
    })
  ),
  on(getUSG_FailureAction,
    (state, action): USG_EditState => ({
      ...state,
      isLoading: false,
      error: action.error
    })
  ),
);

export default function usgEditReducer(state: USG_EditState, action: Action): USG_EditState {
  return reducer(state, action);
}
