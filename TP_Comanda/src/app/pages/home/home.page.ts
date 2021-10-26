import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user;

  public links = [
    { img: 'assets/images/default.jpg', url: 'user/register/duenio', profile: 'DUENIO', title: 'Registrar Dueño/Supervisor' },
    { img: 'assets/images/default.jpg', url: 'user/register/duenio', profile: 'SUPERVISOR', title: 'Registrar Mesa' },
    { img: 'assets/images/default.jpg', url: 'user/register/duenio', profile: 'DUENIO', title: 'Registrar Producto' },
    { img: 'assets/images/default.jpg', url: 'user/register/duenio', profile: 'DUENIO', title: 'Registrar Cliente' },
    { img: 'assets/images/default.jpg', url: 'user/register/duenio', profile: 'DUENIO', title: 'Registrar Empleado' },
    { img: 'assets/images/default.jpg', url: 'user/register/duenio', profile: 'DUENIO', title: 'Listar Dueño/Supervisor' },
    { img: 'assets/images/default.jpg', url: 'user/register/duenio', profile: 'DUENIO', title: 'Listar Mesas' },
    { img: 'assets/images/default.jpg', url: 'user/register/duenio', profile: 'DUENIO', title: 'Listar Productos' },
    { img: 'assets/images/default.jpg', url: 'user/register/duenio', profile: 'DUENIO', title: 'Listar Clientes' },
    { img: 'assets/images/default.jpg', url: 'user/register/duenio', profile: 'DUENIO', title: 'Listar Empleados' }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
