import { Injectable } from '@angular/core';
import {
  GoogleAuthProvider, User, createUserWithEmailAndPassword,
  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut
} from 'firebase/auth';
import { Observable } from 'rxjs';
import { auth, firebaseConfigured } from './firebase.client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly configured = firebaseConfigured;
  readonly user$: Observable<User | null>;
  constructor() {
    this.user$ = new Observable<User | null>(subscriber => {
      if (!auth) { subscriber.next(null); subscriber.complete(); return; }
      return onAuthStateChanged(auth, user => subscriber.next(user), error => subscriber.error(error));
    });
  }
  async signIn(email: string, password: string): Promise<void> {
    if (!auth) throw new Error('Configure seu Firebase em src/environments/environment.ts.');
    await signInWithEmailAndPassword(auth, email.trim(), password);
  }
  async signUp(email: string, password: string): Promise<void> {
    if (!auth) throw new Error('Configure seu Firebase em src/environments/environment.ts.');
    await createUserWithEmailAndPassword(auth, email.trim(), password);
  }
  async signInWithGoogle(): Promise<void> {
    if (!auth) throw new Error('Configure seu Firebase em src/environments/environment.ts.');
    await signInWithPopup(auth, new GoogleAuthProvider());
  }
  async signOut(): Promise<void> { if (auth) await signOut(auth); }
  async currentUser(): Promise<User | null> {
    const currentAuth = auth;
    if (!currentAuth) return null;
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(currentAuth, user => { unsubscribe(); resolve(user); },
        error => { unsubscribe(); reject(error); });
    });
  }
}
