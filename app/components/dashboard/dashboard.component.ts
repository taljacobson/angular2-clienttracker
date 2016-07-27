import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router , RouterConfig} from "@angular/router";

@Component({
    selector: 'dashboard',
    directives:[ ROUTER_DIRECTIVES ],
    template: `
    <div class="w3-container w3-pale-blue w3-leftbar w3-border-blue ">
      <h2>dashboard</h2>
      <p>welcome to the client tracker dashboard; click below to easlily manage tour clients and groups</p>
      <a routerLink="/client" class="w3-btn w3-light-grey">clients</a>
      <a routerLink="/group" class="w3-btn w3-light-grey">groups</a>
    </div>
    `
})
export class DashboardComponent { }
