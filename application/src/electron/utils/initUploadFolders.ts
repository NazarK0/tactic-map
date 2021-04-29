import appFolders from "../constants/appResourceFolders";
import { app } from "electron";
import * as fs from 'fs';
import * as path from 'path';

export default () => {

  Object.values(appFolders).forEach((folder) => {
    const absolute = path.join(app.getPath('documents'), 'tactic-map', folder);
    if (!fs.existsSync(absolute)) {
      fs.mkdirSync(absolute, { recursive: true });
    }
  });
};
