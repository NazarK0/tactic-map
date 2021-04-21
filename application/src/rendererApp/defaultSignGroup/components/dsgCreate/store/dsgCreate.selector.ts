import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import ErrorInterface from '../../../../shared/types/error.interface';
import DSG_CreateState from '../../../types/dsgCreate.state';

export const DSG_CreateFeatureSelector = createFeatureSelector<
AppState,
DSG_CreateState
>('dsgCreate');

export const isSubmittingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  DSG_CreateFeatureSelector,
  (state: DSG_CreateState) => state.isSubmitting
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  DSG_CreateFeatureSelector,
  (state: DSG_CreateState) => state.error
);