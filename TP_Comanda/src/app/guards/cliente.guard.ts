import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
    providedIn: 'root'
})

export class ClienteGuard implements CanActivate {

    constructor( private router: Router ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {

        let model = null;
        return new Promise(res => {
            if (localStorage.getItem('user')) {
                model = JSON.parse(localStorage.getItem('user')) as Cliente;
            }

            if (model && model.perfil == 'CLIENTE') { res(true); }
            else {
                this.router.navigate(['/home']);
                res(false);
            }
            return;
        });
    }
}