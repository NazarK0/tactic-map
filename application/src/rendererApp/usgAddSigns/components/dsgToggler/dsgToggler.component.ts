import { Component, HostListener, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { select, Store } from "@ngrx/store";
import { from, Observable, Subscription } from "rxjs";

import AppState from "../../../app.state";
import ErrorInterface from "../../../shared/types/error.interface";
import VMenuItemInterface from "../../../shared/types/vmenuItem.interface";
import { getDSG_MenuAction } from './store/actions/getDSG_Menu.action';
import { dsgMenuSelector, errorSelector, isLoadingSelector } from './store/dsgToggler.selectors';

@Component({
  selector: 'tm-dsg-toggler',
  templateUrl: './dsgToggler.component.html',
  styleUrls: ['./dsgToggler.component.scss']
})
export default class DSG_TogglerComponent implements OnInit, OnDestroy {
  @Input('usgId') usgIdProps: any;
  urlSubscription: Subscription = new Subscription();
  menuItems$!: Observable<VMenuItemInterface[] | null>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  fetchData(): void {
    this.store.dispatch(getDSG_MenuAction());
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.menuItems$ = this.store.pipe(select(dsgMenuSelector));
  }

  initializeListeners(): void {
    this.urlSubscription.add(
      this.route.queryParams.subscribe(() => {
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

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    // const windowWidth = event.target.innerWidth;
    //change title length
  }
}
