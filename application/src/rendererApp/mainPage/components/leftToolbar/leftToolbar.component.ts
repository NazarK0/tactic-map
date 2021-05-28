import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";

import AppState from "../../../app.state";
import ErrorInterface from "../../../shared/types/error.interface";
import MilSignReqInterface from '../../types/milSignReq.interface';
import SelectedToolType from "../../types/selectedTool.type";
import SelectedToolReqType from "../../types/selectedToolReq.type";
import ToolGroupWithStateInterface from "../../types/toolGroupWithState.interface";
import USG_WithStateInterface from "../../types/toolGroupWithState.interface";
import { getSelectedToolAction } from "../canvas/store/actions/getSelectedTool.action";
import { getToolGroupsAction } from "./store/actions/getToolGroups.action";
import { updateSelectedToolGroupAction } from './store/actions/updateSelectedToolGroup.action';
import { errorSelector, isLoadingSelector, toolGroupsSelector } from "./store/leftToolbar.selectors";

@Component({
  selector: 'tm-left-toolbar',
  templateUrl: './leftToolbar.component.html',
  styleUrls: ['./leftToolbar.component.scss']
})
export default class LeftToolbarComponent implements OnInit { 
  isLoading$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;
  toolGroups$!: Observable<ToolGroupWithStateInterface[] | null>;
  // activeItem$: Observable<SelectSignEventInterface | null>;
  scrollTop = 0;

  constructor(
    private store: Store<AppState>,
  ) {}

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.toolGroups$ = this.store.pipe(select(toolGroupsSelector));
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

  onSelectTool(selected: SelectedToolReqType): void {
    this.store.dispatch(updateSelectedToolGroupAction({ selected }));
    this.store.dispatch(getSelectedToolAction());
  }
}
