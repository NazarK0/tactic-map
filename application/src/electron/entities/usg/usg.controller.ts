/* eslint-disable @typescript-eslint/no-misused-promises */
import { BrowserWindow, ipcMain } from "electron";

import IpcBodyInterface from "../../types/ipcBody.interface";
import VMenuItemInterface from '../../types/vmenuItem.interface';
import IpcMessage from "../../types/ipcMessage.enum";
import USG_Attributes from '../../types/usg.attributes';
import { Sequelize } from "sequelize/types";
import DSG_SignAttributes from "types/dsgSign.attributes";

export default function usgController(sequelize: Sequelize, window: BrowserWindow): void {
  ipcMain.on(IpcMessage.USG_Create, async (event, args) => {
    const { data } = args;
    let response: IpcBodyInterface;

    try {
      const usg: USG_Attributes = (await sequelize.models.UserSignGroup.create(data)) as unknown as USG_Attributes;

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

  ipcMain.on(IpcMessage.USG_Update, async (event, args) => {
    const { data, queryParams } = args;
    let response: IpcBodyInterface;

    try {
      const usg: USG_Attributes = (await sequelize.models.UserSignGroup.update(data, { where: { id: queryParams.id }})) as unknown as USG_Attributes;

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

  ipcMain.on(IpcMessage.USG_GetById, async (event, args) => {
    const { queryParams } = args;
    let response: IpcBodyInterface;

    try {
      const usg: USG_Attributes = (await sequelize.models.UserSignGroup.findByPk(queryParams.id, { raw: true })) as unknown as USG_Attributes;

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

  ipcMain.on(IpcMessage.USG_GetMenu, async (event) => {
    let response: IpcBodyInterface;

    try {
      const menu: VMenuItemInterface[] = (await sequelize.models.UserSignGroup.findAll({ raw: true, attributes: ['id', 'title'] })) as unknown as VMenuItemInterface[];

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

  ipcMain.on(IpcMessage.USG_GetList, async (event) => {
    let response: IpcBodyInterface;

    try {
      const list: USG_Attributes[] = (await sequelize.models.UserSignGroup.findAll({ raw: true })) as unknown as USG_Attributes[];

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

  ipcMain.on(IpcMessage.USG_DeleteById, async (event, args) => {
    const { queryParams } = args;
    let response: IpcBodyInterface;

    try {
      await sequelize.models.UserSignGroup.destroy({ where: { id: queryParams. id }})

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

  ipcMain.on(IpcMessage.USG_DeleteSignById, async (event, args) => {
    const { queryParams } = args;
    let response: IpcBodyInterface;

    try {
      const deleted = await sequelize.models.DsgSign.update({
        usgFK: null,
      }, {
        where: {
          id: queryParams.id
        }
      });
  
      const updatedList = (await sequelize.models.DsgSign.findAll({
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

  ipcMain.on(IpcMessage.USG_ToggleSignStatus, async (event, args) => {
    const { queryParams: { id, usgId } } = args;
    let response: IpcBodyInterface;

    try {
      const sign = await sequelize.models.DsgSign.findByPk(id,
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

  // ipcMain.on(IpcMessage.USG_UploadImage, async (event) => {
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

  ipcMain.on(IpcMessage.USG_AddSign, async (event, args) => {
    const { queryParams: { usgId, sign: signId } } = args;
    let response: IpcBodyInterface;

    try {
      const newSign = await sequelize.models.DsgSign.update({
        usgFK: usgId,
      }, {
        where: { id: signId },
        // include: { usg: true, dsg: true }
      });

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

  ipcMain.on(IpcMessage.USG_GetSign, async (event, args) => {
    const { queryParams: { id } } = args;
    let response: IpcBodyInterface;

    try {
      const sign = (await sequelize.models.DsgSign.findByPk(id)) as unknown as DSG_SignAttributes;

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

  // ipcMain.on(IpcMessage.USG_EditSign, async (event, args) => {
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