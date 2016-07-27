import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Client } from "../components/client.model";
import { Group } from "../components/group.model";

@Injectable()
export class ClientService {
  private clients;
  private client;
  private firebaseUrl: string;
  private fbRef: Firebase;
  private groupRef: Firebase;
  private clientRef: Firebase;

  constructor() {
    this.firebaseUrl = 'https://angular-2-client-tracker.firebaseio.com/';
    this.fbRef = new Firebase(this.firebaseUrl);
    this.clientRef = this.fbRef.child('client');
    this.client = {};
    this.groupRef = this.fbRef.child('groups')
  }

  addClient(newClient): void{
    this.clientRef.push({
      firstName: newClient.firstName,
      lastName: newClient.lastName,
      email: newClient.email,
      group: newClient.group,
      phone: newClient.phone,
      address: newClient.address,
      city: newClient.city,
      country: newClient.country,
      zipCode:newClient.zipCode
    });
    return;
  }
  getClients():Observable<Client>{
    return Observable.create(observer =>{
      let listener = this.clientRef.on('child_added', snapshot => {
        let data = snapshot.val();
        observer.next(new Client(
          snapshot.key(),
          data.firstName,
          data.lastName,
          data.email,
          data.group,
          data.phone,
          data.address,
          data.city,
          data.country,
          data.zipCode
        ));
      }, observer.error);
    })
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

  getClient(id){
    let editRef = new Firebase(this.firebaseUrl + 'clients/'+id);

    editRef.on('value', (snapshot) => {
      this.client = {
        id: snapshot.key(),
        firstName :snapshot.val().firstName,
        lastName :snapshot.val().lastName,
        group :snapshot.val().group,
        email :snapshot.val().email,
        phone :snapshot.val().phone,
        address :snapshot.val().address,
        city :snapshot.val().city,
        country :snapshot.val().country,
        zipCode :snapshot.val().zipCode
      }
    });
    return this.client;
  }
}
