/** elementDom-Kontrol
 * Bibliothèque d'interfaces simples. Chaque objet envoie sur le réseau la valeur de l'objet
 * via le protocole OSC
 *
 * OBJET : TOGGLE
 *
 * Version: 0.2.0 (22/03/2019)
 * Require: vanilla js
 *
 * Licence Creative Commons CC : BY-SA
 * Author : Fabien Guntz
 *
 * Big Thanks to Anne-Marie Puizillout
 */

import rectArrondi from "./canvas"

class Toggle
{
    constructor(param) {
        this.elementDom=param.elementDom;
        this.id=param.id;
        this.legende=param.legende;
        this.etatToggle=param.etatToggle || 0;
        this.couleur=param.couleur;
        this.onValueChange=param.onvaluechange || function(){};
        this.width=param.width;
        this.height=param.width;
        this.scale=param.scale;
        this.styleBorder=param.styleBorder;
        this.adresseOsc=param.adresseOsc;
    }

    initInterface() {
        //On ajoute les éléments html qui composent l'interface graphique du toggle
        let canvasToggleDom=document.createElement('canvas');
        canvasToggleDom.addEventListener("mousedown",this.clic.bind(this));
        canvasToggleDom.id=this.id+"-canvas";
        canvasToggleDom.className="toggle";
        canvasToggleDom.width=this.width;
        canvasToggleDom.height=this.height;
        canvasToggleDom.style.border=this.styleBorder;
        canvasToggleDom.setAttribute("data-legende", this.legende);
        canvasToggleDom.setAttribute("data-couleur", this.couleur);
        canvasToggleDom.setAttribute("data-etat-init", this.etatToggle);
        this.elementDom.appendChild(canvasToggleDom);
        this.ctx = canvasToggleDom.getContext("2d");
        this.ctx.scale(this.scale,this.scale);

        this.drawToggle();
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

        let param = {
            "adresseOsc":this.adresseOsc,
            "typeVal":"i",
            "value":this.etatToggle
        };

        this.onValueChange(param);
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

export default Toggle;


