import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouterConfig} from "@angular/router";

import { ClientListComponent  } from './components/client-list/client-list.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';

import { GroupListComponent } from './components/group-list/group-list.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { AddGroupComponent } from './components/add-group/add-group.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { GroupService } from "./services/group.service";
import { ClientService } from "./services/client.service";

@Component({
    selector: 'my-app',
    directives: [ ROUTER_DIRECTIVES ],
    providers:[ GroupService, ClientService ],
    template: `
    <nav>
      <ul class="w3-navbar w3-blue">
        <li><a routerLink="" class="homeLink" >home</a></li>
        <li><a routerLink="/client" routerLinkActive="active">client</a></li>
        <li><a routerLink="/group" routerLinkActive="active">group</a></li>
      </ul>
    </nav>
    <div class="container w3-padding">
      <div class="w3-row">
        <div class="w3-col m4 l3">
          <h1 class="logo"><span>client</span> tracker</h1>
          <ul class="w3-ul w3-border">
            <li><a routerLink="group/add" routerLinkActive="active">add group</a></li>
            <li><a routerLink="client/add" routerLinkActive="active">add client</a></li>
          </ul>
        </div>
        <div class="w3-col m8 l9 w3-padding-16">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
          `
})
export class AppComponent { }
