/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import AddSignsPageState from '../../../types/addSignsPage.state';
import { getDSG_Action, getDSG_FailureAction, getDSG_SuccessAction } from './actions/getDSG.action';
import { updateSignStatusAction, updateSignStatusFailureAction,updateSignStatusSuccessAction } from './actions/updateSignStatus.action';

const initialState: AddSignsPageState = {
  isLoading: false,
  error: null,
  data: null,
};

const reducer = createReducer(initialState,
  on(getDSG_Action,
      (state): AddSignsPageState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(getDSG_SuccessAction,
      (state, action): AddSignsPageState => ({
        ...state,
        isLoading: false,
        data: action.dsg,
      })
  ),
  on(getDSG_FailureAction,
      (state, action): AddSignsPageState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  on(updateSignStatusAction,
      (state): AddSignsPageState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(updateSignStatusSuccessAction,
    (state, action): AddSignsPageState => {
      const old = state.data!.signs.filter(sign => sign.id !== action.sign.id);
      const data = state.data ? { ...state.data, signs: [
        ...old,
        action.sign
      ]} : null;

      return {
        ...state,
        isLoading: false,
        data
      };
    }
  ),
  on(updateSignStatusFailureAction,
      (state, action): AddSignsPageState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  on(routerNavigationAction, (): AddSignsPageState => initialState),
);

export default function addSignsPageReducer(state: AddSignsPageState, action: Action): AddSignsPageState {
  return reducer(state, action);
}
