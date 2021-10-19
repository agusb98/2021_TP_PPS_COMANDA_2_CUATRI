import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Models
import { Duenio } from 'src/app/models/duenio';

// Services
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  users$: Observable<Duenio[]>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.users$ = this.userService.getDuenios();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['user/login']);
  }
}
