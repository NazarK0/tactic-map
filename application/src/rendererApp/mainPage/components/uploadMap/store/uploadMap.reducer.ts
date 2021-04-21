/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import UploadMapState from '../../../types/uploadMap.state';
import { uploadMapAction, uploadMapFailureAction,uploadMapSuccessAction } from './actions/uploadMap.action';

const initialState: UploadMapState = {
  isSubmitting: false,
  error: null,
};

const reducer = createReducer(initialState,
  on(uploadMapAction,
      (state): UploadMapState => ({
        ...state,
        isSubmitting: true,
      })
  ),
  on(uploadMapSuccessAction,
      (state): UploadMapState => ({
        ...state,
        isSubmitting: false,
      })
  ),
  on(uploadMapFailureAction,
      (state, action): UploadMapState => ({
        ...state,
        isSubmitting: false,
        error: action.error
      })
  ),
  // on(routerNavigationAction, (): UploadMapState => initialState),
);

export default function uploadMapReducer(state: UploadMapState, action: Action): UploadMapState {
  return reducer(state, action);
}
