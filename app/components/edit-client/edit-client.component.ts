import { Component ,OnInit , OnDestroy} from '@angular/core';
import { Control , ControlGroup, FormBuilder, Validators, FORM_DIRECTIVES } from "@angular/common";
import { Router ,RouterConfig, ROUTER_DIRECTIVES , ActivatedRoute  } from "@angular/router";
import { Subscription } from "rxjs/subscription";
import { Client } from "../client.model";
import { ClientService } from "../../services/client.service";



@Component({
    selector: 'edit-client',
    directives: [FORM_DIRECTIVES , ROUTER_DIRECTIVES ],
    template: `
    <div class="w3-card-4">
      <div class="w3-container w3-blue">
        <h2>edit client</h2>
      </div>
      <form [ngFormModel]='form' class="w3-padding-16">
        <div class="form-group">
          <label class="w3-label">first name</label>
          <input type="text" class="w3-input" [(ngModel)]="client.firstName" ngControl="firstName">
        </div>
        <div class="form-group">
          <label class="w3-label">last name</label>
          <input type="text" class="w3-input" [(ngModel)]="client.lastName" >
        </div>
         <div class="form-group">
          <label class="w3-label">group</label>
          <select class="w3-select" [(ngModel)]="client.group">
            <option value="" disabled selected>choose your option</option>
            <option *ngFor="let group of groups" [value]=group.name>{{group.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="w3-label">Email</label>
          <input type="text" class="w3-input" [(ngModel)]="client.email" ngControl="email">
        </div>
        <div class="form-group">
          <label class="w3-label">phone</label>
          <input type="text" class="w3-input" [(ngModel)]="client.phone" >
        </div>
        <div class="form-group">
          <label class="w3-label">address</label>
          <input type="text" class="w3-input" [(ngModel)]="client.address" >
        </div>
        <div class="form-group">
          <label class="w3-label">city</label>
          <input type="text" class="w3-input" [(ngModel)]="client.city" >
        </div>
        <div class="form-group">
          <label class="w3-label">country</label>
          <input type="text" class="w3-input" [(ngModel)]="client.country">
        </div>
        <div class="form-group">
          <label class="w3-label">zip code</label>
          <input type="text" class="w3-input" [(ngModel)]="client.zipCode" >
        </div>
        <div class="form-group">
          <button (click)="EditClient(client.id)" [disabled]="!form.valid" class="w3-btn w3-light-grey">submit data</button>
        </div>
      </form>
    </div>
    `
})
export class EditClientComponent implements OnInit, OnDestroy {
  form: ControlGroup;
  firstName: Control;
  email:Control;
  public newClient:any = {};
  private id;
  private client;
  groups;
  public subscription;
  constructor(
    private router:Router,
    private route: ActivatedRoute ,
    private builder: FormBuilder,
    private _clientService:ClientService
  ){
    this.id = this.route.snapshot.params['id'];
    this.client = this._clientService.getClient(this.id)

    this.groups = []
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


  }

  EditClient(clientid){
    this.newClient = {
      id: clientid,
      firstName: this.client.firstName,
      lastName: this.client.lastName,
      group: this.client.group,
      email: this.client.email,
      phone: this.client.phone,
      address: this.client.address,
      city: this.client.city,
      country: this.client.country,
      zipCode: this.client.zipCode
    }
    this._clientService.editClient(this.newClient);
    this.newClient = {};
    this.router.navigate(['client']);
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
