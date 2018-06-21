
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import {  shareReplay, tap } from 'rxjs/operators';
// import * as Rx from 'rxjs/Rx';

import * as jwtDecode from 'jwt-decode';
import * as moment from "moment";

// import { Config } from '../config/env.config';
import { environment } from '../../../environments/environment';

interface User {
    id: number;
    token: string;
    username: string;
    websites: {[key: number]: string}
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(
        public http: HttpClient,
        public router: Router
    ) {}

    login(username: string, password: string) {
        return this.http.post<User>(`${environment.API}/login`, { username, password })
            .pipe(
                tap(res => this.setSession),
                shareReplay()
            );
    }

    private setSession(authResult) {

        var decoded = jwtDecode(authResult.token);
        console.log(decoded);

        const expiresAt = moment().add(decoded.exp,'second');

        localStorage.setItem('token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    // hasPrivilege(key: string): boolean {
    //     if (!this.me) return false;

    //     if (key.charAt(0) === '!') {
    //         return !Boolean(this.me.access.privileges.indexOf(key.substr(1)) !== -1);
    //     } else {
    //         return Boolean(this.me.access.privileges.indexOf(key) !== -1);
    //     }
    // }

    // hasPrivileges(privileges: string[]) {
    //     // const t0 = performance.now();
    //     let found = false;
    //     if (privileges.length > 0) {
    //         for (const privilege of privileges) {
    //             if (this.me.access.privileges.includes(privilege)) {
    //                 found = true;
    //                 break;
    //             }
    //         }
    //     }
    //     // const t1 = performance.now();
    //     // console.log("Call to check multiple previleges took " + (t1 - t0) + " milliseconds.");
    //     return found;
    // }

    // resetPassword(username: string): Observable<Object> {
    //     return this.http.post(`${environment.API}/user/forgotten-password`, { username });
    // }

}
