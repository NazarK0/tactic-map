import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from "@angular/router";
import { select,Store } from "@ngrx/store";
import { Observable } from "rxjs";

import AppState from '../../../app.state';
import UtilsService from '../../../shared/services/utils.service';
import ErrorInterface from '../../../shared/types/error.interface';
import DSG_SignInputInterface from "../../types/dsgSignInput.interface";
import { addDSG_SignAction } from './store/actions/addSign.action';
import { errorSelector, isSubmittingSelector } from './store/dsgAddSign.selector';

@Component({
  selector: 'tm-dsg-add-sign',
  templateUrl: './dsgAddSign.component.html',
})
export default class DSG_AddSignComponent implements OnInit {
  dsgId!: number;
  initialValues: DSG_SignInputInterface = {
    title: '',
    description: '',
    sign: '',
  };

  isSubmitting$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;

  constructor(
    private snackBar: MatSnackBar,
    private utils: UtilsService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) { }

  initializeValues(): void {
    this.dsgId = Number(this.route.snapshot.paramMap.get('dsgId'));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }
  
  ngOnInit(): void {
    this.initializeValues();
  }

  onSubmit(sign: DSG_SignInputInterface): void {
    const shortenedTitle = this.utils.truncStr(sign.title);

    this.store.dispatch(addDSG_SignAction({ dsgId: this.dsgId, sign }));
    this.snackBar.open(`Знак ${shortenedTitle} створено.`);
  }
}
