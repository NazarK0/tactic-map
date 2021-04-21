/* eslint-disable @typescript-eslint/indent */
import { routerNavigationAction } from '@ngrx/router-store';
import { Action,createReducer, on } from '@ngrx/store';

import DSG_AddSignState from '../../../types/dsgAddSign.state';
import { addDSG_SignAction, addDSG_SignFailureAction,addDSG_SignSuccessAction } from './actions/addSign.action';
import { DSG_UploadImageAction, DSG_UploadImageFailureAction,DSG_UploadImageSuccessAction } from '../../dsgSignForm/store/actions/uploadImage.action';

const initialState: DSG_AddSignState = {
  isSubmitting: false,
  error: null,
};

const reducer = createReducer(initialState,
  on(addDSG_SignAction,
    (state): DSG_AddSignState => ({
      ...state,
      isSubmitting: true,
  })),
  on(addDSG_SignSuccessAction,
    (state): DSG_AddSignState => ({
      ...state,
      isSubmitting: false,
  })),
  on(addDSG_SignFailureAction,
    (state, action): DSG_AddSignState => ({
      ...state,
      isSubmitting: false,
      error: action.error
  })),
  on(routerNavigationAction, (): DSG_AddSignState => initialState),
);

export default function dsgAddSignReducer(state: DSG_AddSignState, action: Action): DSG_AddSignState {
  return reducer(state, action);
}
