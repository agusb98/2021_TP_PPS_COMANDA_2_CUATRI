import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastrService } from 'ngx-toastr';
import { WaitListService } from 'src/app/services/wait.service';
import { WaitList } from '../../models/waitList';
import * as $ from "jquery";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user;
  waitList;

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
    { img: 'assets/images/default.jpg', url: 'wait/list', profile: 'METRE', title: 'Agregar Cliente' },
    { img: 'assets/images/encuesta.png', url: 'encuesta/empleado', profile: 'METRE', title: 'Encuesta' },

    //  Cliente
    { img: 'assets/images/default.jpg', url: 'mesa/request', profile: 'CLIENTE', title: 'Solicitar Mesa' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Ocupar Mesa' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Entrar al Local' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Realizar Pedido' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Juegos' },
    { img: 'assets/images/default.jpg', url: 'none', profile: 'CLIENTE', title: 'Pagar' },
    { img: 'assets/images/encuesta.png', url: 'encuesta/cliente', profile: 'CLIENTE', title: 'Encuesta' },
    { img: 'assets/images/grafico.jpg', url: 'encuesta/cliente/grafico', profile: 'CLIENTE', title: 'Grafico' },
  ];

  constructor(
    private router: Router,
    private vibration: Vibration,
    private toastr: ToastrService,
    private waitService: WaitListService,
  ) {
    $("#loadingContainer").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainer").attr("hidden", true);
    }, 2000);
  }

  ngOnInit() {
    this.user = null;
    this.getUser();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  addToWaitList() {
    this.waitService.getByUser(this.user.correo).subscribe(data => {
      if (data) {
        this.toastr.error('Aún no se le designó una mesa, por favor aguarde', 'Lista de espera')
      }
      else { this.saveWaitList(); }
    });
  }

  private saveWaitList() {
    const m = this.createModelWait();

    try {
      this.waitService.createOne(m);
      this.vibration.vibrate([500]);
      this.toastr.success('Aguarde un instante, en breves se le asignará una mesa!', 'Lista de Espera');
    }
    catch (error) { this.toastr.error('Error al momento de ingresarlo en lista de espera', 'Lista de espera') }
  }

  private createModelWait() {
    let m: WaitList = {
      id: '',
      estado: 'PENDIENTE',
      correo: this.user.correo,
      date_created: new Date().getTime()
    }

    return m;
  }



  redirectTo(path: string) {
    //this.router.navigate([path]);

    $("#loadingContainer").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainer").attr("hidden", true);
      this.router.navigate([path]);
    }, 3000);
  }
}
