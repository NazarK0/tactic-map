import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import DSG_Interface from '../../../../shared/types/dsg.interface';
import ErrorInterface from '../../../../shared/types/error.interface';
import DSG_EditState from '../../../types/dsgEdit.state';

export const dsgEditFeatureSelector = createFeatureSelector<
AppState,
DSG_EditState
>('dsgEdit');

export const isSubmittingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  dsgEditFeatureSelector,
  (state: DSG_EditState) => state.isSubmitting
);

export const isLoadingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  dsgEditFeatureSelector,
  (state: DSG_EditState) => state.isLoading
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  dsgEditFeatureSelector,
  (state: DSG_EditState) => state.error
);

export const dsgSelector: MemoizedSelector<AppState, DSG_Interface | null> = createSelector(
  dsgEditFeatureSelector,
  (state: DSG_EditState) => state.data
);
