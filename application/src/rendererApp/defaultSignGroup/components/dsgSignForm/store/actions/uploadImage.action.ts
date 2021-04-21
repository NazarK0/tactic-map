


import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import DSG_SignFormActionTypes from '../dsgSignForm.action-types';

export const DSG_UploadImageAction = createAction(
  DSG_SignFormActionTypes.UPLOAD_IMAGE,
);

export const DSG_UploadImageSuccessAction = createAction(
  DSG_SignFormActionTypes.UPLOAD_IMAGE_SUCCESS,
  props<{ imageUrl: string | null }>()
);

export const DSG_UploadImageFailureAction = createAction(
  DSG_SignFormActionTypes.UPLOAD_IMAGE_FAILURE,
  props<{ error: ErrorInterface }>()
);
