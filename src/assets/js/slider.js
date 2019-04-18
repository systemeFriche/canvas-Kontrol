/** ObjKontrol
 * Bibliothèque d'interfaces simples.
 *
 * OBJET : VERTICAL SLIDER
 *
 * Version: 0.2.0 (22/03/2019)
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
        this.elementDom=param.elementDom;
        this.id=param.id;
        this.legende = param.legende || "";
        this.typeVal=param.typeVal;
        this.valeurMin=param.valeurMin || 0;
        this.valeurMax=param.valeurMax || 100;
        this.valueA=param.valeur;
        this.valueB=param.valeur;
        this.etatClic=false;
        //this.sourisX=0;
        this.sourisY=0;
        this.couleur=param.couleur;
        document.body.addEventListener("mouseup",this.mouseUp.bind(this));
        document.body.addEventListener("mousemove",this.getMouse.bind(this));
        this.onValueChange=param.onvaluechange || function(){};
        this.width=param.width;//this.elementDom.offsetWidth;
        this.height=param.height;//this.elementDom.offsetHeight;
        this.styleBorder=param.styleBorder;
        this.scaleX=param.scaleX;
        this.scaleY=param.scaleY;
        this.adresseOsc=param.adresseOsc;
    }

    initInterface(){
        //On ajoute les éléments html qui composent l'interface graphique du slider
        //Le elementDom principal
        var canvasSliderDom=document.createElement('canvas');
        canvasSliderDom.addEventListener("mousedown",this.mouseDown.bind(this));
        canvasSliderDom.id=this.id+"-canvas";
        canvasSliderDom.className="slider";
        canvasSliderDom.width=this.width;
        canvasSliderDom.height=this.height;
        canvasSliderDom.style.border=this.styleBorder;
        canvasSliderDom.setAttribute("data-legende", this.legende);
        canvasSliderDom.setAttribute("data-couleur", this.couleur);
        canvasSliderDom.setAttribute("data-valeur-min", this.valeurMin);
        canvasSliderDom.setAttribute("data-valeur-max", this.valeurMax);
        canvasSliderDom.setAttribute("data-valeur-init", this.valueA);
        canvasSliderDom.setAttribute("data-type-val", this.typeVal);
        this.elementDom.appendChild(canvasSliderDom);
        this.ctx = canvasSliderDom.getContext("2d");
        this.ctx.scale(this.scaleX,this.scaleY);

        this.drawSlider();
    }

    setValueA(val)
    {
        this.valueA=val;
        this.drawSlider();
    }

    setValueB(val)
    {
        this.valueB=val;
        this.drawSlider();
        if(this.adresseOsc){
            let param = {
                "adresseOsc":this.adresseOsc,
                "typeVal":this.typeVal,
                "value":this.valueB
            };
            this.onValueChange(param);
        }
    }

    mouseDown(event)
    {
        //this.sourisX=event.clientX;
        this.sourisY=event.clientY;
        this.etatClic=true;
    }

    mouseUp()
    {
        //comme l'écouteur du Mouse Up est sur le body, il faut faire la manip ci-dessous que si l'etat Clic de l'objet est true
        if(this.etatClic){
            this.setValueA(this.valueB);
        }
        this.etatClic=false;
    }

    getMouse(event)
    {
        if(this.etatClic){
            let valeur=this.valueA+(this.sourisY-event.clientY)/(this.height*2/3)*(this.valeurMax-this.valeurMin);

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

            this.setValueB(valeur);
        }
    }

    scaleValue(value)
    {
        return ((value-this.valeurMin)/(this.valeurMax-this.valeurMin)*230);
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
        this.drawTextSlider();
    }
    drawCursorSlider()
    {
        let hauteurSlider;

        //position slider valeur de base
        this.ctx.beginPath();
        this.ctx.fillStyle="rgba("+this.couleur+",0.31)";
        hauteurSlider=this.scaleValue(this.valueA);
        this.ctx.fillRect(25,290-hauteurSlider,50,hauteurSlider);
        this.ctx.closePath();

        //position slider quand valeur changeante
        this.ctx.beginPath();
        this.ctx.fillStyle="rgba("+this.couleur+",1)";
        hauteurSlider=this.scaleValue(this.valueB);
        this.ctx.fillRect(25,290-hauteurSlider,50,hauteurSlider);
        this.ctx.closePath();
    }
    drawTextSlider()
    {
        //ajout texte
        this.ctx.font = "18pt Verdana";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "rgba("+this.couleur+",1)";
        this.ctx.fillText(this.valueB, 50, 45);
        this.ctx.font = "14pt Verdana";
        this.ctx.fillText(this.legende, 50, 15);
        this.ctx.font = "10pt Verdana";
        this.ctx.fillText(this.valeurMin, 87, 290);
        this.ctx.fillText(this.valeurMax, 87, 60);
    }
}
