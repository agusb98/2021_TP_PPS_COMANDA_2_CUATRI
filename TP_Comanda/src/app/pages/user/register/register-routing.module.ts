import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'anonimo',
    loadChildren: () => import('./anonimo/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'duenio',
    loadChildren: () => import('./duenio_super/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'empleado',
    loadChildren: () => import('./empleado/register.module').then(m => m.RegisterPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RegisterRoutingModule { }