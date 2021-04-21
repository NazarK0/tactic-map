/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import LeftToolbarState from '../../../types/leftToolbar.state';
import { getUSG_ListAction, getUSG_ListFailureAction,getUSG_ListSuccessAction } from './actions/getUSG_List.action';
import { updateSelectedUSG_Action, updateSelectedUSG_FailureAction,updateSelectedUSG_SuccessAction } from './actions/updateSelectedUSG.action';

const initialState: LeftToolbarState = {
  isLoading: false,
  error: null,
  data: null,
};

const reducer = createReducer(initialState,
  on(getUSG_ListAction,
      (state): LeftToolbarState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(getUSG_ListSuccessAction,
      (state, action): LeftToolbarState => ({
        ...state,
        isLoading: false,
        data: action.usgList,
      })
  ),
  on(getUSG_ListFailureAction,
      (state, action): LeftToolbarState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  on(updateSelectedUSG_Action,
      (state): LeftToolbarState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(updateSelectedUSG_SuccessAction,
    (state, action): LeftToolbarState => ({
      ...state,
      isLoading: false,
      data: action.usgList,
    })
  ),
  on(updateSelectedUSG_FailureAction,
      (state, action): LeftToolbarState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  on(routerNavigationAction, (): LeftToolbarState => initialState),
);

export default function leftToolbarReducer(state: LeftToolbarState, action: Action): LeftToolbarState {
  return reducer(state, action);
}
