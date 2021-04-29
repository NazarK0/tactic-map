/* eslint-disable @typescript-eslint/no-misused-promises */
import { BrowserWindow, ipcMain } from "electron";

import IpcBodyInterface from "../../types/ipcBody.interface";
import VMenuItemInterface from '../../types/vmenuItem.interface';
import USG_Attributes from '../../types/usg.attributes';
import DSG_SignAttributes from "types/dsgSign.attributes";
import ModelsInterface from "types/models.interface";
import usgIpcMessages from "./usg.ipcMessages";

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
      const usg: USG_Attributes = (await models.userSignGroup.findByPk(queryParams.id, { raw: true })) as unknown as USG_Attributes;
      console.log('GET USG CTR', usg)

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
      const list: USG_Attributes[] = [];
      // console.log(sequelize.models, 'MODELS')
      // const list: USG_Attributes[] = (await UserSignGroup.findAll({ raw: true })) as unknown as USG_Attributes[];
      const test = await models.userSignGroup.findAll({ raw: true });
      console.log(test, 'test');
      console.log('USG LIST CTR', list)

      response = {
        data: list,
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
      const deleted = null
      // const deleted = await DsgSign.update({
      //   usgFK: null,
      // }, {
      //   where: {
      //     id: queryParams.id
      //   }
      // });
  
      const updatedList = (await models.dsgSign.findAll({
        // where: { usgFK: deleted.usgFK },
        // include: { sequelize.models.User: true, dsg: true }
      })) as unknown as DSG_SignAttributes[];



      // const updatedList = await usgDeleteSignById(Number(queryParams.id));

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
      const sign = await models.dsgSign.findByPk(id,
        // {include: { usg: true }}
      );
  
      let updatedSign: DSG_SignAttributes = null;
  
      // if (!sign.usgFK) {
      //   updatedSign = (await sequelize.models.DsgSign.update({ usgFK: usgId }, {
      //     where: { id }
      //   })) as unknown as DSG_SignAttributes;
      // } else if (sign.usgFK && sign.usgFK === usgId) {
      //   updatedSign = (await sequelize.models.DsgSign.update({ usgFK: null }, {
      //     where: { id }
      //   })) as unknown as DSG_SignAttributes;
      // }

      response = {
        status: 'ok',
        data: updatedSign || sign,
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