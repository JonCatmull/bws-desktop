
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path');
const url = require('url');

const { MssqlService } = require('./app-electron/mssql.service');

console.log('starting electron...');

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
    let win;

    function createWindow () {
        // set timeout to render the window not until the Angular
        // compiler is ready to show the project

        // Create the browser window.
        win = new BrowserWindow({
            width: 1400,
            height: 900,
            icon: './src/favicon.ico',
            webPreferences: {
                nodeIntegration: true // turn it on to use node features
            }
        })

        // and load the app.
        // win.loadURL(url.format({
        //     pathname: 'localhost:4200',
        //     protocol: 'http:',
        //     slashes: true
        // }));
        win.loadURL(url.format({
            pathname: path.join(__dirname, '../dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
        // win.loadFile('../dist/index.html')

        // Open the DevTools.
        win.webContents.openDevTools()

        // Emitted when the window is closed.
        win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null
        })
    }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow)

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow()
        }
    })

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.

    var mssqlService = new MssqlService();
    // ipcMain.on('db-select-bikes', function(event, arg) {
    //     mssqlService.fetchBikes().then(bikes => {
    //         event.return = bikes;
    //     }).catch(e => console.error("Main thread error:", e))
    // });
    ipcMain.on('db-bikes-select', (event, arg) => {
        mssqlService.fetchBikes(arg).subscribe(bikes => {
            event.sender.send('db-bikes-resp', bikes)
        }, e => {
            event.sender.send('db-bikes-resp', {error: e})
        })
    })


process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})



// const sql = require('mssql');
// const Connection = require('tedious').Connection;
// const Request = require('tedious').Request;

    // ipcMain.on('db-select-bikes', function(event, arg) {

    //     // var sql = require("mssql");

    //     // config for your database
    //     var config = {
    //         user: 'sa',
    //         password: '123',
    //         server: 'localhost',
    //         database: 'TALONStoreA'
    //     };
    //     // var con = {
    //     //     userName: 'sa',
    //     //     password: '123',
    //     //     server: 'localhost',
    //     //     // server: 'ROOM58-DEV5',
    //     //     options: {
    //     //         // encrypt: true, /*If you are connecting to a Microsoft Azure SQL database, you will need this*/
    //     //         database: 'TALONStoreA',
    //     //         // port: 1433,
    //     //         instanceName: "SQLEXPRESS"
    //     //     }
    //     // }
    //     console.log('begin connection to Talon...');
    //     // connect to your database
    //     sql.connect(config, function (err) {

    //         if (err) console.log(err);

    //         // create Request object
    //         var request = new sql.Request();

    //         // query to the database and get the records
    //         request.query('select * from Student', function (err, recordset) {

    //             if (err) console.log(err)

    //             // send records as a response
    //             event.returnValue = 'pong'

    //         });
    //     });
    // });

