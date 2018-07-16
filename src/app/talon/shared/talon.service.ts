import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { of, Observable } from 'rxjs';
import { map, tap, switchMap, filter } from 'rxjs/operators';

import { ElectronService } from 'ngx-electron';
import { ConnectionConfig } from 'tedious';
import { from } from 'rxjs';
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

    constructor(private http: HttpClient, private _electronService: ElectronService, private logService: LogService) { }

    fetchTalonCredentials(dealershipId: number) {
        return this.http.get<iTalonDetails>(`@api/talon-details/${dealershipId}`).pipe(
            tap(resp => {
                this.lastImported = resp.lastImportedAt;
                // this.apiKey = resp.talonApiKey;
            })
        );
    }

    /**
     * Top level function to fetch db Config, access DB table
     * and upload to server
     * @param dealershipId Target dealership id
     */
    fetchAndUpload(dealershipId: number) {
        console.log('uploading to server...');
        let _config;
        this.fetchTalonCredentials(dealershipId).pipe(
            tap(config => _config = config),
            switchMap(config => this.fetchBikes(config)),
            switchMap(bikes => this.uploadToServer(dealershipId, _config, bikes))
        ).subscribe(resp => {
            console.log('SUCCESS bikes uplaoded. Resp back:', resp);
        }, err => {
            this.logService.log(dealershipId, JSON.stringify(err), {inventoryImportId: _config.inventoryImportId});
            console.log('Bikes not sent!!! Upload Failed:', err);
        });
    }

    /**
     * Fetch bikes from Talon MSSQLDatabase
     * Sends request to main apllication thread
     * @param talonCredentials
     */
    async fetchBikes(config: iTalonDetails) {
        if (!this._electronService.isElectronApp) throw Error('Not running in Electron');

        return await new Promise<any[]>((resolve: Function, reject: Function) => {
            this._electronService.ipcRenderer.once('db-bikes-resp', (event, arg) => {
                console.log('Talon Bikes:',arg);
                resolve(arg)
            })

            this._electronService.ipcRenderer.send('db-bikes-select', this.fomatForTedious(config))
        });
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

    /**
     * Upload bikes table data to server
     * @param dealershipId Target dealership id
     * @param config Talon config from API
     * @param bikes Bike table data
     */
    uploadToServer(dealershipId: number, config: iTalonDetails, bikes: any[]) {
        const headers: {[header: string]: string} = {'Authorization': `apikey ${config.talonApiKey}`};
        return this.http.post(`@api/talon-importer/${config.inventoryImportId}`,{websiteId:dealershipId, Table: bikes}, {headers});
    }

    // sendToServer = function() {
    //     this
    //     api/talon-importer/{inventory_import_id}
    // }

    // fetchAndUpload
}
