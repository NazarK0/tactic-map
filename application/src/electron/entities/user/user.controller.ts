/* eslint-disable @typescript-eslint/no-misused-promises */
import { BrowserWindow, ipcMain } from "electron";
import { Sequelize } from "sequelize/types";
import IpcBodyInterface from "types/ipcBody.interface";
import UserInterface from "./user.interface";
// import { getUserAll, getUserById, userCreate } from "./user.queries";
import UserInputInterface from "./userInput.interface";

export default function userController(sequelize: Sequelize, window: BrowserWindow): void {
  ipcMain.on('createUser', async (event, args) => {
    const { data } = args;
    let response: IpcBodyInterface;

    try {
      if (!data) {
        response = {
          data: 'No input data',
          status: 'error'
        };
      } else if (!sequelize) {
        response = {
          data: 'No database instanse in controller',
          status: 'error'
        };
      } else {
        const user: UserInterface = (await sequelize.models.User.create(data)) as unknown as UserInterface;
        response = {
          data: user,
          status: 'ok'
        };
      }
    } catch (error) {
      response = {
        data: error,
        status: 'error'
      };
    } finally {
      event.returnValue = response;
    }
  });

  ipcMain.on('getUserById', async (event, args) => {
    const {queryParams } = args;
    let response: IpcBodyInterface;

    try {
      if (!queryParams.id) {
        response = {
          data: 'No query param',
          status: 'error'
        };
      } else if (!sequelize) {
        response = {
          data: 'No database instanse in controller',
          status: 'error'
        };
      } else {
        const user: UserInterface = (await sequelize.models.User.findByPk(queryParams.id)) as unknown as UserInterface;
        response = {
          data: user,
          status: 'ok'
        };
      }
    } catch (error) {
      response = {
        data: error,
        status: 'error'
      };
    } finally {
      event.returnValue = response;
    }
  });

  ipcMain.on('getUserAll', async (event, args) => {
    let response: IpcBodyInterface;

    try {
      if (!sequelize) {
        response = {
          data: 'No database instanse in controller',
          status: 'error'
        };
      } else {
        const users: UserInterface[] = (await sequelize.models.User.findAll({ raw: true })) as unknown as UserInterface[];

        response = {
          data: users,
          status: 'ok'
        };
      }
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