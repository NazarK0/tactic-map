import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable, of } from 'rxjs';

import LocalStorageService from '../../../shared/services/localStorage.service';
import IpcBodyInterface from '../../../shared/types/ipcBody.interface';
import topToolbarIpcMessages from '../../types/topToolbar.ipcMessages';

@Injectable()
export default class UploadMapService {
  private ipc!: IpcRenderer;
  
  constructor(
    private localStorage: LocalStorageService,
  ) {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer
      } catch (error) {
        throw error
      }
    } else {
      console.error('Could not load electron ipc')
    }
  }

  uploadMap(): Observable<{}> {
    const response: IpcBodyInterface = this.ipc.sendSync(topToolbarIpcMessages.uploadMap);
    if (response.status === 'ok') {
      this.localStorage.set('mapUrl', response.data);
      return of({});
    } else {
      throw new Error(response.data);
    }
  }

  getMap(): Observable<string> {
    const mapUrl = this.localStorage.get('mapUrl');
    return of(mapUrl);
  }
}
