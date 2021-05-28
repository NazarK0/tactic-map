/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import LeftToolbarState from '../../../types/leftToolbar.state';
import { getToolGroupsAction, getToolGroupsSuccessAction, getToolGroupsFailureAction } from './actions/getToolGroups.action';
import { updateSelectedToolGroupAction, updateSelectedToolGroupSuccessAction, updateSelectedToolGroupFailureAction } from './actions/updateSelectedToolGroup.action';


const initialState: LeftToolbarState = {
  isLoading: false,
  error: null,
  data: null,
};

const reducer = createReducer(initialState,
  on(getToolGroupsAction,
      (state): LeftToolbarState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(getToolGroupsSuccessAction,
      (state, action): LeftToolbarState => ({
        ...state,
        isLoading: false,
        data: action.toolGroups,
      })
  ),
  on(getToolGroupsFailureAction,
      (state, action): LeftToolbarState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  on(updateSelectedToolGroupAction,
      (state): LeftToolbarState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(updateSelectedToolGroupSuccessAction,
    (state, action): LeftToolbarState => ({
      ...state,
      isLoading: false,
      data: action.toolGroups,
    })
  ),
  on(updateSelectedToolGroupFailureAction,
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
