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

  login(email: string, password: string) {
    return new Promise(res => {
      const user = this.afAuth.signInWithEmailAndPassword(email, password);
      if (user) {
        // Guarda los datos en localstorage de un usuario loggeado para laburar más rápido
        // Lo malo es que carece de seguridad..
        this.userService.getByEmail(email).subscribe(data => {
          localStorage.setItem('user', JSON.stringify(data));
          res(user);
        });
      }
      return;
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