

import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import AppState from '../../../../app.state';
import ErrorInterface from '../../../../shared/types/error.interface';
import DSG_SignFormState from '../../../types/dsgSignForm.state';

export const DSG_SignFormFeatureSelector = createFeatureSelector<
AppState,
DSG_SignFormState
>('dsgSignForm');

export const isUploadingSelector: MemoizedSelector<AppState, boolean> = createSelector(
  DSG_SignFormFeatureSelector,
  (state: DSG_SignFormState) => state.isUploading
);

export const imageUrlSelector: MemoizedSelector<AppState, string | null> = createSelector(
  DSG_SignFormFeatureSelector,
  (state: DSG_SignFormState) => state.imageUrl
);

export const errorSelector: MemoizedSelector<AppState, ErrorInterface | null> = createSelector(
  DSG_SignFormFeatureSelector,
  (state: DSG_SignFormState) => state.error
);



