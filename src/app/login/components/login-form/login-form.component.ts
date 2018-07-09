import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private fb:FormBuilder,
                 private authService: AuthService,
                 private router: Router) {

        this.loginForm = this.fb.group({
            email: ['jonathan.catmull@room58.com',Validators.required],
            password: ['jon',Validators.required]
        });
    }

    ngOnInit() {
    }

    login() {
        const val = this.loginForm.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe(
                    () => {
                        console.log("User is logged in");
                        this.router.navigateByUrl('/');
                    },
                    () => {
                        //TEMP HACK
                        this.authService.user = {...TestUser};
                        console.log("TEST user loaded",this.authService.user);
                        this.router.navigateByUrl('/');
                    }
                );
        }
    }
}

const TestUser = {
    "id": 2,
    "username": "jonathan.catmull@room58.com",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOiIyMDE4LTA3LTA5VDEzOjQ0OjA3KzAxOjAwIiwianRpIjoiWkRGa04ySXdZak01T1dVM1pHUTBOV1EzTXpsbE5qWTBaamt3TmpKbFpqVTFNMk5tWVRZeE1ERXpNREkyWWpZMk5HVXpNR1l4TWpBMk16TXpOVGRqWlE9PSIsImlzcyI6Ind3dy5oZGJ3cy5jb20iLCJkYXRhIjp7InVpZCI6Mn0sImV4cCI6IjIwMTgtMDctMDlUMTM6NTk6MDcrMDE6MDAifQ.6xq7ERrdQ2G-KlmUiZd2YLrCemKgX7o10Pmpctq9C-CwUlpHaVJCbtemcp-vcGhlRISB1s5gtdAVd8wKUWc3Aw",
    "websites": {
        "40": "H-D<sup>\u00ae<\/sup> American Dealer Showcase",
        "41": "Sycamore Harley-Davidson<sup>&reg;<\/sup>",
        "42": "Shaw Harley-Davidson<sup>\u00ae<\/sup>",
        "43": "Canberra Harley-Davidson<sup>\u00ae<\/sup>",
        "44": "Harley Central",
        "45": "Central Coast Harley-Davidson<sup>\u00ae<\/sup>",
        "46": "Harley-Davidson<sup>\u00ae<\/sup> of Blacktown",
        "47": "Phil's Garage Harley-Davidson<sup>\u00ae<\/sup>",
        "48": "SunCity Harley-Davidson<sup>\u00ae<\/sup>",
        "49": "Sunshine Coast Harley-Davidson<sup>&reg;<\/sup>",
        "50": "Geelong Harley-Davidson",
        "51": "Bikes & Bits",
        "52": "Harley-Heaven",
        "53": "Harbour City Harley-Davidson<sup>&reg;<\/sup>",
        "54": "Harley Magic Harley-Davidson<sup>\u00ae<\/sup>",
        "55": "McIver & Veitch Harley-Davidson<sup>&reg;<\/sup>",
        "56": "Harley-Davidson<sup>\u00ae<\/sup> Trondheim",
        "57": "Harley-Davidson<sup>\u00ae<\/sup> Bergen",
        "58": "Harley-Davidson<sup>\u00ae<\/sup> \u00c5lesund",
        "59": "Harley-Davidson<sup>&reg;<\/sup> \u00d8stfold",
        "60": "Harley-Davidson<sup>&reg;<\/sup> Vestfold",
        "61": "Harley-Davidson<sup>\u00ae<\/sup> Oslo",
        "62": "Harley-Davidson<sup>\u00ae<\/sup> Trollh\u00e4ttan",
        "63": "Harley-Davidson<sup>\u00ae<\/sup> J\u00e4rvs\u00f6",
        "64": "Harley-Davidson<sup>&reg;<\/sup> Norrk\u00f6ping",
        "65": "Harley-Davidson<sup>&reg;<\/sup> Tampere",
        "66": "Harley-Davidson<sup>&reg;<\/sup> Dubai",
        "67": "Harley-Davidson<sup>\u00ae<\/sup> Abu Dhabi",
        "68": "Harley-Davidson<sup>&reg;<\/sup> Fujairah",
        "69": "Harley-Davidson<sup>&reg;<\/sup> Doha",
        "70": "Harley-Davidson<sup>&reg;<\/sup> Riyadh",
        "71": "Harley-Davidson<sup>&reg;<\/sup> Jeddah",
        "72": "Harley-Davidson<sup>&reg;<\/sup> Dhahran",
        "73": "Harley-Davidson<sup>&reg;<\/sup> Jubail",
        "74": "Harley-Davidson<sup>&reg;<\/sup> Muscat",
        "75": "Harley-Davidson<sup>\u00ae<\/sup> Amman",
        "76": "Harley-Davidson<sup>&reg;<\/sup> Kuwait",
        "77": "Harley-Davidson<sup>&reg;<\/sup> Beirut",
        "78": "Harley-Davidson<sup>&reg;<\/sup> Bahrain",
        "79": "Harley-Davidson<sup>&reg;<\/sup> Casablanca",
        "80": "Harley-Davidson<sup>&reg;<\/sup> Casablanca",
        "81": "Harley-Davidson<sup>\u00ae<\/sup> Egypt",
        "82": "Harley-Davidson<sup>\u00ae<\/sup> Alger ",
        "83": "Harley-Davidson<sup>&reg;<\/sup> Cape Town",
        "84": "Harley-Davidson<sup>&reg;<\/sup> Tyger Valley",
        "85": "Johannesburg Harley-Davidson<sup>&reg;<\/sup>",
        "86": "Clearwater Harley-Davidson<sup>\u00ae<\/sup>",
        "87": "Harley-Davidson<sup>&reg;<\/sup> Durban",
        "88": "Harley-Davidson<sup>&reg;<\/sup> Gold Rand",
        "89": "Harley-Davidson<sup>&reg;<\/sup> Pretoria",
        "90": "Harley-Davidson<sup>&reg;<\/sup> Big Five",
        "91": "Harley-Davidson<sup>&reg;<\/sup> Zambezi",
        "92": "Harley-Davidson<sup>&reg;<\/sup> Bloemfontein",
        "93": "Harley-Davidson<sup>\u00ae<\/sup> Garden Route",
        "94": "Harley-Davidson<sup>&reg;<\/sup> Flying Twin",
        "95": "Harley-Davidson<sup>&reg;<\/sup> Mauritius - La Belle M\u00e9canique Lt\u00e9e",
        "96": "Harley-Davidson<sup>&reg;<\/sup> Mauritius",
        "97": "Harley-Davidson<sup>\u00ae<\/sup> Plze\u0148",
        "98": "Ostrava Harley-Davidson<sup>&reg;<\/sup>",
        "99": "Harley-Davidson<sup>\u00ae<\/sup> Budapest",
        "100": "Harley-Davidson<sup>\u00ae<\/sup> Liberator Warszawa",
        "101": "Harley-Davidson<sup>&reg;<\/sup> Katowice",
        "102": "Harley-Davidson<sup>\u00ae<\/sup> KRAK\u00d3W",
        "103": "Harley-Davidson<sup>\u00ae<\/sup> POZNA\u0143",
        "104": "Appaloosa Harley-Davidson<sup>\u00ae<\/sup>",
        "105": "Harley-Davidson<sup>\u00ae<\/sup> \u0141\u00f3d\u017a",
        "106": "Harley-Davidson<sup>\u00ae<\/sup> Gda\u0144sk",
        "107": "Harley-Davidson<sup>\u00ae<\/sup> Bratislava",
        "108": "Harley-Davidson<sup>\u00ae<\/sup> Pre\u0161ov",
        "109": "Harley-Davidson<sup>\u00ae<\/sup> Tallinn",
        "110": "Harley-Davidson<sup>\u00ae<\/sup> Riga",
        "111": "Harley-Davidson<sup>\u00ae<\/sup> Vilnius",
        "112": "\u041c\u043e\u0441\u043a\u0432\u0430 Harley-Davidson<sup>&reg;<\/sup>",
        "113": "\u041a\u0420\u0410\u0421\u041d\u041e\u0414\u0410\u0420 Harley-Davidson<sup>\u00ae<\/sup>",
        "114": "Harley-Davidson<sup>&reg;<\/sup> \u0415\u043a\u0430\u0442\u0435\u0440\u0438\u043d\u0431\u0443\u0440\u0433",
        "115": "Harley-Davidson<sup>&reg;<\/sup> \u0418\u0440\u043a\u0443\u0442\u0441\u043a",
        "116": "Harley-Davidson<sup>\u00ae<\/sup> \u0410\u0440\u0441\u0435\u043d\u0430\u043b\u044c\u043d\u0430\u044f",
        "117": "Harley-Davidson<sup>\u00ae<\/sup> \u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a",
        "118": "Harley-Davidson<sup>\u00ae<\/sup> \u0410\u0432\u0440\u043e\u0440\u0430 - \u043a\u0440\u0443\u043f\u043d\u0435\u0439\u0448\u0438\u0439 \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439 \u0434\u0438\u043b\u0435\u0440 \u0432 \u0421\u0430\u043d\u043a\u0442-\u041f\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433\u0435",
        "119": "Harley-Davidson<sup>\u00ae<\/sup> \u0420\u043e\u0441\u0442\u043e\u0432-\u043d\u0430-\u0414\u043e\u043d\u0443",
        "120": "Harley-Davidson<sup>\u00ae<\/sup> \u0410\u043b\u043c\u0430\u0442\u044b",
        "121": "Harley-Davidson<sup>&reg;<\/sup> M\u0438\u043d\u0441\u043a",
        "122": "Harley-Davidson<sup>\u00ae<\/sup> Kyiv",
        "123": "Harley-Davidson<sup>\u00ae<\/sup> Kyiv",
        "124": "Harley-Davidson<sup>&reg;<\/sup> Baku",
        "125": "Harley-Davidson<sup>\u00ae<\/sup> Bosphorus",
        "126": "HARLEY-DAVIDSON\u00ae BOSPHORUS",
        "127": "\u0130ZM\u0130R",
        "128": "Harley-Davidson<sup>\u00ae<\/sup> Avenue",
        "129": "Ankara",
        "130": "Harley-Davidson<sup>\u00ae<\/sup>   Antalya",
        "131": "Harley-Davidson<sup>\u00ae<\/sup> Antalya",
        "132": "Harley-Davidson<sup>&reg;<\/sup> Athena",
        "133": "Harley-Davidson<sup>\u00ae<\/sup> Thessaloniki",
        "134": "Harley-Davidson<sup>\u00ae<\/sup> Bucuresti",
        "135": "Harley-Davidson<sup>\u00ae<\/sup> Centre Cyprus",
        "136": "Harley-Davidson<sup>\u00ae<\/sup> Centre Cyprus",
        "137": "Harley-Davidson<sup>&reg;<\/sup> Beograd",
        "138": "Harley-Davidson<sup>\u00ae<\/sup> Zagreb",
        "139": "Malta Harley-Davidson<sup>\u00ae<\/sup>",
        "140": "Harley-Davidson<sup>\u00ae<\/sup> Sofia",
        "141": "Harley-Davidson<sup>\u00ae<\/sup> ISRAEL",
        "142": "Harley-Davidson<sup>\u00ae<\/sup> of Noumea",
        "143": "Harley-Davidson<sup>&reg;<\/sup> of Manila",
        "144": "Harley-Davidson<sup>\u00ae<\/sup> of Singapore",
        "145": "Harley-Davidson<sup>&reg;<\/sup> of Saigon",
        "146": "Harley-Davidson<sup>&reg;<\/sup> of Saigon",
        "147": "Harley-Davidson<sup>&reg;<\/sup> of Hanoi",
        "148": "Harley-Davidson<sup>&reg;<\/sup> of Hanoi",
        "149": "Harley-Davidson<sup>\u00ae<\/sup> of Kuala Lumpur",
        "150": "Harley-Davidson<sup>\u00ae<\/sup> of Hong Kong",
        "151": "Harley-Davidson<sup>&reg;<\/sup> Brunei",
        "153": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u65b0\u5bbf",
        "154": "Harley-Davidson<sup>&reg;<\/sup> HARLEY-DAVIDSON RIKUYU \/ \u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9678\u53cb",
        "155": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d0\u30eb\u30b3\u30e0\u5ca1\u5c71",
        "156": "HARLEY-DAVIDSON \u79cb\u7530",
        "157": "\u30d4\u30c3\u30c8\u30a4\u30f3\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \/ Pit-in Harley-Davidson<sup>&reg;<\/sup>",
        "159": "Harley-Davidson<sup>&reg;<\/sup> Asahikawa  \u3000\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u65ed\u5ddd",
        "160": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u3000\u30aa\u30fc\u30c8\u30e9\u30f3\u30c9\u672d\u5e4c",
        "161": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3MJM\u51fd\u9928",
        "162": "Harley-Davidson<sup>\u00ae<\/sup> OBIHIRO \/ \u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5e2f\u5e83",
        "163": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5ca9\u624b",
        "164": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5bae\u57ce",
        "165": "\u30c1\u30a7\u30ea\u30fc\u30ba\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5c71\u5f62",
        "166": "HARLEY-DAVIDSON \u798f\u5cf6\uff1a \u2605Used Bike \u2605\u4e2d\u53e4\u8eca\u7d9a\u3005\u5165\u8377\u4e2d\u2605",
        "167": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \u30b5\u30af\u30e9\u30a4",
        "168": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u8328\u57ce\u5357",
        "169": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u7fa4\u99ac",
        "170": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \u30c6\u30e9\u30ab\u30c9",
        "171": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u585a\u539f",
        "172": "Harley-Davidson<sup>\u00ae<\/sup> \u5b87\u90fd\u5bae",
        "173": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9ad8\u5d0e",
        "174": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30bb\u30f3\u30c8\u30e9\u30eb\u5ddd\u53e3",
        "175": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30bb\u30f3\u30c8\u30e9\u30eb\u6240\u6ca2",
        "176": "Harley-Davidson<sup>&reg;<\/sup> SAITAMA HANAZONO",
        "177": "Hiro's\u3000\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3",
        "178": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30b0\u30c3\u30c9\u30a6\u30c3\u30c9",
        "179": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \u30e1\u30ac\u677e\u6238",
        "180": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \u30b0\u30c3\u30c9\u30a6\u30c3\u30c9\uff0f\u8db3\u7acb\u5e97",
        "181": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6210\u7530",
        "182": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5e55\u5f35",
        "183": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30b7\u30c6\u30a3\uff0f\u897f\u6771\u4eac\u5e97",
        "184": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30b7\u30c6\u30a3\uff0f\u5ddd\u8d8a\u5e97",
        "185": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30b7\u30c6\u30a3\uff0f\u4e2d\u91ce\u5e97",
        "186": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30b7\u30c6\u30a3\uff0f\u67cf\u5e97",
        "187": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4e80\u6238",
        "188": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u76f8\u6a21\u539f",
        "189": "\u30ec\u30bf\u30fc\u30b7\u30e7\u30c3\u30d7\u516b\u738b\u5b50",
        "190": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4e09\u9df9",
        "191": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6c96\u7e04",
        "192": "Harley-Davidson<sup>&reg;<\/sup> Showa-no-Mori\uff0f\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u662d\u548c\u306e\u68ee",
        "193": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6771\u4e45\u7559\u7c73",
        "194": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u65b0\u6a2a\u6d5c",
        "195": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6e58\u5357",
        "196": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4e16\u7530\u8c37",
        "197": "\u30e6\u30fc\u30e1\u30c7\u30a3\u30a2\uff0f\u6a2a\u6d5c\u9752\u8449\u5e97",
        "198": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6a2a\u6d5c",
        "199": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6a2a\u6d5c\u5357",
        "200": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30a2\u30eb\u30d5\u30a1\u65b0\u6f5f",
        "201": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u77f3\u5ddd\u3000\/\u3000Harley-Davidson<sup>\u00ae<\/sup> Ishikawa",
        "202": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u798f\u4e95",
        "203": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5bcc\u5c71",
        "204": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u91d1\u6ca2\/HARLEY-DAVIDSON KANAZAWA",
        "205": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5c71\u68a8",
        "206": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9577\u91ce",
        "207": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u8acf\u8a2a",
        "208": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u98ef\u7530",
        "209": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30e2\u30c8\u30ed\u30de\u30f3",
        "210": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30bf\u30aa\u30ab\u6cbc\u6d25",
        "211": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9759\u5ca1",
        "212": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u77e5\u7acb",
        "213": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u540d\u53e4\u5c4b",
        "214": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6d5c\u677e",
        "215": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4eac\u962a",
        "216": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \u30e1\u30ac\u6771\u6d77",
        "217": "\u30aa\u30fc\u30c8\u30fb\u30ec\u30af\uff0f\u677e\u962a\u5e97",
        "218": "\uff8a\uff70\uff9a\uff70\uff80\uff9e\uff8b\uff9e\uff6f\uff84\uff9e\uff7f\uff9d\u4e09\u91cd\uff0f\u6851\u540d\u5e97:HARLEY-DAVIDSON MIE\/KUWANA",
        "219": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4eac\u90fd",
        "220": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4eac\u90fd\uff0f\u6d1b\u897f",
        "221": "\u30e6\u30fc\u30fb\u30a8\u30b9\u30fb\u30a8\u30fc\u30fb\u30ec\u30aa",
        "222": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5357\u5927\u962a",
        "223": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5948\u826f",
        "224": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6771\u5927\u962a",
        "225": "Harley-Davidson<sup>\u00ae<\/sup> OSAKA",
        "226": "Harley-Davidson<sup>&reg;<\/sup> MINO\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u7b95\u9762",
        "227": "Harley-Davidson<sup>&reg;<\/sup> \u9808\u78e8",
        "228": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u795e\u6238",
        "229": "Harley-Davidson<sup>\u00ae<\/sup> Terada Motors | \u5bfa\u7530\u30e2\u30fc\u30bf\u30fc\u30b9",
        "230": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d7\u30e9\u30b6\u4f0a\u4e39",
        "231": "\u5e83\u7551\u65e5\u7523\u81ea\u52d5\u8eca",
        "232": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30e9\u30a4\u30c0\u30fc\u30ba\u30af\u30ed\u30b9\u795e\u6238\u6e2f\u5cf6",
        "233": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u548c\u6b4c\u5c71",
        "234": "\u30e9\u30a4\u30c0\u30fc\u30ba\u30b9\u30dd\u30c3\u30c8\u30e0\u30e9\u30bf",
        "235": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5009\u6577",
        "236": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d0\u30eb\u30b3\u30e0\u5e83\u5cf6",
        "237": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d0\u30eb\u30b3\u30e0\u798f\u5c71",
        "238": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d0\u30eb\u30b3\u30e0\u6749\u4e26",
        "239": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u6771\u5e83\u5cf6",
        "240": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5c71\u53e3\u3000GOTOMOTORS Harley-Davidson<sup>&reg;<\/sup>",
        "241": "\u30aa\u30fc\u30c8\u30b7\u30e7\u30c3\u30d7\u30e8\u30b7\u30aa\u30ab",
        "242": "Harley-Davidson<sup>&reg;<\/sup> TOKUSHIMA",
        "243": "Harley-Davidson<sup>&reg;<\/sup> BLUE PANTHER",
        "244": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u535a\u591a",
        "245": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4f50\u8cc0",
        "246": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9ad8\u77e5",
        "247": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9577\u5d0e",
        "248": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5927\u5206",
        "249": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4f50\u4e16\u4fdd",
        "250": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5bae\u5d0e",
        "251": "\u30d0\u30a4\u30ab\u30fc\u30ba\u30b9\u30c6\u30fc\u30b7\u30e7\u30f3\u30a2\u30af\u30c6\u30a3\u30d6",
        "252": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9e7f\u5150\u5cf6",
        "253": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3MJM\u672d\u5e4c",
        "254": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u3064\u304f\u3070",
        "255": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5c0f\u5c71",
        "256": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30de\u30eb\u30c8\u30df\uff0f\u85e4\u6ca2\u5e97",
        "257": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u8c4a\u6a4b",
        "258": "Richco Harley-Davidson<sup>\u00ae<\/sup>",
        "259": "Richco Harley-Davidson<sup>\u00ae<\/sup>",
        "260": "Harley Davidson Dev site",
        "263": "Harley-Davidson<sup>\u00ae<\/sup> Desert Pearl",
        "264": "Harley-Davidson<sup>\u00ae<\/sup>  Cedarwoods",
        "269": "Akita Harley-Davidson<sup>\u00ae<\/sup>",
        "270": "Harley-Davidson<sup>\u00ae<\/sup> Stavanger",
        "271": "Harley-Davidson<sup>\u00ae<\/sup> Lule\u00e5",
        "272": "Harley-Davidson<sup>\u00ae<\/sup> of Johor Bahru",
        "273": "Harley-Davidson<sup>&reg;<\/sup> of Penang",
        "274": "Harley-Davidson<sup>\u00ae<\/sup> \u0423\u0444\u0430",
        "277": "Baikuya \/ Harley Shop",
        "278": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5c3e\u5f35\u6e05\u9808",
        "282": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u56fd\u7acb \/ Harley-Davidson<sup>\u00ae<\/sup> Kokuryu",
        "286": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u5317\u4e5d\u5dde",
        "290": "HARLEY-DAVIDSON\u00ae HONG KONG",
        "291": "Harley-Davidson<sup>\u00ae<\/sup> Twin Peaks",
        "292": "Harley-Davidson<sup>\u00ae<\/sup> Sofia",
        "293": "Harley-Davidson<sup>&reg;<\/sup> NAGAOKA",
        "294": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d0\u30eb\u30b3\u30e0\u798f\u5ca1\u897f",
        "295": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4ed9\u53f0",
        "296": "Harley-Davidson<sup>&reg;<\/sup> \u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u7df4\u99ac",
        "298": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3 \u30ec\u30a4\u30af\u30a6\u30c3\u30c9",
        "299": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30d5\u30bf\u30d0",
        "300": "Harley-Davidson<sup>\u00ae<\/sup> \u6ecb\u8cc0",
        "302": "HARLEY-DAVIDSON\u798f\u5ca1",
        "303": "Harley Davidson KUMAMOTO",
        "304": "Harley Davidson Recado",
        "305": "Demo German",
        "308": "Harley-Davidson<sup>\u00ae<\/sup> Kristiansand",
        "309": "Darling Downs Harley-Davidson<sup>&reg;<\/sup>",
        "310": "H-D<sup>\u00ae<\/sup> American Dealer MY18",
        "312": "Harley-Davidson<sup>\u00ae<\/sup> of Pattaya",
        "314": "Harley-Davidson<sup>\u00ae<\/sup> Pattaya",
        "319": "Northern Beaches Harley-Davidson<sup>\u00ae<\/sup>",
        "321": "JS MOTORSPORTS",
        "322": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u4e2d\u5ddd",
        "323": "Harley-Davidson<sup>\u00ae<\/sup> \u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a",
        "324": "Sumatera Motor Harley-Davidson<sup>&reg;<\/sup>",
        "333": "Harley-Davidson<sup>\u00ae<\/sup> Metropolitan Bangkok",
        "334": "Nusantara Harley-Davidson of Jakarta",
        "335": "Anak Elang Harley-Davidson of Jakarta",
        "336": "Anak Elang Harley-Davidson of Jakarta",
        "337": "Sumatera Motor Harley-Davidson<sup>\u00ae<\/sup>",
        "338": "Harley-Davidson<sup>&reg;<\/sup> Windhoek",
        "339": "Harley-Davidson<sup>\u00ae<\/sup> Rzesz\u00f3w",
        "340": "Harley-Davidson<sup>&reg;<\/sup> Poise Harley-Davidson<sup>\u00ae<\/sup> of Khon Kaen",
        "341": "Poise Harley-Davidson<sup>\u00ae<\/sup> of Khon Kaen",
        "349": "Harley-Davidson<sup>&reg;<\/sup> of Danang",
        "351": "Harley-Davidson<sup>\u00ae<\/sup> T\u00e4by",
        "352": "Harley-Davidson<sup>\u00ae<\/sup> G\u00f6teborg",
        "353": "Harley-Davidson<sup>\u00ae<\/sup> Helsingborg",
        "354": "Harley-Davidson<sup>\u00ae<\/sup> Malm\u00f6",
        "355": "Harley-Davidson<sup>\u00ae<\/sup> Stockholm",
        "356": "Harley-Davidson<sup>\u00ae<\/sup> Kazan",
        "357": "AAS Harley-Davidson<sup>\u00ae<\/sup>  of Bangkok",
        "358": "AAS Harley-Davidson<sup>\u00ae<\/sup>  of Bangkok",
        "359": "Harley-Davidson<sup>&reg;<\/sup> of Danang",
        "360": "Harley-Davidson<sup>&reg;<\/sup> of Ubon Ratchathani",
        "361": "Harley-Davidson<sup>&reg;<\/sup> of Ubon Ratchathani",
        "362": "Sarana Harley-Davidson of Bali",
        "363": "Sarana Harley-Davidson of Bali",
        "364": "Harley Davidson<sup>\u00ae<\/sup> Split",
        "365": "Northside Harley-Davidson<sup>\u00ae<\/sup>",
        "366": "Harley-Davidson<sup>\u00ae<\/sup> Oulu",
        "367": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30bb\u30f3\u30c8\u30e9\u30eb\u6771\u4eac\u5317",
        "369": "Bengal Harley-Davidson<sup>&reg;<\/sup>",
        "370": "Biker Bob's Harley-Davidson<sup>\u00ae<\/sup>",
        "371": "Motomart Harley-Davidson<sup>\u00ae<\/sup>",
        "372": "Harley-Davidson<sup>\u00ae<\/sup> Ljubljana",
        "374": "Chester Harley-Davidson<sup>\u00ae<\/sup>",
        "375": "Harley-Davidson<sup>\u00ae<\/sup> Ljubljana",
        "376": "Harley-Davidson<sup>&reg;<\/sup> \u0422\u044e\u043c\u0435\u043d\u044c",
        "377": "Tusker Harley-Davidson<sup>&reg;<\/sup>",
        "378": "Harley-Davidson<sup>\u00ae<\/sup> Capital",
        "379": "Harley-Davidson<sup>&reg;<\/sup> Banjara",
        "380": "Seven Islands Harley-Davidson<sup>&reg;<\/sup>",
        "381": "Nine Bridges Harley-Davidson<sup>&reg;<\/sup>",
        "382": "Harley-Davidson<sup>\u00ae<\/sup> Himalayan",
        "383": "Harley-Davidson<sup>\u00ae<\/sup> Spice Coast",
        "384": "Goa Harley-Davidson<sup>\u00ae<\/sup> (Tusker)",
        "385": "Tiger Harley-Davidson<sup>&reg;<\/sup>",
        "386": "Harley-Davidson<sup>\u00ae<\/sup> Two Rivers",
        "387": "Harley-Davidson<sup>&reg;<\/sup> Dunes",
        "388": "Diamond City Harley-Davidson<sup>\u00ae<\/sup>",
        "389": "United Harley-Davidson<sup>&reg;<\/sup>",
        "390": "Harley-Davidson<sup>\u00ae<\/sup> Malabar",
        "391": "Harley-Davidson<sup>\u00ae<\/sup> Nagpur",
        "392": "The Western Ghats Harley-Davidson<sup>\u00ae<\/sup>",
        "393": "Harley-Davidson<sup>&reg;<\/sup> Brahmaputra",
        "394": "Harley-Davidson<sup>\u00ae<\/sup> Grand Trunk",
        "395": "Harley-Davidson<sup>\u00ae<\/sup> Red Fort",
        "396": "Foothills Harley-Davidson<sup>&reg;<\/sup>",
        "397": "Harley-Davidson<sup>&reg;<\/sup> of Hat Yai",
        "398": "Harley-Davidson<sup>&reg;<\/sup> of Hat Yai",
        "399": "Harley-Davidson<sup>&reg;<\/sup> Northern Emirates",
        "400": "Perth Harley-Davidson<sup>\u00ae<\/sup>",
        "401": "Southwest Harley-Davidson<sup>\u00ae<\/sup>",
        "402": "Harley-Davidson<sup>\u00ae<\/sup> Stratstone",
        "403": "Harley-Davidson<sup>&reg;<\/sup> PARIS Bastille",
        "404": "Harley-Davidson<sup>\u00ae<\/sup> Paris Etoile",
        "405": "Harley-Davidson<sup>\u00ae<\/sup> of Korea",
        "407": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u9ad8\u677e",
        "409": "\u30cf\u30fc\u30ec\u30fc\u30c0\u30d3\u30c3\u30c9\u30bd\u30f3\u30bb\u30f3\u30c8\u30e9\u30eb\u4e16\u7530\u8c37",
        "410": "Harley-Davidson<sup>&reg;<\/sup> of Phnom Penh",
        "411": "Raging Bull Harley-Davidson<sup>\u00ae<\/sup>",
        "412": "Vradi Harley-Davidson<sup>&reg;<\/sup>",
        "413": "Thomas-Lee Harley-Davidson<sup>&reg;<\/sup>",
        "414": "Harley-Davidson<sup>\u00ae<\/sup> Vladivostok",
        "415": "San Diego Harley-Davidson<sup>\u00ae<\/sup>",
        "416": "Richardson's Harley-Davidson<sup>&reg;<\/sup>",
        "417": "Queen City Harley-Davidson<sup>\u00ae<\/sup>",
        "418": "Carolina Coast Harley-Davidson<sup>\u00ae<\/sup>",
        "419": "New River Harley-Davidson<sup>\u00ae<\/sup>",
        "420": "Beach House Harley-Davidson<sup>\u00ae<\/sup>",
        "421": "Northwest Harley-Davidson<sup>\u00ae<\/sup>",
        "422": "Harley-Davidson<sup>\u00ae<\/sup> Ume\u00e5",
        "424": "Myrtle Beach Harley-Davidson<sup>&reg;<\/sup>",
        "425": "Harley-Davidson<sup>\u00ae<\/sup> of Dallas",
        "426": "Victorville Harley-Davidson<sup>\u00ae<\/sup>",
        "427": "CrossRoads Harley-Davidson<sup>\u00ae<\/sup>",
        "428": "Thunder Road Harley-Davidson<sup>&reg;<\/sup>",
        "429": "Collier Harley-Davidson<sup>\u00ae<\/sup>",
        "430": "Summerville Harley-Davidson<sup>&reg;<\/sup>",
        "431": "Low Country Harley-Davidson<sup>&reg;<\/sup>",
        "432": "Pomona Valley Harley-Davidson<sup>\u00ae<\/sup>",
        "433": "Schaeffer's Harley-Davidson<sup>\u00ae<\/sup>",
        "434": "Timms Harley-Davidson<sup>&reg;<\/sup>",
        "435": "Appalachian Harley-Davidson<sup>&reg;<\/sup>",
        "436": "Timms Harley-Davidson<sup>\u00ae<\/sup> of Augusta",
        "437": "H-D\u00ae of Nassau County",
        "438": "The Harley-Davidson<sup>\u00ae<\/sup> Shop at the Beach",
        "439": "Blue Ridge Harley-Davidson<sup>\u00ae<\/sup>",
        "440": "Redstone Harley-Davidson<sup>\u00ae<\/sup>",
        "441": "Harley-Davidson<sup>\u00ae<\/sup> of Charlotte",
        "442": "Mathews Harley-Davidson<sup>\u00ae<\/sup",
        "443": "Red River Harley-Davidson<sup>\u00ae<\/sup>",
        "444": "Harley-Davidson<sup>\u00ae<\/sup> of Montgomery",
        "445": "Wildhorse Harley-Davidson<sup>&reg;<\/sup>",
        "446": "Harley-Davidson<sup>\u00ae<\/sup> of Macau",
        "447": "Harley-Davidson<sup>&reg;<\/sup> of Fresno",
        "448": "Harley-Davidson<sup>\u00ae<\/sup> of Macau",
        "449": "Harley-Davidson<sup>\u00ae<\/sup> Petaling Jaya",
        "450": "Belfast Harley-Davidson<sup>\u00ae<\/sup>",
        "451": "Harley-Davidson<sup>&reg;<\/sup> Accra",
        "452": "Harley-Davidson<sup>&reg;<\/sup> of Mandalay",
        "453": "Vreeland's Harley-Davidson<sup>\u00ae<\/sup>",
        "454": "Yellowstone Harley-Davidson<sup>&reg;<\/sup>",
        "455": "Siliwangi Harley-Davidson\u00ae of Bandung",
        "463": "Siliwangi Harley-Davidson\u00ae of Bandung",
        "464": "Parr Moto Harley-Davidson<sup>\u00ae<\/sup>",
        "465": "Republic Harley-Davidson<sup>\u00ae<\/sup>",
        "466": "Adelaide H-D\u00ae Bike Works",
        "467": "Rattlesnake Mountain Harley-Davidson<sup>\u00ae<\/sup>",
        "468": "Harley-Davidson<sup>\u00ae<\/sup> Arrowhead",
        "469": "Dallas Harley-Davidson<sup>\u00ae<\/sup>",
        "470": "Chandler Harley-Davidson",
        "471": "Sierra Vista Harley-Davidson<sup>&reg;<\/sup>",
        "478": "Harley-Davidson<sup>\u00ae<\/sup> Tucson",
        "479": "Harley-Davidson<sup>&reg;<\/sup> Old Pueblo",
        "480": "Dave's River Valley Harley-Davidson<sup>&reg;<\/sup>",
        "481": "Harley-Davidson<sup>\u00ae<\/sup> Helsinki",
        "482": "Harley-Davidson<sup>\u00ae<\/sup> TOURS",
        "483": "Harley-Davidson<sup>\u00ae<\/sup> Odessa",
        "486": "Appleton Harley-Davidson<sup>\u00ae<\/sup>",
        "487": "Istanbul-East",
        "488": "Harley-Davidson<sup>\u00ae<\/sup> Adana",
        "489": "Kalimas Harley-Davidson\u00ae of Solo Baru",
        "490": "Harley-Davidson<sup>\u00ae<\/sup> Ko\u0161ice",
        "491": "Harley-Davidson<sup>&reg;<\/sup> 7 Media Group",
        "492": "Harley-Davidson<sup>&reg;<\/sup> of Melaka",
        "493": "Yankee Harley-Davidson<sup>&reg;<\/sup>",
        "494": "Texas Harley-Davidson<sup>\u00ae<\/sup>",
        "495": "Roughneck Harley-Davidson<sup>\u00ae<\/sup>",
        "496": "Lumberjack Harley-Davidson<sup>&reg;<\/sup>",
        "513": "Texoma Harley-Davidson<sup>\u00ae<\/sup>",
        "514": "Rooster's Harley-Davidson<sup>\u00ae<\/sup>",
        "515": "District Harley-Davidson<sup>&reg;<\/sup>",
        "516": "Texarkana Harley-Davidson<sup>\u00ae<\/sup>",
        "517": "Harley-Davidson<sup>\u00ae<\/sup> of Indianapolis",
        "518": "Manchester Harley-Davidson<sup>\u00ae<\/sup>",
        "519": "Harley-Davidson<sup>\u00ae<\/sup> \u0421\u0410\u041c\u0410\u0420\u0410",
        "520": "Dubois Harley-Davidson<sup>\u00ae<\/sup>",
        "521": "Black-Magic Harley-Davidson<sup>&reg;<\/sup>",
        "522": "Magic City Harley-Davidson<sup>\u00ae<\/sup>",
        "523": "Charley Harley ",
        "524": "Frontier Harley-Davidson<sup>\u00ae<\/sup>",
        "525": "Speedway Harley-Davidson<sup>&reg;<\/sup>",
        "526": "Harley-Davidson<sup>\u00ae<\/sup> of Staten Island",
        "527": "High Desert Harley-Davidson<sup>&reg;<\/sup>",
        "529": "Harley-Davidson<sup>&reg;<\/sup> Sofia",
        "530": "Four Rivers Harley-Davidson<sup>&reg;<\/sup>",
        "531": "Tifton Harley-Davidson<sup>&reg;<\/sup>",
        "532": "Kent's Harley-Davidson<sup>\u00ae<\/sup>",
        "533": "Uke's Harley-Davidson<sup>\u00ae<\/sup>",
        "534": "REIMAN'S HARLEY-DAVIDSON",
        "535": "Bert's Black Widow Harley-Davidson<sup>&reg;<\/sup>",
        "536": "Thunder Tower West Harley-Davidson<sup>&reg;<\/sup>",
        "537": "Harley-Davidson<sup>\u00ae<\/sup> Mitchell's Modesto",
        "538": "Harley-Davidson<sup>\u00ae<\/sup> of Waco",
        "539": "Bert's Barracuda Harley-Davidson<sup>&reg;<\/sup>",
        "540": "Boswell's Ring of Fire Harley-Davidson<sup>\u00ae<\/sup> ",
        "541": "Boswell's Harley-Davidson<sup>\u00ae<\/sup>",
        "542": "Harley-Davidson<sup>&reg;<\/sup> Sopron",
        "543": "Boswell's Country Roads Harley-Davidson<sup>\u00ae<\/sup> ",
        "544": "Harley-Davidson<sup>\u00ae<\/sup> of Madison",
        "547": "Great South Harley-Davidson<sup>&reg;<\/sup>",
        "548": "St. Paul Harley-Davidson<sup>\u00ae<\/sup>",
        "549": "Harley-Davidson<sup>\u00ae<\/sup> Gainesville",
        "550": "Wild Prairie Harley-Davidson<sup>\u00ae<\/sup>",
        "551": "Stinger Harley-Davidson<sup>\u00ae<\/sup>",
        "552": "Lane Splitter Harley-Davidson<sup>\u00ae<\/sup>",
        "553": "Alligator Alley Harley-Davidson<sup>\u00ae<\/sup>",
        "554": "JS MOTORSPORTS",
        "555": "TSI Harley-Davidson<sup>\u00ae<\/sup>",
        "556": "Thunder Tower Harley-Davidson<sup>&reg;<\/sup>",
        "557": "Grupo BMC Harley-Davidson<sup>&reg;<\/sup>",
        "558": "Harley-Davidson<sup>&reg;<\/sup> Ras Al Khaimah",
        "559": "Quick Fix Harley-Davidson<sup>\u00ae<\/sup>",
        "560": "Harley-Davidson<sup>&reg;<\/sup> Orlando",
        "561": "Cowboy Harley-Davidson<sup>\u00ae<\/sup> Austin",
        "562": "Cowboy's Alamo City Harley-Davidson<sup>\u00ae<\/sup>",
        "563": "Cowboy Harley-Davidson<sup>\u00ae<\/sup> of Beaumont"
    }
};