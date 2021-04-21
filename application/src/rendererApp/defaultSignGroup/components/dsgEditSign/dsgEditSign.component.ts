import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from "@angular/router";
import { select,Store } from "@ngrx/store";
import { Observable } from "rxjs";

import AppState from '../../../app.state';
import UtilsService from '../../../shared/services/utils.service';
import DSG_SignInterface from "../../../shared/types/dsgSign.interface";
import ErrorInterface from '../../../shared/types/error.interface';
import DSG_SignInputInterface from "../../types/dsgSignInput.interface";
import { DSG_GetSignAction } from "./store/actions/getSign.action";
import { DSG_UpdateSignAction } from './store/actions/updateSign.action';
import { errorSelector, isLoadingSelector, isSubmittingSelector, signSelector } from './store/dsgEditSign.selector';

@Component({
  selector: 'tm-dsg-edit-sign',
  templateUrl: './dsgEditSign.component.html',
})
export default class DSG_EditSignComponent implements OnInit {
  initialValues$!: Observable<DSG_SignInputInterface | null>;
  isSubmitting$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;
  signId!: number;

  constructor(
    private snackBar: MatSnackBar,
    private utils: UtilsService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) { }

  initializeValues(): void {
    this.signId = Number(this.route.snapshot.paramMap.get('id'));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.initialValues$ = this.store.pipe(select(signSelector));
  }

  fetchData(): void {
    this.store.dispatch(DSG_GetSignAction({ id: this.signId }));
  }
  
  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  onSubmit(signInput: DSG_SignInputInterface): void {
    const shortenedTitle = this.utils.truncStr(signInput.title);

    this.store.dispatch(DSG_UpdateSignAction({ id: this.signId, signInput }));
    this.snackBar.open(`Знак ${shortenedTitle} відредаговано.`);
  }
}
