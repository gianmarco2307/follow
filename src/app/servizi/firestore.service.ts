import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  percorsi = collection(this.firestore, 'percorsi');
  
  getPercorsi(): Observable<any> {
    return collectionData(this.percorsi, {
      idField: 'id'
    })
  }
} 
