import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export default class LocalStorageService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  get(key: string): any  {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch (error) {
      console.error('Error getting data from localStorage', error);
      return null;
    }
  }

  setMap(map: string): Observable<{}> {
    this.set('map', map);
    return of({});
  }

  getMap(): Observable<string> {
    return of(this.get('map'));
  }
}
