import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DueñoGuard } from './guards/dueño.guard';
import { SupervisorGuard } from './guards/supervisor.guard'; 

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  {
    path: 'alta-producto',
    loadChildren: () => import('./pages/productos/alta-producto/alta-producto.module').then( m => m.AltaProductoPageModule)
  },
  {
    path: 'alta-mesa',
    loadChildren: () => import('./pages/mesas/alta-mesa/alta-mesa.module').then( m => m.AltaMesaPageModule)
    , canActivate: [AuthGuard,DueñoGuard, SupervisorGuard ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
