import { Routes } from '@angular/router';

import AddSignsPageComponent from './components/@addSignsPage/addSignsPage.component';

const uasRoutes: Routes = [
  {
    path: 'settings/user-sign-group/:usgId/add-signs',
    component: AddSignsPageComponent
  },
];

export default uasRoutes;