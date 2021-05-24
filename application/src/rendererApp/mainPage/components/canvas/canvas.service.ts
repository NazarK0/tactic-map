import { Injectable } from "@angular/core";
import { IpcRenderer } from "electron";
import { Observable, of } from "rxjs";
import IpcBodyInterface from "../../../shared/types/ipcBody.interface";
import canvasIpcMessages from "./canvas.ipcMessages";

@Injectable()
export default class CanvasService {
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
    getSvgSource(url: string): string {
      const response: IpcBodyInterface = this.ipc.sendSync(canvasIpcMessages.getSvgSource, { queryParams: { url } });
    if (response.status === 'ok') {
      return response.data;
    } else {
      throw new Error(response.data);
    }
        // return '<g><rect width="100" height="50" fill="#f36"></rect></g>';
    }
}