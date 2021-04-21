import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import DSG_Interface from '../../../../shared/types/dsg.interface';
import ErrorInterface from '../../../../shared/types/error.interface';
import DSG_PageState from '../../../types/dsgPage.state';

export const dsgPageFeatureSelector = createFeatureSelector<
AppState,
DSG_PageState
>('dsgPage');

export const isLoadingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  dsgPageFeatureSelector,
  (state: DSG_PageState) => state.isLoading
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  dsgPageFeatureSelector,
  (state: DSG_PageState) => state.error
);

export const dsgSelector: MemoizedSelector<AppState, DSG_Interface | null> = createSelector(
  dsgPageFeatureSelector,
  (state: DSG_PageState) => state.data
);
