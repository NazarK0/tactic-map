import { createAction } from '@ngrx/store';

import DSG_SignFormActionTypes from '../dsgSignForm.action-types';

export const DSG_DeleteImageAction = createAction(
  DSG_SignFormActionTypes.DELETE_IMAGE,
);
