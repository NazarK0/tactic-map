import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from 'rxjs';

import AppState from "../../../app.state";
import ErrorInterface from '../../../shared/types/error.interface';
import { getMapAction } from "../canvas/store/actions/getMap.action";
import { uploadMapAction } from './store/actions/uploadMap.action';
import { errorSelector, isSubmittingSelector } from './store/uploadMap.selectors';

@Component({
  selector: 'tm-upload-map',
  templateUrl: './uploadMap.component.html',
  styleUrls: ['./uploadMap.component.scss']
})
export default class UploadMapComponent implements OnInit {
  isSubmitting$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;

  constructor(
    private store: Store<AppState>,
  ) {}

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  onUploadMap(): void {
    this.store.dispatch(uploadMapAction());
    this.store.dispatch(getMapAction());
  }
}