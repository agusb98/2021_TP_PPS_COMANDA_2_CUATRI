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

    //  Supervisor
    { img: 'assets/images/empleados.png', url: 'user/register/duenio', profile: 'SUPERVISOR', title: 'Agregar Empleado' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'SUPERVISOR', title: 'Ver Encuestas' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'SUPERVISOR', title: 'Crear Encuesta' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'SUPERVISOR', title: 'Confirmar Reserva' },

    //  Cocinero
    { img: 'assets/images/product.png', url: 'producto/alta', profile: 'COCINERO', title: 'Agregar Plato/Bebida' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'COCINERO', title: 'Tomar Pedido' },
    { img: 'assets/images/encuesta.png', url: 'encuesta/empleado', profile: 'COCINERO', title: 'Encuesta' },
    
    //  Bartender
    { img: 'assets/images/product.png', url: 'producto/alta', profile: 'BARTENDER', title: 'Agregar Plato/Bebida' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'BARTENDER', title: 'Tomar Pedido' },
    { img: 'assets/images/encuesta.png', url: 'encuesta/empleado', profile: 'BARTENDER', title: 'Encuesta' },

    //  Repartidor
    { img: 'assets/images/default.jpg', url: 'none', profile: 'REPARTIDOR', title: 'Mapa Ruta' },
    { img: 'assets/images/encuesta.png', url: 'encuesta/empleado', profile: 'REPARTIDOR', title: 'Encuesta' },

    //  Mozo
    { img: 'assets/images/default.jpg', url: 'user/register/cliente', profile: 'MOZO', title: 'Agregar Cliente' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'MOZO', title: 'Ocupar Mesa' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'MOZO', title: 'Realizar Pedido' },
    { img: 'assets/images/encuesta.png', url: 'encuesta/empleado', profile: 'MOZO', title: 'Encuesta' },

    //  Metre
    { img: 'assets/images/default.jpg', url: 'user/register/cliente', profile: 'METRE', title: 'Agregar Cliente' },
    { img: 'assets/images/encuesta.png', url: 'encuesta/empleado', profile: 'METRE', title: 'Encuesta' },

    //  Cliente
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Ocupar Mesa' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Entrar al Local' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Realizar Pedido' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Juegos' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Pagar' },
    { img: 'assets/images/encuesta.png', url: 'encuesta/cliente', profile: 'CLIENTE', title: 'Encuesta' },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
