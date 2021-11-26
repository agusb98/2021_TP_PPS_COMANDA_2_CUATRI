 
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  
import { eRol } from 'src/app/enums/eRol';
import { User } from 'src/app/models/user';
import { Message} from 'src/app/models/mensaje';
  
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
 
@Component({
  selector: 'app-sala-chat',
  templateUrl: './sala-chat.component.html',
  styleUrls: ['./sala-chat.component.scss'],
})
export class SalaChatComponent implements OnInit {


  chatForm: FormGroup;
  mensaje:string;
  mensajes:Message[];
  showSpinner:boolean;  
  bgSala:string;    
  title:string;
  @Input() user:any;
  @Input() uid:string;
  @Input() mesaNumber:number;
  @Input() idMesaCliente:string;
  //@Input() idMesa:string;

  constructor(
    private mjeService: ChatService, 
    private authService:AuthService, 
    private fb:FormBuilder,
    private router:Router,
   // private notificationService:NotificationsService
    ) 
  {    
    this.mensaje="";    
    this.bgSala = "container cont-chat";    
    this.mensajes=[];
  }

  ngOnInit() {
    this.title = "Consultas Mesa " + this.mesaNumber.toString();
    this.mjeService.setChatCollection(this.idMesaCliente);

    this.mjeService.items.subscribe(
      (mje)=>{   
        //console.log(mje);     
        this.mensajes = mje;
        this.showSpinner = false;
      }
    );  

    this.chatForm = this.fb.group({
      messageCtrl:['', [Validators.required]],      
    });                
  }

  enviarMje(){         
    var mje: Message =  {
      message :  this.mensaje,
      userEmail : this.user.correo,
      fecha: Date.now(),
      userName:this.user.nombre + ' ' + this.user.apellido,
      //idMesa:this.idMesa,
      idMesa:"",
      Mesa: this.mesaNumber.toString(),
      uid: this.uid,
      rol: 'cliente',//this.user.rol == eRol.CLIENTE? "Cliente" : "Mozo",
      mesaClienteId: this.idMesaCliente
    };  
    
    this.mjeService.setItemWithId(mje, mje.fecha.toString())
    .then(() => {
      if(this.user.perfil == eRol.CLIENTE){
        /*this.notificationService.sendNotification(
          "Consulta Mesa " + mje.Mesa,
          mje.message,
          'mozo'
        );*/
        alert("mensaje nuevo");
      }      
    });    

    this.mensaje = "";
  }

  getMessageCtrl(){
    return this.chatForm.controls["messageCtrl"];
  }

  return(){
    this.router.navigate(["home-clientes"]);
  }
 
}
