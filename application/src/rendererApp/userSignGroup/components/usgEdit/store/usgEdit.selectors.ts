import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import USG_Interface from '../../../../shared/types/usg.interface';
import ErrorInterface from '../../../../shared/types/error.interface';
import USG_EditState from '../../../types/usgEdit.state';

export const usgEditFeatureSelector = createFeatureSelector<
AppState,
USG_EditState
>('usgEdit');

export const isSubmittingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  usgEditFeatureSelector,
  (state: USG_EditState) => state.isSubmitting
);

export const isLoadingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  usgEditFeatureSelector,
  (state: USG_EditState) => state.isLoading
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  usgEditFeatureSelector,
  (state: USG_EditState) => state.error
);

export const usgSelector: MemoizedSelector<AppState, USG_Interface | null> = createSelector(
  usgEditFeatureSelector,
  (state: USG_EditState) => state.data
);
