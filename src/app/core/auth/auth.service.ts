
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

    public user: User;

    constructor(
        public http: HttpClient,
        public router: Router
    ) {}

    public login(username: string, password: string) {
        return this.http.post<User>(`${environment.API}/login`, { username, password })
            .pipe(
                tap(this.setSession),
                shareReplay()
            );
    }

    public logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    public isLoggedOut() {
        return !this.isLoggedIn();
    }

    public getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    private setSession(authResult) {

        try {

            var decoded = jwtDecode(authResult.token);
            console.log('JWT decoded',decoded);
            localStorage.setItem('token', authResult.token);
            if (!decoded.exp) throw 'JWT failed to decode';
            const expiresAt = moment(decoded.exp).add(1, 'h'); // .add() = TEMP hack waiting for api fix
            console.log('Set expires + 1 hour', expiresAt.format("dddd, MMMM Do YYYY, h:mm:ss a"));
            localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
            this.user = authResult;
        } catch(e) {
            console.error(e);

        }
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
