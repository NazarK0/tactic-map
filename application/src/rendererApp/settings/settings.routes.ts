import { Routes } from '@angular/router';

import SettingsComponent from './components/@settings/settings.component';
import SettingsGeneralComponent from './components/general/general.component';

const settingsRoutes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'settings/general',
    component: SettingsGeneralComponent
  },
];

export default settingsRoutes;