import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from 'src/app/services/pedido.service';
import { WaitListService } from 'src/app/services/wait.service';

import { WaitList } from 'src/app/models/waitList';
import { Pedido } from 'src/app/models/pedido';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html'
})

export class ScannerComponent implements OnInit {

  public user;
  public hasWait$: Observable<any>;
  public hasRequest$: Observable<any>;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private waitService: WaitListService,
    private requestService: PedidoService,
  ) { }

  ngOnInit() {
    this.user = null;
    this.getUser();

    this.checkWait();
    this.checkRequest();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private checkWait() {
    this.hasWait$ = this.waitService.getLastByUser(this.user.correo);
  }

  private checkRequest() {
    this.hasRequest$ = this.requestService.getLastByUser(this.user.correo);
  }

  async scannQR() {

    //obtener valor qr: puede ser para ingresar en lista de espera
    //o leer una mesa
    //  por lo cual
    //  quiero un qr para lista de espera
    // y varios qr de mesas

    //  if qr ir entrada
    this.hasWait$.subscribe(data => {
      if (data.estado == 'PENDIENTE') {
        this.toastr.error('Previamente usted ya solicitó una mesa, en breves se le acercará un recepcionista', 'Lista de espera');
      }
      else if (data.estado == 'EN USO') {
        this.toastr.error('Usted ya tiene una mesa reservada', 'Lista de espera');
      }
      else { this.addToWaitList(); }
    })

    //  if qr is mesa X
    this.hasRequest$.subscribe(data => {
      if (data.estado == 'PENDIENTE') {
        this.router.navigate(['/producto/list']);
      }
      else if (data.estado == 'ACEPTADO') {
        console.log('preguntarle si ya lo recibió');
      }
      else if (data.estado == 'CONFIRMADO') {
        console.log('preguntarle si quiere pagar o jugar un jueguito');
      }
      else if (data.estado == 'COBRADO') {
        console.log('preguntarle si quiere hacer una encuesta');
      }
    })
  }

  private addToWaitList() {
    try {
      const m = this.createModelWait();
      this.waitService.createOne(m);

      this.toastr.success('Aguarde un instante, en breves se le asignará una mesa!', 'Lista de Espera');
    }
    catch (error) { this.toastr.error('Error al momento de ingresarlo en lista de espera', 'Lista de espera'); }
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

}
