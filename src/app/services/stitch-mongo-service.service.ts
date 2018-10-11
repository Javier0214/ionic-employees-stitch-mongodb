import { Injectable } from '@angular/core';
import { Stitch, RemoteMongoClient, AnonymousCredential, StitchAppClient, RemoteMongoDatabase} from 'mongodb-stitch-browser-sdk';

@Injectable({
  providedIn: 'root'
})
export class StitchMongoServiceService {

  client: StitchAppClient;
  db: RemoteMongoDatabase;

  fakeEmployees = [
    {employee_name: 'Adrián Brito Pacheco', job_position: 'Project Manager', avatar: 'http://i.pravatar.cc/150?img=1',
     description: 'Description', owner_id: '5bbdcc24698a67d75541832d'},
    {employee_name: 'José Antonio Pérez Florencia', job_position: 'Software Developer', avatar: 'http://i.pravatar.cc/150?img=2',
    description: 'Description', owner_id: '5bbdcc24698a67d75541832d'}
  ];


  constructor() { }

  initializeAppCliente(appID: string) {
    this.client = Stitch.initializeDefaultAppClient(appID);
  }

  getServiceClient(dbName: string) {
    this.db = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(dbName);
  }

  find(collection: string) {
    return this.db.collection(collection).find({}, { limit: 100}).asArray();
  }

  insertMany(collection: string, docs: any) {
    console.log('docs', docs);
    this.db.collection(collection).insertMany(docs).then(results => {
      const { insertedIds } = results;
      console.log(insertedIds);
    }).catch(err => {
      console.error(err);
    });
  }

  populateFakeEmployees() {
    this.insertMany('employees', this.fakeEmployees);
  }
}
