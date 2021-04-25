import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable , of } from 'rxjs';
import usgIpcMessages from 'src/rendererApp/userSignGroup/types/usg.ipcMessages';

import USG_InputInterface from '../../userSignGroup/types/usgInput.interface';
import DSG_SignInterface from '../types/dsgSign.interface';
import IpcBodyInterface from '../types/ipcBody.interface';
import USG_Interface from '../types/usg.interface';
import VMenuItemInterface from '../types/vmenuItem.interface';

@Injectable()
export default class USG_Service {
  private ipc!: IpcRenderer;

  constructor() {
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

  create(input: USG_InputInterface): Observable<USG_Interface> {
    const response: IpcBodyInterface = this.ipc.sendSync(usgIpcMessages.USG_Create, { data: input });
    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  updateById(id: number, input: USG_InputInterface): Observable<USG_Interface> {
    const response: IpcBodyInterface = this.ipc.sendSync(usgIpcMessages.USG_Update, { queryParams: { id }, data: input });
    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  getById(id: number): Observable<USG_Interface> {
    const response: IpcBodyInterface = this.ipc.sendSync(usgIpcMessages.USG_GetById, { queryParams: { id } });

    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  getAll(): Observable<USG_Interface[]> {
    const response: IpcBodyInterface = this.ipc.sendSync(usgIpcMessages.USG_GetList);
    console.log('list service')

    if (response.status === 'ok') {
      return of(response.data);
    } else {
      console.log('list service error', response)
      throw new Error(response.data);
    }
  }

  getMenu(): Observable<VMenuItemInterface[]> {
    const response: IpcBodyInterface = this.ipc.sendSync(usgIpcMessages.USG_GetMenu);

    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  deleteById(id: number): Observable<{}> {
    const response: IpcBodyInterface = this.ipc.sendSync(usgIpcMessages.USG_DeleteById, { queryParams: { id } });
    if (response.status === 'ok') {
      return of({});
    } else {
      throw new Error(response.data);
    }
  }

  deleteSignById(id: number): Observable<DSG_SignInterface[]> {
    const response: IpcBodyInterface = this.ipc.sendSync(usgIpcMessages.USG_DeleteSignById, { queryParams: { id } });
    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  // uploadImage(): Observable<string> {
  //   const response: IpcBodyInterface = this.electron.ipcRenderer.sendSync(usgIpcMessages.USG_UploadImage);
  //   if (response.status === 'ok') {
  //     return of(response.data);
  //   } else {
  //     throw new Error(response.data);
  //   }
  // }

  addSign(usgId: number, signId: number): Observable<DSG_SignInterface> {
    const response: IpcBodyInterface = this.ipc.sendSync(usgIpcMessages.USG_AddSign, { queryParams: { usgId, signId } });
    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  getSign(id: number): Observable<DSG_SignInterface> {
    const response: IpcBodyInterface = this.ipc.sendSync(usgIpcMessages.USG_GetSign, { queryParams: { id } });
    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  toggleSignStatus(signId: number, usgId: number): Observable<DSG_SignInterface> {
    const response: IpcBodyInterface = this.ipc
      .sendSync(usgIpcMessages.USG_ToggleSignStatus, { queryParams: { id: signId, usgId } });

    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  // updateSignById(id: number, signInput: USG_SignInputInterface): Observable<USG_SignResponseInterface> {
  //   const response: IpcBodyInterface = this.electron.ipcRenderer.sendSync(usgIpcMessages.USG_EditSign, { queryParams: { id, signInput } });
  //   if (response.status === 'ok') {
  //     return of(response.data);
  //   } else {
  //     throw new Error(response.data);
  //   }
  // }
}
