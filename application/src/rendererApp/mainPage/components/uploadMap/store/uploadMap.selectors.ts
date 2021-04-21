import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import ErrorInterface from '../../../../shared/types/error.interface';
import UploadMapState from '../../../types/uploadMap.state';

export const uploadMapFeatureSelector = createFeatureSelector<
AppState,
UploadMapState
>('uploadMap');

export const isSubmittingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  uploadMapFeatureSelector,
  (state: UploadMapState) => state.isSubmitting
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  uploadMapFeatureSelector,
  (state: UploadMapState) => state.error
);

