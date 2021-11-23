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
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'encuesta/cliente',
    loadChildren: () => import('./pages/encuestas/cliente/cliente.module').then( m => m.ClientePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'encuesta/empleado',
    loadChildren: () => import('./pages/encuestas/empleado/empleado.module').then( m => m.EmpleadoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'encuesta/supervisor',
    loadChildren: () => import('./pages/encuestas/supervisor/supervisor.module').then( m => m.SupervisorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'encuesta/cliente/grafico',
    loadChildren: () => import('./pages/encuestas/grafico-cliente/grafico-cliente.module').then( m => m.GraficoClientePageModule),
    canActivate: [AuthGuard]
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
