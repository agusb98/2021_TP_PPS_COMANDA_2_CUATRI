import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'user/login' },
  {
    path: 'login',
    loadChildren: () => import('../../pages/user/login/login.module').then(m => m.LoginPageModule),
  },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  {
    path: 'logout',
    loadChildren: () => import('../../pages/user/logout/logout.module').then(m => m.LogoutPageModule), canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }