import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})

export class LogoutPage {

  constructor(
    private authService: AuthService,
    private router: Router,
    private vibration: Vibration,
    private toastr: ToastrService
  ) { }

  async onLogout() {
    try {
      await this.authService.logout();
      localStorage.removeItem('user');
      this.vibration.vibrate([500]);
      this.toastr.success('Sesión Cerrada con Exito', 'Salir');
      this.redirectTo('user/login');
    }
    catch (error) {
      this.vibration.vibrate([500, 500, 500]);
      this.toastr.error(error.message, 'Cerrar Sesión');
    }
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
