import osc from 'osc-browser';


class WsLink
{
    constructor(wsServer,wsPort) {
        //on définit la websocket
        this.ws = new osc.WebSocketPort({
            url: "ws://"+wsServer+":"+wsPort, // URL to your Web Socket server.
            metadata: true
        });
        this.ws.connexionState=false;
        //on ouvre la WebSocket
        this.ws.open();
        this.ws.on("ready", function () {
            console.log("Liaison ouverte...");
            //this fait référence à this.ws
            this.connexionState = true;
        });
        //VOIR SI PAS AUTRE METHODE
        this.ws.receptionMessageOsc=function(){};
        this.ws.on("message", function (oscMsg) {
            this.receptionMessageOsc(oscMsg)
        });
    }

    sendValueOsc(param) {
        let message="";
        for (let arg of param.args){
            message+=",type valeur " + arg.type+",valeur : "+arg.value;
        }
        console.log("SENT : adresse OSC :"+param.adresseOsc + message);
        this.ws.send({
            address: param.adresseOsc,
            args: param.args
        })
    }
}

export default WsLink;

