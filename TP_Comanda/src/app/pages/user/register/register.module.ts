import { NgModule } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { RegisterRoutingModule } from './register-routing.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
<<<<<<< HEAD
  imports: [
    
    IonicModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RegisterRoutingModule,]
=======
  imports: [RegisterRoutingModule,],
  providers:[BarcodeScanner]
>>>>>>> alpha
})
export class RegisterModule { }