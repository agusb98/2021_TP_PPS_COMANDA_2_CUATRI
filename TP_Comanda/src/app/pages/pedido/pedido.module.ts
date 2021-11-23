import { NgModule } from '@angular/core';
import { PedidoRoutingModule } from './pedido-routing.module';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  declarations: [],
  imports: [PedidoRoutingModule],
  providers: [Vibration]
})

export class PedidoModule { }