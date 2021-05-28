import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import USG_WithStateInterface from 'src/rendererApp/mainPage/types/toolGroupWithState.interface';

import AppState from '../../../../app.state';
import ErrorInterface from '../../../../shared/types/error.interface';
import USG_Interface from '../../../../shared/types/usg.interface';
import LeftToolbarState from '../../../types/leftToolbar.state';

export const LeftToolbarFeatureSelector = createFeatureSelector<
AppState,
LeftToolbarState
>('leftToolbar');

export const isLoadingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  LeftToolbarFeatureSelector,
  (state: LeftToolbarState) => state.isLoading
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  LeftToolbarFeatureSelector,
  (state: LeftToolbarState) => state.error
);

export const usgListSelector: MemoizedSelector<AppState, USG_WithStateInterface[] | null> = createSelector(
  LeftToolbarFeatureSelector,
  (state: LeftToolbarState) => state.data
);
