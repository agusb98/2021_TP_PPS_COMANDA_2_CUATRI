import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})

export class DuenioGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {

        const email = localStorage.getItem('user');

        return new Promise(res => {
            if (email) {
                this.userService.getByEmail(email).subscribe(users => {
                    if (users[0] && users[0].perfil == 'DUENIO') {
                        res(true);
                    }
                    else {
                        this.router.navigate(['/home']);
                        res(false);
                    }
                    return;
                })
            }
            return false;
        });
    }
}