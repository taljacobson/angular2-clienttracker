import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from "../client.model";
import { ClientService } from "../../services/client.service";

import { Subscription} from "rxjs/subscription";
import { Router, ROUTER_DIRECTIVES, RouterConfig, Params } from "@angular/router";


@Component({
    selector: 'client-list',
    directives: [ ROUTER_DIRECTIVES ],
    template: `
    <h2> clients</h2>
    <div *ngIf="clients">
      <table class="w3-table w3-bordered w3-striped">
        <tr>
          <th>Name</th>
          <th>email</th>
          <th>phone</th>
          <th></th>
        </tr>
        <tr *ngFor="let client of clients ">
          <td><a href="#" routerLink="details/{{client.id }} ">{{ client.firstName}} {{client.lastName}}</a></td>
          <td>{{client.email}}</td>
          <td>{{client.phone}}</td>
          <td>
             <a (click)="goToClientEdit(client.id)" class="w3-btn w3-green">edit</a>
              <button (click)="deleteClient(client.id)" class="w3-btn w3-red">delete</button>
           </td>
        </tr>
      </table>
    </div>
    `
})
export class ClientListComponent implements OnInit, OnDestroy {

  public clients: Client[] = [];
  public subscription;

  constructor(private _ClientService: ClientService, private router:Router ){

  }

  goToClientEdit(clientid){
    this.router.navigate(['client/edit', clientid]);
  }

  deleteClient(clientid){

  }

  ngOnInit(){
    this.subscription = this._ClientService.getClients().subscribe(client => {
      this.clients.push(client)
    })
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }
}
