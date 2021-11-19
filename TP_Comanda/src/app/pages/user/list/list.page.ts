import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  users$: Observable<any>;

  profileSelected;

  profiles = [
    { val: 'Clientes', img: 'assets/images/default.png' },
    { val: 'Duenios', img: 'assets/images/default.png' },
    { val: 'Empleados', img: 'assets/images/default.png' },
    { val: 'Supervisores', img: 'assets/images/default.png' },
  ]

  status = [
    { val: 'ACEPTADO' },
    { val: 'PENDIENTE' },
    { val: 'RECHAZADO' }
  ]

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.profileSelected = this.profiles[0];
    this.getUsers(this.profileSelected.val);
  }

  setFilter(p) {
    this.profileSelected = p;
    this.getUsers(p.val);
  }

  getUsers(filter: string) {
    switch (filter) {
      case 'Empleados':
        this.users$ = this.userService.getEmpleados();
        break;

      case 'Duenios':
        this.users$ = this.userService.getDuenios();
        break;

      case 'Supervisores':
        this.users$ = this.userService.getSupervisores();
        break;

      default:
        this.users$ = this.userService.getClientes();
        break;
    }
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  setStatus($event, user) {
    user.estado = $event.target.value;
    this.userService.setOne(user);
  }

}
