import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { of, Observable } from 'rxjs';
import { map, tap, switchMap, filter, catchError, take, timeout, takeUntil, throwIfEmpty, finalize, mergeMap, takeLast } from 'rxjs/operators';
import * as moment from "moment";

import { ElectronService } from 'ngx-electron';
import { ConnectionConfig } from 'tedious';
import { from, Observable, throwError, of, interval, timer, Subject } from 'rxjs';
import { LogService } from '../../core/services/log.service';
import { NumberFormatStyle } from '@angular/common';

interface ITalonDetails {
    inventoryImportId: number;
    talonApiKey: string;
    talonSqlHost: string;
    talonSqlUsername: string;
    talonSqlPassword: string;
    talonSqlDatabase: string;
    lastImportedAt: string;
}

interface ISchedulerForm {
    startDate: string;
    repeat: boolean;
    intervalDuration: number;
}


@Injectable({
    providedIn: 'root'
})
export class TalonService {

    lastImported: string;
    // apiKey: string;
    // connectionConfig: ConnectionConfig;
    scheduledUpload$: Subject<any> = new Subject();
    scheduledUploadStatus: string = '';
    // scheduledUploadEnd: Subject<any>;

    constructor(private http: HttpClient, private _electronService: ElectronService, private logService: LogService) {}

    fetchTalonCredentials(dealershipId: number) {
        return this.http.get<ITalonDetails>(`@api/talon-details/${dealershipId}`).pipe(
            tap(talonConfig => {
                console.log('last imported',talonConfig.lastImportedAt, moment(talonConfig.lastImportedAt).toISOString());
                this.lastImported = moment(talonConfig.lastImportedAt).toISOString()
                // this.lastImported = talonConfig.lastImportedAt;
            })
        );
    }

    /**
     * Top level function to fetch db Config, access DB table
     * and upload to server
     * @param dealershipId Target dealership id
     */
    // fetchAndUpload(dealershipId: number, _config?: ITalonDetails) {
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
    // fetchBikesAndUpload(dealershipId: number, _config?: ITalonDetails) {
    //     console.log('Fetch and upload to server...');
    //     return this.fetchBikes(dealershipId, _config).pipe(
    //         switchMap(bikes => this.postToServer(dealershipId, _config, bikes)),
    //         tap(resp => console.log('resp!!!!!',resp)),
    //         catchError(this.postErrorToAPI(dealershipId, _config))
    //     );
    // }
    fetchBikesAndUpload(dealershipId: number) {
        console.log('Fetch and upload to server...');
        let _config: ITalonDetails;
        return of(dealershipId).pipe(
            switchMap(id => this.fetchTalonCredentials(id)),
            tap(config => _config = config),
            switchMap(config => this.fetchBikesFromDB(config)),
            switchMap(bikes => this.postToServer(dealershipId, _config, bikes)),
            catchError(err => this.postErrorToAPI(dealershipId, _config, err))
        );
    }

    /**
     * Top level function to fetch db Config, access DB table
     * and upload to server
     * @param dealershipId Target dealership id
     */
    fetchBikes(dealershipId: number, _config: ITalonDetails): Observable<any[]> {
        console.log('Fetch Bikes...');
        return of(_config).pipe(
            // switchMap(id => (!_config) ? this.fetchTalonCredentials(id): of(_config)),
            // tap(config => _config = config),
            switchMap(config => this.fetchBikesFromDB(config)),
            catchError(err => this.postErrorToAPI(dealershipId, _config, err))
        );
    }

    endSchedule() {
        this.scheduledUpload$.next();
        this.scheduledUpload$.complete();
    }

    /**
     * Top level function schedule fetch & upload to server
     * Stores Talon Config
     * @param dealershipId Target dealership id
     */
    startSchedule(dealershipId: number, form: ISchedulerForm) {
        console.log('Schedule upload to server...');
        this.scheduledUpload$ = new Subject();
        this.scheduledUpload$.next('Fetching config');

        // if (moment().isBefore(moment(form.startDate))) {}

        const secondsToStart = this.getSecondsDiff(form.startDate);
        // const secondsInDay = 86400;
        const secondsInDay = 10; //testing only
        const schedule$ = (form.repeat && form.intervalDuration)
            ? timer(secondsToStart*1000, secondsInDay*form.intervalDuration*1000)
            : timer(secondsToStart*1000);

        console.log('timer(',secondsToStart * 1000, secondsInDay * form.intervalDuration * 1000, schedule$);

        // const fetch

        let _config: ITalonDetails;
        return of(dealershipId).pipe(
            // Fetch and store Talon Config
            switchMap(id => this.fetchTalonCredentials(id)),
            tap(config => _config = config),
            // Test Talon config
            switchMap(config => {
                this.scheduledUpload$.next('Testing config');
                return from(this.fetchBikesFromDB(config)).pipe(
                    filter(bikes => Boolean(bikes && bikes.length)),
                    throwIfEmpty(() => Error('Connected but 0 bikes returned: ${bikes}'))
                )
            }),
            // Scheduled updates
            switchMap(_ => {
                this.scheduledUpload$.next(`Waiting for next upload on ${moment(form.startDate).format('dddd, MMMM Do YYYY hh:mm a')}`);
                return schedule$.pipe(
                    tap(index => {
                        console.log('Timer loop index: ', index);
                    }),
                    switchMap(_ => this.fetchBikesFromDB(_config)),
                    switchMap(bikes => this.postToServer(dealershipId, _config, bikes)),
                    takeUntil(this.scheduledUpload$),
                    takeLast(1)
                )
            }),
            take(1),
            catchError(err => this.postErrorToAPI(dealershipId, _config, err)),
            finalize(() => {
                this.endSchedule();
                console.log('schedule finished')
            })
        );
    }


    /**
     * Upload bikes table data to server
     * @param dealershipId Target dealership id
     * @param config Talon config from API
     * @param bikes Bike table data
     */
    postToServer(dealershipId: number, config: ITalonDetails, bikes: any[]) {
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
    async fetchBikesFromDB(config: ITalonDetails) {
        console.log('TalonService: fetchBikesFromDB()');
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

    postErrorToAPI(dealershipId, config, err) {
        let errMsg = `Error: ${JSON.stringify({dealershipId,config,err})}`;
        console.log(`${errMsg}:`, err);

        return this.logService.log(dealershipId, errMsg, {inventoryImportId: config.inventoryImportId})
            .pipe(
                switchMap(() => throwError(new Error(errMsg)))
            );
    }


    /**
     * Reformat config to the correct format for Tedious
     * @param config Talon config from API
     */
    fomatForTedious(config: ITalonDetails) {
        return {
            userName: String(config.talonSqlUsername),
            password: String(config.talonSqlPassword),
            server: String(config.talonSqlHost),
            options: {
                encrypt: false, /*If you are connecting to a Microsoft Azure SQL database, you will need this*/
                database: String(config.talonSqlDatabase),
                instanceName: "SQLEXPRESS" /* May not be needed in production */
            }
        }
    }

    getSecondsDiff(start: string, end: string = moment().toISOString()): number {
        const startDate = moment(start);
        const endDate = moment(end);
        const duration = moment.duration(startDate.diff(endDate));
        return duration.asSeconds();
    }



}
