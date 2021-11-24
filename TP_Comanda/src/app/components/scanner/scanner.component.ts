import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from 'src/app/services/pedido.service';
import { WaitListService } from 'src/app/services/wait.service';

import { WaitList } from 'src/app/models/waitList';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html'
})

export class ScannerComponent implements OnInit, OnDestroy {

  public user;
  public hasWait;
  public hasRequest;

  private data: any;

  private options = {
    prompt: "Escaneá el QR",
    formats: 'PDF_417, QR_CODE',
    showTorchButton: true,
    resultDisplayDuration: 2,
  };

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private waitService: WaitListService,
    private requestService: PedidoService,
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
    this.user = null;
    this.data = null;
    this.getUser();

    this.checkWait();
    this.checkRequest();
  }

  ngOnDestroy() {
    this.data = null;
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private checkWait() {
    this.waitService.getLastByUser(this.user.correo)
      .subscribe(data => {
        this.hasWait = data;
      });
  }

  private checkRequest() {
    this.requestService.getLastByUser(this.user.correo)
      .subscribe(data => {
        this.hasRequest = data;
      });
  }

  async scannQR() {
    this.barcodeScanner.scan(this.options).then(barcodeData => {
      const datos = barcodeData.text.split(' ');
      this.data = { name: datos[0], id: datos[1], }

      if (this.data) {
        switch (this.data.name) {
          case 'ENTRADA':
            if (!this.hasWait) {
              this.addToWaitList();
            }
            else if (this.hasWait.estado == 'PENDIENTE') {
              this.toastr.warning('Previamente usted ya solicitó una mesa, en breves se le acercará un recepcionista', 'Lista de espera');
            }
            else if (this.hasWait.estado == 'EN USO') {
              this.toastr.warning('Usted ya tiene una mesa reservada, por favor consulte al empleado más cercano', 'Lista de espera');
            }
            break;

          case 'MESA':
            if (!this.hasRequest) {
              this.toastr.warning('Lo sentimos, primero debe anunciarse en recepción', 'QR');
            }
            else if (this.hasRequest.mesa_numero != this.data.id && this.hasRequest.estado == 'PENDIENTE') {
              this.toastr.warning('La mesa que se le asignó es: Nº ' + this.hasRequest.mesa_numero, 'QR');
            }
            else if (this.hasRequest.estado == 'PENDIENTE') {
              this.router.navigate(['/producto/list']);
            }
            else if (this.hasRequest.estado == 'COBRAR') {
              this.toastr.warning('En breves se le acercará un mozo a cobrarle', 'QR');
            }
            else if (
              this.hasRequest.estado == 'COBRADO' ||
              this.hasRequest.estado == 'ACEPTADO' ||
              this.hasRequest.estado == 'CONFIRMADO'
            ) {
              this.router.navigate(['/pedido/id/' + this.hasRequest.id]);
            }
            else { this.toastr.warning('Lo sentimos, primero debe anunciarse en recepción', 'QR'); }
            break;

          default:
            this.toastr.warning('QR no perteneciente a ARM-Restaurante..', 'QR');
            break;
        }
      }
    });
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
