import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { DisserviziCollection } from '../models/DisserviziCollection';

@Injectable({
  providedIn: 'root'
})
export class DisserviziService {

  constructor(private firestore: Firestore) { }

  disservizi = collection(this.firestore, 'disservizi');

  getDisservizi(): Observable<DisserviziCollection[]> {
    return collectionData(this.disservizi, {
      idField: 'id'
    }) as Observable<DisserviziCollection[]>;
  }

  updateDisservizio(docId: string, disservizio: DisserviziCollection): Observable<any> {
    const docRef = doc(this.disservizi, docId);
    const promise = setDoc(docRef, disservizio);
    return from(promise);
  }
}
