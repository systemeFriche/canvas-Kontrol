/** canvas-Kontrol
 * Bibliothèque d'interfaces simples. Chaque objet envoie sur le réseau la valeur de l'objet
 * via le protocole OSC
 *
 * OBJET : BANG
 *
 * Version: 0.1.0 (13/03/2018)
 * Require: vanilla js
 *
 * Licence Creative Commons CC : BY-SA
 * Author : Fabien Guntz
 *
 * Big Thanks to Anne-Marie Puizillout
 */

class Bang
{
    constructor(param) {
        this.canvas=param.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.legende = param.legende || "";
        this.couleur=param.couleur;
        //écouteurs
        this.canvas.addEventListener("mousedown",this.clic.bind(this));
        this.ctx.scale(param.scale,param.scale);
        this.onValueChange=param.onvaluechange || function(){};
        this.width=this.canvas.offsetWidth;
        this.height=this.canvas.offsetHeight;
        this.adresseOsc=param.adresseOsc;

    }

    clic()
    {
        this.drawCercle();
        this.drawBang();
        this.onValueChange(this.adresseOsc,"i","1");
        //on efface 100 ms plus tard
        setTimeout(function(){this.drawCercle()}.bind(this), 100);
    }

    drawCercle()
    {
        this.ctx.clearRect(0,0,300,300);

        //cercle extérieur
        this.ctx.beginPath();
        this.ctx.lineWidth=5;
        this.ctx.strokeStyle="rgba("+this.couleur+",1)";
        this.ctx.arc(150,150,100,0,Math.PI*2,false);
        this.ctx.stroke();
        this.ctx.closePath();

        //ajout légende
        this.ctx.font = "24pt Verdana";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "rgba("+this.couleur+",1)";
        this.ctx.fillText(this.legende, 150, 25);

    }

    drawBang()
    {
        //cercle intérieur
        this.ctx.beginPath();
        this.ctx.lineWidth=0;
        this.ctx.strokeStyle="rgba("+this.couleur+",0.5)";
        this.ctx.fillStyle="rgba("+this.couleur+",0.5)";
        this.ctx.arc(150,150,80,0,Math.PI*2,false);
        this.ctx.fill();
        this.ctx.closePath();
    }
}


