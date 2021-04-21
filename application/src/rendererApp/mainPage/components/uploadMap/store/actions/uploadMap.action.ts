import { createAction, props } from '@ngrx/store';

import ErrorInterface from '../../../../../shared/types/error.interface';
import UploadMapActionTypes from '../uploadMap.action-types';

export const uploadMapAction = createAction(
  UploadMapActionTypes.UPLOAD_MAP,
);

export const uploadMapSuccessAction = createAction(
  UploadMapActionTypes.UPLOAD_MAP_SUCCESS
);

export const uploadMapFailureAction = createAction(
  UploadMapActionTypes.UPLOAD_MAP_FAILURE,
  props<{ error: ErrorInterface }>()
);
