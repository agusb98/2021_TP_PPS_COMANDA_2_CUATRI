import { NgModule } from '@angular/core';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
  ],
  providers: [Camera]
})

export class RegisterModule { }