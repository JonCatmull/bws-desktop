
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import * as jwtDecode from 'jwt-decode';
import * as moment from "moment";

import { User } from "../interfaces/user.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private _user: User;
    private _sessionDuration: number = 900; // in seconds - default 15 mins
    private _sessionTimer: any;
    public userSubject: BehaviorSubject<User>;

    constructor(
        public http: HttpClient,
        public router: Router
    ) {
        this.userSubject = new BehaviorSubject(this._user);
        // If valid token exists on load get user
        if (this.isLoggedIn() && !this._user) {
            this.fetchUser().subscribe(
                resp => this.setSession(resp),
                err => this.logout()
            );
        }
        // this.user$.pipe(filter(user => user !== null)).subscribe(user => this.logout());
    }

    public login(username: string, password: string) {
        const obs = this.http.post<User>(`@api/user/login`, { username, password })
            .pipe(
                tap(resp => this.setSession(resp)),
                shareReplay()
            );

        const sub = obs.subscribe(user => {
            this.user = user;
            sub.unsubscribe();
        });

        return obs;
    }

    public fetchUser() {
        return this.http.get<User>(`@api/user`)
            .pipe(
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

        // Decode JWT to get expiry
        const decoded = jwtDecode(authResult.token);
        console.log('decoded:',decoded);

        // Calculate exp time difference on server and add to local time
        // const serverAt = moment(decoded.iat);
        // this._sessionDuration = moment(decoded.exp).diff(serverAt);
        // const expiresAt = moment().add(this._sessionDuration * 1000);
        // const expiresAt = moment().add(2000); // TEMP hack

        // Get session timout duration from token expiry timestamp vs server timestamp
        this._sessionDuration = decoded.exp - decoded.iat;

        localStorage.setItem('token', authResult.token);

        console.log('Successful login:',authResult);
        this.resetSessionTimer();
    }

    set user(user: User) {
        this._user = {...user};
        this.userSubject.next(this._user);
    }

    resetSessionTimer() {
        console.log('reset timeout', this._sessionDuration);
        this.clearSessionTimer();

        const expiresAt = moment().add(this._sessionDuration * 1000);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

        this._sessionTimer = setTimeout(() => this.logout(), this._sessionDuration * 1000);
    }

    clearSessionTimer() {
        if (this._sessionTimer) clearTimeout(this._sessionTimer);
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