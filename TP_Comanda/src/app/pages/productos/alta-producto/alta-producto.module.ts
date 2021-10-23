import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaProductoPageRoutingModule } from './alta-producto-routing.module';

import { AltaProductoPage } from './alta-producto.page';

import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AltaProductoPageRoutingModule
  ],
  declarations: [AltaProductoPage]
})
export class AltaProductoPageModule {}
