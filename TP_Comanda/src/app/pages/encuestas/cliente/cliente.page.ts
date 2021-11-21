import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestorageService } from 'src/app/services/firestore.service';
import { ToastrService } from 'ngx-toastr';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  opinion:string = "";
  protocoloCovid:boolean;

  yaEnvioEncuesta:boolean = false;

  constructor( 
    private router: Router,
    private db:FirestorageService, 
    private toastr: ToastrService,
    public navCtrl: NavController  
    ) { }

  user;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log( this.user.id);
    
    this.yaEnvioEncuesta = false;
  }
  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  //falta meter la funcion al boton de escaneo qr que me lleve a los graficos
  navigateBack(){
    this.navCtrl.back();
  }


  enviarEncuesta(){
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
      "cliente": clienteNombre,
      "rangoSatisfecho": rangoSatisfecho,
      "protocoloCovid": protocoloCovid,
      "select": selectString, 
      "mesaConSal": mesaConSal,
      "mesaConEscarvadientes": mesaConEscarbadientes,
      "mesaConServilletas": mesaConServilletas,
      "mesaConAderezos": mesaConAderezos,
    }
    console.log(json);
    this.db.addData('encuestasCliente', json);
    this.toastr.success('Muchas gracias por tu opinion!!', 'Encuesta enviada');
    setTimeout(() => {
      this.yaEnvioEncuesta = true;
      this.router.navigate(["/home"]);
    }, 2000);
  }

} 
