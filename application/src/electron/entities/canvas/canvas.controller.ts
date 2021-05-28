/* eslint-disable @typescript-eslint/no-misused-promises */
import appFolders from "../../constants/appResourceFolders";
import { App, BrowserWindow, dialog, ipcMain } from "electron";
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

import canvasIpcMessages from "./canvas.ipcMessages";
import IpcBodyInterface from "types/ipcBody.interface";
import ModelsInterface from "types/models.interface";

export default function canvasController(models: ModelsInterface, app: App): void {
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

   ipcMain.on(canvasIpcMessages.getToolGroups, async (event) => {
    let response: IpcBodyInterface;

    try {
      // const list: USG_Attributes[] = [];
      // console.log(sequelize.models, 'MODELS')
      // const list: USG_Attributes[] = (await UserSignGroup.findAll({ raw: true })) as unknown as USG_Attributes[];
      const rawList: any = await models.userSignGroup.findAll({ include: 'Tools' });
      const list: any = JSON.parse(JSON.stringify(rawList))
      console.log('USG LIST CTR', list)

      response = {
        data: list.map((group) => ({
          id: group.id,
          title: group.title,
          description: group.description,
          signs: group.DsgSigns.map(s => ({...s, url: path.join(app.getPath('documents'), s.sign ), with: 50, height: 60 }))
        })),
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