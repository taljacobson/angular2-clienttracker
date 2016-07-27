import { Component } from '@angular/core';
import { Control , ControlGroup, FormBuilder, Validators, FORM_DIRECTIVES } from "@angular/common";
import { Router ,RouterConfig, ROUTER_DIRECTIVES } from "@angular/router";

import { GroupService } from "../../services/group.service";
@Component({
    selector: 'add-group',
    directives: [ FORM_DIRECTIVES ],
    template: `
    <div class="w3-card-4">
      <div class="w3-container w3-blue">
        <h2>add group</h2>
      </div>
      <form [ngFormModel]='form' class="w3-padding-16">
        <div class="form-group">
          <label class="w3-label">group name</label>
          <input type="text" class="w3-input" [(ngModel)]="newGroup.name" ngControl="name">
        </div>
        <div class="form-group">
          <button (click)="addGroup()" [disabled]="!form.valid" class="w3-btn w3-light-grey">submit data</button>
        </div>
      </form>
    </div>
    `
})
export class AddGroupComponent {
  form: ControlGroup;

  name: Control;
  public newGroup:any  = {};
  constructor(private builder:FormBuilder ,private _groupService: GroupService, private router:Router ){
    this.name = new Control(
      "",
      Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
    );
    this.form = builder.group({
      name:this.name
    });
  }
  addGroup(){
    // this._groupService.addGroup(this.newGroup)
    this.newGroup = "";
    this.router.navigate(['/group']);
  }
 }
