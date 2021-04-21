import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from 'rxjs';
import { filter, map } from "rxjs/operators";

import AppState from "../../../app.state";
import UtilsService from '../../../shared/services/utils.service';
import USG_Interface from "../../../shared/types/usg.interface";
import ErrorInterface from "../../../shared/types/error.interface";
import USG_InputInterface from "../../types/usgInput.interface";
import { getUSG_Action } from "./store/actions/getUSG.action";
import { updateUSG_Action } from "./store/actions/updateUSG.action";
import { usgSelector,errorSelector, isLoadingSelector, isSubmittingSelector } from "./store/usgEdit.selectors";

@Component({
  selector: 'tm-usg-edit',
  templateUrl: './usgEdit.component.html',
})
export default class USG_EditComponent implements OnInit {
  initialValues$!: Observable<USG_InputInterface>;
  isSubmitting$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;
  id!: number;


  initialValues!: USG_InputInterface;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private utils: UtilsService,
    private route: ActivatedRoute,
  ) { }
  
  fetchData(): void {
    this.store.dispatch(getUSG_Action({ id: this.id }));
  }

  initializeValues(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.initialValues$ = this.store.pipe(
      select(usgSelector),
      map((usg: USG_Interface | null) => {
        if (usg) {
          const { title, description, signs } = usg;
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

  onSubmit(usgInput: USG_InputInterface): void {
    const shortenedTitle = this.utils.truncStr(usgInput.title);

    this.store.dispatch(updateUSG_Action({ id: this.id, usgInput }));
    this.snackBar.open(`Групу ${shortenedTitle} успішно відредаговано`);
  }
}
