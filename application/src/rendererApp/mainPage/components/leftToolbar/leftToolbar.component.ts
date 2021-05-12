import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";

import AppState from "../../../app.state";
import ErrorInterface from "../../../shared/types/error.interface";
import SelectedMilSignInterface from '../../types/selectedMilSign.interface';
import SelectedMilSignWithSrcInterface from "../../types/selectedMilSignWithSrc.interface";
import USG_WithStateInterface from "../../types/usgWithState.interface";
import { getSelectedToolAction } from "../canvas/store/actions/getSelectedTool.action";
import { getUSG_ListAction } from "./store/actions/getUSG_List.action";
import { updateSelectedUSG_Action } from './store/actions/updateSelectedUSG.action';
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
    this.store.dispatch(getUSG_ListAction());
  }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  onScroll(event: any): void {
    this.scrollTop = event.target.scrollTop;
  }

  onSelectSign(selected: SelectedMilSignInterface): void {
    this.store.dispatch(updateSelectedUSG_Action({ selected }));
    this.store.dispatch(getSelectedToolAction());
  }
}
