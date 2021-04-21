import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import ErrorInterface from '../../../../shared/types/error.interface';
import USG_CreateState from '../../../types/usgCreate.state';

export const USG_CreateFeatureSelector = createFeatureSelector<
AppState,
USG_CreateState
>('usgCreate');

export const isSubmittingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  USG_CreateFeatureSelector,
  (state: USG_CreateState) => state.isSubmitting
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  USG_CreateFeatureSelector,
  (state: USG_CreateState) => state.error
);