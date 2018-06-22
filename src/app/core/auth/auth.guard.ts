import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        public authService: AuthService,
        public router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        return this.check(next);
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        return this.check(next);
    }

    check(route: ActivatedRouteSnapshot): boolean {
        if (this.authService.isLoggedIn()) return true;
        console.error('Access denied, please login to access this page.');
        this.router.navigate(['/login']);
        return false;
    }

}
