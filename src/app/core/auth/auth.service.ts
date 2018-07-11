
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
import { User } from "../interfaces/user.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public user: User = TestUser; // temp hack

    constructor(
        public http: HttpClient,
        public router: Router
    ) {
        // hack
        if (!environment.production) {
            console.warn('User not actually logged in. Dev override.');
        }
    }

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
        if (!environment.production) {
            return true; // hack
        }
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
        console.log('set session',authResult);

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

const TestUser = {
    "id": 2,
    "username": "jonathan.catmull@room58.com",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOiIyMDE4LTA3LTA5VDEzOjQ0OjA3KzAxOjAwIiwianRpIjoiWkRGa04ySXdZak01T1dVM1pHUTBOV1EzTXpsbE5qWTBaamt3TmpKbFpqVTFNMk5tWVRZeE1ERXpNREkyWWpZMk5HVXpNR1l4TWpBMk16TXpOVGRqWlE9PSIsImlzcyI6Ind3dy5oZGJ3cy5jb20iLCJkYXRhIjp7InVpZCI6Mn0sImV4cCI6IjIwMTgtMDctMDlUMTM6NTk6MDcrMDE6MDAifQ.6xq7ERrdQ2G-KlmUiZd2YLrCemKgX7o10Pmpctq9C-CwUlpHaVJCbtemcp-vcGhlRISB1s5gtdAVd8wKUWc3Aw",
    "websites": [
        {id:40,name: "H-D<sup>\u00ae<\/sup> American Dealer Showcase"},
        {id:41,name: "Sycamore Harley-Davidson<sup>&reg;<\/sup>"},
        {id:42,name: "Shaw Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:43,name: "Canberra Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:44,name: "Harley Central"},
        {id:45,name: "Central Coast Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:46,name: "Harley-Davidson<sup>\u00ae<\/sup> of Blacktown"},
        {id:47,name: "Phil's Garage Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:48,name: "SunCity Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:49,name: "Sunshine Coast Harley-Davidson<sup>&reg;<\/sup>"},
        {id:50,name: "Geelong Harley-Davidson"},
        {id:51,name: "Bikes & Bits"},
        {id:52,name: "Harley-Heaven"},
        {id:53,name: "Harbour City Harley-Davidson<sup>&reg;<\/sup>"},
        {id:54,name: "Harley Magic Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:55,name: "McIver & Veitch Harley-Davidson<sup>&reg;<\/sup>"},
        {id:56,name: "Harley-Davidson<sup>\u00ae<\/sup> Trondheim"},
        {id:57,name: "Harley-Davidson<sup>\u00ae<\/sup> Bergen"},
        {id:58,name: "Harley-Davidson<sup>\u00ae<\/sup> \u00c5lesund"},
        {id:59,name: "Harley-Davidson<sup>&reg;<\/sup> \u00d8stfold"},
        {id:60,name: "Harley-Davidson<sup>&reg;<\/sup> Vestfold"},
        {id:61,name: "Harley-Davidson<sup>\u00ae<\/sup> Oslo"},
        {id:62,name: "Harley-Davidson<sup>\u00ae<\/sup> Trollh\u00e4ttan"},
        {id:63,name: "Harley-Davidson<sup>\u00ae<\/sup> J\u00e4rvs\u00f6"},
        {id:64,name: "Harley-Davidson<sup>&reg;<\/sup> Norrk\u00f6ping"},
        {id:65,name: "Harley-Davidson<sup>&reg;<\/sup> Tampere"},
        {id:66,name: "Harley-Davidson<sup>&reg;<\/sup> Dubai"},
        {id:67,name: "Harley-Davidson<sup>\u00ae<\/sup> Abu Dhabi"},
        {id:68,name: "Harley-Davidson<sup>&reg;<\/sup> Fujairah"},
        {id:69,name: "Harley-Davidson<sup>&reg;<\/sup> Doha"},
        {id:70,name: "Harley-Davidson<sup>&reg;<\/sup> Riyadh"},
        {id:71,name: "Harley-Davidson<sup>&reg;<\/sup> Jeddah"},
        {id:72,name: "Harley-Davidson<sup>&reg;<\/sup> Dhahran"},
        {id:73,name: "Harley-Davidson<sup>&reg;<\/sup> Jubail"},
        {id:74,name: "Harley-Davidson<sup>&reg;<\/sup> Muscat"},
        {id:75,name: "Harley-Davidson<sup>\u00ae<\/sup> Amman"},
        {id:76,name: "Harley-Davidson<sup>&reg;<\/sup> Kuwait"},
        {id:77,name: "Harley-Davidson<sup>&reg;<\/sup> Beirut"},
        {id:78,name: "Harley-Davidson<sup>&reg;<\/sup> Bahrain"},
        {id:79,name: "Harley-Davidson<sup>&reg;<\/sup> Casablanca"},
        {id:80,name: "Harley-Davidson<sup>&reg;<\/sup> Casablanca"},
        {id:81,name: "Harley-Davidson<sup>\u00ae<\/sup> Egypt"},
        {id:82,name: "Harley-Davidson<sup>\u00ae<\/sup> Alger "},
        {id:83,name: "Harley-Davidson<sup>&reg;<\/sup> Cape Town"},
        {id:84,name: "Harley-Davidson<sup>&reg;<\/sup> Tyger Valley"},
        {id:85,name: "Johannesburg Harley-Davidson<sup>&reg;<\/sup>"},
        {id:86,name: "Clearwater Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:87,name: "Harley-Davidson<sup>&reg;<\/sup> Durban"},
        {id:88,name: "Harley-Davidson<sup>&reg;<\/sup> Gold Rand"},
        {id:89,name: "Harley-Davidson<sup>&reg;<\/sup> Pretoria"},
        {id:90,name: "Harley-Davidson<sup>&reg;<\/sup> Big Five"},
        {id:91,name: "Harley-Davidson<sup>&reg;<\/sup> Zambezi"},
        {id:92,name: "Harley-Davidson<sup>&reg;<\/sup> Bloemfontein"},
        {id:93,name: "Harley-Davidson<sup>\u00ae<\/sup> Garden Route"},
        {id:94,name: "Harley-Davidson<sup>&reg;<\/sup> Flying Twin"},
        {id:95,name: "Harley-Davidson<sup>&reg;<\/sup> Mauritius - La Belle M\u00e9canique Lt\u00e9e"},
        {id:96,name: "Harley-Davidson<sup>&reg;<\/sup> Mauritius"},
        {id:97,name: "Harley-Davidson<sup>\u00ae<\/sup> Plze\u0148"},
        {id:98,name: "Ostrava Harley-Davidson<sup>&reg;<\/sup>"},
        {id:99,name: "Harley-Davidson<sup>\u00ae<\/sup> Budapest"},
        {id:100,name: "Harley-Davidson<sup>\u00ae<\/sup> Liberator Warszawa"},
        {id:101,name: "Harley-Davidson<sup>&reg;<\/sup> Katowice"},
        {id:102,name: "Harley-Davidson<sup>\u00ae<\/sup> KRAK\u00d3W"},
        {id:103,name: "Harley-Davidson<sup>\u00ae<\/sup> POZNA\u0143"},
        {id:104,name: "Appaloosa Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:105,name: "Harley-Davidson<sup>\u00ae<\/sup> \u0141\u00f3d\u017a"},
        {id:106,name: "Harley-Davidson<sup>\u00ae<\/sup> Gda\u0144sk"},
        {id:107,name: "Harley-Davidson<sup>\u00ae<\/sup> Bratislava"},
        {id:108,name: "Harley-Davidson<sup>\u00ae<\/sup> Pre\u0161ov"},
        {id:109,name: "Harley-Davidson<sup>\u00ae<\/sup> Tallinn"},
        {id:110,name: "Harley-Davidson<sup>\u00ae<\/sup> Riga"},
        {id:111,name: "Harley-Davidson<sup>\u00ae<\/sup> Vilnius"},
        {id:112,name: "\u041c\u043e\u0441\u043a\u0432\u0430 Harley-Davidson<sup>&reg;<\/sup>"},
        {id:113,name: "\u041a\u0420\u0410\u0421\u041d\u041e\u0414\u0410\u0420 Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:114,name: "Harley-Davidson<sup>&reg;<\/sup> \u0415\u043a\u0430\u0442\u0435\u0440\u0438\u043d\u0431\u0443\u0440\u0433"},
        {id:115,name: "Harley-Davidson<sup>&reg;<\/sup> \u0418\u0440\u043a\u0443\u0442\u0441\u043a"},
        {id:116,name: "Harley-Davidson<sup>\u00ae<\/sup> \u0410\u0440\u0441\u0435\u043d\u0430\u043b\u044c\u043d\u0430\u044f"},
        {id:117,name: "Harley-Davidson<sup>\u00ae<\/sup> \u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a"},
        {id:118,name: "Harley-Davidson<sup>\u00ae<\/sup> \u0410\u0432\u0440\u043e\u0440\u0430 - \u043a\u0440\u0443\u043f\u043d\u0435\u0439\u0448\u0438\u0439 \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439 \u0434\u0438\u043b\u0435\u0440 \u0432 \u0421\u0430\u043d\u043a\u0442-\u041f\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433\u0435"},
        {id:119,name: "Harley-Davidson<sup>\u00ae<\/sup> \u0420\u043e\u0441\u0442\u043e\u0432-\u043d\u0430-\u0414\u043e\u043d\u0443"},
        {id:120,name: "Harley-Davidson<sup>\u00ae<\/sup> \u0410\u043b\u043c\u0430\u0442\u044b"},
        {id:121,name: "Harley-Davidson<sup>&reg;<\/sup> M\u0438\u043d\u0441\u043a"},
        {id:122,name: "Harley-Davidson<sup>\u00ae<\/sup> Kyiv"},
        {id:123,name: "Harley-Davidson<sup>\u00ae<\/sup> Kyiv"},
        {id:124,name: "Harley-Davidson<sup>&reg;<\/sup> Baku"},
        {id:125,name: "Harley-Davidson<sup>\u00ae<\/sup> Bosphorus"},
        {id:126,name: "HARLEY-DAVIDSON\u00ae BOSPHORUS"},
        {id:127,name: "\u0130ZM\u0130R"},
        {id:128,name: "Harley-Davidson<sup>\u00ae<\/sup> Avenue"},
        {id:129,name: "Ankara"},
        {id:130,name: "Harley-Davidson<sup>\u00ae<\/sup>   Antalya"},
        {id:131,name: "Harley-Davidson<sup>\u00ae<\/sup> Antalya"},
        {id:132,name: "Harley-Davidson<sup>&reg;<\/sup> Athena"},
        {id:133,name: "Harley-Davidson<sup>\u00ae<\/sup> Thessaloniki"},
        {id:134,name: "Harley-Davidson<sup>\u00ae<\/sup> Bucuresti"},
        {id:135,name: "Harley-Davidson<sup>\u00ae<\/sup> Centre Cyprus"},
        {id:136,name: "Harley-Davidson<sup>\u00ae<\/sup> Centre Cyprus"},
        {id:137,name: "Harley-Davidson<sup>&reg;<\/sup> Beograd"},
        {id:138,name: "Harley-Davidson<sup>\u00ae<\/sup> Zagreb"},
        {id:139,name: "Malta Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:140,name: "Harley-Davidson<sup>\u00ae<\/sup> Sofia"},
        {id:141,name: "Harley-Davidson<sup>\u00ae<\/sup> ISRAEL"},
        {id:142,name: "Harley-Davidson<sup>\u00ae<\/sup> of Noumea"},
        {id:143,name: "Harley-Davidson<sup>&reg;<\/sup> of Manila"},
        {id:144,name: "Harley-Davidson<sup>\u00ae<\/sup> of Singapore"},
        {id:145,name: "Harley-Davidson<sup>&reg;<\/sup> of Saigon"},
        {id:146,name: "Harley-Davidson<sup>&reg;<\/sup> of Saigon"},
        {id:147,name: "Harley-Davidson<sup>&reg;<\/sup> of Hanoi"},
        {id:148,name: "Harley-Davidson<sup>&reg;<\/sup> of Hanoi"},
        {id:149,name: "Harley-Davidson<sup>\u00ae<\/sup> of Kuala Lumpur"},
        {id:150,name: "Harley-Davidson<sup>\u00ae<\/sup> of Hong Kong"},
        {id:151,name: "Harley-Davidson<sup>&reg;<\/sup> Brunei"},
        {id:153,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u65b0\u5bbf"},
        {id:154,name: "Harley-Davidson<sup>&reg;<\/sup> HARLEY-DAVIDSON RIKUYU \/ \u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9678\u53cb"},
        {id:155,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d0\u30eb\u30b3\u30e0\u5ca1\u5c71"},
        {id:156,name: "HARLEY-DAVIDSON \u79cb\u7530"},
        {id:157,name: "\u30d4\u30c3\u30c8\u30a4\u30f3\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \/ Pit-in Harley-Davidson<sup>&reg;<\/sup>"},
        {id:159,name: "Harley-Davidson<sup>&reg;<\/sup> Asahikawa  \u3000\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u65ed\u5ddd"},
        {id:160,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u3000\u30aa\u30fc\u30c8\u30e9\u30f3\u30c9\u672d\u5e4c"},
        {id:161,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3MJM\u51fd\u9928"},
        {id:162,name: "Harley-Davidson<sup>\u00ae<\/sup> OBIHIRO \/ \u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5e2f\u5e83"},
        {id:163,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5ca9\u624b"},
        {id:164,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5bae\u57ce"},
        {id:165,name: "\u30c1\u30a7\u30ea\u30fc\u30ba\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5c71\u5f62"},
        {id:166,name: "HARLEY-DAVIDSON \u798f\u5cf6\uff1a \u2605Used Bike \u2605\u4e2d\u53e4\u8eca\u7d9a\u3005\u5165\u8377\u4e2d\u2605"},
        {id:167,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \u30b5\u30af\u30e9\u30a4"},
        {id:168,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u8328\u57ce\u5357"},
        {id:169,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u7fa4\u99ac"},
        {id:170,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \u30c6\u30e9\u30ab\u30c9"},
        {id:171,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u585a\u539f"},
        {id:172,name: "Harley-Davidson<sup>\u00ae<\/sup> \u5b87\u90fd\u5bae"},
        {id:173,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9ad8\u5d0e"},
        {id:174,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30bb\u30f3\u30c8\u30e9\u30eb\u5ddd\u53e3"},
        {id:175,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30bb\u30f3\u30c8\u30e9\u30eb\u6240\u6ca2"},
        {id:176,name: "Harley-Davidson<sup>&reg;<\/sup> SAITAMA HANAZONO"},
        {id:177,name: "Hiro's\u3000\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3"},
        {id:178,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30b0\u30c3\u30c9\u30a6\u30c3\u30c9"},
        {id:179,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \u30e1\u30ac\u677e\u6238"},
        {id:180,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \u30b0\u30c3\u30c9\u30a6\u30c3\u30c9\uff0f\u8db3\u7acb\u5e97"},
        {id:181,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6210\u7530"},
        {id:182,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5e55\u5f35"},
        {id:183,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30b7\u30c6\u30a3\uff0f\u897f\u6771\u4eac\u5e97"},
        {id:184,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30b7\u30c6\u30a3\uff0f\u5ddd\u8d8a\u5e97"},
        {id:185,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30b7\u30c6\u30a3\uff0f\u4e2d\u91ce\u5e97"},
        {id:186,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30b7\u30c6\u30a3\uff0f\u67cf\u5e97"},
        {id:187,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4e80\u6238"},
        {id:188,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u76f8\u6a21\u539f"},
        {id:189,name: "\u30ec\u30bf\u30fc\u30b7\u30e7\u30c3\u30d7\u516b\u738b\u5b50"},
        {id:190,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4e09\u9df9"},
        {id:191,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6c96\u7e04"},
        {id:192,name: "Harley-Davidson<sup>&reg;<\/sup> Showa-no-Mori\uff0f\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u662d\u548c\u306e\u68ee"},
        {id:193,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6771\u4e45\u7559\u7c73"},
        {id:194,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u65b0\u6a2a\u6d5c"},
        {id:195,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6e58\u5357"},
        {id:196,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4e16\u7530\u8c37"},
        {id:197,name: "\u30e6\u30fc\u30e1\u30c7\u30a3\u30a2\uff0f\u6a2a\u6d5c\u9752\u8449\u5e97"},
        {id:198,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6a2a\u6d5c"},
        {id:199,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6a2a\u6d5c\u5357"},
        {id:200,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30a2\u30eb\u30d5\u30a1\u65b0\u6f5f"},
        {id:201,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u77f3\u5ddd\u3000\/\u3000Harley-Davidson<sup>\u00ae<\/sup> Ishikawa"},
        {id:202,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u798f\u4e95"},
        {id:203,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5bcc\u5c71"},
        {id:204,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u91d1\u6ca2\/HARLEY-DAVIDSON KANAZAWA"},
        {id:205,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5c71\u68a8"},
        {id:206,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9577\u91ce"},
        {id:207,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u8acf\u8a2a"},
        {id:208,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u98ef\u7530"},
        {id:209,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30e2\u30c8\u30ed\u30de\u30f3"},
        {id:210,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30bf\u30aa\u30ab\u6cbc\u6d25"},
        {id:211,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9759\u5ca1"},
        {id:212,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u77e5\u7acb"},
        {id:213,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u540d\u53e4\u5c4b"},
        {id:214,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6d5c\u677e"},
        {id:215,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4eac\u962a"},
        {id:216,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \u30e1\u30ac\u6771\u6d77"},
        {id:217,name: "\u30aa\u30fc\u30c8\u30fb\u30ec\u30af\uff0f\u677e\u962a\u5e97"},
        {id:218,name: "\uff8a\uff70\uff9a\uff70\uff80\uff9e\uff8b\uff9e\uff6f\uff84\uff9e\uff7f\uff9d\u4e09\u91cd\uff0f\u6851\u540d\u5e97:HARLEY-DAVIDSON MIE\/KUWANA"},
        {id:219,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4eac\u90fd"},
        {id:220,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4eac\u90fd\uff0f\u6d1b\u897f"},
        {id:221,name: "\u30e6\u30fc\u30fb\u30a8\u30b9\u30fb\u30a8\u30fc\u30fb\u30ec\u30aa"},
        {id:222,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5357\u5927\u962a"},
        {id:223,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5948\u826f"},
        {id:224,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6771\u5927\u962a"},
        {id:225,name: "Harley-Davidson<sup>\u00ae<\/sup> OSAKA"},
        {id:226,name: "Harley-Davidson<sup>&reg;<\/sup> MINO\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u7b95\u9762"},
        {id:227,name: "Harley-Davidson<sup>&reg;<\/sup> \u9808\u78e8"},
        {id:228,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u795e\u6238"},
        {id:229,name: "Harley-Davidson<sup>\u00ae<\/sup> Terada Motors | \u5bfa\u7530\u30e2\u30fc\u30bf\u30fc\u30b9"},
        {id:230,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d7\u30e9\u30b6\u4f0a\u4e39"},
        {id:231,name: "\u5e83\u7551\u65e5\u7523\u81ea\u52d5\u8eca"},
        {id:232,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30e9\u30a4\u30c0\u30fc\u30ba\u30af\u30ed\u30b9\u795e\u6238\u6e2f\u5cf6"},
        {id:233,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u548c\u6b4c\u5c71"},
        {id:234,name: "\u30e9\u30a4\u30c0\u30fc\u30ba\u30b9\u30dd\u30c3\u30c8\u30e0\u30e9\u30bf"},
        {id:235,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5009\u6577"},
        {id:236,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d0\u30eb\u30b3\u30e0\u5e83\u5cf6"},
        {id:237,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d0\u30eb\u30b3\u30e0\u798f\u5c71"},
        {id:238,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d0\u30eb\u30b3\u30e0\u6749\u4e26"},
        {id:239,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6771\u5e83\u5cf6"},
        {id:240,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5c71\u53e3\u3000GOTOMOTORS Harley-Davidson<sup>&reg;<\/sup>"},
        {id:241,name: "\u30aa\u30fc\u30c8\u30b7\u30e7\u30c3\u30d7\u30e8\u30b7\u30aa\u30ab"},
        {id:242,name: "Harley-Davidson<sup>&reg;<\/sup> TOKUSHIMA"},
        {id:243,name: "Harley-Davidson<sup>&reg;<\/sup> BLUE PANTHER"},
        {id:244,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u535a\u591a"},
        {id:245,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4f50\u8cc0"},
        {id:246,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9ad8\u77e5"},
        {id:247,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9577\u5d0e"},
        {id:248,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5927\u5206"},
        {id:249,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4f50\u4e16\u4fdd"},
        {id:250,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5bae\u5d0e"},
        {id:251,name: "\u30d0\u30a4\u30ab\u30fc\u30ba\u30b9\u30c6\u30fc\u30b7\u30e7\u30f3\u30a2\u30af\u30c6\u30a3\u30d6"},
        {id:252,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9e7f\u5150\u5cf6"},
        {id:253,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3MJM\u672d\u5e4c"},
        {id:254,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u3064\u304f\u3070"},
        {id:255,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5c0f\u5c71"},
        {id:256,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30de\u30eb\u30c8\u30df\uff0f\u85e4\u6ca2\u5e97"},
        {id:257,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u8c4a\u6a4b"},
        {id:258,name: "Richco Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:259,name: "Richco Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:260,name: "Harley Davidson Dev site"},
        {id:263,name: "Harley-Davidson<sup>\u00ae<\/sup> Desert Pearl"},
        {id:264,name: "Harley-Davidson<sup>\u00ae<\/sup>  Cedarwoods"},
        {id:269,name: "Akita Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:270,name: "Harley-Davidson<sup>\u00ae<\/sup> Stavanger"},
        {id:271,name: "Harley-Davidson<sup>\u00ae<\/sup> Lule\u00e5"},
        {id:272,name: "Harley-Davidson<sup>\u00ae<\/sup> of Johor Bahru"},
        {id:273,name: "Harley-Davidson<sup>&reg;<\/sup> of Penang"},
        {id:274,name: "Harley-Davidson<sup>\u00ae<\/sup> \u0423\u0444\u0430"},
        {id:277,name: "Baikuya \/ Harley Shop"},
        {id:278,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5c3e\u5f35\u6e05\u9808"},
        {id:282,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u56fd\u7acb \/ Harley-Davidson<sup>\u00ae<\/sup> Kokuryu"},
        {id:286,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5317\u4e5d\u5dde"},
        {id:290,name: "HARLEY-DAVIDSON\u00ae HONG KONG"},
        {id:291,name: "Harley-Davidson<sup>\u00ae<\/sup> Twin Peaks"},
        {id:292,name: "Harley-Davidson<sup>\u00ae<\/sup> Sofia"},
        {id:293,name: "Harley-Davidson<sup>&reg;<\/sup> NAGAOKA"},
        {id:294,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d0\u30eb\u30b3\u30e0\u798f\u5ca1\u897f"},
        {id:295,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4ed9\u53f0"},
        {id:296,name: "Harley-Davidson<sup>&reg;<\/sup> \u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u7df4\u99ac"},
        {id:298,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \u30ec\u30a4\u30af\u30a6\u30c3\u30c9"},
        {id:299,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d5\u30bf\u30d0"},
        {id:300,name: "Harley-Davidson<sup>\u00ae<\/sup> \u6ecb\u8cc0"},
        {id:302,name: "HARLEY-DAVIDSON\u798f\u5ca1"},
        {id:303,name: "Harley Davidson KUMAMOTO"},
        {id:304,name: "Harley Davidson Recado"},
        {id:305,name: "Demo German"},
        {id:308,name: "Harley-Davidson<sup>\u00ae<\/sup> Kristiansand"},
        {id:309,name: "Darling Downs Harley-Davidson<sup>&reg;<\/sup>"},
        {id:310,name: "H-D<sup>\u00ae<\/sup> American Dealer MY18"},
        {id:312,name: "Harley-Davidson<sup>\u00ae<\/sup> of Pattaya"},
        {id:314,name: "Harley-Davidson<sup>\u00ae<\/sup> Pattaya"},
        {id:319,name: "Northern Beaches Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:321,name: "JS MOTORSPORTS"},
        {id:322,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4e2d\u5ddd"},
        {id:323,name: "Harley-Davidson<sup>\u00ae<\/sup> \u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a"},
        {id:324,name: "Sumatera Motor Harley-Davidson<sup>&reg;<\/sup>"},
        {id:333,name: "Harley-Davidson<sup>\u00ae<\/sup> Metropolitan Bangkok"},
        {id:334,name: "Nusantara Harley-Davidson of Jakarta"},
        {id:335,name: "Anak Elang Harley-Davidson of Jakarta"},
        {id:336,name: "Anak Elang Harley-Davidson of Jakarta"},
        {id:337,name: "Sumatera Motor Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:338,name: "Harley-Davidson<sup>&reg;<\/sup> Windhoek"},
        {id:339,name: "Harley-Davidson<sup>\u00ae<\/sup> Rzesz\u00f3w"},
        {id:340,name: "Harley-Davidson<sup>&reg;<\/sup> Poise Harley-Davidson<sup>\u00ae<\/sup> of Khon Kaen"},
        {id:341,name: "Poise Harley-Davidson<sup>\u00ae<\/sup> of Khon Kaen"},
        {id:349,name: "Harley-Davidson<sup>&reg;<\/sup> of Danang"},
        {id:351,name: "Harley-Davidson<sup>\u00ae<\/sup> T\u00e4by"},
        {id:352,name: "Harley-Davidson<sup>\u00ae<\/sup> G\u00f6teborg"},
        {id:353,name: "Harley-Davidson<sup>\u00ae<\/sup> Helsingborg"},
        {id:354,name: "Harley-Davidson<sup>\u00ae<\/sup> Malm\u00f6"},
        {id:355,name: "Harley-Davidson<sup>\u00ae<\/sup> Stockholm"},
        {id:356,name: "Harley-Davidson<sup>\u00ae<\/sup> Kazan"},
        {id:357,name: "AAS Harley-Davidson<sup>\u00ae<\/sup>  of Bangkok"},
        {id:358,name: "AAS Harley-Davidson<sup>\u00ae<\/sup>  of Bangkok"},
        {id:359,name: "Harley-Davidson<sup>&reg;<\/sup> of Danang"},
        {id:360,name: "Harley-Davidson<sup>&reg;<\/sup> of Ubon Ratchathani"},
        {id:361,name: "Harley-Davidson<sup>&reg;<\/sup> of Ubon Ratchathani"},
        {id:362,name: "Sarana Harley-Davidson of Bali"},
        {id:363,name: "Sarana Harley-Davidson of Bali"},
        {id:364,name: "Harley Davidson<sup>\u00ae<\/sup> Split"},
        {id:365,name: "Northside Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:366,name: "Harley-Davidson<sup>\u00ae<\/sup> Oulu"},
        {id:367,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30bb\u30f3\u30c8\u30e9\u30eb\u6771\u4eac\u5317"},
        {id:369,name: "Bengal Harley-Davidson<sup>&reg;<\/sup>"},
        {id:370,name: "Biker Bob's Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:371,name: "Motomart Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:372,name: "Harley-Davidson<sup>\u00ae<\/sup> Ljubljana"},
        {id:374,name: "Chester Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:375,name: "Harley-Davidson<sup>\u00ae<\/sup> Ljubljana"},
        {id:376,name: "Harley-Davidson<sup>&reg;<\/sup> \u0422\u044e\u043c\u0435\u043d\u044c"},
        {id:377,name: "Tusker Harley-Davidson<sup>&reg;<\/sup>"},
        {id:378,name: "Harley-Davidson<sup>\u00ae<\/sup> Capital"},
        {id:379,name: "Harley-Davidson<sup>&reg;<\/sup> Banjara"},
        {id:380,name: "Seven Islands Harley-Davidson<sup>&reg;<\/sup>"},
        {id:381,name: "Nine Bridges Harley-Davidson<sup>&reg;<\/sup>"},
        {id:382,name: "Harley-Davidson<sup>\u00ae<\/sup> Himalayan"},
        {id:383,name: "Harley-Davidson<sup>\u00ae<\/sup> Spice Coast"},
        {id:384,name: "Goa Harley-Davidson<sup>\u00ae<\/sup> (Tusker)"},
        {id:385,name: "Tiger Harley-Davidson<sup>&reg;<\/sup>"},
        {id:386,name: "Harley-Davidson<sup>\u00ae<\/sup> Two Rivers"},
        {id:387,name: "Harley-Davidson<sup>&reg;<\/sup> Dunes"},
        {id:388,name: "Diamond City Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:389,name: "United Harley-Davidson<sup>&reg;<\/sup>"},
        {id:390,name: "Harley-Davidson<sup>\u00ae<\/sup> Malabar"},
        {id:391,name: "Harley-Davidson<sup>\u00ae<\/sup> Nagpur"},
        {id:392,name: "The Western Ghats Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:393,name: "Harley-Davidson<sup>&reg;<\/sup> Brahmaputra"},
        {id:394,name: "Harley-Davidson<sup>\u00ae<\/sup> Grand Trunk"},
        {id:395,name: "Harley-Davidson<sup>\u00ae<\/sup> Red Fort"},
        {id:396,name: "Foothills Harley-Davidson<sup>&reg;<\/sup>"},
        {id:397,name: "Harley-Davidson<sup>&reg;<\/sup> of Hat Yai"},
        {id:398,name: "Harley-Davidson<sup>&reg;<\/sup> of Hat Yai"},
        {id:399,name: "Harley-Davidson<sup>&reg;<\/sup> Northern Emirates"},
        {id:400,name: "Perth Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:401,name: "Southwest Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:402,name: "Harley-Davidson<sup>\u00ae<\/sup> Stratstone"},
        {id:403,name: "Harley-Davidson<sup>&reg;<\/sup> PARIS Bastille"},
        {id:404,name: "Harley-Davidson<sup>\u00ae<\/sup> Paris Etoile"},
        {id:405,name: "Harley-Davidson<sup>\u00ae<\/sup> of Korea"},
        {id:407,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9ad8\u677e"},
        {id:409,name: "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30bb\u30f3\u30c8\u30e9\u30eb\u4e16\u7530\u8c37"},
        {id:410,name: "Harley-Davidson<sup>&reg;<\/sup> of Phnom Penh"},
        {id:411,name: "Raging Bull Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:412,name: "Vradi Harley-Davidson<sup>&reg;<\/sup>"},
        {id:413,name: "Thomas-Lee Harley-Davidson<sup>&reg;<\/sup>"},
        {id:414,name: "Harley-Davidson<sup>\u00ae<\/sup> Vladivostok"},
        {id:415,name: "San Diego Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:416,name: "Richardson's Harley-Davidson<sup>&reg;<\/sup>"},
        {id:417,name: "Queen City Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:418,name: "Carolina Coast Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:419,name: "New River Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:420,name: "Beach House Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:421,name: "Northwest Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:422,name: "Harley-Davidson<sup>\u00ae<\/sup> Ume\u00e5"},
        {id:424,name: "Myrtle Beach Harley-Davidson<sup>&reg;<\/sup>"},
        {id:425,name: "Harley-Davidson<sup>\u00ae<\/sup> of Dallas"},
        {id:426,name: "Victorville Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:427,name: "CrossRoads Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:428,name: "Thunder Road Harley-Davidson<sup>&reg;<\/sup>"},
        {id:429,name: "Collier Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:430,name: "Summerville Harley-Davidson<sup>&reg;<\/sup>"},
        {id:431,name: "Low Country Harley-Davidson<sup>&reg;<\/sup>"},
        {id:432,name: "Pomona Valley Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:433,name: "Schaeffer's Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:434,name: "Timms Harley-Davidson<sup>&reg;<\/sup>"},
        {id:435,name: "Appalachian Harley-Davidson<sup>&reg;<\/sup>"},
        {id:436,name: "Timms Harley-Davidson<sup>\u00ae<\/sup> of Augusta"},
        {id:437,name: "H-D\u00ae of Nassau County"},
        {id:438,name: "The Harley-Davidson<sup>\u00ae<\/sup> Shop at the Beach"},
        {id:439,name: "Blue Ridge Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:440,name: "Redstone Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:441,name: "Harley-Davidson<sup>\u00ae<\/sup> of Charlotte"},
        {id:442,name: "Mathews Harley-Davidson<sup>\u00ae<\/sup"},
        {id:443,name: "Red River Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:444,name: "Harley-Davidson<sup>\u00ae<\/sup> of Montgomery"},
        {id:445,name: "Wildhorse Harley-Davidson<sup>&reg;<\/sup>"},
        {id:446,name: "Harley-Davidson<sup>\u00ae<\/sup> of Macau"},
        {id:447,name: "Harley-Davidson<sup>&reg;<\/sup> of Fresno"},
        {id:448,name: "Harley-Davidson<sup>\u00ae<\/sup> of Macau"},
        {id:449,name: "Harley-Davidson<sup>\u00ae<\/sup> Petaling Jaya"},
        {id:450,name: "Belfast Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:451,name: "Harley-Davidson<sup>&reg;<\/sup> Accra"},
        {id:452,name: "Harley-Davidson<sup>&reg;<\/sup> of Mandalay"},
        {id:453,name: "Vreeland's Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:454,name: "Yellowstone Harley-Davidson<sup>&reg;<\/sup>"},
        {id:455,name: "Siliwangi Harley-Davidson\u00ae of Bandung"},
        {id:463,name: "Siliwangi Harley-Davidson\u00ae of Bandung"},
        {id:464,name: "Parr Moto Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:465,name: "Republic Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:466,name: "Adelaide H-D\u00ae Bike Works"},
        {id:467,name: "Rattlesnake Mountain Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:468,name: "Harley-Davidson<sup>\u00ae<\/sup> Arrowhead"},
        {id:469,name: "Dallas Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:470,name: "Chandler Harley-Davidson"},
        {id:471,name: "Sierra Vista Harley-Davidson<sup>&reg;<\/sup>"},
        {id:478,name: "Harley-Davidson<sup>\u00ae<\/sup> Tucson"},
        {id:479,name: "Harley-Davidson<sup>&reg;<\/sup> Old Pueblo"},
        {id:480,name: "Dave's River Valley Harley-Davidson<sup>&reg;<\/sup>"},
        {id:481,name: "Harley-Davidson<sup>\u00ae<\/sup> Helsinki"},
        {id:482,name: "Harley-Davidson<sup>\u00ae<\/sup> TOURS"},
        {id:483,name: "Harley-Davidson<sup>\u00ae<\/sup> Odessa"},
        {id:486,name: "Appleton Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:487,name: "Istanbul-East"},
        {id:488,name: "Harley-Davidson<sup>\u00ae<\/sup> Adana"},
        {id:489,name: "Kalimas Harley-Davidson\u00ae of Solo Baru"},
        {id:490,name: "Harley-Davidson<sup>\u00ae<\/sup> Ko\u0161ice"},
        {id:491,name: "Harley-Davidson<sup>&reg;<\/sup> 7 Media Group"},
        {id:492,name: "Harley-Davidson<sup>&reg;<\/sup> of Melaka"},
        {id:493,name: "Yankee Harley-Davidson<sup>&reg;<\/sup>"},
        {id:494,name: "Texas Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:495,name: "Roughneck Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:496,name: "Lumberjack Harley-Davidson<sup>&reg;<\/sup>"},
        {id:513,name: "Texoma Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:514,name: "Rooster's Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:515,name: "District Harley-Davidson<sup>&reg;<\/sup>"},
        {id:516,name: "Texarkana Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:517,name: "Harley-Davidson<sup>\u00ae<\/sup> of Indianapolis"},
        {id:518,name: "Manchester Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:519,name: "Harley-Davidson<sup>\u00ae<\/sup> \u0421\u0410\u041c\u0410\u0420\u0410"},
        {id:520,name: "Dubois Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:521,name: "Black-Magic Harley-Davidson<sup>&reg;<\/sup>"},
        {id:522,name: "Magic City Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:523,name: "Charley Harley "},
        {id:524,name: "Frontier Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:525,name: "Speedway Harley-Davidson<sup>&reg;<\/sup>"},
        {id:526,name: "Harley-Davidson<sup>\u00ae<\/sup> of Staten Island"},
        {id:527,name: "High Desert Harley-Davidson<sup>&reg;<\/sup>"},
        {id:529,name: "Harley-Davidson<sup>&reg;<\/sup> Sofia"},
        {id:530,name: "Four Rivers Harley-Davidson<sup>&reg;<\/sup>"},
        {id:531,name: "Tifton Harley-Davidson<sup>&reg;<\/sup>"},
        {id:532,name: "Kent's Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:533,name: "Uke's Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:534,name: "REIMAN'S HARLEY-DAVIDSON"},
        {id:535,name: "Bert's Black Widow Harley-Davidson<sup>&reg;<\/sup>"},
        {id:536,name: "Thunder Tower West Harley-Davidson<sup>&reg;<\/sup>"},
        {id:537,name: "Harley-Davidson<sup>\u00ae<\/sup> Mitchell's Modesto"},
        {id:538,name: "Harley-Davidson<sup>\u00ae<\/sup> of Waco"},
        {id:539,name: "Bert's Barracuda Harley-Davidson<sup>&reg;<\/sup>"},
        {id:540,name: "Boswell's Ring of Fire Harley-Davidson<sup>\u00ae<\/sup> "},
        {id:541,name: "Boswell's Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:542,name: "Harley-Davidson<sup>&reg;<\/sup> Sopron"},
        {id:543,name: "Boswell's Country Roads Harley-Davidson<sup>\u00ae<\/sup> "},
        {id:544,name: "Harley-Davidson<sup>\u00ae<\/sup> of Madison"},
        {id:547,name: "Great South Harley-Davidson<sup>&reg;<\/sup>"},
        {id:548,name: "St. Paul Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:549,name: "Harley-Davidson<sup>\u00ae<\/sup> Gainesville"},
        {id:550,name: "Wild Prairie Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:551,name: "Stinger Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:552,name: "Lane Splitter Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:553,name: "Alligator Alley Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:554,name: "JS MOTORSPORTS"},
        {id:555,name: "TSI Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:556,name: "Thunder Tower Harley-Davidson<sup>&reg;<\/sup>"},
        {id:557,name: "Grupo BMC Harley-Davidson<sup>&reg;<\/sup>"},
        {id:558,name: "Harley-Davidson<sup>&reg;<\/sup> Ras Al Khaimah"},
        {id:559,name: "Quick Fix Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:560,name: "Harley-Davidson<sup>&reg;<\/sup> Orlando"},
        {id:561,name: "Cowboy Harley-Davidson<sup>\u00ae<\/sup> Austin"},
        {id:562,name: "Cowboy's Alamo City Harley-Davidson<sup>\u00ae<\/sup>"},
        {id:563,name: "Cowboy Harley-Davidson<sup>\u00ae<\/sup> of Beaumont"}
    ]
};