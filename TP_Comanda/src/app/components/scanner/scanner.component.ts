import { Component, OnInit } from '@angular/core';
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

export class ScannerComponent implements OnInit {

  public user;
  public hasWait$: Observable<any>;
  public hasRequest$: Observable<any>;

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
    let data;
    this.barcodeScanner.scan(this.options).then(barcodeData => {
      const datos = barcodeData.text.split(' ');
      data = { name: datos[0], id: datos[1], }
    });

    if (data) {
      if (data.name == 'ENTRADA') {
        this.hasWait$.subscribe(data => {
          if (data.estado == 'PENDIENTE') {
            this.toastr.error('Previamente usted ya solicitó una mesa, en breves se le acercará un recepcionista', 'Lista de espera');
          }
          else if (data.estado == 'EN USO') {
            this.toastr.error('Usted ya tiene una mesa reservada, por favor consulte al empleado más cercano', 'Lista de espera');
          }
          else { this.addToWaitList(); }
        });
      }
      else if (data.name == 'MESA') {
        this.hasRequest$.subscribe(dataRes => {
          
          if (dataRes.mesa_numero == data.id) {
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
          }
          else {
            this.toastr.error('Usted se ha equivocado de mesa', 'Lista de espera');
          }
        })
      }
      else if(data.name == 'PROPINA'){
        console.log('preguntar si realmente quiere dejar propina');
      }
    }


    //obtener valor qr: puede ser para ingresar en lista de espera
    //o leer una mesa
    //  por lo cual
    //  quiero un qr para lista de espera
    // y varios qr de mesas

    //  if qr ir entrada


    //  if qr is mesa X

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
