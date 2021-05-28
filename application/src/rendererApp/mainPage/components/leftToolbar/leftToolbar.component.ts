import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";

import AppState from "../../../app.state";
import ErrorInterface from "../../../shared/types/error.interface";
import MilSignReqInterface from '../../types/milSignReq.interface';
import USG_WithStateInterface from "../../types/toolGroupWithState.interface";
import { getSelectedToolAction } from "../canvas/store/actions/getSelectedTool.action";
import { getToolGroupsAction } from "./store/actions/getToolGroups.action";
import { updateSelectedToolGroupAction } from './store/actions/updateSelectedToolGroup.action';
import { errorSelector, isLoadingSelector, usgListSelector } from "./store/leftToolbar.selectors";

@Component({
  selector: 'tm-left-toolbar',
  templateUrl: './leftToolbar.component.html',
  styleUrls: ['./leftToolbar.component.scss']
})
export default class LeftToolbarComponent implements OnInit { 
  isLoading$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;
  usgList$!: Observable<USG_WithStateInterface[] | null>;
  // activeItem$: Observable<SelectSignEventInterface | null>;
  scrollTop = 0;

  constructor(
    private store: Store<AppState>,
  ) {}

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.usgList$ = this.store.pipe(select(usgListSelector));
  }

  fetchData(): void {
    this.store.dispatch(getToolGroupsAction());
  }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  onScroll(event: any): void {
    this.scrollTop = event.target.scrollTop;
  }

  onSelectSign(selected: MilSignReqInterface): void {
    this.store.dispatch(updateSelectedToolGroupAction({ selected }));
    this.store.dispatch(getSelectedToolAction());
  }
}
