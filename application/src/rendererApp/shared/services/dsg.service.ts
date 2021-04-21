import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable , of } from 'rxjs';
import dsgIpcMessages from 'src/rendererApp/defaultSignGroup/types/dsg.ipcMessages';

import DSG_InputInterface from '../../defaultSignGroup/types/dsgInput.interface';
import DSG_SignInputInterface from '../../defaultSignGroup/types/dsgSignInput.interface';
import DSG_Interface from '../types/dsg.interface';
import DSG_SignInterface from '../types/dsgSign.interface';
import IpcBodyInterface from '../types/ipcBody.interface';
import VMenuItemInterface from '../types/vmenuItem.interface';

@Injectable()
export default class DSG_Service {
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

  create(input: DSG_InputInterface): Observable<DSG_Interface> {
    const response: IpcBodyInterface = this.ipc.sendSync(dsgIpcMessages.DSG_Create, { data: input });
    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  updateById(id: number, input: DSG_InputInterface): Observable<DSG_Interface> {
    const response: IpcBodyInterface = this.ipc.sendSync(dsgIpcMessages.DSG_Update, { queryParams: { id }, data: input });
    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  getById(id: number): Observable<DSG_Interface> {
    const response: IpcBodyInterface = this.ipc.sendSync(dsgIpcMessages.DSG_GetById, { queryParams: { id } });

    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  getAll(): Observable<DSG_Interface[]> {
    const response: IpcBodyInterface = this.ipc.sendSync(dsgIpcMessages.DSG_GetList);
    // console.log(test, 'TEST ALL')
    // const response: IpcBodyInterface = { status: 'ok', data: [{id: 1, title: 'tuttut', description: 'ooooo', signs: [{title: 'tttt', description: 'ddddd', id: 1, sign: 'ssssss'}]}] };
    console.log('=====DSG MENU=====', response);
    if (response.status === 'ok') {
      // console.log('dsg menu', response.data)
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  getMenu(): Observable<VMenuItemInterface[]> {
    const response: IpcBodyInterface = this.ipc.sendSync(dsgIpcMessages.DSG_GetMenu);

    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  deleteById(id: number): Observable<{}> {
    const response: IpcBodyInterface = this.ipc.sendSync(dsgIpcMessages.DSG_DeleteById, { queryParams: { id } });
    if (response.status === 'ok') {
      return of({});
    } else {
      throw new Error(response.data);
    }
  }

  deleteSignById(id: number): Observable<DSG_SignInterface[]> {
    const response: IpcBodyInterface = this.ipc.sendSync(dsgIpcMessages.DSG_DeleteSignById, { queryParams: { id } });
    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  uploadImage(): Observable<string> {
    const response: IpcBodyInterface = this.ipc.sendSync(dsgIpcMessages.DSG_UploadImage);
    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  addSign(dsgId: number, sign: DSG_SignInputInterface): Observable<DSG_SignInterface> {
    const response: IpcBodyInterface = this.ipc.sendSync(dsgIpcMessages.DSG_AddSign, { queryParams: { dsgId, sign } });
    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  getSign(id: number): Observable<DSG_SignInterface> {
    const response: IpcBodyInterface = this.ipc.sendSync(dsgIpcMessages.DSG_GetSign, { queryParams: { id } });
    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }

  updateSignById(id: number, signInput: DSG_SignInputInterface): Observable<DSG_SignInterface> {
    const response: IpcBodyInterface = this.ipc.sendSync(dsgIpcMessages.DSG_EditSign, { queryParams: { id, signInput } });
    if (response.status === 'ok') {
      return of(response.data);
    } else {
      throw new Error(response.data);
    }
  }
}
