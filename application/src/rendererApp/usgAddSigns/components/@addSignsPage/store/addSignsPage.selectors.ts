import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import DSG_Interface from '../../../../shared/types/dsg.interface';
import DSG_WithSelectedSignsInterface from '../../../../shared/types/dsgWithSelectedSigns.interface';
import ErrorInterface from '../../../../shared/types/error.interface';
import AddSignsPageState from '../../../types/addSignsPage.state';

export const dsgPageFeatureSelector = createFeatureSelector<
AppState,
AddSignsPageState
>('addSignsPage');

export const isLoadingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  dsgPageFeatureSelector,
  (state: AddSignsPageState) => state.isLoading
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  dsgPageFeatureSelector,
  (state: AddSignsPageState) => state.error
);

export const dsgSelector: MemoizedSelector<AppState, DSG_WithSelectedSignsInterface | null> = createSelector(
  dsgPageFeatureSelector,
  (state: AddSignsPageState) => state.data
);
