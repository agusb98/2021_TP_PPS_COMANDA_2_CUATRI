import { NgModule } from '@angular/core';
import { WaitRoutingModule } from './wait-routing.module';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  declarations: [],
  imports: [WaitRoutingModule],
  providers: [Vibration]
})

export class WaitModule { }