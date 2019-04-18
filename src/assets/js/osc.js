
let divContainer = document.getElementById("container");

let webSocketServer=divContainer.dataset.webSocketServer;
let webSocketPort=divContainer.dataset.webSocketPort;

//on définit la websocket
let oscPort = new osc.WebSocketPort({
    url: "ws://"+webSocketServer+":"+webSocketPort, // URL to your Web Socket server.
    metadata: true
});

//on ouvre la WebSocket
oscPort.open();

oscPort.on("ready", function () {
    console.log("Liaison ouverte...");
});

oscPort.on("message", function (oscMsg) {
    console.log("RECEIVED: ", oscMsg);
    console.log("adresse OSC : "+oscMsg['address']);
    console.log("type: "+oscMsg['args'][0]['type']+" valeur: "+oscMsg['args'][0]['value']);
});

function sendValueOsc(param) {
    console.log("SENT : adresse OSC :"+param.adresseOsc + ",type valeur " +param.typeVal+",valeur : "+param.value);
    oscPort.send({
        address: param.adresseOsc,
        args: [
            {
                type: param.typeVal,
                value: param.value
            }
        ]
    })
}
