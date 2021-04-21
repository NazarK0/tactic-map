
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import ErrorInterface from '../../../../shared/types/error.interface';
import VMenuItemInterface from '../../../../shared/types/vmenuItem.interface';
import USG_TogglerState from '../../../types/usgToggler.state';

export const usgTogglerFeatureSelector = createFeatureSelector<
  AppState,
  USG_TogglerState
>('usgToggler');

export const isLoadingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  usgTogglerFeatureSelector,
  (state: USG_TogglerState) => state.isLoading
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  usgTogglerFeatureSelector,
  (state: USG_TogglerState) => state.error
);

export const usgMenuSelector: MemoizedSelector<AppState, VMenuItemInterface[] | null> = createSelector(
  usgTogglerFeatureSelector,
  (state: USG_TogglerState) => state.data
);
