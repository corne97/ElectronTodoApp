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


function deleteData(li) 
{
  
  // get the textContext from de html list element
  const txt = li.textContent;
  // find the index of the txt in te arrlist
  const index = listarr.indexOf(txt);

  // if the index === -1 it means that nothing is found
  if (index === -1)
  {
    // so lets show an error
    alert("Could not find list item");
    // and return out of the function
    return;
  }

  // if the index !== -1 we can remove it
  listarr.splice(index, 1); // remove from arrlist at index, but only remove 1

  // and as last, we remove the html list element
  li.remove(li);

  // remove item element
  document.getElementById("list").innerHTML = "";
}




// Render the list after data is saved to the file
function renderList()
{

  let list = document.getElementById('list');
  //clear list element to reduce duplicates
  document.getElementById('list').innerHTML = "";


  listarr.forEach((item) =>
  {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    btn.id="delete";
    li.innerText = item;
    list.appendChild(li);
    li.appendChild(btn);

    btn.innerHTML ='<img src="../images/trashbin.svg"/>'
    
    btn.addEventListener("click", function ()
    {
      deleteData(li);
      console.log("Button is clicked!");
    });
      
  });
}





