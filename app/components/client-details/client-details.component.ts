import { Component , OnInit} from '@angular/core';
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
          <h2>{{client.firstName}} {{client.lastName}} <a [routerLink]="['client/edit', client.id]" class="w3-btn light-grey w3-tiny">edit</a></h2>
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
export class ClientDetailsComponent implements OnInit {
  private id;
  private client;

  constructor(
    private route: ActivatedRoute,
    private _clientService: ClientService,
    private router: Router
  ){
      // this.id = route.get('id');
      // this.client = this._clientService.getClients(this.id)
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this._clientService
          .getClient(id)
          .subscribe(client => this.client = client);
      });
  }

}
