import { NgModule } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { EncuestaRoutingModule } from './encuesta-routing.module';

@NgModule({
  declarations: [],
  imports: [EncuestaRoutingModule],
  providers: [Vibration]
})

export class EncuestaModule { }