import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private afAuth: AngularFireAuth,) { }

  async login(email: string, password: string) {
    try { return await this.afAuth.signInWithEmailAndPassword(email, password); }
    catch (error) { console.log('jeje, te olvidate pass'); }
  }

  async register(email: string, password: string) {
    try { return await this.afAuth.createUserWithEmailAndPassword(email, password); }
    catch (error) { }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.setItem('user', '');
    }
    catch (error) { }
  }
}