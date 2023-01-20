var consoleLine = 1;

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

function addConsoleMessage(message, priority = false){
  let IOconsole = document.getElementById("console");
  let IOConsoleParent = IOconsole.parentElement;
  let p = document.createElement("p");
  if(priority){
    p.style = "font-weight: bold;";
  }
  p.id = "cl-"+consoleLine;
  p.innerText = message;
  if(IOconsole.parentElement.style.display == "none"){
    IOconsole.parentElement.style.display = "block";
  }
  IOconsole.append(p);
  IOConsoleParent.scrollTop = IOConsoleParent.scrollHeight - IOConsoleParent.clientHeight;
  consoleLine += 1;
}

function showModal(message, title=""){
  const modal = new Modal(title, message,Code.workspace);
  modal.init();
  modal.show();
}

 function overlayOn() {
   document.getElementById("overlay").style.display = "block";
 }

 function overlayOff() {
   document.getElementById("overlay").style.display = "none";
 }

 function showConsoleInput(message){
   let consoleInput = document.getElementById('console-input');
   let IOconsole = document.getElementById("console");
   let consolePrompt = document.getElementById("console-input-message");
   consolePrompt.innerText = message;
   consoleInput.parentNode.appendChild(consoleInput);
   consoleInput.style.display = "block";
   IOconsole.scrollTop = IOconsole.scrollHeight - IOconsole.clientHeight;
   consoleInput.focus();
 }

document.getElementById('console-input').addEventListener("submit", function(e){
  e.preventDefault(); // previene recarga de la pagina
  let msj = {}
  msj.value = document.getElementById('m').value
  msj.id = getValue("idURL");
  socket.emit('valorIO', msj);
  document.getElementById('m').value = ""
  document.getElementById('console-input').style.display = "none";
  document.getElementById("console-input-message").innerText = "";
  return false;
});

function setValue(key, value){
  sessionStorage.setItem(key, value);
}

function getValue(key) {
  return sessionStorage.getItem(key);
}

function activeStream(url){
  document.getElementById("imgstream").src = url;
  document.getElementById("imgstream").removeAttribute("hidden");
}

function deactiveStream() {
  document.getElementById("imgstream").src = "media/img-default.jpg";
  document.getElementById("imgstream").setAttribute("hidden","");
}