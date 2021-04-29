import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import DbConnect from './dbConnect'
import usgController from './entities/usg/usg.controller';
import dsgController from './entities/dsg/dsg.controller';
import topToolbarController from './entities/topToolbar/topToolbar.controller';
import initUploadFolders from './utils/initUploadFolders';

let win: BrowserWindow | null;
const db = new DbConnect(path.join(app.getPath("documents"),'tactic-map', 'database.sqlite'));

db.testConnection();
initUploadFolders()

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
  usgController(db.models, win);
  dsgController(db.models, win, app);
  topToolbarController(win);
}