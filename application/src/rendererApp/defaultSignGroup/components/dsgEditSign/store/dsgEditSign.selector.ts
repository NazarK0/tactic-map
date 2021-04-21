

import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import DSG_SignInterface from '../../../../shared/types/dsgSign.interface';
import ErrorInterface from '../../../../shared/types/error.interface';
import DSG_EditSignState from '../../../types/dsgEditSign.state';

export const DSG_EditSignFeatureSelector = createFeatureSelector<
AppState,
DSG_EditSignState
>('dsgEditSign');

export const isSubmittingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  DSG_EditSignFeatureSelector,
  (state: DSG_EditSignState) => state.isSubmitting
);

export const isLoadingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  DSG_EditSignFeatureSelector,
  (state: DSG_EditSignState) => state.isLoading
);

export const signSelector: MemoizedSelector<AppState, DSG_SignInterface | null> = createSelector(
  DSG_EditSignFeatureSelector,
  (state: DSG_EditSignState) => state.data
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  DSG_EditSignFeatureSelector,
  (state: DSG_EditSignState) => state.error
);



