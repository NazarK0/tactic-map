import { Action, createReducer, on } from '@ngrx/store';

import VerticalMenuStateInterface from '../types/verticalMenu-state.interface';
import { getVerticalMenuItemsAction, getVerticalMenuItemsSuccessAction, getVerticalMenuItemsFailureAction } from './actions/getVerticalMenuItems.action';

const initialState: VerticalMenuStateInterface = {
  isLoading: false,
  errors: null,
  data: null,
};

const reducer = createReducer<VerticalMenuStateInterface>(initialState,
  on(getVerticalMenuItemsAction,
    (state): VerticalMenuStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(getVerticalMenuItemsSuccessAction,
    (state, action): VerticalMenuStateInterface => ({
      ...state,
      isLoading: false,
      data: action.items,
    })
  ),
  on(getVerticalMenuItemsFailureAction,
    (state): VerticalMenuStateInterface => ({
      ...state,
      isLoading: false,
      data: null,
    })
  ),
);

export default function verticalMenuReducer(state: VerticalMenuStateInterface, action: Action): VerticalMenuStateInterface {
  return reducer(state, action);
}