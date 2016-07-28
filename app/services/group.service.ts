import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Group } from "../components/group.model";

@Injectable()
export class GroupService {
  private groups;
  private group;
  private firebaseUrl: string;
  private fbRef: Firebase;
  private groupRef: Firebase;
  private clientRef: Firebase;

  constructor() {
    this.firebaseUrl = 'https://angular-2-client-tracker.firebaseio.com/';
    this.fbRef = new Firebase(this.firebaseUrl);
    this.groupRef = this.fbRef.child('groups');
    this.group = {};
  }

  addGroup(newGroup): void{
    this.groupRef.push({
      name: newGroup.name
    });
    return;
  }

  getGroups(): Observable<Group>{
    return Observable.create(observer => {
      let listener = this.groupRef.on('child_added', snapshot => {
        let data = snapshot.val();
        observer.next(new Group(
          snapshot.key(),
          data.name
        ));
      }, observer.error);
    })
  }

  getGroup(id){
    let editRef = new Firebase(this.firebaseUrl+'groups/'+id);
    var self = this;
    editRef.on("value", function(snapshot){
      self.group = {
        id: snapshot.key(),
        name: snapshot.val().name
      }
    })
    return self.group
  }

  editGroup(newGroup){
    let updateRef = new Firebase(this.firebaseUrl+'groups/'+newGroup.id);
    updateRef.update( {
        name: newGroup.name
      }
    )
    return
  }

  deleteGroup(id){
    let delRef = new Firebase(this.firebaseUrl + "groups/" + id )
    delRef.remove();
  }


}
