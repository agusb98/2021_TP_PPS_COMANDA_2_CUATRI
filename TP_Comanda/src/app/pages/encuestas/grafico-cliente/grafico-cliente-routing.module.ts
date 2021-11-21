import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficoClientePage } from './grafico-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: GraficoClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficoClientePageRoutingModule {}
