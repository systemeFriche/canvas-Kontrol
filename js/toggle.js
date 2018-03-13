/** canvas-Kontrol
 * Bibliothèque d'interfaces simples. Chaque objet envoie sur le réseau la valeur de l'objet
 * via le protocole OSC
 *
 * OBJET : TOGGLE
 *
 * Version: 0.1.0 (13/03/2018)
 * Require: vanilla js
 *
 * Licence Creative Commons CC : BY-SA
 * Author : Fabien Guntz
 *
 * Big Thanks to Anne-Marie Puizillout
 */


class Toggle
{
    constructor(param) {
        this.canvas=param.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.legende=param.legende;
        this.etatToggle=param.etatToggle || 0;
        this.couleur=param.couleur;
        //écouteurs
        this.canvas.addEventListener("mousedown",this.clic.bind(this));
        this.ctx.scale(param.scale,param.scale);
        this.onValueChange=param.onvaluechange || function(){};
        this.width=this.canvas.offsetWidth;
        this.height=this.canvas.offsetHeight;
        this.adresseOsc=param.adresseOsc;

    }

    setEtatToggle(val)
    {
        this.etatToggle=val;
        this.drawToggle();
    }

    clic()
    {
        if(this.etatToggle){
            this.setEtatToggle(0);
        }
        else{
            this.setEtatToggle(1);
        }
        this.onValueChange(this.adresseOsc,"i",this.etatToggle);
    }

    drawToggle()
    {
        this.ctx.clearRect(0,0,300,300);

        if(this.etatToggle){
            this.ctx.fillStyle="rgba("+this.couleur+",1)";
        }
        else{
            this.ctx.fillStyle="rgba(60,60,60,1)";
        }
        rectArrondi(this.ctx,50,50,200,200,20);

        //ajout légende
        this.ctx.font = "24pt Verdana";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "rgba("+this.couleur+",1)";
        this.ctx.fillText(this.legende, 150, 25);
    }
}


