import { Component ,OnInit , OnDestroy} from '@angular/core';
import { Control , ControlGroup, FormBuilder, Validators, FORM_DIRECTIVES } from "@angular/common";
import { Router ,RouterConfig, ROUTER_DIRECTIVES } from "@angular/router";
import { Subscription} from "rxjs/subscription";

import { ClientService } from "../../services/client.service";

@Component({
    selector: 'add-client',
    directives: [ ROUTER_DIRECTIVES ],
    template: `
    <div class="w3-card-4">
      <div class="w3-container w3-blue">
        <h2>add client</h2>
      </div>
      <form [ngFormModel]='form' class="w3-padding-16">
        <div class="form-group">
          <label class="w3-label">first name</label>
          <input type="text" class="w3-input" [(ngModel)]="newClient.firstName" ngControl="firstName">
        </div>
        <div class="form-group">
          <label class="w3-label">last name</label>
          <input type="text" class="w3-input" [(ngModel)]="newClient.lastName" >
        </div>
         <div class="form-group">
          <label class="w3-label">group</label>
          <select class="w3-select" [(ngModel)]="newClient.group">
            <option value="" disabled selected>choose your option</option>
            <option *ngFor="let group of groups" [value]=group.name>{{group.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="w3-label">Email</label>
          <input type="text" class="w3-input" [(ngModel)]="newClient.email" ngControl="email">
        </div>
        <div class="form-group">
          <label class="w3-label">phone</label>
          <input type="text" class="w3-input" [(ngModel)]="newClient.phone" >
        </div>
        <div class="form-group">
          <label class="w3-label">address</label>
          <input type="text" class="w3-input" [(ngModel)]="newClient.address" >
        </div>
        <div class="form-group">
          <label class="w3-label">city</label>
          <input type="text" class="w3-input" [(ngModel)]="newClient.city" >
        </div>
        <div class="form-group">
          <label class="w3-label">country</label>
          <input type="text" class="w3-input" [(ngModel)]="newClient.country">
        </div>
        <div class="form-group">
          <label class="w3-label">zip code</label>
          <input type="text" class="w3-input" [(ngModel)]="newClient.zipCode" >
        </div>
        <div class="form-group">
          <button (click)="addClient()" [disabled]="!form.valid" class="w3-btn w3-light-grey">submit data</button>
        </div>
      </form>
    </div>
      `
})
export class AddClientComponent implements OnInit, OnDestroy {
  form:ControlGroup;
  firstName:Control;
  email:Control
  public newClient: any = {};
  groups;
  public subscription;

  constructor(
      private _clientService:ClientService,
      private builder: FormBuilder,
      private router:Router) {
    this.firstName = new Control(
      "" ,
      Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
    );
    this.email = new Control(
      Validators.compose([
        Validators.required
      ])
    );

    this.form = builder.group({
      firstName: this.firstName,
      email: this.email
    });

    this.groups = []
  }

  addClient(){
    this._clientService.addClient(this.newClient);
    this.newClient = {};
    this.router.navigate(['/client']);
  }

  ngOnInit(){
    this.subscription = this._clientService.getGroups().subscribe( group =>{
      this.groups.push(group);
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
