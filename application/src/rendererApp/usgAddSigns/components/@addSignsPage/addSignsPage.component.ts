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
import { getDSG_Action } from "./store/actions/getDSG.action";
import { updateSignStatusAction } from "./store/actions/updateSignStatus.action";
import { dsgSelector, errorSelector,isLoadingSelector } from "./store/addSignsPage.selectors";

@Component({
  selector: 'tm-add-signs-page',
  templateUrl: './addSignsPage.component.html',
  styleUrls: ['./addSignsPage.component.scss']
})
export default class AddSignsPageComponent implements OnInit, OnDestroy {
  urlSubscription: Subscription = new Subscription();
  isLoading$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;
  group$!: Observable<DSG_WithSelectedSignsInterface | null>;
  usgId!: number;
  usgSignIds$!: Observable<number[] | null>;
  dsgId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private utils: UtilsService,
  ) { }

  fetchData(): void {
    if (this.dsgId) {
      this.store.dispatch(getDSG_Action({ dsgId: this.dsgId, usgId: this.usgId }));
    }
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.group$ = this.store.pipe(select(dsgSelector));
    this.usgId = Number(this.route.snapshot.paramMap.get('usgId'));
  }

  initializeListeners(): void {
    this.urlSubscription.add(
      this.route.queryParams.subscribe((queryParams) => {
        this.dsgId = Number(queryParams.dsgId);
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
    this.store.dispatch(updateSignStatusAction({ signId, usgId: this.usgId }));
  }

  onRemoveSign(signId: number): void {
    // console.log(signId, 'signId onRemove');
    // this.store.dispatch(DSG_DeleteSignAction({ signId }));
    // this.snackBar.open(`Знак видалено.`);
  }
}