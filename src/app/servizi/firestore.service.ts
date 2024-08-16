import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Percorso } from '../models/Percorso';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  percorsi = collection(this.firestore, 'percorsi');
  
  getPercorsi(): Observable<Percorso[]> {
    return collectionData(this.percorsi, {
      idField: 'id'
    }) as Observable<Percorso[]>;
  }
} 
