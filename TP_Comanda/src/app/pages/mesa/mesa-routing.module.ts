import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuenioGuard } from 'src/app/guards/duenio.guard';
import { SupervisorGuard } from 'src/app/guards/supervisor.guard';

const routes: Routes = [
  {
    path: 'alta',
    loadChildren: () => import('./alta/alta.module').then(m => m.AltaPageModule),
    canActivate: [DuenioGuard || SupervisorGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
    canActivate: [DuenioGuard || SupervisorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MesaRoutingModule { }