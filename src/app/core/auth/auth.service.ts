
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
// import * as Rx from 'rxjs/Rx';

import * as jwtDecode from 'jwt-decode';
import * as moment from "moment";

// import { Config } from '../config/env.config';
// import { environment } from '../../../environments/environment';
import { User } from "../interfaces/user.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private _user: User;
    public userSubject: BehaviorSubject<User>;

    constructor(
        public http: HttpClient,
        public router: Router
    ) {
        this.userSubject = new BehaviorSubject(this._user);
        // hack
        // if (!environment.production) {
        //     console.warn('User not actually logged in. Dev override.');
        // }
    }

    public login(username: string, password: string) {
        return this.http.post<User>(`@api/login`, { username, password })
            .pipe(
                tap(this.setSession),
                shareReplay()
            );
    }

    public logout() {

        this._user = null;
        this.userSubject.next(this._user);

        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");

        this.router.navigateByUrl('/login');
    }

    public isLoggedIn() {
        // if (!environment.production) {
        //     return true; // hack
        // }
        return moment().isBefore(this.getExpiration());
    }

    get user$(): Observable<User> {
        return this.userSubject.asObservable();
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

        const decoded = jwtDecode(authResult.token);

        // Calculate exp time difference on server and add to local time
        const serverAt = moment(decoded.iat * 1000);
        const expiresAt = moment().add(moment(decoded.exp * 1000).diff(serverAt));

        console.log('server out by:',moment().diff(serverAt, 'milliseconds'));

        console.log('TEST');
        this._user = {...authResult};
        console.log('TEST 2');
        console.log('user:',this._user);
        this.userSubject.next(this._user);

        console.log('Successful login:',authResult);

        localStorage.setItem('token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

    }
}

// const TestUser = {
//     "id": 2,
//     "username": "jonathan.catmull@room58.com",
//     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOiIyMDE4LTA3LTA5VDEzOjQ0OjA3KzAxOjAwIiwianRpIjoiWkRGa04ySXdZak01T1dVM1pHUTBOV1EzTXpsbE5qWTBaamt3TmpKbFpqVTFNMk5tWVRZeE1ERXpNREkyWWpZMk5HVXpNR1l4TWpBMk16TXpOVGRqWlE9PSIsImlzcyI6Ind3dy5oZGJ3cy5jb20iLCJkYXRhIjp7InVpZCI6Mn0sImV4cCI6IjIwMTgtMDctMDlUMTM6NTk6MDcrMDE6MDAifQ.6xq7ERrdQ2G-KlmUiZd2YLrCemKgX7o10Pmpctq9C-CwUlpHaVJCbtemcp-vcGhlRISB1s5gtdAVd8wKUWc3Aw",
//     "websites": [
//         {id:40,name: "H-D<sup>\u00ae<\/sup> American Dealer Showcase"},
//         {id:41,name: "Sycamore Harley-Davidson<sup>&reg;<\/sup>"},
//         {id:42,name: "Shaw Harley-Davidson<sup>\u00ae<\/sup>"},
//         {id:43,name: "Canberra Harley-Davidson<sup>\u00ae<\/sup>"},
//         {id:44,name: "Harley Central"},
//         {id:45,name: "Central Coast Harley-Davidson<sup>\u00ae<\/sup>"},
//         {id:46,name: "Harley-Davidson<sup>\u00ae<\/sup> of Blacktown"},
//         {id:47,name: "Phil's Garage Harley-Davidson<sup>\u00ae<\/sup>"},
//         {id:48,name: "SunCity Harley-Davidson<sup>\u00ae<\/sup>"},
//         {id:49,name: "Sunshine Coast Harley-Davidson<sup>&reg;<\/sup>"},
//         {id:50,name: "Geelong Harley-Davidson"},
//         {id:51,name: "Bikes & Bits"},
//         {id:52,name: "Harley-Heaven"},
//         {id:53,name: "Harbour City Harley-Davidson<sup>&reg;<\/sup>"},
//         {id:54,name: "Harley Magic Harley-Davidson<sup>\u00ae<\/sup>"},
//         {id:55,name: "McIver & Veitch Harley-Davidson<sup>&reg;<\/sup>"},
//         {id:56,name: "Harley-Davidson<sup>\u00ae<\/sup> Trondheim"},
//         {id:57,name: "Harley-Davidson<sup>\u00ae<\/sup> Bergen"},
//         {id:58,name: "Harley-Davidson<sup>\u00ae<\/sup> \u00c5lesund"},
//         {id:59,name: "Harley-Davidson<sup>&reg;<\/sup> \u00d8stfold"},
//         {id:60,name: "Harley-Davidson<sup>&reg;<\/sup> Vestfold"}
//     ]
// };