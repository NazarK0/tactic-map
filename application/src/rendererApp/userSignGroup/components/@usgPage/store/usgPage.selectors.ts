import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import ErrorInterface from '../../../../shared/types/error.interface';
import USG_Interface from '../../../../shared/types/usg.interface';
import USG_PageState from '../../../types/usgPage.state';

export const usgPageFeatureSelector = createFeatureSelector<
AppState,
USG_PageState
>('usgPage');

export const isLoadingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  usgPageFeatureSelector,
  (state: USG_PageState) => state.isLoading
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  usgPageFeatureSelector,
  (state: USG_PageState) => state.error
);

export const usgSelector: MemoizedSelector<AppState, USG_Interface | null> = createSelector(
  usgPageFeatureSelector,
  (state: USG_PageState) => state.data
);
