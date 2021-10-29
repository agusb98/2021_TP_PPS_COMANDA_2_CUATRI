import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  declarations: [],
  imports: [UserRoutingModule],
  providers: [Vibration]
})
export class UserModule { }