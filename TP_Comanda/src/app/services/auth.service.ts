import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) { }

  async login(email: string, password: string) {
    return new Promise((res, rej) => {
      const user = this.afAuth.signInWithEmailAndPassword(email, password);
      const dataUser = this.userService.getByEmail(email);

      if (user && dataUser) {
        dataUser.subscribe(data => {
          if (data.estado != 'ACEPTADO') {
            rej(911);
          }
          else {
            localStorage.setItem('user', JSON.stringify(data));
            res(user);
          }
        });
      }
    });
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