import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestorageService } from 'src/app/services/firestore.service';
import { ToastrService } from 'ngx-toastr';
import { NavController } from '@ionic/angular';
import { PedidoService } from 'src/app/services/pedido.service';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  opinion: string = "";
  protocoloCovid: boolean;
  request$: Observable<any>;

  yaEnvioEncuesta: boolean = false;
  user;
  constructor(
    private router: Router,
    private db: FirestorageService,
    private pedidoService: PedidoService,
    private toastr: ToastrService,
    public navCtrl: NavController  
    ) { }
 



  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.yaEnvioEncuesta = false;

    this.getLastPedido();
  }

  getLastPedido() {
    this.request$ = this.pedidoService.getLastByUser(this.user.correo);
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  //falta meter la funcion al boton de escaneo qr que me lleve a los graficos
  navigateBack(){
    this.navCtrl.back();
  }



  enviarEncuesta(request: Pedido) {
    var rangoSatisfecho = (<HTMLIonRangeElement>document.getElementById("rango")).value;
    var protocoloCovid = (<HTMLIonRadioGroupElement>document.getElementById("grupo")).value == "true";
    var selectString = (<HTMLIonSelectElement>document.getElementById("select")).value;
    var mesaConSal = (<HTMLIonCheckboxElement>document.getElementById("chkSal")).checked;
    var mesaConEscarbadientes = (<HTMLIonCheckboxElement>document.getElementById("chkEscarbadientes")).checked;
    var mesaConServilletas = (<HTMLIonCheckboxElement>document.getElementById("chkServilletas")).checked;
    var mesaConAderezos = (<HTMLIonCheckboxElement>document.getElementById("chkAderezos")).checked;
    var clienteNombre = this.user.nombre;
    var id_cliente = this.user.id;

    var json = {
      "id_cliente": id_cliente,
      "id_pedido": request.id,
      "cliente": clienteNombre,
      "rangoSatisfecho": rangoSatisfecho,
      "protocoloCovid": protocoloCovid,
      "select": selectString,
      "mesaConSal": mesaConSal,
      "mesaConEscarvadientes": mesaConEscarbadientes,
      "mesaConServilletas": mesaConServilletas,
      "mesaConAderezos": mesaConAderezos,
    }

    this.db.addData('encuestasCliente', json);

    request.estado = 'ENCUESTADO';
    request.date_updated = new Date().getTime();
    this.pedidoService.setOne(request);
    localStorage.removeItem('products');

    this.toastr.success('Muchas gracias por tu opinion!!', 'Encuesta enviada');
    let audio = new Audio('./assets/sounds/noti.mp3');
    audio.play();
    setTimeout(() => {
      this.yaEnvioEncuesta = true;
      this.router.navigate(["/home"]);
    }, 2000);
  }

}
