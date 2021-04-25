/* eslint-disable @typescript-eslint/no-misused-promises */
import { BrowserWindow, dialog, ipcMain } from "electron";

import VMenuItemInterface from '../../types/vmenuItem.interface';
import { Sequelize } from "sequelize/types";
import DSG_Interface from "types/dsg.attributes";
import DSG_SignInterface from "types/dsgSign.attributes";
import dsgIpcMessages from "./dsg.ipcMessages";
import IpcBodyInterface from "../../types/ipcBody.interface";

export default function dsgController(sequelize: Sequelize, window: BrowserWindow): void {
  if (!sequelize) {
    throw new Error('No database instanse in controller')
  }

  ipcMain.on(dsgIpcMessages.DSG_Create, async (event, args) => {
    const { data } = args;
    let response: IpcBodyInterface;

    try {
      const dsg: DSG_Interface = (await sequelize.models.DefaultSignGroup.create(data)) as unknown as DSG_Interface;
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
    let response: IpcBodyInterface;

    try {
      const dsg: DSG_Interface = (await sequelize.models.DefaultSignGroup.update(data, { where: { id: queryParams.id }})) as unknown as DSG_Interface;
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
    let response: IpcBodyInterface;

    try {
      const dsg: DSG_Interface = (await sequelize.models.DefaultSignGroup.findByPk(queryParams.id, { raw: true })) as unknown as DSG_Interface;
      console.log(dsg, 'DSG GET BY ID CTR')

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

  ipcMain.on(dsgIpcMessages.DSG_GetMenu, async (event) => {
    let response: IpcBodyInterface;

    try {
      const menu: VMenuItemInterface[] = (await sequelize.models.DefaultSignGroup.findAll({ raw: true, attributes: ['id', 'title'] })) as unknown as VMenuItemInterface[];
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
    let response: IpcBodyInterface;

    try {
      await sequelize.models.DefaultSignGroup.destroy({ where: { id: queryParams. id }})
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
    let response: IpcBodyInterface;

    try {
      await sequelize.models.DsgSign.destroy({ where: { id: queryParams.id } })
      const updatedList: DSG_SignInterface[] = (await sequelize.models.DsgSign.findAll()) as unknown as DSG_SignInterface[];
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
    let response: IpcBodyInterface;

    try {

      const file = await dialog.showOpenDialog(window, {
        title: 'Завантажити знаки в стандартну групу',
        properties: ['openFile'],
        filters: [{ name: 'Зображення', extensions: ['png', 'svg']}]
      });
    
      const sign: string = file.canceled ? null : file.filePaths[0];
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
    let response: IpcBodyInterface;

    try {
      const newSign: DSG_SignInterface = (await sequelize.models.DsgSign.create({

          dsgFK: dsgId,
          ...sign,

      })) as unknown as DSG_SignInterface;
      console.log('CREATE DSG SIGN CTR', newSign)

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
    let response: IpcBodyInterface;

    try {
      const sign: DSG_SignInterface = (await sequelize.models.DsgSign.findByPk(id)) as unknown as DSG_SignInterface;
      console.log('GET DSG SIGN CTR', sign)

      response = {
        status: 'ok',
        data: sign
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
    let response: IpcBodyInterface;

    try {
      const updatedSign = await await sequelize.models.DsgSign.update(signInput, {
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