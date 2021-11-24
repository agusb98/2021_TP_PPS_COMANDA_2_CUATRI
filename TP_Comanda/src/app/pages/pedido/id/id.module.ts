import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdPageRoutingModule } from './id-routing.module';

import { IdPage } from './id.page';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IdPageRoutingModule
  ],
  declarations: [IdPage],
  providers:[Vibration]
})
export class IdPageModule {}
