/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import CanvasState from '../../../types/canvas.state';
import { getMapAction, getMapFailureAction,getMapSuccessAction } from './actions/getMap.action';
import { getSelectedToolAction, getSelectedToolSuccessAction, getSelectedToolFailureAction } from './actions/getSelectedTool.action';

const initialState: CanvasState = {
  isLoading: false,
  error: null,
  selectedTool: null,
  map: null,
};

const reducer = createReducer(initialState,
  on(getMapAction,
      (state): CanvasState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(getMapSuccessAction,
      (state, action): CanvasState => ({
        ...state,
        isLoading: false,
        map: action.map
      })
  ),
  on(getMapFailureAction,
      (state, action): CanvasState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  on(getMapAction,
      (state): CanvasState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(getMapSuccessAction,
      (state, action): CanvasState => ({
        ...state,
        isLoading: false,
        map: action.map
      })
  ),
  on(getMapFailureAction,
      (state, action): CanvasState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  on(getSelectedToolAction,
      (state): CanvasState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(getSelectedToolSuccessAction,
      (state, action): CanvasState => ({
        ...state,
        isLoading: false,
        selectedTool: action.selectedTool
      })
  ),
  on(getSelectedToolFailureAction,
      (state, action): CanvasState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  // on(routerNavigationAction, (): CanvasState => initialState),
);

export default function canvasReducer(state: CanvasState, action: Action): CanvasState {
  return reducer(state, action);
}
