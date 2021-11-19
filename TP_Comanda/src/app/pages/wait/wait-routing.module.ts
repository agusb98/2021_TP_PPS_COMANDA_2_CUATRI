import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetreGuard } from 'src/app/guards/metre.guard';

const routes: Routes = [{
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
    canActivate: [MetreGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WaitRoutingModule { }