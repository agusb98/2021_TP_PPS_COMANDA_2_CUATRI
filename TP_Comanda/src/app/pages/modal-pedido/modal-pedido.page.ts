import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.page.html',
  styleUrls: ['./modal-pedido.page.scss'],
})
export class ModalPedidoPage implements OnInit {

 
  ngOnInit() {
  }

  producto:any
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(public navParams: NavParams,public viewCtrl: ModalController) { 
    this.producto=navParams.get('producto');
  }

  AddProducto(){
    if (this.producto.cantidad > 0) {
      this.producto.cantidad++;
    }
    else{
      this.producto.selected = true;
      this.producto.cantidad++;
    }
  }

  RemoveProducto(){
    if(this.producto.cantidad > 0){
      this.producto.cantidad--;
      if(this.producto.cantidad == 0){
       this.producto.selected = false;
      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss(this.producto);
  }
}
