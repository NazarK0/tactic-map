import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from 'rxjs';
import { filter, map } from "rxjs/operators";

import AppState from "../../../app.state";
import UtilsService from '../../../shared/services/utils.service';
import DSG_Interface from "../../../shared/types/dsg.interface";
import ErrorInterface from "../../../shared/types/error.interface";
import DSG_InputInterface from "../../types/dsgInput.interface";
import { getDSG_Action } from "./store/actions/getDSG.action";
import { updateDSG_Action } from "./store/actions/updateDSG.action";
import { dsgSelector,errorSelector, isLoadingSelector, isSubmittingSelector } from "./store/dsgEdit.selectors";

@Component({
  selector: 'tm-dsg-edit',
  templateUrl: './dsgEdit.component.html',
})
export default class DSG_EditComponent implements OnInit {
  initialValues$!: Observable<DSG_InputInterface>;
  isSubmitting$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;
  id!: number;


  initialValues!: DSG_InputInterface;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private utils: UtilsService,
    private route: ActivatedRoute,
  ) { }
  
  fetchData(): void {
    this.store.dispatch(getDSG_Action({ id: this.id }));
  }

  initializeValues(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.initialValues$ = this.store.pipe(
      select(dsgSelector),
      map((dsg: DSG_Interface | null) => {
        if (dsg) {
          const { title, description, signs } = dsg;
          return {
            title,
            description,
            signs,
          };
        } else {
          return {
            title: '',
            description: '',
            signs: [],
          };
        }
      }),
    );
  }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  onSubmit(dsgInput: DSG_InputInterface): void {
    const shortenedTitle = this.utils.truncStr(dsgInput.title);

    this.store.dispatch(updateDSG_Action({ id: this.id, dsgInput }));
    this.snackBar.open(`Групу ${shortenedTitle} успішно відредаговано`);
  }
}
