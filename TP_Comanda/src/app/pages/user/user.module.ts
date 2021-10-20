import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { IonicModule } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  declarations: [],
  imports: [
    IonicModule,
    UserRoutingModule,
  ],
  providers: [Vibration]
})
export class UserModule { }