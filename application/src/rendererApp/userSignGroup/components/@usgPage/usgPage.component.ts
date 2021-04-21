import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";

import AppState from "../../../app.state";
import UtilsService from "../../../shared/services/utils.service";
import USG_Interface from "../../../shared/types/usg.interface";
import ErrorInterface from "../../../shared/types/error.interface";
import { createUSG_Action } from "../usgCreate/store/actions/createUSG.action";
import { USG_DeleteSignAction } from "./store/actions/deleteSign.action";
import { getUSG_Action } from "./store/actions/getUSG.action";
import { usgSelector, errorSelector,isLoadingSelector } from "./store/usgPage.selectors";

@Component({
  selector: 'tm-usg-page',
  templateUrl: './usgPage.component.html',
  styleUrls: ['./usgPage.component.scss']
})
export default class USG_PageComponent implements OnInit, OnDestroy {
  urlSubscription: Subscription = new Subscription();
  isLoading$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;
  group$!: Observable<USG_Interface | null>;
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
      this.store.dispatch(getUSG_Action({ id: this.id }));
    }
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.group$ = this.store.pipe(select(usgSelector));
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
    this.router.navigateByUrl(`/settings/user-sign-group/${this.id}/edit-sign/${signId}`);
  }

  onRemoveSign(signId: number): void {
    console.log(signId, 'signId onRemove');
    this.store.dispatch(USG_DeleteSignAction({ signId }));
    this.snackBar.open(`Знак видалено.`);
  }
}