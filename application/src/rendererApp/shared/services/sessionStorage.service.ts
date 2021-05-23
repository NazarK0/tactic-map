import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import MilSignResInterface from 'src/rendererApp/mainPage/types/milSignRes.interface';
import SelectedToolInterface from 'src/rendererApp/mainPage/types/selectedTool.interface';
import SelectedToolTypes from 'src/rendererApp/mainPage/types/selectedToolTypes.enum';

@Injectable()
export default class SessionStorageService {
  private set(key: string, data: any): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to sessionStorage', error);
    }
  }

  private get(key: string): any  {
    if (key) {
      try {
        return JSON.parse(sessionStorage.getItem(key) || '');
      } catch (error) {
        // console.error('Error getting data from sessionStorage', error);
        return null;
      } 
    } else return null;
   
  }

  getSelectedMilSign(): Observable<MilSignResInterface | null> {
    const selected: SelectedToolInterface | null = this.get('tool');

    if (selected && selected.type === SelectedToolTypes.MilSign) {
      return of(selected.tool)
    } else return of(null)
  }

  setSelectedMilSign(data: MilSignResInterface): Observable<MilSignResInterface> {
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

  // setSelectedTool(data: SelectedToolInterface): Observable<SelectedToolInterface> {
  //   this.set('tool', data);
  //   return of(data);
  // }
}
