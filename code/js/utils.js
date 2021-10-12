var consoleLine = 0;

function showComponent(componentName,arrowName) {
  var i;
  var x = document.getElementsByClassName("component");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(componentName + "-tr").classList.toggle("is-active");
  if(document.getElementById(componentName).parentElement.style.display == "block"){
    document.getElementById(componentName).parentElement.style.display = "none";
    document.getElementById(arrowName).classList = "arrow up";
    document.getElementById("content_blocks").style.height = "88%";
  }else{
    document.getElementById(componentName).parentElement.style.display =
      "block";
    document.getElementById(arrowName).classList = "arrow down";
    document.getElementById("content_blocks").style.height = "75%";
  }
}

function addConsoleMessage(message){
  let IOconsole = document.getElementById("console");
  let p = document.createElement("p");
  p.id = "cl-"+consoleLine;
  p.innerText = message;
  if(IOconsole.parentElement.style.display == "none"){
    IOconsole.parentElement.style.display = "block";
  }
  IOconsole.append(p);
  IOconsole.scrollTop = IOconsole.scrollHeight - IOconsole.clientHeight;
  consoleLine += 1;
}

function showModal(message){
  const modal = new Modal(message,Code.workspace);
  modal.init();
  modal.show();
}

 function overlayOn() {
   document.getElementById("overlay").style.display = "block";
 }

 function overlayOff() {
   document.getElementById("overlay").style.display = "none";
 }

 function showConsoleInput(){
   let consoleInput = document.getElementById('console-input');
   let IOconsole = document.getElementById("console");
   consoleInput.parentNode.appendChild(consoleInput);
   consoleInput.style.display = "block";
   IOconsole.scrollTop = IOconsole.scrollHeight - IOconsole.clientHeight;
   consoleInput.focus();
 }

document.getElementById('console-input').addEventListener("submit", function(e){
  e.preventDefault(); // previene recarga de la pagina
  socket.emit('valorIO', document.getElementById('m').value);
  document.getElementById('m').value = ""
  document.getElementById('console-input').style.display = "none";
  return false;
});