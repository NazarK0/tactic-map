import { Component, Input, OnInit } from "@angular/core";
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import AppStateInterface from '../../../../types/app-state.interface';
import ErrorInterface from '../../../../types/error.interface';
import MenuItemInterface from '../../../../types/menuItem.interface';
import { errorSelector,isLoadingSelector, verticalMenuItemsSelector } from '../../store/verticalMenu.selectors';
import { getVerticalMenuItemsAction } from './../../store/actions/getVerticalMenuItems.action';

@Component({
  selector: 'tm-vertical-menu',
  templateUrl: './verticalMenu.component.html',
  styleUrls: ['./verticalMenu.component.scss']
})
export default class VerticalMenuComponent implements OnInit {
  @Input('backUrl') backUrlProps: string | null;
  @Input('apiUrl') apiUrlProps: string;

  backUrl: string;
  apiUrl: string;
  isLoading$: Observable<boolean>;
  errors$: Observable<ErrorInterface | null>;
  menuItems$: Observable<MenuItemInterface[] | null>;

  constructor(private store: Store<AppStateInterface>) {}

  initializeValues(): void {
    this.backUrl = this.backUrlProps;
    this.apiUrl = this.apiUrlProps;
    this.menuItems$ = this.store.pipe(select(verticalMenuItemsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.errors$ = this.store.pipe(select(errorSelector));
  }

  fetchData(): void {
    this.store.dispatch(getVerticalMenuItemsAction());
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initializeValues();
    this.fetchData();
  }

  
}
