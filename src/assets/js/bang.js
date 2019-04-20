/** ObjKontrol
 * Bibliothèque d'interfaces HTML simples.
 *
 * OBJET : BANG
 *
 * Version: 0.2.0 (22/03/2019)
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
        this.elementDom=param.elementDom;
        this.id=param.id;
        this.legende = param.legende || "";
        this.width=param.width;
        this.height=param.width;
        this.scale=param.scale;
        this.styleBorder=param.styleBorder;
        this.couleur=param.couleur;
        this.onValueChange=param.onvaluechange || function(){};
        this.adresseOsc=param.adresseOsc;
    }

    initInterface() {
        //On ajoute les éléments html qui composent l'interface graphique du bang
        //Le elementDom principal
        var canvasBangDom=document.createElement('canvas');
        canvasBangDom.addEventListener("mousedown",this.clic.bind(this));
        canvasBangDom.id=this.id+"-canvas";
        canvasBangDom.className="bang";
        canvasBangDom.width=this.width;
        canvasBangDom.height=this.height;
        canvasBangDom.style.border=this.styleBorder;
        canvasBangDom.setAttribute("data-legende", this.legende);
        canvasBangDom.setAttribute("data-couleur", this.couleur);
        this.elementDom.appendChild(canvasBangDom);
        this.ctx = canvasBangDom.getContext("2d");
        this.ctx.scale(this.scale,this.scale);

        this.drawCercle();
    }

    clic()
    {
        this.drawCercle();
        this.drawBang();
        let param = {
            "adresseOsc":this.adresseOsc,
            "typeVal":"i",
            "value":"1"
        };
        this.onValueChange(param);
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

export default Bang;


