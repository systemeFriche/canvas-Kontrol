/** ObjKontrol
 * Bibliothèque d'interfaces simples.
 *
 * OBJET : OSCILLATOR
 *
 * Version: 0.2.0 (22/03/2019)
 * Require: vanilla js
 *
 * Licence Creative Commons CC : BY-SA
 * Author : Fabien Guntz
 *
 * Big Thanks to Anne-Marie Puizillout
 */

import "../css/oscillator.css";

import Draw from "./draw"

class Oscillator {

    constructor(param) {
        this.elementDom = param.elementDom;
        this.id = param.id;
        //'sin','square','sawtooth','triangle'
        this.type = param.type;
        this.valeurMinFreq = param.valeurMinFreq;
        this.valeurMaxFreq = param.valeurMaxFreq;
        this.frequency = param.frequency;
        //amplitude en Volt
        this.valeurMinAmpl = param.valeurMinAmpl;
        this.valeurMaxAmpl = param.valeurMaxAmpl;
        this.amplitude = param.amplitude;
        this.typeVal = param.typeVal;
        //état d'affichage du bloc de paramétrage, par défaut il est caché
        this.etatParamVisible=false;
        this.scale = param.scale || 1;
        this.etatActive=false;
        this.onValueChange=param.onvaluechange || function(){};
        this.adresseOsc=param.adresseOsc || "";
    }

    initInterface(){
        //On ajoute les éléments html qui composent l'interface graphique de l'oscillator
        //Le elementDom principal
        let canvasOscDom=document.createElement('canvas');
        canvasOscDom.className="canvasMain";
        canvasOscDom.style.border="1px solid #b4b4b4";
        canvasOscDom.width=100;
        canvasOscDom.height=100;
        //on ajoute un écouteur sur le elementDom principal pour activer/désactiver l'oscillateur
        canvasOscDom.addEventListener("mousedown",this.switchOnOff.bind(this));
        this.elementDom.appendChild(canvasOscDom);
        this.waveMainDraw = new Draw(canvasOscDom,this.scale,this.scale);

        //La bloc paramétrage (forme d'onde, fréquence, amplitude)
        let paramDom=document.createElement('div');
        paramDom.className="paramOsc";
        paramDom.classList.add("hidden");
        this.elementDom.appendChild(paramDom);
            //le bloc choix forme d'onde
            let paramWaveDom=document.createElement('div');
            paramWaveDom.className="paramWave";
            paramDom.appendChild(paramWaveDom);
                let textParamWaveDom=document.createElement('p');
                textParamWaveDom.className="textParamWave";
                textParamWaveDom.innerHTML="Wave";
                paramWaveDom.appendChild(textParamWaveDom);
                let paramWaveListDom=document.createElement('ul');
                paramWaveListDom.className="paramWaveChoice";
                paramWaveDom.appendChild(paramWaveListDom);
                    let paramWaveSinDom=document.createElement('li');
                    paramWaveListDom.appendChild(paramWaveSinDom);
                        let paramWaveSinCanvasDom=document.createElement('canvas');
                        paramWaveSinDom.appendChild(paramWaveSinCanvasDom);
                        paramWaveSinCanvasDom.className="canvasWaveSin";
                        paramWaveSinCanvasDom.width=30;
                        paramWaveSinCanvasDom.height=30;
                        //on ajoute un écouteur sur ce elementDom pour changer le type de l'oscillateur
                        paramWaveSinCanvasDom.addEventListener("mousedown",this.changeType.bind(this,'sine'));
                        paramWaveSinDom.appendChild(paramWaveSinCanvasDom);
                        this.paramWaveSinDraw=new Draw(paramWaveSinCanvasDom,this.scale,this.scale);
                    let paramWaveTriangleDom=document.createElement('li');
                    paramWaveListDom.appendChild(paramWaveTriangleDom);
                        let paramWaveTriangleCanvasDom=document.createElement('canvas');
                        paramWaveTriangleCanvasDom.className="canvasWaveTriangle";
                        paramWaveTriangleCanvasDom.width=30;
                        paramWaveTriangleCanvasDom.height=30;
                        //on ajoute un écouteur sur ce elementDom pour changer le type de l'oscillateur
                        paramWaveTriangleCanvasDom.addEventListener("mousedown",this.changeType.bind(this,'triangle'));
                        paramWaveTriangleDom.appendChild(paramWaveTriangleCanvasDom);
                        this.paramWaveTriangleDraw=new Draw(paramWaveTriangleCanvasDom,this.scale,this.scale);
                    let paramWaveSawToothDom=document.createElement('li');
                    paramWaveListDom.appendChild(paramWaveSawToothDom);
                        let paramWaveSawToothCanvasDom=document.createElement('canvas');
                        paramWaveSawToothCanvasDom.className="canvasWaveSawTooth";
                        paramWaveSawToothCanvasDom.width=30;
                        paramWaveSawToothCanvasDom.height=30;
                        //on ajoute un écouteur sur ce elementDom pour changer le type de l'oscillateur
                        paramWaveSawToothCanvasDom.addEventListener("mousedown",this.changeType.bind(this,'sawtooth'));
                        paramWaveSawToothDom.appendChild(paramWaveSawToothCanvasDom);
                        this.paramWaveSawToothDraw=new Draw(paramWaveSawToothCanvasDom,this.scale,this.scale);
                    let paramWaveSquareDom=document.createElement('li');
                    paramWaveListDom.appendChild(paramWaveSquareDom);
                        let paramWaveSquareCanvasDom=document.createElement('canvas');
                        paramWaveSquareCanvasDom.className="canvasWaveSquare";
                        paramWaveSquareCanvasDom.width=30;
                        paramWaveSquareCanvasDom.height=30;
                        //on ajoute un écouteur sur ce elementDom pour changer le type de l'oscillateur
                        paramWaveSquareCanvasDom.addEventListener("mousedown",this.changeType.bind(this,'square'));
                        paramWaveSquareDom.appendChild(paramWaveSquareCanvasDom);
                        this.paramWaveSquareDraw=new Draw(paramWaveSquareCanvasDom,this.scale,this.scale);

             let paramFreqAmplDom=document.createElement('ul');
            paramFreqAmplDom.className="paramFreqAmpl";
            paramDom.appendChild(paramFreqAmplDom);
                //Le bloc configuration fréquence
                let paramFreqDom=document.createElement('li');
                paramFreqDom.className="paramFreq";
                paramFreqAmplDom.appendChild(paramFreqDom);
                    let textFreqDom=document.createElement('p');
                    paramFreqDom.appendChild(textFreqDom);
                    textFreqDom.className="textFreq";
                    textFreqDom.innerHTML="Fréquence (Hz)";
                    let knobFreqDom=document.createElement('div');
                    knobFreqDom.id=this.id+"-knobFreq";
                    knobFreqDom.className="knob";
                    knobFreqDom.setAttribute("data-width", "80");
                    knobFreqDom.setAttribute("data-height", "80");
                    knobFreqDom.setAttribute("data-couleur", "0,255,0");
                    knobFreqDom.setAttribute("data-angle-depart", "30");
                    knobFreqDom.setAttribute("data-angle-arrivee", "330");
                    knobFreqDom.setAttribute("data-valeur-min", this.valeurMinFreq);
                    knobFreqDom.setAttribute("data-valeur-max", this.valeurMaxFreq);
                    knobFreqDom.setAttribute("data-valeur-init", this.frequency);
                    knobFreqDom.setAttribute("data-type-val", this.typeVal);
                    knobFreqDom.setAttribute("data-adresse-osc", this.adresseOsc+"/freq");
                    paramFreqDom.appendChild(knobFreqDom);
                //Le bloc amplitude
                let paramAmplDom=document.createElement('li');
                paramAmplDom.className="paramAmpl";
                paramFreqAmplDom.appendChild(paramAmplDom);
                    let textAmplDom=document.createElement('p');
                    paramAmplDom.appendChild(textAmplDom);
                    textAmplDom.className="textAmpl";
                    textAmplDom.innerHTML="Amplitude (V)";
                    let knobAmplDom=document.createElement('div');
                    knobAmplDom.id=this.id+"-knobAmpl";
                    knobAmplDom.className="knob";
                    knobAmplDom.setAttribute("data-width", "80");
                    knobAmplDom.setAttribute("data-height", "80");
                    knobAmplDom.setAttribute("data-couleur", "0,255,0");
                    knobAmplDom.setAttribute("data-angle-depart", "30");
                    knobAmplDom.setAttribute("data-angle-arrivee", "330");
                    knobAmplDom.setAttribute("data-valeur-min", this.valeurMinAmpl);
                    knobAmplDom.setAttribute("data-valeur-max", this.valeurMaxAmpl);
                    knobAmplDom.setAttribute("data-valeur-init", this.amplitude);
                    knobAmplDom.setAttribute("data-type-val", this.typeVal);
                    knobAmplDom.setAttribute("data-adresse-osc", this.adresseOsc+"/ampl");
                    paramAmplDom.appendChild(knobAmplDom);

        //le bloc minifier
        let minifyDom=document.createElement('div');
        minifyDom.className="minify";
        minifyDom.addEventListener("mousedown",this.showParam.bind(this, paramDom));
        this.elementDom.appendChild(minifyDom);
        let minifyTextDom=document.createElement('p');
        minifyDom.appendChild(minifyTextDom);
        minifyTextDom.className="textMinify";
        minifyTextDom.innerHTML=">";

        this.drawOscillator();
    }

    changeType(type){
        this.type=type;
        this.drawOscillator();
    }

    showParam(bloc,e){
        if (this.etatParamVisible) {
            bloc.classList.remove("visible");
            bloc.classList.add("hidden");
            e.target.innerHTML = '>';
            this.etatParamVisible=false;
        }
        else {
            bloc.classList.remove("hidden");
            bloc.classList.add("visible");
            e.target.innerHTML = '<';
            this.etatParamVisible=true;
        }
    }

    drawOscillator(){
        let lineColor,backgroundColorSin,backgroundColorTriangle,backgroundColorSawTooth,backgroundColorSquare;
        lineColor = this.etatActive ? '#A9D8FF' : '#b4b4b4';
        //on trace dans les différents elementDom
        //elementDom principal
        //fond en gris foncé
        //ligne en gris clair si oscillateur off
        //ligne en bleu clair si oscillateur on

        //elementDom de choix de forme d'onde
        //fond en gris si forme d'onde ne correspond pas au type de l'oscillateur
        //fond en orange si forme d'onde correspond au type de l'oscillateur
        //ligne en gris foncé quelque soit l'état
        backgroundColorSin='#b4b4b4';
        backgroundColorTriangle='#b4b4b4';
        backgroundColorSawTooth='#b4b4b4';
        backgroundColorSquare='#b4b4b4';

        switch(this.type) {
              case 'sine':
                  backgroundColorSin='#deb800';
                  this.waveMainDraw.drawSinus('#111111',lineColor);
                  break;
              case 'triangle' :
                  backgroundColorTriangle='#deb800';
                  this.waveMainDraw.drawTriangle('#111111',lineColor);
                  break;
              case 'sawtooth':
                  backgroundColorSawTooth='#deb800';
                  this.waveMainDraw.drawSawTooth('#111111',lineColor);
                  break;
              case 'square':
                  backgroundColorSquare='#deb800';
                  this.waveMainDraw.drawSquare('#111111',lineColor);
                  break;
              default:
                  backgroundColorSin='#deb800';
        }
        this.paramWaveSinDraw.drawSinus(backgroundColorSin,'#111111');
        this.paramWaveTriangleDraw.drawTriangle(backgroundColorTriangle,'#111111');
        this.paramWaveSawToothDraw.drawSawTooth(backgroundColorSawTooth,'#111111');
        this.paramWaveSquareDraw.drawSquare(backgroundColorSquare,'#111111');
    }

    on() {
        //envoi message Osc pour indiquer qu'on veut jouer le son de l'oscillateur
        let param = {
            "adresseOsc":this.adresseOsc+"/on",
            "typeVal":"i",
            "value":1
        };
        this.onValueChange(param);
    }

    off() {
        //envoi message Osc pour indiquer qu'on veut stopper le son de l'oscillateur
        let param = {
            "adresseOsc":this.adresseOsc+"/on",
            "typeVal":"i",
            "value":0
        };
        this.onValueChange(param);
    }

    switchOnOff(){
        if(this.etatActive){
            this.etatActive=false;
            this.off();
        }
        else{
            this.etatActive=true;
            this.on();
        }
        this.drawOscillator();
    }

    changeType(type){
        //envoi un message Osc pour indiquer qu'on veut changer le type de l'oscillateur
        this.type=type;
        //à voir si besoin des deux lignes suivantes
        //this.off();
        //this.on();
        let value;
        switch(this.type) {
            case 'sine':
                value=0;
                break;
            case 'triangle' :
                value=1;
                break;
            case 'sawtooth':
                value=2;
                break;
            case 'square':
                value=3;
                break;
            default:
                value=0;
        }
        let param = {
            "adresseOsc":this.adresseOsc+"/type",
            "typeVal":"i",
            "value":value
        };
        this.onValueChange(param);
        this.drawOscillator();
    }

}

export default Oscillator;





