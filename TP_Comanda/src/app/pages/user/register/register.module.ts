import { NgModule } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [],
  imports: [RegisterRoutingModule,],
  providers:[BarcodeScanner]
})
export class RegisterModule { }