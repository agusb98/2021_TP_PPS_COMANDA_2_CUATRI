import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ScannerModule } from 'src/app/components/scanner/scanner.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [Vibration]
})
export class HomePageModule { }
