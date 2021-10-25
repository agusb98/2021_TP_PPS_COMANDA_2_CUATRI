import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { IonicModule } from '@ionic/angular';

import { AltaMesaPageRoutingModule } from './alta-mesa-routing.module';

import { AltaMesaPage } from './alta-mesa.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AltaMesaPageRoutingModule
  ],
  declarations: [AltaMesaPage]
})
export class AltaMesaPageModule {}
