/** ObjKontrol
 * Bibliothèque d'interfaces HTML simples.
 *
 * OBJET : OUT
 *
 * Version: 0.2.0 (22/03/2019)
 * Require: vanilla js
 *
 * Licence Creative Commons CC : BY-SA
 * Author : Fabien Guntz
 *
 * Big Thanks to Anne-Marie Puizillout
 */

class Out
{
    constructor(param) {
        this.elementDom=param.elementDom;
        this.id=param.id;
        this.legende = param.legende || "";
        this.couleur=param.couleur;
        this.width=param.width;
        this.height=param.height;
        this.scale=param.scale;
        this.styleBorder=param.styleBorder;
        this.onValueChange=param.onvaluechange || function(){};
        this.adresseOsc=param.adresseOsc;
        this.activeState=false;
    }

    initInterface() {
        //On ajoute les éléments html qui composent l'interface graphique du bang
        //Le elementDom principal
        var canvasOutDom=document.createElement('canvas');
        canvasOutDom.addEventListener("mousedown",this.switchOnOff.bind(this));
        canvasOutDom.id=this.id+"-canvas";
        canvasOutDom.className="bang";
        canvasOutDom.width=this.width;
        canvasOutDom.height=this.height;
        canvasOutDom.style.border=this.styleBorder;
        canvasOutDom.setAttribute("data-legende", this.legende);
        canvasOutDom.setAttribute("data-couleur", this.couleur);
        this.elementDom.appendChild(canvasOutDom);
        this.ctx = canvasOutDom.getContext("2d");
        this.ctx.scale(this.scale,this.scale);

        this.drawOut();
    }

    on() {
        //envoi message Osc pour indiquer qu'on veut activer jouer le son de l'oscillateur

        let param = {
            "adresseOsc":this.adresseOsc,
            "typeVal":"i",
            "value":1
        };
        this.onValueChange(param);
    }

    off() {
        //envoi message Osc pour indiquer qu'on veut stopper le son de l'oscillateur

        let param = {
            "adresseOsc":this.adresseOsc,
            "typeVal":"i",
            "value":0
        };
        this.onValueChange(param);
    }

    switchOnOff(){
        if(this.activeState){
            this.activeState=false;
            this.off();
        }
        else{
            this.activeState=true;
            this.on();
        }
        this.drawOut();
    }

    drawOut()
    {
        let lineColor,backgroundColor;
        lineColor = this.activeState ? '#A9D8FF' : '#b4b4b4';

        //ajout HP
        this.ctx.beginPath();
        this.ctx.lineWidth=5;
        this.ctx.strokeStyle=lineColor;
        this.ctx.fillStyle=lineColor;
        this.ctx.moveTo(75, 195);
        this.ctx.lineTo(75,105);
        this.ctx.lineTo(110,105);
        this.ctx.lineTo(150,75);
        this.ctx.lineTo(150,225);
        this.ctx.lineTo(110,195);
        this.ctx.lineTo(75,195);
        this.ctx.fill();
        this.ctx.closePath();
        //ajout vibrations acoustiques
        this.ctx.lineWidth=9;
        this.ctx.beginPath();
        this.ctx.arc(150,150,25,-Math.PI/4,Math.PI/4,false);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.arc(150,150,50,-Math.PI/4,Math.PI/4,false);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.arc(150,150,75,-Math.PI/4,Math.PI/4,false);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}


