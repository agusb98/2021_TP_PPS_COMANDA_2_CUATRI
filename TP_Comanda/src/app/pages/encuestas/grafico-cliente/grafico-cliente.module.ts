import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficoClientePageRoutingModule } from './grafico-cliente-routing.module';

import { GraficoClientePage } from './grafico-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficoClientePageRoutingModule
  ],
  declarations: [GraficoClientePage]
})
export class GraficoClientePageModule {}
