const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { contextIsolated } = require('process');
const { ipcRenderer } = require('electron');
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


function createWindow()
{
    const window = new BrowserWindow({
        width: 920,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            frame:true,
        },
    });

    window.loadFile('./app/index.html');

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