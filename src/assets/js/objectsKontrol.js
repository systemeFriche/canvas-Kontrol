/** ObjKontrol
 * Bibliothèque d'interfaces HTML simples.
 *
 *
 * Version: 0.2.0 (22/03/2019)
 * Require: vanilla js
 *
 * Licence Creative Commons CC : BY-SA
 * Author : Fabien Guntz
 *
 * Big Thanks to Anne-Marie Puizillout
 */

import Bang from "./bang"
import Knob from "./knob"
import Slider from "./slider"
import SliderAudio from "./sliderAudio"
import Toggle from "./toggle"
import Led from "./led"
import Oscillator from "./oscillator"
import OscillatorAudio from "./oscillatorAudio"
import Out from "./out.js"
import OutAudio from "./outAudio"
import Piano from "./piano"

class ObjectsKontrol{

    constructor(element) {

        //element est soit un AudioContext soit un wsLink
        if(element instanceof AudioContext){
            this.contextAudio=element;
            this.paramContext = {
                "contextAudio":element,
                "onvaluechange":function(){}
            };
        }else{
            this.paramContext = {
                "onvaluechange":function(param){element.sendValueOsc(param)}
            };
        }
        this.collSliders = [];
        this.collKnobs = [];
        this.collBangs = [];
        this.collToggles = [];
        this.collLeds = [];
        this.collOuts = [];
        this.collOscillators = [];
        this.collPianos = [];
    }

    loadObjects(){
        //un oscillateur est composé de knobs, il faut donc d'abord charger les oscillateurs avant les knobs
        this.loadOscillators();
        this.loadBangs();
        this.loadKnobs();
        this.loadSliders();
        this.loadToggles();
        this.loadLeds();
        this.loadOuts();
        this.loadPianos();
    }

    configureObjects(){
        this.configureOscillators();
    }

    loadSliders(){
        //on crée tous les objets Slider présents dans le DOM
        let collSlidersDom = document.querySelectorAll(".slider");

        //on récupère tous les objets du DOM de la classe knob
        for (let sliderDom of collSlidersDom){
            //pour chaque objet du DOM de la classe slider on crée un objet javascript slider
            let slider;

            let paramObject ={
                "elementDom":sliderDom,
                "id":sliderDom.id,
                "legende":sliderDom.dataset.legende,
                "valeurMin": sliderDom.dataset.valeurMin,
                "valeurMax":sliderDom.dataset.valeurMax,
                "width":sliderDom.dataset.width,
                "height":sliderDom.dataset.height,
                "styleBorder":sliderDom.dataset.styleBorder,
                "valeur":parseFloat(sliderDom.dataset.valeurInit),
                "scaleX":parseFloat(sliderDom.dataset.width/100.0),//le elementDom de base a été créé dans un rectangle de 100 pixels par 300 pixels
                "scaleY":parseFloat(sliderDom.dataset.height/300.0),//le elementDom de base a été créé dans un rectangle de 100 pixels par 300 pixels
                "couleur":sliderDom.dataset.couleur,
            };

            if (!this.contextAudio) {
                paramObject=this.jsonConcat(paramObject,{"adresseOsc":sliderDom.dataset.adresseOsc});
                paramObject=this.jsonConcat(paramObject,{"typeVal":sliderDom.dataset.typeVal});
            }
            paramObject=this.jsonConcat(paramObject,this.paramContext);

            if (this.contextAudio){
                slider = new SliderAudio(paramObject);
            }
            else{
                slider = new Slider(paramObject);
            }

            slider.initInterface();

            //on envoie la valeur initiale au serveur
            if (!this.contextAudio) {
                let param = {
                    "adresseOsc":slider.adresseOsc,
                    args:[
                        {
                            "type":slider.typeVal,
                            "value":slider.valueA
                        },
                    ]
                };
                slider.onValueChange(param);
            }

            //on ajoute le nouvel objet au tableau de sliders
            this.collSliders.push(slider);
            //on envoie la valeur initiale pour MAX
            //slider.onValueChange(slider.adresseOsc,slider.typeVal,slider.valueA);
        }

    }

    loadKnobs(){

        //on crée tous les objets Knob présents dans le DOM
        let collKnobsDom = document.querySelectorAll(".knob");

        //on récupère tous les objets du DOM de la classe knob
        for (let knobDom of collKnobsDom){
            //pour chaque objet du DOM de la classe knob on crée un objet javascript knob
            let knob;

            let paramObject = {
                "elementDom":knobDom,
                "id":knobDom.id,
                "legende":knobDom.dataset.legende,
                "angleDepart":parseInt(knobDom.dataset.angleDepart),
                "angleArrivee":parseInt(knobDom.dataset.angleArrivee),
                "valeurMin": knobDom.dataset.valeurMin,
                "valeurMax":knobDom.dataset.valeurMax,
                "valeur":parseFloat(knobDom.dataset.valeurInit),
                "width":knobDom.dataset.width,
                "height":knobDom.dataset.width,
                "scale":parseFloat(knobDom.dataset.width/300.0),//le elementDom de base a été créé dans un carré de 300 pixels de côté
                "couleur":knobDom.dataset.couleur,
            };

            if (!this.contextAudio) {
                paramObject=this.jsonConcat(paramObject,{"adresseOsc":knobDom.dataset.adresseOsc});
                paramObject=this.jsonConcat(paramObject,{"typeVal":knobDom.dataset.typeVal});
            }
            paramObject=this.jsonConcat(paramObject,this.paramContext);

            knob = new Knob(paramObject);

            knob.initInterface();

            //on envoie la valeur initiale au serveur
            if (!this.contextAudio) {
                let param = {
                    "adresseOsc":knob.adresseOsc,
                    args:[
                        {
                            "type":knob.typeVal,
                            "value":knob.valeurA
                        },
                    ]
                };
                knob.onValueChange(param);
            }

            //on ajoute le nouvel objet au tableau des knobs
            this.collKnobs.push(knob);
        }

    }

    loadBangs(){
        //on crée tous les objets Bang présents dans le DOM
        let collBangs = document.querySelectorAll(".bang");

        //on récupère tous les objets du DOM de la classe bang
        for (let bangDom of collBangs){
            //pour chaque objet du DOM de la classe bang on crée un objet javascript bang

            let bang;

            let paramObject ={

                "elementDom":bangDom,
                "id":bangDom.id,
                "legende":bangDom.dataset.legende,
                "width":bangDom.dataset.width,
                "scale":parseFloat(bangDom.dataset.width/300.0),//le elementDom de base a été créé dans un carré de 300 pixels de côté
                "styleBorder":bangDom.dataset.styleBorder,
                "couleur":bangDom.dataset.couleur,
            };

            if (!this.contextAudio) {
                paramObject=this.jsonConcat(paramObject,{"adresseOsc":bangDom.dataset.adresseOsc});
                //typeVal forcément "i"
            }
            paramObject=this.jsonConcat(paramObject,this.paramContext);

            bang = new Bang(paramObject);

            bang.initInterface();

            //ATTENTION penser à envoyer la valeur initiale si OSC
            //on ajoute le nouvel objet au tableau des bangs
            this.collBangs.push(bang);
        }
    }

    loadToggles(){

        //on crée tous les objets Toggle présents dans le DOM
        let collToggles = document.querySelectorAll(".toggle");

        //on récupère tous les objets du DOM de la classe toggle
        for (let toggleDom of collToggles){
            //pour chaque objet du DOM de la classe toggle on crée un objet javascript toggle
            let toggle;

            let paramObject ={
                "elementDom":toggleDom,
                "legende":toggleDom.dataset.legende,
                "etatToggle":parseInt(toggleDom.dataset.etatInit),
                "width":toggleDom.dataset.width,
                "scale":parseFloat(toggleDom.dataset.width/300.0),//le elementDom de base a été créé dans un carré de 300 pixels de côté
                "styleBorder":toggleDom.dataset.styleBorder,
                "couleur":toggleDom.dataset.couleur,
            };

            if (!this.contextAudio) {
                paramObject=this.jsonConcat(paramObject,{"adresseOsc":toggleDom.dataset.adresseOsc});
                //typeVal forcément "i"
            }
            paramObject=this.jsonConcat(paramObject,this.paramContext);

            toggle = new Toggle(paramObject);

            toggle.initInterface();

            //on envoie la valeur initiale au serveur
            if (!this.contextAudio) {
                let param = {
                    "adresseOsc":toggle.adresseOsc,
                    args:[
                        {
                            "type":"i",
                            "value":toggle.etatToggle
                        },
                    ]
                };
                toggle.onValueChange(param);
            }

            //on ajoute le nouvel objet au tableau des toggles
            this.collToggles.push(toggle);
        }
    }

    loadLeds(){
        //on crée tous les objets Bang présents dans le DOM
        let collLeds = document.querySelectorAll(".led");

        //on récupère tous les objets du DOM de la classe bang
        for (let ledDom of collLeds){
            //pour chaque objet du DOM de la classe bang on crée un objet javascript bang

            let led;

            let paramObject ={

                "elementDom":ledDom,
                "id":ledDom.id,
                "legende":ledDom.dataset.legende,
                "width":ledDom.dataset.width,
                "scale":parseFloat(ledDom.dataset.width/300.0),//le elementDom de base a été créé dans un carré de 300 pixels de côté
                "styleBorder":ledDom.dataset.styleBorder,
                "couleur":ledDom.dataset.couleur,
            };

            if (!this.contextAudio) {
                paramObject=this.jsonConcat(paramObject,{"adresseOsc":ledDom.dataset.adresseOsc});
                //typeVal forcément "i"
            }
            paramObject=this.jsonConcat(paramObject,this.paramContext);

            led = new Led(paramObject);

            led.initInterface();

            //on ajoute le nouvel objet au tableau des bangs
            this.collLeds.push(led);
        }
    }

    loadOuts(){
        //on crée tous les objets Bang présents dans le DOM
        let collOuts = document.querySelectorAll(".out");

        //on récupère tous les objets du DOM de la classe bang
        for (let outDom of collOuts){
            //pour chaque objet du DOM de la classe bang on crée un objet javascript bang
            let out;

            let paramObject ={
                "elementDom":outDom,
                "id":outDom.id,
                "legende":outDom.dataset.legende,
                "width":outDom.dataset.width,
                "height":outDom.dataset.height,
                "scale":parseFloat(outDom.dataset.width/300.0),//le elementDom de base a été créé dans un carré de 300 pixels de côté
                "styleBorder":outDom.dataset.styleBorder,
                "couleur":outDom.dataset.couleur,
            };

            if (!this.contextAudio) {
                paramObject=this.jsonConcat(paramObject,{"adresseOsc":outDom.dataset.adresseOsc});
                //typeVal forcément "i"
            }
            paramObject=this.jsonConcat(paramObject,this.paramContext);

            if (this.contextAudio){
                out = new OutAudio(paramObject);
            }
            else{
                out = new Out(paramObject);
            }

            out.initInterface();
            //ATTENTION penser à envoyer la valeur initiale si OSC
            //on ajoute le nouvel objet au tableau des bangs
            this.collOuts.push(out);
        }
    }

    loadOscillators(){
        //on crée tous les oscillator présents dans le DOM
        let collOscillatorsDom = document.querySelectorAll(".oscillator");

        //on récupère tous les objets du DOM de la classe oscillator
        for (let oscillatorDom of collOscillatorsDom){
            //pour chaque objet du DOM de la classe oscillator on crée un objet javascript oscillator
            let oscillator;

            let paramObject ={
                "elementDom":oscillatorDom,
                "id":oscillatorDom.id,
                "type":oscillatorDom.dataset.type,
                "valeurMinFreq": oscillatorDom.dataset.valeurMinFreq,
                "valeurMaxFreq":oscillatorDom.dataset.valeurMaxFreq,
                "frequency":oscillatorDom.dataset.frequency,
                "valeurMinAmpl": oscillatorDom.dataset.valeurMinAmpl,
                "valeurMaxAmpl":oscillatorDom.dataset.valeurMaxAmpl,
                "amplitude":oscillatorDom.dataset.amplitude,
                "scale":parseFloat(oscillatorDom.height/100.0),//la hauteur de base vaut 100 pixels
            };

            if (!this.contextAudio) {
                paramObject=this.jsonConcat(paramObject,{"adresseOsc":oscillatorDom.dataset.adresseOsc});
                paramObject=this.jsonConcat(paramObject,{"typeVal":oscillatorDom.dataset.typeVal});
            }
            paramObject=this.jsonConcat(paramObject,this.paramContext);

            if (this.contextAudio){
                oscillator = new OscillatorAudio(paramObject);
            }
            else{
                oscillator = new Oscillator(paramObject);
            }

            oscillator.initInterface();
            //ATTENTION penser à envoyer la valeur initiale si OSC
            //on ajoute le nouvel objet au tableau des oscillators
            this.collOscillators.push(oscillator);
        }
    }

    configureOscillators(contextAudio){

        if (contextAudio) {
            for (let oscillator of this.collOscillators){
                let id=oscillator.id+"-knobAmpl";
                let knobAmpl=this.getObjectById("knob",id);
                //on termine de configurer les différents objets
                knobAmpl.onValueChange = function(param){oscillator.changeAmplitude(param.value)};
                id=oscillator.id+"-knobFreq";
                let knobFreq=this.getObjectById("knob",id);
                knobFreq.onValueChange = function(param){oscillator.changeFrequency(param.value)};
            }
        }
    }

    loadPianos(){
        //on crée tous les oscillator présents dans le DOM
        let collPianosDom = document.querySelectorAll(".piano");

        //on récupère tous les objets du DOM de la classe oscillator
        for (let pianoDom of collPianosDom) {
            //pour chaque objet du DOM de la classe oscillator on crée un objet javascript oscillator
            let piano;

            let paramObject = {
                "elementDom": pianoDom,
                "id": pianoDom.id,
                "width": pianoDom.dataset.width,
                "scale": parseFloat(pianoDom.dataset.width / 1050),//le elementDom de base a été créé pour une largeur de 15 touches blanches de 70 pixels
                "styleBorder": pianoDom.dataset.styleBorder,
                "legende": pianoDom.dataset.legende,
                "couleur": pianoDom.dataset.couleur,
            };

            if (!this.contextAudio) {
                paramObject = this.jsonConcat(paramObject, {"adresseOsc": pianoDom.dataset.adresseOsc});
                //typeVal = String
                //paramObject=this.jsonConcat(paramObject,{"typeVal":pianoDom.dataset.typeVal});
            }
            paramObject = this.jsonConcat(paramObject, this.paramContext);

            if (this.contextAudio) {
                //oscillator = new OscillatorAudio(paramObject);
            } else {
                piano = new Piano(paramObject);
            }

            piano.initInterface();
            //ATTENTION penser à envoyer la valeur initiale si OSC
            //on ajoute le nouvel objet au tableau des oscillators
            this.collPianos.push(piano);

        }
    }

    getObjectById(type, id){

        let collection;

        switch (type) {
            case "oscillator":
                collection=this.collOscillators;
                break;
            case "bang":
                collection=this.collBangs;
                break;
            case "toggle":
                collection=this.collToggles;
                break;
            case "knob":
                collection=this.collKnobs;
                break;
            case "slider":
                collection=this.collSliders;
                break;
            case "out":
                collection=this.collOuts;
                break;
        }

        let rechercheElementDom = document.getElementById(id);

        for (let element of collection) {
            if (element.elementDom === rechercheElementDom) {
                return element;
                break;
            }
        }
    }

    getObjectByAddressOsc(adr){

        let collection=this.collLeds;

        for (let element of collection) {
            if (element.adresseOsc === adr) {
                return element;
                break;
            }
        }
    }

    receptionMessageOsc(addressOsc,messageOsc){

        let object = this.getObjectByAddressOsc(addressOsc);

        object.receptionMessageOsc(messageOsc);

    }

    jsonConcat(o1, o2){
        for (let key in o2) {
            o1[key] = o2[key];
        }
        return o1;
    }
}

export default ObjectsKontrol;

