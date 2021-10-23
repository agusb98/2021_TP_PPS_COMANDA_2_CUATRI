import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BartenderGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean> | Promise<boolean> | boolean {

    let user= localStorage.getItem('user');
    //que el perfil sea bartender
  if (user) { return true; }
  else {
      this.router.navigate(['user/login']);
      return false;
  }
}
  
}
