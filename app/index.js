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


function closeWindow()
{
  window.close()
}


const textInput = document.getElementById('txt');
const listarr = [];

// Get input data and push it to an array and stringify and write to file
function saveData()
{
  listarr.push(textInput.value);
  const result = JSON.stringify(listarr);
  fs.writeFile('./notes/test.txt', result, "utf-8", (err) =>
  {
    if (err)
    {
      console.log(err);
      return;
    }
    console.log("text has been saved to test.txt")
    console.log(listarr)

    renderList();
  }
  )
}

// Render the list after data is saved to the file
function renderList()
{
  let list = document.getElementById('list');

  document.getElementById('list').innerHTML = "";

  listarr.forEach((item) =>
  {
    let li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}





