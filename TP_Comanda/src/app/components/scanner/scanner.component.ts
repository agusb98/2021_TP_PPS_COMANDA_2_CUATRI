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
  public hasWait$: Observable<any>;
  public hasRequest$: Observable<any>;

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
    this.hasWait$ = this.waitService.getLastByUser(this.user.correo);
  }

  private checkRequest() {
    this.hasRequest$ = this.requestService.getLastByUser(this.user.correo);
  }

  async scannQR() {
    // this.barcodeScanner.scan(this.options).then(barcodeData => {
    //   const datos = barcodeData.text.split(' ');
      // this.data = { name: datos[0], id: datos[1], }
       this.data = { name: 'MESA', id: 1, }

      if (this.data) {
        if (this.data.name == 'ENTRADA') {
          this.hasWait$.subscribe(res_wait => {
            if (res_wait.estado == 'PENDIENTE') {
              this.toastr.warning('Previamente usted ya solicitó una mesa, en breves se le acercará un recepcionista', 'Lista de espera');
            }
            else if (res_wait.estado == 'EN USO') {
              this.toastr.warning('Usted ya tiene una mesa reservada, por favor consulte al empleado más cercano', 'Lista de espera');
            }
            else { this.addToWaitList(); }
          });
        }
        else if (this.data.name == 'MESA') {
          this.hasRequest$.subscribe(dataRes => {

            if (dataRes?.mesa_numero != this.data.id && dataRes.estado == 'PENDIENTE') {
              this.toastr.warning('La mesa que le fue asignada es: Nº ' + dataRes?.mesa_numero, 'QR');
            }
            else if (dataRes.estado == 'PENDIENTE') {
              this.router.navigate(['/producto/list']);
            }
            else if (dataRes.estado == 'COBRAR') {
              this.toastr.warning('En breves se le acercará un mozo a cobrarle', 'QR');
            }
            else if (
              dataRes.estado == 'ACEPTADO' || dataRes.estado == 'CONFIRMADO' ||
              dataRes.estado == 'COBRADO'
            ) {
              this.router.navigate(['/pedido/id/' + dataRes.id]);
            }
            else { this.toastr.warning('Lo sentimos, primero debe anunciarse en recepción', 'QR'); }
          });
        }
        else { this.toastr.warning('QR fuera de servicio..', 'QR'); }
      }
    // });

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
