
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import ErrorInterface from '../../../../shared/types/error.interface';
import VMenuItemInterface from '../../../../shared/types/vmenuItem.interface';
import DSG_TogglerState from '../../../types/addSignsToggler.state';

export const dsgTogglerFeatureSelector = createFeatureSelector<
  AppState,
  DSG_TogglerState
>('addSignsToggler');

export const isLoadingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  dsgTogglerFeatureSelector,
  (state: DSG_TogglerState) => state.isLoading
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  dsgTogglerFeatureSelector,
  (state: DSG_TogglerState) => state.error
);

export const dsgMenuSelector: MemoizedSelector<AppState, VMenuItemInterface[] | null> = createSelector(
  dsgTogglerFeatureSelector,
  (state: DSG_TogglerState) => state.data
);
