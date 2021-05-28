import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import MapInterface from 'src/rendererApp/mainPage/types/map.interface';
import SelectedToolInterface from 'src/rendererApp/mainPage/types/selectedTool.type';

import AppState from '../../../../app.state';
import ErrorInterface from '../../../../shared/types/error.interface';
import CanvasState from '../../../types/canvas.state';

export const CanvasFeatureSelector = createFeatureSelector<
AppState,
CanvasState
>('canvas');

export const isLoadingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  CanvasFeatureSelector,
  (state: CanvasState) => state.isLoading
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  CanvasFeatureSelector,
  (state: CanvasState) => state.error
);

export const selectedToolSelector: MemoizedSelector<AppState, SelectedToolInterface | null> = createSelector(
  CanvasFeatureSelector,
  (state: CanvasState) => state.currentTool
);

export const mapSelector: MemoizedSelector<AppState, MapInterface | null> = createSelector(
  CanvasFeatureSelector,
  (state: CanvasState) => state.map
);

export const currentLayerIndexSelector: MemoizedSelector<AppState, number> = createSelector(
  CanvasFeatureSelector,
  (state: CanvasState) => state.currentLayer
);
