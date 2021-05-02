import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import DSG_WithSelectedSignsInterface from "src/rendererApp/shared/types/dsgWithSelectedSigns.interface";

import AppState from "../../../app.state";
import UtilsService from "../../../shared/services/utils.service";
import DSG_Interface from "../../../shared/types/dsg.interface";
import ErrorInterface from "../../../shared/types/error.interface";
import { createDSG_Action } from "../dsgCreate/store/actions/createDSG.action";
import { DSG_DeleteSignAction } from "./store/actions/deleteSign.action";
import { getDSG_Action } from "./store/actions/getDSG.action";
import { dsgSelector, errorSelector,isLoadingSelector } from "./store/dsgPage.selectors";

@Component({
  selector: 'tm-dsg-page',
  templateUrl: './dsgPage.component.html',
  styleUrls: ['./dsgPage.component.scss']
})
export default class DSG_PageComponent implements OnInit, OnDestroy {
  urlSubscription: Subscription = new Subscription();
  isLoading$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;
  group$!: Observable<DSG_WithSelectedSignsInterface | null>;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private utils: UtilsService,
  ) { }

  fetchData(): void {
    if (this.id) {
      this.store.dispatch(getDSG_Action({ id: this.id }));
    }
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.group$ = this.store.pipe(select(dsgSelector));
    this.group$.subscribe(group => console.log(group, 'GROUP'))
  }

  initializeListeners(): void {
    this.urlSubscription.add(
      this.route.queryParams.subscribe((queryParams) => {
        this.id = Number(queryParams.id);
        this.initializeValues();
        this.fetchData();
      })
    );
  }
  
  ngOnInit(): void {
    this.initializeListeners();
    
  }

  ngOnDestroy(): void {
    this.urlSubscription.unsubscribe();
  }

  onSelectSign(signId: number): void {

  }

  onEditSign(signId: number): void {
    this.router.navigateByUrl(`/settings/default-sign-group/${this.id}/edit-sign/${signId}`);
  }

  onRemoveSign(signId: number): void {
    console.log(signId, 'signId onRemove');
    this.store.dispatch(DSG_DeleteSignAction({ signId }));
    this.snackBar.open(`Знак видалено.`);
  }
}