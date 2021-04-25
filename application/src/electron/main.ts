import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import userController from './entities/user/user.controller';
import DbConnect from './dbConnect'
import usgController from './entities/usg/usg.controller';
import dsgController from './entities/dsg/dsg.controller';
import topToolbarController from './entities/topToolbar/topToolbar.controller';

let win: BrowserWindow | null;
const db = new DbConnect(path.join(app.getPath("documents"),'tactic-map', 'database.sqlite'));

db.testConnection();
// db.initModels();
// db.syncModels();

app.on('ready', createWindow)

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600, webPreferences: {
        worldSafeExecuteJavaScript: true,
        nodeIntegration: true,
        allowRunningInsecureContent: true,
        contextIsolation: false, 
        enableRemoteModule : false 
      }, });
      
    win.loadFile(path.join(__dirname, `/../../dist/renderer/index.html`));

   ininializeControllers(db, win);

    win.on('closed', () => {
      win = null;
      db.disconnect();
    })
}

function ininializeControllers(db: DbConnect, win: BrowserWindow) {
  console.log(db.instance, 'INSTANCE')
  userController(db.instance, win);
  usgController(db.instance, win);
  dsgController(db.instance, win);
  topToolbarController(win);
}