import { provideRouter, RouterConfig } from '@angular/router';

import { ClientListComponent  } from './components/client-list/client-list.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';

import { GroupListComponent } from './components/group-list/group-list.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { AddGroupComponent } from './components/add-group/add-group.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: RouterConfig = [
  {path: '', component: DashboardComponent},
  {path: 'client', component: ClientListComponent},
  {path: 'client/add', component: AddClientComponent},
  {path: 'client/details/:id', component: ClientDetailsComponent},
  {path: 'client/edit/:id', component: EditClientComponent},
  {path: 'group', component: GroupListComponent},
  {path: 'group/add', component: AddGroupComponent},
  {path: 'group/edit/:id', component: EditGroupComponent},
];

export const appRouterProviders = [
  provideRouter(routes)
];
