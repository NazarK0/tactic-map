import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import SelectedMilSignInterface from '../../mainPage/types/selectedMilSign.interface';
import USG_WithStateInterface from '../../mainPage/types/usgWithState.interface';

@Injectable()
export default class SessionStorageService {
  set(key: string, data: any): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to sessionStorage', error);
    }
  }

  get(key: string): any  {
    try {
      return JSON.parse(sessionStorage.getItem(key) || '');
    } catch (error) {
      console.error('Error getting data from sessionStorage', error);
      return null;
    }
  }

  getSelectedUSG(): Observable<SelectedMilSignInterface> {
    return of(this.get('selUSG'));
  }

  setSelectedUSG(data: SelectedMilSignInterface): Observable<SelectedMilSignInterface> {
    this.set('selUSG', data);
    return of(data);
  }
}
