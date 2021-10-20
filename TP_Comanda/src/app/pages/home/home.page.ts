import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Models
import { Duenio } from 'src/app/models/duenio';

// Services
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
    private userService: UserService
  ) { }

  ngOnInit() {
    this.users$ = this.userService.getDuenios();
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
