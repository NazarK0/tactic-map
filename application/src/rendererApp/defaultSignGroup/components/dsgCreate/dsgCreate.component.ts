import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { select,Store } from "@ngrx/store";
import { Observable } from "rxjs";

import AppState from '../../../app.state';
import UtilsService from '../../../shared/services/utils.service';
import ErrorInterface from '../../../shared/types/error.interface';
import DSG_InputInterface from "../../types/dsgInput.interface";
import { createDSG_Action } from './store/actions/createDSG.action';
import { errorSelector,isSubmittingSelector } from './store/dsgCreate.selector';

@Component({
  selector: 'tm-dsg-create',
  templateUrl: './dsgCreate.component.html',
})
export default class DSG_CreateComponent implements OnInit {
  initialValues: DSG_InputInterface = {
    title: '',
    description: '',
  };

  isSubmitting$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;

  constructor(
    private snackBar: MatSnackBar,
    private utils: UtilsService,
    private store: Store<AppState>,
  ) { }
  
  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  onSubmit(dsgInput: DSG_InputInterface): void {
    const shortenedTitle = this.utils.truncStr(dsgInput.title);

    this.store.dispatch(createDSG_Action({ dsgInput }));
    this.snackBar.open(`Групу ${shortenedTitle} створено.`);
  }
}
