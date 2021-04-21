/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import CanvasState from '../../../types/canvas.state';
import { getMapAction, getMapFailureAction,getMapSuccessAction } from './actions/getMap.action';
import { getSelectedSignAction, getSelectedSignSuccessAction, getSelectedSignFailureAction } from './actions/getSelectedSign.action';

const initialState: CanvasState = {
  isLoading: false,
  error: null,
  selectedMilSign: null,
  mapUrl: null,
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
        mapUrl: action.mapUrl
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
        mapUrl: action.mapUrl
      })
  ),
  on(getMapFailureAction,
      (state, action): CanvasState => ({
        ...state,
        isLoading: false,
        error: action.error
      })
  ),
  on(getSelectedSignAction,
      (state): CanvasState => ({
        ...state,
        isLoading: true,
      })
  ),
  on(getSelectedSignSuccessAction,
      (state, action): CanvasState => ({
        ...state,
        isLoading: false,
        selectedMilSign: action.selectedSign
      })
  ),
  on(getSelectedSignFailureAction,
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
