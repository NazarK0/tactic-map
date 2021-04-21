/* eslint-disable @typescript-eslint/indent */
import { Action,createReducer, on } from '@ngrx/store';

import DSG_EditState from '../../../types/dsgEdit.state';
import { getDSG_Action, getDSG_FailureAction,getDSG_SuccessAction } from './actions/getDSG.action';
import { updateDSG_Action, updateDSG_FailureAction,updateDSG_SuccessAction } from './actions/updateDSG.action';

const initialState: DSG_EditState = {
  isSubmitting: false,
  isLoading: false,
  error: null,
  data: null,
};

const reducer = createReducer(initialState,
  on(updateDSG_Action,
    (state): DSG_EditState => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(updateDSG_SuccessAction,
    (state): DSG_EditState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(updateDSG_FailureAction,
    (state, action): DSG_EditState => ({
      ...state,
      isSubmitting: false,
      error: action.error
    })
  ),
  on(getDSG_Action,
    (state): DSG_EditState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(getDSG_SuccessAction,
    (state, action): DSG_EditState => ({
      ...state,
      isLoading: false,
      data: action.dsg,
    })
  ),
  on(getDSG_FailureAction,
    (state, action): DSG_EditState => ({
      ...state,
      isLoading: false,
      error: action.error
    })
  ),
);

export default function dsgEditReducer(state: DSG_EditState, action: Action): DSG_EditState {
  return reducer(state, action);
}
