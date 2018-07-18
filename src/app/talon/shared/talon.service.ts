import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { of, Observable } from 'rxjs';
import { map, tap, switchMap, filter, catchError } from 'rxjs/operators';

import { ElectronService } from 'ngx-electron';
import { ConnectionConfig } from 'tedious';
import { from, Observable, throwError, of } from 'rxjs';
import { LogService } from '../../core/services/log.service';

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
    // apiKey: string;
    // connectionConfig: ConnectionConfig;
    scheduledUpload: any;

    constructor(private http: HttpClient, private _electronService: ElectronService, private logService: LogService) { }

    fetchTalonCredentials(dealershipId: number) {
        console.log('TalonService: fetchTalonCredentials()');
        return this.http.get<iTalonDetails>(`@api/talon-details/${dealershipId}`).pipe(
            tap(resp => this.lastImported = resp.lastImportedAt)
        );
    }

    /**
     * Top level function to fetch db Config, access DB table
     * and upload to server
     * @param dealershipId Target dealership id
     */
    // fetchAndUpload(dealershipId: number, _config?: iTalonDetails) {
    //     console.log('Fetch and upload to server...');
    //     return of(dealershipId).pipe(
    //         switchMap(id => (!_config) ? this.fetchTalonCredentials(id): of(_config)),
    //         tap(config => _config = config),
    //         switchMap(config => this.fetchBikesFromDB(config)),
    //         switchMap(bikes => this.postToServer(dealershipId, _config, bikes)),
    //         tap(resp => console.log('resp!!!!!',resp)),
    //         catchError(err => this.logService.log(dealershipId, JSON.stringify(err), {inventoryImportId: _config.inventoryImportId})),
    //     );
    // }

    /**
     * Top level function to optionally fetch db Config, access DB table
     * and upload to server
     * @param dealershipId Target dealership id
     */
    fetchBikesAndUpload(dealershipId: number, _config?: iTalonDetails) {
        console.log('Fetch and upload to server...');
        return this.fetchBikes(dealershipId, _config).pipe(
            switchMap(bikes => this.postToServer(dealershipId, _config, bikes)),
            tap(resp => console.log('resp!!!!!',resp)),
            catchError(this.postErrorToAPI(dealershipId, _config))
        );
    }

    /**
     * Top level function to fetch db Config, access DB table
     * and upload to server
     * @param dealershipId Target dealership id
     */
    fetchBikes(dealershipId: number, _config?: iTalonDetails): Observable<any[]> {
        console.log('Fetch Bikes...');
        return of(dealershipId).pipe(
            switchMap(id => (!_config) ? this.fetchTalonCredentials(id): of(_config)),
            tap(config => _config = config),
            switchMap(config => this.fetchBikesFromDB(config)),
            catchError(this.postErrorToAPI(dealershipId, _config))
        );
    }

    /**
     * Top level function schedule fetch & upload to server
     * Stores Talon Config
     * @param dealershipId Target dealership id
     */
    scheduleUpload(dealershipId: number, form: any) {
        console.log('Schedule upload to server...');
        // return this.fetchBikes(dealershipId).pipe(

        //     switchMap(bikes => this.postToServer(dealershipId, _config, bikes)),
        //     tap(resp => console.log('resp!!!!!',resp)),
        //     catchError(err => {
        //         console.error('abort schedule');
        //         this.postErrorToAPI(dealershipId, _config))
        // );
    }

    /**
     * Upload bikes table data to server
     * @param dealershipId Target dealership id
     * @param config Talon config from API
     * @param bikes Bike table data
     */
    postToServer(dealershipId: number, config: iTalonDetails, bikes: any[]) {
        console.log('postToServer()');
        const headers: {[header: string]: string} = {'Authorization': `apikey ${config.talonApiKey}`};
        return this.http.post(`@api/talon-importer/${config.inventoryImportId}`,{websiteId:dealershipId, Table: bikes}, {headers}).pipe(
            tap(() => this.lastImported = new Date().toISOString())
        );
    }

    /**
     * Fetch bikes from Talon MSSQLDatabase
     * Sends request to main apllication thread
     * @param talonCredentials
     */
    async fetchBikesFromDB(config: iTalonDetails) {
        console.log('TalonService: fetchBikes()');
        if (!this._electronService.isElectronApp) throw Error('Not running in Electron');

        return await new Promise<any[]>((resolve: Function, reject: Function) => {
            this._electronService.ipcRenderer.once('db-bikes-resp', (event, arg) => {
                if (arg.error) {
                    reject(arg.error);
                } else {
                    console.log('Talon Bikes:',arg);
                    resolve(arg);
                }
            })

            this._electronService.ipcRenderer.send('db-bikes-select', this.fomatForTedious(config))
        });
    }

    postErrorToAPI(dealershipId, config) {
        return (err: any) => {
            let errMsg = `Error:
                dealershipId=${dealershipId}
                config=${config}
                error=${JSON.stringify(err)}
            `;
            console.log(`${errMsg}:`, err);

            return this.logService.log(dealershipId, errMsg, {inventoryImportId: config.inventoryImportId})
            .pipe(
                switchMap(() => throwError(new Error(errMsg)))
            )
        }
    }


    /**
     * Reformat config to the correct format for Tedious
     * @param config Talon config from API
     */
    fomatForTedious(config: iTalonDetails) {
        return {
            userName: config.talonSqlUsername,
            password: config.talonSqlPassword,
            server: config.talonSqlHost,
            options: {
                encrypt: false, /*If you are connecting to a Microsoft Azure SQL database, you will need this*/
                database: config.talonSqlDatabase,
                instanceName: "SQLEXPRESS" /* May not be needed in production */
            }
        }
    }

}
