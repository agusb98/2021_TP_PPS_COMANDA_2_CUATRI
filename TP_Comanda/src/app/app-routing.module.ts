import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule) },
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  { path: 'producto', loadChildren: () => import('./pages/producto/producto.module').then(m => m.ProductoModule) },
  { path: 'mesa', loadChildren: () => import('./pages/mesa/mesa.module').then(m => m.MesaModule) },
  { path: 'wait', loadChildren: () => import('./pages/wait/wait.module').then(m => m.WaitModule) },
  { path: 'pedido', loadChildren: () => import('./pages/pedido/pedido.module').then(m => m.PedidoModule) },
  { path: 'encuesta', loadChildren: () => import('./pages/encuesta/encuesta.module').then(m => m.EncuestaModule) },
  { path: 'game/:id', loadChildren: () => import('./pages/game/id/id.module').then(m => m.IdPageModule) },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
  }, {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
