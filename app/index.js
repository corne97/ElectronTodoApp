const { ipcRenderer, mainWindow } = require('electron');
const fs = require("fs");

// Add a click event listener to the button
const openBtn = document.getElementById('openNewWindowButton')
openBtn.addEventListener('click', function (event)
{
  // Send IPC message to request opening a new window
  ipcRenderer.send('open-newWindow');
});

// Add a click event listener to the submit button
const savebtn = document.getElementById('submit')
savebtn.addEventListener('click', function (event)
{
  saveData();

});


const closebtn = document.getElementById('close')
closebtn.addEventListener('click', function (event)
{
  ipcRenderer.send('close-window')
});

ipcRenderer.on('close-window', () =>
{
    closeWindow()
});


function closeWindow(){
  window.close()
}

// const maxbtn = document.getElementById('maximize')
// maxbtn.addEventListener('click', function (event)
// {
//   ipcRenderer.send('maximize-window')
// });

// ipcRenderer.on('maximize-window', () =>
// {
//     maximizeWindow()
// });


// function maximizeWindow(){
//   if(mainWindow.isMaximized()) {
//     mainWindow.isMaximized();
//   } else {
//     mainWindow.maximize();
//   }
// }


function saveData()
{   // get text from input field and save in txt file
  const textInput = document.getElementById('txt').value;
  fs.writeFile('./notes/test.txt', textInput, (err) =>
  {
    if (err)
    {
      console.log(err);
      return;
    }
    console.log("text has been saved to textfile.txt")

  })
}


