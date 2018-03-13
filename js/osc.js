/** osc.js
 * https://github.com/colinbdclark/osc.js/
 */


//on définit la websocket
let oscPort = new osc.WebSocketPort({
    url: "ws://127.0.0.1:8081", // URL to your Web Socket server.
    metadata: true
});

//on ouvre la WebSocket
oscPort.open();

function envoiValeurOsc(adresseOsc,typeVal,val) {
    console.log("adresse OSC :"+adresseOsc + ",type valeur " +typeVal+",valeur :"+val);
    oscPort.send({
        address: adresseOsc,
        args: [
            {
                type: typeVal,
                value: val
            }
        ]
    })
}



