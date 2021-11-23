import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClientePageModule)
  }, 
  {
    path: 'cliente/grafico',
    loadChildren: () => import('./grafico-cliente/grafico-cliente.module').then(m => m.GraficoClientePageModule)
  },
  {
    path: 'empleado',
    loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoPageModule)
  }, 
  {
    path: 'supervisor',
    loadChildren: () => import('./supervisor/supervisor.module').then(m => m.SupervisorPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EncuestaRoutingModule { }