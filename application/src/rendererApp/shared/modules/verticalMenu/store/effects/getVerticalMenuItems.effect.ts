import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError,map, switchMap } from "rxjs/operators";

import MenuItemInterface from "../../../../types/menuItem.interface";
import VerticalMenuService from "../../services/verticalMenu.service";
import { getVerticalMenuItemsAction, getVerticalMenuItemsSuccessAction, getVerticalMenuItemsFailureAction } from "../actions/getVerticalMenuItems.action";

@Injectable()
export default class GetVerticalMenuItemsEffect {
  getMenuItems$ = createEffect(() => this.actions$
    .pipe(
      ofType(getVerticalMenuItemsAction),
      switchMap(() => {
        return this.verticalMenuService
          .getMenuItems()
          .pipe(
            map((items: MenuItemInterface[]) => getVerticalMenuItemsSuccessAction({ items })),
            catchError(() => of(getVerticalMenuItemsFailureAction()))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private verticalMenuService: VerticalMenuService,
  ) {}

}