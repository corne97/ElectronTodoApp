const {ipcRenderer} = require('electron');
const fs = require("fs");

// Add a click event listener to the button
const openBtn = document.getElementById('openNewWindowButton')
openBtn.addEventListener('click',function(event) {
    // Send IPC message to request opening a new window
    ipcRenderer.send('open-newWindow');
  });

// Add a click event listener to the submit button
  const savebtn = document.getElementById('submit')
  savebtn.addEventListener('click',function(event){
    // Send IPC message to save input to a txt file
    ipcRenderer.send('save-input');
  });


  
   // Set up an IPC listiner to save input to textfile
   ipcMain.on('save-input',() =>
   {
       saveData();
   });


function saveData()
{
    const textInput= document.getElementById('txt').value;
    fs.writeFile('./notes/test.txt',textInput, (err) =>{
        if (err) {
            console.log(err);
            return;
        }
        console.log("text has been saved to textfile.txt")
    })
}