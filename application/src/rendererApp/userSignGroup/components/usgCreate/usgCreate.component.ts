import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { select,Store } from "@ngrx/store";
import { Observable } from "rxjs";

import AppState from '../../../app.state';
import UtilsService from '../../../shared/services/utils.service';
import ErrorInterface from '../../../shared/types/error.interface';
import USG_InputInterface from "../../types/usgInput.interface";
import { createUSG_Action } from './store/actions/createUSG.action';
import { errorSelector,isSubmittingSelector } from './store/usgCreate.selector';

@Component({
  selector: 'tm-usg-create',
  templateUrl: './usgCreate.component.html',
})
export default class USG_CreateComponent implements OnInit {
  initialValues: USG_InputInterface = {
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

  onSubmit(usgInput: USG_InputInterface): void {
    const shortenedTitle = this.utils.truncStr(usgInput.title);

    this.store.dispatch(createUSG_Action({ usgInput }));
    this.snackBar.open(`Групу ${shortenedTitle} створено.`);
  }
}
