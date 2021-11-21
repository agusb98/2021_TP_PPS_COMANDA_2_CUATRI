import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WaitList } from 'src/app/models/waitList';
import { PedidoService } from 'src/app/services/pedido.service';
import { WaitListService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html'
})

export class ScannerComponent implements OnInit {

  public user;
  public hasWait;
  public hasRequest;

  constructor(
    private toastr: ToastrService,
    private waitService: WaitListService,
    private requestService: PedidoService,
  ) { }

  ngOnInit() {
    this.user = null;
    this.getUser();

    this.hasWait = false;
    this.checkWait();

    this.hasRequest = false;
    this.checkRequest();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private checkWait() {
    this.waitService.getByUser(this.user.correo, 'PENDIENTE').subscribe(data => {
      if (data) { this.hasWait = true; }
      else { this.hasWait = false; }
    })

    if (this.hasWait == false) {
      this.waitService.getByUser(this.user.correo, 'EN USO').subscribe(data => {
        if (data) { this.hasWait = true; }
      });
    }
  }

  private checkRequest() {
    this.requestService.getByUser(this.user.correo, 'PENDIENTE').subscribe(data => {
      if (data) { this.hasRequest = true; }
      else { this.hasRequest = false; }
    })

    if (this.hasRequest == false) {
      this.requestService.getByUser(this.user.correo, 'EN USO').subscribe(data => {
        if (data) { this.hasRequest = true; }
      });
    }
  }

  scannQR() {

    //obtener valor qr: puede ser para ingresar en lista de espera
    //o leer una mesa

    if (this.hasWait && this.hasRequest) {
      console.log("tiene pedido");
      
    }
    else if (this.hasWait) {
      console.log('en espera..');
      
    }
    else { this.addToWaitList(); }
  }

  private addToWaitList() {
    try {
      if (this.hasWait == false) {
        const m = this.createModelWait();
        this.waitService.createOne(m);

        this.hasWait = true;
        this.toastr.success('Aguarde un instante, en breves se le asignará una mesa!', 'Lista de Espera');
      }
      else { this.toastr.error('Previamente usted ya solicitó una mesa', 'Lista de espera') }
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
