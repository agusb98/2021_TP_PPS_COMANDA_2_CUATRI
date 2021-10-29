import { NgModule } from '@angular/core';
import { MesaRoutingModule } from './mesa-routing.module';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  declarations: [],
  imports: [MesaRoutingModule],
  providers: [Vibration]
})

export class MesaModule { }