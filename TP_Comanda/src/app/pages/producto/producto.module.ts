import { NgModule } from '@angular/core';
import { ProductoRoutingModule } from './producto-routing.module';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  declarations: [],
  imports: [ProductoRoutingModule],
  providers: [Vibration]
})

export class ProductoModule { }