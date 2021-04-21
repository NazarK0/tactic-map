

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import dummyPredefinedSignGroupMenu from '../../../../../@dummyData/dummyPredefinedSignGroupMenu';
import MenuItemInterface from '../../../types/menuItem.interface';

@Injectable()
export default class VerticalMenuService {
  constructor(){}

  getMenuItems(): Observable<MenuItemInterface[]> {
    const data = dummyPredefinedSignGroupMenu;

    return of(data);
  }

}