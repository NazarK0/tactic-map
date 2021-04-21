import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppStateInterface from '../../../../shared/types/app-state.interface';
import ErrorInterface from '../../../../shared/types/error.interface';
import MenuItemInterface from '../../../types/menuItem.interface';
import VerticalMenuStateInterface from '../types/verticalMenu-state.interface';

export const verticalMenuFeatureSelector = createFeatureSelector<
AppStateInterface,
VerticalMenuStateInterface
>('verticalMenu');

export const errorSelector: MemoizedSelector<AppStateInterface, ErrorInterface | null> = createSelector(
  verticalMenuFeatureSelector,
  (state: VerticalMenuStateInterface) => state.errors
);

export const isLoadingSelector: MemoizedSelector<AppStateInterface, boolean> = createSelector(
  verticalMenuFeatureSelector,
  (state: VerticalMenuStateInterface) => state.isLoading
);

export const verticalMenuItemsSelector: MemoizedSelector<AppStateInterface, MenuItemInterface[] | null> = createSelector(
  verticalMenuFeatureSelector,
  (state: VerticalMenuStateInterface) => state.data
);