import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user;

  //  El orden de los links coincide con casosdeuso.jpg
  public links = [

    //  Duenio
    { img: 'assets/images/duenio-super.png', url: 'user/register/duenio', profile: 'DUENIO', title: 'Agregar Dueño/Supervisor' },
    { img: 'assets/images/table.png', url: 'mesa/alta', profile: 'DUENIO', title: 'Alta Mesa' },
    { img: 'assets/images/empleados.png', url: 'user/register/empleado', profile: 'DUENIO', title: 'Agregar Empleado' },
    { img: 'assets/images/empleados.png', url: 'user/list', profile: 'DUENIO', title: 'Listado Clientes' },
    { img: 'assets/images/table.png', url: 'mesa/list', profile: 'DUENIO', title: 'Listado de Mesas' },

    //  Supervisor
    { img: 'assets/images/empleados.png', url: 'user/register/duenio', profile: 'SUPERVISOR', title: 'Agregar Empleado' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'SUPERVISOR', title: 'Ver Encuestas' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'SUPERVISOR', title: 'Crear Encuesta' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'SUPERVISOR', title: 'Confirmar Reserva' },

    //  Cocinero
    { img: 'assets/images/product.png', url: 'producto/alta', profile: 'COCINERO', title: 'Agregar Plato/Bebida' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'COCINERO', title: 'Tomar Pedido' },
    
    //  Bartender
    { img: 'assets/images/product.png', url: 'producto/alta', profile: 'BARTENDER', title: 'Agregar Plato/Bebida' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'BARTENDER', title: 'Tomar Pedido' },

    //  Repartidor
    { img: 'assets/images/default.jpg', url: 'none', profile: 'REPARTIDOR', title: 'Mapa Ruta' },

    //  Mozo
    { img: 'assets/images/default.jpg', url: 'user/register/cliente', profile: 'MOZO', title: 'Agregar Cliente' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'MOZO', title: 'Ocupar Mesa' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'MOZO', title: 'Realizar Pedido' },

    //  Metre
    { img: 'assets/images/default.jpg', url: 'user/register/cliente', profile: 'METRE', title: 'Agregar Cliente' },

    //  Cliente
    { img: 'assets/images/default.jpg', url: 'mesa/request', profile: 'CLIENTE', title: 'Solicitar Mesa' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Ocupar Mesa' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Entrar al Local' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Realizar Pedido' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Juegos' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Pagar' },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = null;
    this.getUser();
  }

  getUser(){
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
