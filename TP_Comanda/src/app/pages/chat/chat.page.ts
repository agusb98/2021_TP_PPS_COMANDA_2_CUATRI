import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from 'src/app/models/mesa';
import { AuthService } from 'src/app/services/auth.service';
import { MesaService } from 'src/app/services/mesa.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  mesasCliente: any;
  currentMesaCliente: any;
  currentUser: any; //puede ser mozo o cliente
  currentUid:string;
  title:string;

  constructor( private router:Router ) { }

  ngOnInit() {  }

  return(){
    this.router.navigate(["home-clientes"]);
  }

}
