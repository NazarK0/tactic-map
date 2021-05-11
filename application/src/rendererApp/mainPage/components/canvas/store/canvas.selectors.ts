import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Svg } from '@svgdotjs/svg.js';
import MapInterface from 'src/rendererApp/mainPage/types/map.interface';
import SelectedToolInterface from 'src/rendererApp/mainPage/types/selectedTool.interface';

import AppState from '../../../../app.state';
import ErrorInterface from '../../../../shared/types/error.interface';
import CanvasState from '../../../types/canvas.state';
import SelectedMilSignInterface from '../../../types/selectedMilSign.interface';

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
  (state: CanvasState) => state.selectedTool
);

export const mapSelector: MemoizedSelector<AppState, MapInterface | null> = createSelector(
  CanvasFeatureSelector,
  (state: CanvasState) => state.map
);

export const currentLayerIndexSelector: MemoizedSelector<AppState, number> = createSelector(
  CanvasFeatureSelector,
  (state: CanvasState) => state.currentLayer
);
