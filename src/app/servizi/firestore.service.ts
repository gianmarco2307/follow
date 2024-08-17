import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
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

  updatePercorso(docId: string, percorso: Percorso): Observable<any> {
    const docRef = doc(this.percorsi, docId);
    const promise = setDoc(docRef, percorso);
    return from(promise);
  }
} 
