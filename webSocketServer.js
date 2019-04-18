// --------------------------------------------------------------------------
// Application Node pour créer un serveur relais entre un client web et
// une application MAX
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
// Gestion de la liaison websocket entre le serveur Node.JS et le client Web
// Il faut que la connexion WebSocket soit ouverte pour ouvrir liaison UDP
// --------------------------------------------------------------------------

var osc = require("osc");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 7474 });

console.log("WebSocket Server started...");

wss.on("connection", function (ws) {
    
    console.log("Browser connected online...")
    
    var oscPort = new osc.WebSocketPort({
        socket: ws,
        metadata: true
    });

    //Gestion de la réception des messages
    oscPort.on("message", function (oscMsg) {
        console.log("Received from Web Browser: ", oscMsg);
        addresse=oscMsg['address'];
        valeur=oscMsg['args'][0]['value'];
        message=addresse+" "+valeur;
    });

    // -----------------------------------------------------------------------------------
    // Gestion de la liaison UDP entre le serveur Node.JS et l'application MAX 7
    // -----------------------------------------------------------------------------------

    var udp = new osc.UDPPort({
        localAddress: "0.0.0.0",
        //port écouté par le serveur NODE.JS côté liaison Node<-Max
        localPort: 7400,
        //adresse serveur MAX à préciser
        //port écouté par MAX à préciser
        //on reste en local
        remoteAddress: "127.0.0.1",
        remotePort: 7500,
        metadata:true
    });

    udp.on("ready", function () {
        var ipAddresses = getIPAddresses();
        console.log("Listening for OSC over UDP.");
        ipAddresses.forEach(function (address) {
            console.log(" Host:", address + ", Port:", udp.options.localPort);
        });
        console.log("Broadcasting OSC over UDP to", udp.options.remoteAddress + ", Port:", udp.options.remotePort);
    });

    //Gestion de la réception des messages
    udp.on("message", function (message,timetag,info) {
        console.log("Received from Max :", message);
    });

    udp.on("error", function (error) {
        console.log("An error occurred: ", error.message);
    });

    udp.open();

    //Définit un relais entre liaison OSC et liaison UDP
    //Dès qu'un message OSC arrive par la liaison WebSocket (depuis client web), le message est renvoyé par la liaison UDP (vers MAX)
    //Dès qu'un message OSC arrive par la liaison UDP (depuis MAX), le message est renvoyé par la liaison WebSocket (vers client web)
    var relay = new osc.Relay(udp, oscPort, {
        raw: true
    });

});


var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces){
        var addresses = interfaces[deviceName];

        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];

            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }
    return ipAddresses;
};



