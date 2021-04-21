import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

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

export const selectedSignSelector: MemoizedSelector<AppState, SelectedMilSignInterface | null> = createSelector(
  CanvasFeatureSelector,
  (state: CanvasState) => state.selectedMilSign
);

export const mapUrlSelector: MemoizedSelector<AppState, string | null> = createSelector(
  CanvasFeatureSelector,
  (state: CanvasState) => state.mapUrl
);
