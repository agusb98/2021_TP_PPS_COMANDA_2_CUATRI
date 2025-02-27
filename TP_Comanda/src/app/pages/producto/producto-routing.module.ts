import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BartenderGuard } from 'src/app/guards/bartender.guard';
import { CocineroGuard } from 'src/app/guards/cocinero.guard';
import { DuenioGuard } from 'src/app/guards/duenio.guard';

const routes: Routes = [
  {
    path: 'alta',
    loadChildren: () => import('./alta/alta.module').then(m => m.AltaPageModule),
    canActivate: [BartenderGuard || CocineroGuard ] 
  },
  {
    path: 'id/:id',
    loadChildren: () => import('./id/id.module').then(m => m.IdPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductoRoutingModule { }