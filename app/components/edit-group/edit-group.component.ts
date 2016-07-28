import { Component } from '@angular/core';
import { Control , ControlGroup , FormBuilder, Validators, FORM_DIRECTIVES } from "@angular/common";
import { Router, ROUTER_DIRECTIVES, RouterConfig, Params , ActivatedRoute} from "@angular/router";


import { Group } from "../group.model";
import { GroupService } from "../../services/group.service";

@Component({
    selector: 'edit-group',
    directives: [ FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
    template: `
    <div class="w3-card-4">
      <div class="w3-container w3-blue">
        <h2>edit group</h2>
      </div>
      <form [ngFormModel]='form' class="w3-padding-16">
        <div class="form-group">
          <label class="w3-label">group name</label>
          <input type="text" class="w3-input" [(ngModel)]="group.name" ngControl="name">
        </div>
        <div class="form-group">
          <button (click)="editGroup(group.id)" [disabled]="!form.valid" class="w3-btn w3-light-grey">submit data</button>
        </div>
      </form>
    </div>
    `
})
export class EditGroupComponent {
  form: ControlGroup;
  name: Control;
  public newGroup:any = {};
  private id;
  private group;
  constructor(
    private _groupService:GroupService,
    private builder:FormBuilder ,
    private router:Router,
    private route: ActivatedRoute )
    {
        this.id = this.route.snapshot.params['id'];
        this.group = this._groupService.getGroup(this.id)

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

  editGroup(groupid){
    this.newGroup = {
      id: groupid,
      name: this.group.name
    }
    this._groupService.editGroup(this.newGroup);
    this.newGroup = {};
    this.router.navigate(['/group']);
  }
}
