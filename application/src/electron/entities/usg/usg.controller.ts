/* eslint-disable @typescript-eslint/no-misused-promises */
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from 'path';

import IpcBodyInterface from "../../types/ipcBody.interface";
import VMenuItemInterface from '../../types/vmenuItem.interface';
import USG_Attributes from '../../types/usg.attributes';
import DSG_SignAttributes from "types/dsgSign.attributes";
import ModelsInterface from "types/models.interface";
import usgIpcMessages from "./usg.ipcMessages";
import appFolders from "constants/appResourceFolders";

export default function usgController(models: ModelsInterface, window: BrowserWindow): void {
  ipcMain.on(usgIpcMessages.USG_Create, async (event, args) => {
    const { data } = args;
    let response: IpcBodyInterface;

    try {
      const usg: USG_Attributes = (await models.userSignGroup.create(data)) as unknown as USG_Attributes;
      console.log('CREATE USG CTR', usg)

      response = {
        data: usg,
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

  ipcMain.on(usgIpcMessages.USG_Update, async (event, args) => {
    const { data, queryParams } = args;
    let response: IpcBodyInterface;

    try {
      const usg: USG_Attributes = (await models.userSignGroup.update(data, { where: { id: queryParams.id }})) as unknown as USG_Attributes;
      console.log('UPDATE USG CTR', usg)

      response = {
        data: usg,
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

  ipcMain.on(usgIpcMessages.USG_GetById, async (event, args) => {
    const { queryParams } = args;
    let response: IpcBodyInterface;

    try {
      const usg: any = (await models.userSignGroup.findByPk(queryParams.id, { include: 'DsgSigns' })).toJSON();
      console.log('GET USG CTR', usg)

      response = {
        data: {
          id: usg.id,
          title: usg.title,
          description: usg.description,
          signs: usg.DsgSigns.map(s => ({...s, sign: path.join(app.getPath('documents'), s.sign )}))
        },
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

  ipcMain.on(usgIpcMessages.USG_GetMenu, async (event) => {
    let response: IpcBodyInterface;

    try {
      const menu: VMenuItemInterface[] = (await models.userSignGroup.findAll({ raw: true, attributes: ['id', 'title'] })) as unknown as VMenuItemInterface[];
      console.log('GET USG MENU CTR', menu)

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

  ipcMain.on(usgIpcMessages.USG_GetList, async (event) => {
    let response: IpcBodyInterface;

    try {
      // const list: USG_Attributes[] = [];
      // console.log(sequelize.models, 'MODELS')
      // const list: USG_Attributes[] = (await UserSignGroup.findAll({ raw: true })) as unknown as USG_Attributes[];
      const rawList: any = await models.userSignGroup.findAll({ include: 'DsgSigns' });
      const list: any = JSON.parse(JSON.stringify(rawList))
      console.log('USG LIST CTR', list)

      response = {
        data: list.map((group) => ({
          id: group.id,
          title: group.title,
          description: group.description,
          signs: group.DsgSigns.map(s => ({...s, sign: path.join(app.getPath('documents'), s.sign )}))
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

  ipcMain.on(usgIpcMessages.USG_DeleteById, async (event, args) => {
    const { queryParams } = args;
    let response: IpcBodyInterface;

    try {
      await models.userSignGroup.destroy({ where: { id: queryParams. id }})
      console.log('DELETE USG CTR')

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

  ipcMain.on(usgIpcMessages.USG_DeleteSignById, async (event, args) => {
    const { queryParams } = args;
    let response: IpcBodyInterface;

    try {
      const removing: any = await models.dsgSign.findByPk(queryParams.id, { raw: true });
      await models.dsgSign.update({
        usgFK: null,
      }, {
        where: {
          id: queryParams.id
        }
      });
  
      
      const updatedList = (await models.dsgSign.findAll({
        where: { usgFK: removing.usgFK },
        raw: true,
      }));

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

  ipcMain.on(usgIpcMessages.USG_ToggleSignStatus, async (event, args) => {
    const { queryParams: { id, usgId } } = args;
    let response: IpcBodyInterface;

    try {
      const sign: any = await models.dsgSign.findByPk(id,
        { raw: true }
      );

      console.log('TOGGLE SIGN CTR', sign);
  
      if (!sign.usgFK) {
        await models.dsgSign.update({ usgFK: usgId }, {
          where: { id }
        });
      } else if (sign.usgFK && sign.usgFK === usgId) {
        await models.dsgSign.update({ usgFK: null }, {
          where: { id }
        });
      }

      const updatedSign: any = await models.dsgSign.findByPk(id,
        { raw: true }
      );

      console.log('TOGGLE SIGN UPDATED CTR', sign);

      response = {
        status: 'ok',
        data: { ...updatedSign, sign: path.join(app.getPath('documents'), updatedSign.sign) },
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

  // ipcMain.on(usgIpcMessages.USG_UploadImage, async (event) => {
  //   let response: IpcBodyInterface;

  //   try {
  //     const sign = await uploadImage(window);

  //     response = {
  //       status: 'ok',
  //       data: sign,
  //     };
  //   } catch (error) {
  //     response = {
  //       data: error,
  //       status: 'error'
  //     };
  //   } finally {
  //     event.returnValue = response;
  //   }
  // });

  ipcMain.on(usgIpcMessages.USG_AddSign, async (event, args) => {
    const { queryParams: { usgId, sign: signId } } = args;
    let response: IpcBodyInterface;

    try {
      const newSign = null;
      // const newSign = await DsgSign.update({
      //   usgFK: usgId,
      // }, {
      //   where: { id: signId },
      //   // include: { usg: true, dsg: true }
      // });

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

  ipcMain.on(usgIpcMessages.USG_GetSign, async (event, args) => {
    const { queryParams: { id } } = args;
    let response: IpcBodyInterface;

    try {
      const sign = (await models.dsgSign.findByPk(id)) as unknown as DSG_SignAttributes;

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

  // ipcMain.on(usgIpcMessages.USG_EditSign, async (event, args) => {
  //   const { queryParams: { id, signInput } } = args;
  //   let response: IpcBodyInterface;

  //   try {
  //     const updatedSign = await usgEditSign(Number(id), signInput);

  //     response = {
  //       status: 'ok',
  //       data: updatedSign
  //     };
  //   } catch (error) {
  //     response = {
  //       data: error,
  //       status: 'error'
  //     };
  //   } finally {
  //     event.returnValue = response;
  //   }
  // });
}