/* eslint-disable @typescript-eslint/no-misused-promises */
import appFolders from "../../constants/appResourceFolders";
import { App, BrowserWindow, dialog, ipcMain } from "electron";
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

import canvasIpcMessages from "./canvas.ipcMessages";

export default function canvasController(): void {
  // const readFile = util.promisify(fs.readFile);

  ipcMain.on(canvasIpcMessages.getToolExtraData, async (event, args) => {
    const { queryParams: { tool } } = args;
    let response;

    try {
      const extras = {};

      response = {
        data: extras,
        status: 'ok'
      };
    } catch (error) {
      response = {
        data: error,
        status: 'error'
      };
    } finally {
      event.returnValue = response;
    }
  });
}