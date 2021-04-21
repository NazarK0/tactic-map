import { Routes } from '@angular/router';

import USG_PageComponent from './components/@usgPage/usgPage.component';
import USG_CreateComponent from './components/usgCreate/usgCreate.component';
import USG_EditComponent from './components/usgEdit/usgEdit.component';

const usgRoutes: Routes = [
  {
    path: 'settings/user-sign-group/create',
    component: USG_CreateComponent
  },
  {
    path: 'settings/user-sign-group/edit/:id',
    component: USG_EditComponent
  },
  {
    path: 'settings/user-sign-group',
    component: USG_PageComponent
  },
];

export default usgRoutes;