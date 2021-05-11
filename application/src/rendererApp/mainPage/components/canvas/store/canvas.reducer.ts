/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';
import CanvasModes from 'src/rendererApp/mainPage/types/canvasModes.enum';

import CanvasState from '../../../types/canvas.state';
import { getMapAction, getMapFailureAction,getMapSuccessAction } from './actions/getMap.action';
import { getSelectedToolAction, getSelectedToolSuccessAction, getSelectedToolFailureAction } from './actions/getSelectedTool.action';
import { getSvgSourceAction, getSvgSourceSuccessAction, getSvgSourceFailureAction } from './actions/getSvgSource.action';

const initialState: CanvasState = {
  isLoading: false,
  error: null,
  selectedTool: null,
  map: null,
  mode: CanvasModes.constructor,
  currentLayer: 0
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
  on(getSvgSourceAction,
      (state): CanvasState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(getSvgSourceSuccessAction,
      (state): CanvasState => ({
        ...state,
        isLoading: false,
      })
  ),
  on(getSvgSourceFailureAction,
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
