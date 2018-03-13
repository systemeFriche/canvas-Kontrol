/** canvas-Kontrol
 * Bibliothèque d'interfaces simples. Chaque objet envoie sur le réseau la valeur de l'objet
 * via le protocole OSC
 *
 * OBJET : KNOB
 *
 * Version: 0.1.0 (13/03/2018)
 * Require: vanilla js
 *
 * Licence Creative Commons CC : BY-SA
 * Author : Fabien Guntz
 *
 * Big Thanks to Anne-Marie Puizillout
 * Design : https://github.com/aterrien/jQuery-Knob
 */


class Knob
{
    constructor(param) {
        this.canvas=param.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.legende = param.legende || "";
        this.angleDepart = Knob.conversionAngle(param.angleDepart || 0);
        this.angleArrivee = Knob.conversionAngle(param.angleArrivee || 360);
        this.typeVal=param.typeVal;
        this.valeurMin=param.valeurMin || 0;
        this.valeurMax=param.valeurMax || 100;
        this.largeurCurseur=Math.PI/12;
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
        this.ctx.scale(param.scale,param.scale);
        this.onValueChange=param.onvaluechange || function(){};
        this.width=this.canvas.offsetWidth;
        this.height=this.canvas.offsetHeight;
        this.adresseOsc=param.adresseOsc;

    }

    setvaleurA(val)
    {
        this.valeurA=val;
        this.drawKnob();
    }

    setvaleurB(val)
    {
        this.valeurB=val;
        this.drawKnob();
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
        return (this.angleArrivee-this.angleDepart-this.largeurCurseur*2) * (valeur-this.valeurMin) / (this.valeurMax-this.valeurMin) + (this.angleDepart+this.largeurCurseur);
    }

    drawKnob()
    {
        this.ctx.clearRect(0,0,300,300);

        //cercle extérieur
        this.ctx.beginPath();
        this.ctx.lineWidth=5;
        this.ctx.strokeStyle="rgba("+this.couleur+",1)";
        this.ctx.arc(150,150,100,this.angleDepart,this.angleArrivee,false);
        this.ctx.stroke();
        this.ctx.closePath();

        //ajout légende
        this.ctx.font = "24pt Verdana";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "rgba("+this.couleur+",1)";
        this.ctx.fillText(this.legende, 150, 25);

        //dessine le curseur
        this.drawCursorKnob();
        //affiche la valeur du curseur
        this.drawTexteKnob();
    }
    drawCursorKnob()
    {
        let positionAngle;

        //position bouton valeur de base
        this.ctx.beginPath();
        this.ctx.lineWidth=15;
        //position du bouton
        this.ctx.strokeStyle="rgba("+this.couleur+",0.31)";
        positionAngle=this.miseEchelle(this.valeurA);
        this.ctx.arc(150,150,85,positionAngle-this.largeurCurseur,positionAngle+this.largeurCurseur,false);
        this.ctx.stroke();
        this.ctx.closePath();

        //position bouton quand valeur changeante
        this.ctx.beginPath();
        this.ctx.lineWidth=15;
        //position du bouton
        this.ctx.strokeStyle="rgba("+this.couleur+",1)";
        positionAngle=this.miseEchelle(this.valeurB);
        this.ctx.arc(150,150,85,positionAngle-this.largeurCurseur,positionAngle+this.largeurCurseur,false);
        this.ctx.stroke();
        this.ctx.closePath();

    }
    drawTexteKnob()
    {
        //ajout texte
        this.ctx.font = "30pt Verdana";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "rgba("+this.couleur+",1)";
        this.ctx.fillText(this.valeurB, 150, 150);
        this.ctx.font = "22pt Verdana";
        this.ctx.fillText(this.valeurMin, 100, 260);
        this.ctx.fillText(this.valeurMax, 200, 260);
    }

    static conversionAngle(degre) {
        return (degre * Math.PI / 180 - 3 * Math.PI / 2);
    }
}

