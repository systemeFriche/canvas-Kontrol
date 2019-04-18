//require("../node_modules/osc/dist/osc");
require("../node_modules/osc/dist/osc-browser");
require("./assets/js/wsLink");
require("./assets/js/objectsKontrol");


//connexion websocket
let divContainer = document.getElementById("container");
let webSocketServer=divContainer.dataset.webSocketServer;
let webSocketPort=divContainer.dataset.webSocketPort;
let wsLink1 = new wsLink(webSocketServer,webSocketPort);

//initialisation objectsKontrol
let objetsK = new ObjectsKontrol(wsLink1);

function initInterface(){
    objetsK.loadObjects();
    objetsK.configureObjects();
}

//lance initialisation objectsKontrol si ws ouvert
//bout de code à remplacer par un promise
function checkConnexionState() {
    if(wsLink1.ws.connexionState === false) {
        window.setTimeout(checkConnexionState, 100);
    } else {
        wsLink1.ws.receptionMessageOsc=function(oscMsg){
            console.log("Received from server: ", oscMsg);
            console.log("OSC address: "+oscMsg['address']);
            let addressOsc=oscMsg['address'];
            console.log("type: "+oscMsg['args'][0]['type']+" value: "+oscMsg['args'][0]['value']);
            let messageOsc=oscMsg['args'][0]['value'];
            objetsK.receptionMessageOsc(addressOsc,messageOsc);
        };
        initInterface();
    }
}

checkConnexionState();