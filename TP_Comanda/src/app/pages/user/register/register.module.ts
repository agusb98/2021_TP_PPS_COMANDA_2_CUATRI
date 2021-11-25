import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicModule } from '@ionic/angular';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [],
  imports: [    
    IonicModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RegisterRoutingModule,]
})
export class RegisterModule { }