
// const sql = require('mssql');
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
import { ConnectionConfig } from 'tedious';
// import {Promise} from 'es6-promise'

const testConfig: ConnectionConfig = {
    userName: 'sa',
    password: '123',
    server: 'localhost',
    // server: 'ROOM58-DEV5',
    options: {
        encrypt: false, /*If you are connecting to a Microsoft Azure SQL database, you will need this*/
        database: 'TALONStoreA',
        // port: 1433,
        instanceName: "SQLEXPRESS"
    }
}

class MssqlService {

    connection: any;

    constructor() {
        console.log('mssql service instantiated');
        // this.fetchBikes().then(bikes => {
        //     console.log('SUCESSS!!!!',bikes);
        // }).catch(e => console.error("Main thread error:", e))
    }

    async connect(dbConfig: ConnectionConfig) {
        const conn = this.connection as any;
        if (this.connection && conn.STATE && conn.state === conn.STATE.LOGGED_IN) {
            console.log(`DB already Connected - skip connect`);
            return this.connection;
        } else {
            return await new Promise((resolve: Function, reject: Function) => {
                this.connection = new Connection(dbConfig);
                this.connection.on('connect', (err: Error) => {
                    if (err) {
                        console.error("Connection error:", err);
                        reject(err);
                    } else {
                        console.log('DB Connected')
                        resolve(this.connection);
                        // this.fetchBikes();
                    }
                });
                this.connection.on('error', (err: Error) => {
                    console.error("Connection failed:", err);
                    reject(err);
                });
            });
        }
    }

    async runQuery(query: string, connection: any = this.connection) {

        return await new Promise((resolve: Function, reject: Function) => {

            var results: any[] = [];

            var request = new Request(query, (e: Error, rowCount: number, rows: any[]) => {
                if (e) {
                    reject(e);
                } else {
                    console.log(rowCount + ' rows returned');
                    try {
                        resolve(results);
                    } catch(e) {
                        reject(e);
                    }
                }
                connection.close();
            });

            request.on('row', (columns: any[]) => {
                var rowdata: any = new Object();
                for (let column of columns) {
                    rowdata[column.metadata.colName] = column.value;
                };
                results.push(rowdata);
            });

            connection.execSql(request);
        });


    }

    /**
     * Fetch bikes from MS SQL Talon DB
     */
    async fetchBikes() {
        await this.connect(testConfig).catch(e => console.error(`.catch(${e})`));
        return await this.runQuery("select * from dbo.bikes").catch(e => console.error(`.catch(${e})`));
    }
}

exports.MssqlService = MssqlService;
// const sql = new MssqlService();
