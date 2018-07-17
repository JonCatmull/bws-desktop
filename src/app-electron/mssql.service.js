"use strict";
exports.__esModule = true;
// const sql = require('mssql');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// import {Promise} from 'es6-promise'
// const testConfig: ConnectionConfig = {
//     userName: 'sa',
//     password: '123',
//     server: 'localhost',
//     // server: 'ROOM58-DEV5',
//     options: {
//         encrypt: false, /*If you are connecting to a Microsoft Azure SQL database, you will need this*/
//         database: 'TALONStoreA',
//         // port: 1433,
//         instanceName: "SQLEXPRESS"
//     }
// }
var MssqlService = /** @class */ (function () {
    function MssqlService() {
        console.log('mssql service instantiated');
    }
    MssqlService.prototype.connect = function (dbConfig) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conn = _this.connection;
            if (_this.connection && conn.STATE && conn.state === conn.STATE.LOGGED_IN) {
                console.log("DB already Connected - skip connect");
                resolve(_this.connection);
            }
            else {
                _this.connection = new Connection(dbConfig);
                _this.connection.on('connect', function (err) {
                    if (err) {
                        console.error("Connection error:", err);
                        reject(err);
                    }
                    else {
                        console.log('DB Connected');
                        resolve(_this.connection);
                        // this.fetchBikes();
                    }
                });
                _this.connection.on('error', function (err) {
                    console.error("Connection failed:", err);
                    reject(err);
                });
            }
        });
    };
    MssqlService.prototype.runQuery = function (query, connection) {
        if (connection === void 0) { connection = this.connection; }
        return new Promise(function (resolve, reject) {
            var results = [];
            var request = new Request(query, function (e, rowCount, rows) {
                if (e) {
                    reject(e);
                }
                else {
                    console.log(rowCount + ' rows returned');
                    try {
                        resolve(results);
                    }
                    catch (e) {
                        reject(e);
                    }
                }
                connection.close();
            });
            request.on('row', function (columns) {
                var rowdata = new Object();
                for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                    var column = columns_1[_i];
                    rowdata[column.metadata.colName] = column.value;
                }
                ;
                results.push(rowdata);
            });
            connection.execSql(request);
        });
    };
    /**
     * Fetch bikes from MS SQL Talon DB
     */
    MssqlService.prototype.fetchBikes = function (config) {
        var _this = this;
        return rxjs_1.from(this.connect(config)).pipe(operators_1.switchMap(function (connection) { return _this.runQuery("select * from dbo.bikes"); }));
    };
    return MssqlService;
}());
exports.MssqlService = MssqlService;
// const sql = new MssqlService();
