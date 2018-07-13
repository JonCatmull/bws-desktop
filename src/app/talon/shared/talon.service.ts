import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { of, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { ElectronService } from 'ngx-electron';
import { ConnectionConfig } from 'tedious';
import { from } from 'rxjs';

interface iTalonDetails {
    inventoryImportId: number;
    talonApiKey: string;
    talonSqlHost: string;
    talonSqlUsername: string;
    talonSqlPassword: string;
    talonSqlDatabase: string;
    lastImportedAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class TalonService {

    lastImported: string;
    apiKey: string;
    connectionConfig: ConnectionConfig;

    constructor(private http: HttpClient, private _electronService: ElectronService) { }

    fetchTalonCredentials(dealershipId: number) {
        return this.http.get<iTalonDetails>(`@api/talon-details/${dealershipId}`).pipe(
            tap(resp => {
                this.lastImported = resp.lastImportedAt;
                this.apiKey = resp.talonApiKey;
            }),
            map(resp => {
                return {
                    userName: resp.talonSqlUsername,
                    password: resp.talonSqlPassword,
                    server: resp.talonSqlHost,
                    options: {
                        encrypt: false, /*If you are connecting to a Microsoft Azure SQL database, you will need this*/
                        database: resp.talonSqlDatabase,
                        instanceName: "SQLEXPRESS" /* May not be needed in production */
                    }
                }
            })
        );

        // MOCK
        // const mockTalonResp = {
        //     "inventoryImportId": 7,
        //     "talonApiKey": "h6cl6bgrv5m2.0fn546oti9p9lnqg3u.ami",
        //     "talonSqlHost": "192.168.0.200",
        //     "talonSqlUsername": "ROOM58",
        //     "talonSqlPassword": "QCHDRoom58",
        //     "talonSqlDatabase": "TALONStoreA",
        //     "lastImportedAt": "2018-07-02T13:50:15+01:00"
        // }
        // return of(mockTalonResp);
    }

    uploadToServer(dealershipId: number) {
        console.log('uploading to server...');
        this.fetchTalonCredentials(dealershipId).pipe(
            tap(config => console.log('config === ',config)),
            tap(config => this.connectionConfig = config),
            switchMap(config => from(this.fetchBikes(config)))
        ).subscribe(bikes => {
            console.log('Bikes!!! Wahooo!!!:', bikes);
        });
    }

    async fetchBikes(talonCredentials: any) {
        if (!this._electronService.isElectronApp) throw Error('Not running in Electron');

        return await new Promise((resolve: Function, reject: Function) => {
            this._electronService.ipcRenderer.once('db-bikes-resp', (event, arg) => {
                console.log('Talon Bikes:',arg);
            })

            this._electronService.ipcRenderer.send('db-bikes-select', talonCredentials)
        });
    }

    // uploadToServer
}
