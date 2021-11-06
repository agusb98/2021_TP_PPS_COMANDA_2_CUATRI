import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaPageRoutingModule } from './alta-routing.module';

import { AltaPage } from './alta.page';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AltaPageRoutingModule
  ],
  declarations: [AltaPage],
  providers: [Vibration]
})
export class AltaPageModule {}
