import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from 'src/app/models/mesa';
import { AuthService } from 'src/app/services/auth.service';
import { MesaService } from 'src/app/services/mesa.service';
import { PedidosService } from 'src/app/services/pedidos.service';

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

  constructor(private pedidosSrv:PedidosService, 
    private authService:AuthService,
    private router:Router ) { }

  ngOnInit() { 
    this.currentUser = this.authService.getCurrentUser();
    this.currentUid = this.authService.getUid();

    this.pedidosSrv.TraerMesaCliente().subscribe( data =>{
       
      this.mesasCliente = data;             
      this.currentMesaCliente = this.mesasCliente.find( x =>  x.user_uid == this.currentUid);
      console.log(this.currentMesaCliente);        
      this.title = "Mesa "  + this.currentMesaCliente.nro_mesa; 
    });
  }

  return(){
    this.router.navigate(["home-clientes"]);
  }

}
