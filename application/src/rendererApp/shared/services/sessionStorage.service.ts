import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import SelectedToolInterface from 'src/rendererApp/mainPage/types/selectedTool.interface';
import SelectedToolTypes from 'src/rendererApp/mainPage/types/selectedToolTypes.enum';

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
    if (key) {
      try {
        return JSON.parse(sessionStorage.getItem(key) || '');
      } catch (error) {
        // console.error('Error getting data from sessionStorage', error);
        return null;
      } 
    } else return null;
   
  }

  getSelectedMilSign(): Observable<SelectedMilSignInterface | null> {
    const selected: SelectedToolInterface | null = this.get('tool');

    if (selected && selected.type === SelectedToolTypes.MilSign) {
      return of(selected.tool)
    } else return of(null)
  }

  setSelectedMilSign(data: SelectedMilSignInterface): Observable<SelectedMilSignInterface> {
    const selected: SelectedToolInterface = {
      tool: data,
      type: SelectedToolTypes.MilSign
    }
    this.set('tool', selected);
    return of(data);
  }

  getSelectedTool(): Observable<SelectedToolInterface | null> {
    console.error(this.get('tool'), 'GET TOOL SERVICE')
    return of(this.get('tool'));
  }

  setSelectedTool(data: SelectedToolInterface): Observable<SelectedToolInterface> {
    this.set('tool', data);
    return of(data);
  }
}
