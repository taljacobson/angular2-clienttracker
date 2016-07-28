import { Component, OnInit, OnDestroy } from '@angular/core';
import { Group } from "../group.model";
import { GroupService } from "../../services/group.service";

import { Subscription} from "rxjs/subscription";
import { Router, ROUTER_DIRECTIVES, RouterConfig, Params } from "@angular/router";


@Component({
  selector: 'group-list',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <h2> group list</h2>
    <div *ngIf="groups">
      <table class="w3-table w3-bordered w3-striped">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th></th>
        </tr>
        <tr *ngFor="let group of groups">
          <td>{{group.id}}</td>
          <td>{{ group.name}}</td>
          <td>
             <a (click)="goToGroupEdit(group.id)" class="w3-btn w3-green">edit</a>
              <button (click)="deleteGroup(group.id)" class="w3-btn w3-red">delete</button>
           </td>
        </tr>
      </table>
    </div>
    `
})
export class GroupListComponent implements OnInit, OnDestroy {
 public groups: Group[] = [];
 public subscription;

  constructor(
      private _groupService: GroupService,
      private router:Router ) {

  }

  goToGroupEdit(Groupid){
    this.router.navigate(['/group/edit', Groupid]);
  }

  deleteGroup(Groupid){
    this.groups.forEach((g, index) => {
      if(g.id == Groupid){
        this.groups.splice(index, 1)
      }
    })
    this._groupService.deleteGroup(Groupid)
  }

  ngOnInit(){
    this.subscription = this._groupService.getGroups().subscribe(group => {
      this.groups.push(group)
    });

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
