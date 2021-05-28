import { Injectable } from "@angular/core";
import { IpcRenderer } from "electron";
import { Observable, of } from "rxjs";
import IpcBodyInterface from "../types/ipcBody.interface";
import canvasIpcMessages from "../../mainPage/components/canvas/canvas.ipcMessages";
import USG_Interface from "../types/usg.interface";
import usgIpcMessages from "src/rendererApp/userSignGroup/types/usg.ipcMessages";
import MilSignReqInterface from "src/rendererApp/mainPage/types/milSignReq.interface";
import ToolExtraDataInterface from "../types/toolExtraData.interface";
import SelectedToolType from "src/rendererApp/mainPage/types/selectedTool.type";

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
    addToolExtraData(tool: MilSignReqInterface): SelectedToolType {
      const response: IpcBodyInterface = this.ipc.sendSync(canvasIpcMessages.getToolExtraData, { queryParams: { tool } });
    if (response.status === 'ok') {
      return response.data;
    } else {
      throw new Error(response.data);
    }
        // return '<g><rect width="100" height="50" fill="#f36"></rect></g>';
    }

    getAllToolGroups(): Observable<USG_Interface[]> {
      const response: IpcBodyInterface = this.ipc.sendSync(usgIpcMessages.USG_GetList);
      console.log('list service', response.data)
  
      if (response.status === 'ok') {
        return of(response.data);
      } else {
        console.log('list service error', response)
        throw new Error(response.data);
      }
    }
}