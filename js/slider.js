/** canvas-Kontrol
 * Bibliothèque d'interfaces simples. Chaque objet envoie sur le réseau la valeur de l'objet
 * via le protocole OSC
 *
 * OBJET : VERTICAL SLIDER
 *
 * Version: 0.1.0 (13/03/2018)
 * Require: vanilla js
 *
 * Licence Creative Commons CC : BY-SA
 * Author : Fabien Guntz
 *
 * Big Thanks to Anne-Marie Puizillout
 */


class Slider
{
    constructor(param) {
        this.canvas=param.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.legende = param.legende || "";
        this.typeVal=param.typeVal;
        this.valeurMin=param.valeurMin || 0;
        this.valeurMax=param.valeurMax || 100;
        this.valeurA=param.valeur;
        this.valeurB=param.valeur;
        this.etatClic=false;
        //this.sourisX=0;
        this.sourisY=0;
        this.couleur=param.couleur;
        //écouteurs
        this.canvas.addEventListener("mousedown",this.sourisDown.bind(this));
        document.body.addEventListener("mouseup",this.sourisUp.bind(this));
        document.body.addEventListener("mousemove",this.getSouris.bind(this));
        this.ctx.scale(param.scaleX,param.scaleY);
        this.onValueChange=param.onvaluechange || function(){};
        this.width=this.canvas.offsetWidth;
        this.height=this.canvas.offsetHeight;
        this.adresseOsc=param.adresseOsc;
    }

    setvaleurA(val)
    {
        this.valeurA=val;
        this.drawSlider();
    }

    setvaleurB(val)
    {
        this.valeurB=val;
        this.drawSlider();
        this.onValueChange(this.adresseOsc,this.typeVal,this.valeurB);
    }

    sourisDown(event)
    {
        //this.sourisX=event.clientX;
        this.sourisY=event.clientY;
        this.etatClic=true;
    }

    sourisUp()
    {
        //comme l'écouteur du Mouse Up est sur le body, il faut faire la manip ci-dessous que si l'etat Clic de l'objet est true
        if(this.etatClic){
            this.setvaleurA(this.valeurB);
        }
        this.etatClic=false;
    }

    getSouris(event)
    {
        if(this.etatClic){
            let valeur=this.valeurA+(this.sourisY-event.clientY)/(this.height*2/3)*(this.valeurMax-this.valeurMin);

            if (valeur<this.valeurMin){
                valeur=this.valeurMin;
            }
            else {
                if (valeur>this.valeurMax){
                    valeur=this.valeurMax;
                }
            }
            if(this.typeVal==="i"){
                valeur=parseInt(valeur);
            }
            else{
                valeur=Math.round(valeur*10)/10;
            }

            this.setvaleurB(valeur);
        }
    }

    miseEchelle(valeur)
    {
        return ((valeur-this.valeurMin)/(this.valeurMax-this.valeurMin)*230);
    }

    drawSlider()
    {
        this.ctx.clearRect(0,0,100,300);

        //fond gris foncé
        this.ctx.beginPath();
        this.ctx.fillStyle="rgba(60,60,60,1)";
        this.ctx.fillRect(25,60,50,230);
        this.ctx.closePath();

        //dessine le curseur
        this.drawCursorSlider();
        //affiche la valeur du curseur
        this.drawTexteSlider();
    }
    drawCursorSlider()
    {
        let hauteurSlider;

        //position slider valeur de base
        this.ctx.beginPath();
        this.ctx.fillStyle="rgba("+this.couleur+",0.31)";
        hauteurSlider=this.miseEchelle(this.valeurA);
        this.ctx.fillRect(25,290-hauteurSlider,50,hauteurSlider);
        this.ctx.closePath();

        //position slider quand valeur changeante
        this.ctx.beginPath();
        this.ctx.fillStyle="rgba("+this.couleur+",1)";
        hauteurSlider=this.miseEchelle(this.valeurB);
        this.ctx.fillRect(25,290-hauteurSlider,50,hauteurSlider);
        this.ctx.closePath();
    }
    drawTexteSlider()
    {
        //ajout texte
        this.ctx.font = "18pt Verdana";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "rgba("+this.couleur+",1)";
        this.ctx.fillText(this.valeurB, 50, 45);
        this.ctx.font = "14pt Verdana";
        this.ctx.fillText(this.legende, 50, 15);
        this.ctx.font = "10pt Verdana";
        this.ctx.fillText(this.valeurMin, 87, 290);
        this.ctx.fillText(this.valeurMax, 87, 60);

    }
}
