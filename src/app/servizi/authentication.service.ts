import { Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$ = user(this.firebaseAuth);
  currentUser = signal<User | null | undefined>(undefined);

  constructor(private firebaseAuth: Auth) { }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {})
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  isLogged(): boolean {
    return this.currentUser() !== null && this.currentUser() !== undefined;
  }
}
