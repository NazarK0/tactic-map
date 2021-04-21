import { Routes } from '@angular/router';

import DSG_PageComponent from './components/@dsgPage/dsgPage.component';
import DSG_AddSignComponent from './components/dsgAddSign/dsgAddSign.component';
import DSG_CreateComponent from './components/dsgCreate/dsgCreate.component';
import DSG_EditComponent from './components/dsgEdit/dsgEdit.component';
import DSG_EditSignComponent from './components/dsgEditSign/dsgEditSign.component';

const dsgRoutes: Routes = [
  {
    path: 'settings/default-sign-group/create',
    component: DSG_CreateComponent,
  },
  {
    path: 'settings/default-sign-group/edit/:id',
    component: DSG_EditComponent
  },
  {
    path: 'settings/default-sign-group',
    component: DSG_PageComponent
  },
  {
    path: 'settings/default-sign-group/:dsgId/add-sign',
    component: DSG_AddSignComponent
  },
  {
    path: 'settings/default-sign-group/:dsgId/edit-sign/:id',
    component: DSG_EditSignComponent
  },
];

export default dsgRoutes;