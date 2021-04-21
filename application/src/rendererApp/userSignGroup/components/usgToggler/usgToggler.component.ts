import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { select, Store } from "@ngrx/store";
import { from, Observable, Subscription } from "rxjs";

import AppState from "../../../app.state";
import ErrorInterface from "../../../shared/types/error.interface";
import VMenuItemInterface from "../../../shared/types/vmenuItem.interface";
import { deleteUSG_Action } from './store/actions/deleteUSG.action';
import { getUSG_MenuAction } from './store/actions/getUSG_Menu.action';
import { errorSelector, isLoadingSelector,usgMenuSelector } from './store/usgToggler.selectors';

@Component({
  selector: 'tm-usg-toggler',
  templateUrl: './usgToggler.component.html',
  styleUrls: ['./usgToggler.component.scss']
})
export default class USG_TogglerComponent implements OnInit, OnDestroy {
  urlSubscription: Subscription = new Subscription();
  menuItems$!: Observable<VMenuItemInterface[] | null>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  fetchData(): void {
    this.store.dispatch(getUSG_MenuAction());
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.menuItems$ = this.store.pipe(select(usgMenuSelector));
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

  onRemove(usgId: number): void {
    this.store.dispatch(deleteUSG_Action({ id: usgId }));
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    // const windowWidth = event.target.innerWidth;
    //change title length
  }
}
