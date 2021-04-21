

import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import ErrorInterface from '../../../../shared/types/error.interface';
import DSG_AddSignState from '../../../types/dsgAddSign.state';

export const DSG_AddSignFeatureSelector = createFeatureSelector<
AppState,
DSG_AddSignState
>('dsgAddSign');

export const isSubmittingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  DSG_AddSignFeatureSelector,
  (state: DSG_AddSignState) => state.isSubmitting
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  DSG_AddSignFeatureSelector,
  (state: DSG_AddSignState) => state.error
);



