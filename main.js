const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const { contextIsolated } = require('process');
const fs = require('fs');

let mainWindow = null;
let otherWindow = null;


app.on('ready', () =>
{
    // Create the main window
    createMainWindow();

    // Set up an IPC listener to open a new window
    ipcMain.on('open-newWindow', () =>
    {
        createOtherWindow();   
    });
   
});


// not working yet....

// const NOTIFICATION_TITLE = 'Basic Notification'
// const NOTIFICATION_BODY = 'Notification from the Main process'

// function showNotification(){
//     new Notification({title: NOTIFICATION_TITLE, body:NOTIFICATION_BODY}).show()
// }


// app.whenReady().then(createWindow).then(showNotification)



function createWindow()
{
    const window = new BrowserWindow({
        maxWidth:520,
        minWidth:220,
        maxHeight:640,
        minHeight:440,
        width:350,
        height:520,
        transparent:true,
        frame:false,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
                
        },
    });

    window.loadFile('./app/index.html');
    window.webContents.openDevTools({mode:"detach"})

    return window;
}

function createMainWindow()
{
    // check if main window is open
    if(mainWindow !== null)
    {
        console.log("Main window is already open!");
        mainWindow.focus();
        return;
    }

    // else we create it
    mainWindow = createWindow("./app/index.html");

    // when the window closes we wanna set the variable back to null
    mainWindow.on("close", () => { mainWindow = null; })


}


function createOtherWindow()
{
    // check if other window is open
    if(otherWindow !== null)
    {
        console.log("Main window is already open!");
        otherWindow.focus();
        return;
    }

    // else we create it
    otherWindow = createWindow("./app/newWindow.html");

    // when the window closes we wanna set the variable back to null
    otherWindow.on("close", () => { otherWindow = null; })
}

