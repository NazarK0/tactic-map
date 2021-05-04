/* eslint-disable @typescript-eslint/no-misused-promises */
import { BrowserWindow, dialog, ipcMain } from "electron";
import imageSize from 'image-size';

import IpcBodyInterface from "../../types/ipcBody.interface";
import topToolbarIpcMessages from "./topToolbar.ipcMessages";

export default function topToolbarController(window: BrowserWindow): void {

  ipcMain.on(topToolbarIpcMessages.uploadMap, async (event) => {
    let response: IpcBodyInterface;

    try {
      const file = await dialog.showOpenDialog(window, {
        title: 'Завантажити карту',
        properties: ['openFile'],
        filters: [{ name: 'Зображення', extensions: ['jpg', 'png', 'svg']}]
      });
    
      const mapUrl = file.canceled ? null : file.filePaths[0];
      let data = null;
      if (mapUrl) {
        const dimensions = imageSize(mapUrl);
        data = {
          url: mapUrl,
          width: dimensions.width,
          height: dimensions.height
        }
      }

      response = {
        status: 'ok',
        data,
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