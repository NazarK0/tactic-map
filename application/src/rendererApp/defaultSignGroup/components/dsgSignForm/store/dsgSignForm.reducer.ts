/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import DSG_SignFormState from '../../../types/dsgSignForm.state';
import { DSG_DeleteImageAction } from './actions/deleteImage.action';
import { DSG_UploadImageAction, DSG_UploadImageFailureAction,DSG_UploadImageSuccessAction } from './actions/uploadImage.action';

const initialState: DSG_SignFormState = {
  isUploading: false,
  error: null,
  imageUrl: null,
};

const reducer = createReducer(initialState,

  on(DSG_UploadImageAction,
    (state): DSG_SignFormState => ({
      ...state,
      isUploading: true,
  })),
  on(DSG_UploadImageSuccessAction,
    (state, action): DSG_SignFormState => ({
      ...state,
      isUploading: false,
      imageUrl: action.imageUrl,
  })),
  on(DSG_UploadImageFailureAction,
    (state, action): DSG_SignFormState => ({
      ...state,
      isUploading: false,
      error: action.error,
  })),
  on(DSG_DeleteImageAction,
    (state): DSG_SignFormState => ({
      ...state,
      imageUrl: null,
  })),
  on(routerNavigationAction, (): DSG_SignFormState => initialState),
);

export default function dsgSignFormReducer(state: DSG_SignFormState, action: Action): DSG_SignFormState {
  return reducer(state, action);
}
