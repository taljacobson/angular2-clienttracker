import { Component } from '@angular/core';
import { Client } from "../client.model";
import { ClientService } from "../../services/client.service";

import { Router, ROUTER_DIRECTIVES, RouterConfig, Params , ActivatedRoute } from "@angular/router";



@Component({
    selector: 'client-details',
    directives: [ ROUTER_DIRECTIVES ],
    template: `
    <div class="w3-row">
      <ul class="w3-ul w3-border">
        <li>
          <h2>{{client.firstName}} {{client.lastName}} <a (click)=goToEdit(client.id) [routerLink]="['/client/edit', client.id ]" class="w3-btn light-grey w3-tiny">edit</a></h2>
        </li>
        <li>{{ client.group }}</li>
        <li>{{ client.email }}</li>
        <li>{{ client.phone }}</li>
        <li>{{ client.address }}</li>
        <li>{{ client.city }}</li>
        <li>{{ client.country }}</li>
        <li>{{ client.zipCode }}</li>
      </ul>
    </div>
    `
})
export class ClientDetailsComponent  {
  private id;
  private client;

  constructor(
    private route: ActivatedRoute,
    private _clientService: ClientService,
    private router: Router
  ){
    this.id = this.route.snapshot.params['id']
    console.log(this.id)
    this.client = this._clientService.getClient(this.id)
    console.log(this.client)

  }

  goToEdit(id){
    console.log(id);
  }



}
