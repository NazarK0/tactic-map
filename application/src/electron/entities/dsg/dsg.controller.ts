/* eslint-disable @typescript-eslint/no-misused-promises */
import appFolders from "../../constants/appResourceFolders";
import { App, BrowserWindow, dialog, ipcMain } from "electron";
import * as fs from 'fs';
import * as path from 'path';
import ModelsInterface from "types/models.interface";

import dsgIpcMessages from "./dsg.ipcMessages";
import DSG_SignAttributes from "types/tool.attributes";

export default function dsgController(models: ModelsInterface, window: BrowserWindow, app: App): void {
  // if (!sequelize) {
  //   throw new Error('No database instanse in controller')
  // }

  ipcMain.on(dsgIpcMessages.DSG_Create, async (event, args) => {
    const { data } = args;
    let response;

    try {
      const dsg = await models.defaultSignGroup.create(data);
      // const dsg = await dsgCreate(data);
      console.log(dsg, 'DSG CREATE CTR')

      response = {
        data: dsg,
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

  ipcMain.on(dsgIpcMessages.DSG_Update, async (event, args) => {
    const { data, queryParams } = args;
    let response;

    try {
      const dsg = await models.defaultSignGroup.update(data, { where: { id: queryParams.id }});
      console.log(dsg, 'DSG UPDATE CTR')

      response = {
        data: dsg,
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

  ipcMain.on(dsgIpcMessages.DSG_GetById, async (event, args) => {
    const { queryParams } = args;
    let response;

    try {
      const dsg: any = (await models.defaultSignGroup.findByPk(queryParams.id, { include: 'Tools' })).toJSON();
      console.log(dsg, 'DSG GET BY ID CTR')

      response = {
        data: dsg ? {
          id: dsg.id,
          title: dsg.title,
          description: dsg.description,
          signs: dsg.DsgSigns.map(s => ({...s, sign: path.join(app.getPath('documents'), s.sign )}))
        } : null,
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

  ipcMain.on(dsgIpcMessages.DSG_GetMenu, async (event) => {
    let response;

    try {
      const menu = await models.defaultSignGroup.findAll({ raw: true, attributes: ['id', 'title'] });
      // const menu: VMenuItemInterface[] = await dsgGetMenuList();
      console.log(menu, 'DSG MENU CTR')

      response = {
        data: menu,
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

  ipcMain.on(dsgIpcMessages.DSG_DeleteById, async (event, args) => {
    const { queryParams } = args;
    let response;

    try {
      await models.defaultSignGroup.destroy({ where: { id: queryParams. id }})
      console.log('DSG DELETE CTR')

      response = {
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

  ipcMain.on(dsgIpcMessages.DSG_DeleteSignById, async (event, args) => {
    const { queryParams } = args;
    let response;

    try {
      const groupId: any = (await models.tool.findByPk(queryParams.id)).toJSON();
      await models.tool.destroy({ where: { id: queryParams.id } });
      const updatedList = await models.tool.findAll({ where: { dsgFK: groupId.dsgFK }, raw: true });
      console.log('DSG DELETE SIGN CTR')
      console.table(updatedList);

      response = {
        status: 'ok',
        data: updatedList,
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

  ipcMain.on(dsgIpcMessages.DSG_UploadImage, async (event) => {
    let response;

    try {

      const file = await dialog.showOpenDialog(window, {
        title: '?????????????????????? ?????????? ?? ???????????????????? ??????????',
        properties: ['openFile'],
        filters: [{ name: '????????????????????', extensions: ['png', 'svg']}]
      });
    
      const sign = file.canceled ? null : file.filePaths[0];
      // const sign: DSG_SignInterface = await uploadImage(window);

      response = {
        status: 'ok',
        data: sign,
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

  ipcMain.on(dsgIpcMessages.DSG_AddSign, async (event, args) => {
    const { queryParams: { dsgId, sign } } = args;
    let response;

    const imgOriginalPath = sign.sign;
    const { base } = path.parse(imgOriginalPath);
    const newRelativePath = path.join('tactic-map', appFolders.dsgSigns, base);
    const resultPath = path.join(app.getPath('documents'), newRelativePath);

    fs.copyFileSync(imgOriginalPath, resultPath);

    try {
      const newSign = await models.tool.create({
          dsgFK: dsgId,
          ...sign,
          sign: newRelativePath
      })

      response = {
        status: 'ok',
        data: newSign
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

  ipcMain.on(dsgIpcMessages.DSG_GetSign, async (event, args) => {
    const { queryParams: { id } } = args;
    let response;

    try {
      const sign: any = (await models.tool.findByPk(id)).toJSON();
      console.log('GET DSG SIGN CTR', sign)

      response = {
        status: 'ok',
        data: {...sign, sign: path.join(app.getPath('documents'), sign.sign )}
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

  ipcMain.on(dsgIpcMessages.DSG_EditSign, async (event, args) => {
    const { queryParams: { id, signInput } } = args;
    let response;

    try {
      const updatedSign = await models.tool.update(signInput, {
        where: { id }
      });

      console.log('UPDATE DSG SIGN CTR', updatedSign)
      response = {
        status: 'ok',
        data: updatedSign
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