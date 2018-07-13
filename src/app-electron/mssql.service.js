var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// const sql = require('mssql');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
// import {Promise} from 'es6-promise'
var testConfig = {
    userName: 'sa',
    password: '123',
    server: 'localhost',
    // server: 'ROOM58-DEV5',
    options: {
        encrypt: false,
        database: 'TALONStoreA',
        // port: 1433,
        instanceName: "SQLEXPRESS"
    }
};
var MssqlService = /** @class */ (function () {
    function MssqlService() {
        console.log('mssql service instantiated');
        // this.fetchBikes().then(bikes => {
        //     console.log('SUCESSS!!!!',bikes);
        // }).catch(e => console.error("Main thread error:", e))
    }
    MssqlService.prototype.connect = function (dbConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var conn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        conn = this.connection;
                        if (!(this.connection && conn.STATE && conn.state === conn.STATE.LOGGED_IN)) return [3 /*break*/, 1];
                        console.log("DB already Connected - skip connect");
                        return [2 /*return*/, this.connection];
                    case 1: return [4 /*yield*/, new Promise(function (resolve, reject) {
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
                        })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MssqlService.prototype.runQuery = function (query, connection) {
        if (connection === void 0) { connection = this.connection; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var results = [];
                            var request = new Request(query, function (e, rowCount, rows) {
                                if (e) {
                                    reject(e);
                                }
                                else {
                                    console.log(rowCount + ' rows returned');
                                    try {
                                        resolve(JSON.stringify(results));
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
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Fetch bikes from MS SQL Talon DB
     */
    MssqlService.prototype.fetchBikes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect(testConfig)["catch"](function (e) { return console.error(".catch(" + e + ")"); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.runQuery("select * from dbo.bikes")["catch"](function (e) { return console.error(".catch(" + e + ")"); })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return MssqlService;
}());
exports.MssqlService = MssqlService;
// const sql = new MssqlService();
