import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Duenio } from '../models/duenio';

@Injectable({
    providedIn: 'root'
})

export class DuenioGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {

        let model = null;
        return new Promise(res => {
            if (localStorage.getItem('user')) {
                model = JSON.parse(localStorage.getItem('user')) as Duenio;
            }

            if (model && model.perfil == 'DUENIO') { res(true); }
            else {
                this.router.navigate(['/home']);
                res(false);
            }
            return;
        });
    }
}