import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import userController from './entities/user/user.controller';
import DbConnect from './dbConnect'

let win: BrowserWindow | null;
const db = new DbConnect(path.join(app.getPath("documents"),'tactic-map', 'database.sqlite'));

db.testConnection();
db.initModels();
db.syncModels();

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

    userController(db.instance, win);

    win.on('closed', () => {
      win = null;
      db.disconnect();
    })
}