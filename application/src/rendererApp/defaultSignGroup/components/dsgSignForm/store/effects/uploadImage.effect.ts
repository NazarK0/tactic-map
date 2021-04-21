import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import SharedDSG_Service from '../../../../../shared/services/dsg.service';
import { DSG_UploadImageAction, DSG_UploadImageFailureAction,DSG_UploadImageSuccessAction } from '../actions/uploadImage.action';

@Injectable()
export default class DSG_UploadImageEffect {
  uploadImage$ = createEffect(() => this.actions$.pipe(
    ofType(DSG_UploadImageAction),
    switchMap(() => {
      return this.sharedDSG_Service.uploadImage().pipe(
        map((imageUrl: string | null) => DSG_UploadImageSuccessAction({ imageUrl })),
        catchError((error) => of(DSG_UploadImageFailureAction({ error })))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private sharedDSG_Service: SharedDSG_Service,
  ) {}
}
