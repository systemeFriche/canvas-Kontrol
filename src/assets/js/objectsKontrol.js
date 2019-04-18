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

class ObjectsKontrol{

    constructor(contextAudio) {
        if(contextAudio){
            this.contextAudio=contextAudio;
            this.paramContext = {
                "contextAudio":contextAudio,
                "onvaluechange":function(){}
            };
        }else{
            this.paramContext = {
                "onvaluechange":function(param){sendValueOsc(param)}
            };
            //lancer fonction création ws
            //comment passer adresse et port du serveur avec qui on ouvre une webSocket ?
        }
        this.collSliders = [];
        this.collKnobs = [];
        this.collBangs = [];
        this.collToggles = [];
        this.collOuts = [];
        this.collOscillators = [];
    }

    loadObjects(){
        //un oscillateur est composé de knobs, il faut donc d'abord charger les oscillateurs avant les knobs
        this.loadOscillators();
        this.loadBangs();
        this.loadKnobs();
        this.loadSliders();
        this.loadToggles();
        this.loadOuts();
    }

    configureObjects(){
        this.configureOscillators();
    }

    loadSliders(contextAudio){
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
                "typeVal":sliderDom.dataset.typeVal,
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
                paramObject=ObjectsKontrol.jsonConcat(paramObject,{"adresseOsc":sliderDom.dataset.adresseOsc});
            }
            paramObject=ObjectsKontrol.jsonConcat(paramObject,this.paramContext);

            if (this.contextAudio){
                slider = new SliderAudio(paramObject);
            }
            else{
                slider = new Slider(paramObject);
            }


            slider.initInterface();
            //ATTENTION penser à envoyer la valeur initiale si OSC

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
                "typeVal":knobDom.dataset.typeVal,
                "valeurMin": knobDom.dataset.valeurMin,
                "valeurMax":knobDom.dataset.valeurMax,
                "valeur":parseFloat(knobDom.dataset.valeurInit),
                "width":knobDom.dataset.width,
                "height":knobDom.dataset.width,
                "scale":parseFloat(knobDom.dataset.width/300.0),//le elementDom de base a été créé dans un carré de 300 pixels de côté
                "couleur":knobDom.dataset.couleur,
            };

            if (!this.contextAudio) {
                paramObject=ObjectsKontrol.jsonConcat(paramObject,{"adresseOsc":knobDom.dataset.adresseOsc});
            }
            paramObject=ObjectsKontrol.jsonConcat(paramObject,this.paramContext);

            knob = new Knob(paramObject);

            knob.initInterface();
            //ATTENTION penser à envoyer la valeur initiale si OSC

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
                paramObject=ObjectsKontrol.jsonConcat(paramObject,{"adresseOsc":bangDom.dataset.adresseOsc});
            }
            paramObject=ObjectsKontrol.jsonConcat(paramObject,this.paramContext);

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
                paramObject=ObjectsKontrol.jsonConcat(paramObject,{"adresseOsc":toggleDom.dataset.adresseOsc});
            }
            paramObject=ObjectsKontrol.jsonConcat(paramObject,this.paramContext);

            toggle = new Toggle(paramObject);

            toggle.initInterface();

            //ATTENTION penser à envoyer la valeur initiale si OSC
            //on ajoute le nouvel objet au tableau des toggles
            this.collToggles.push(toggle);
        }
    }

    loadOuts(contextAudio){
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
                paramObject=ObjectsKontrol.jsonConcat(paramObject,{"adresseOsc":outDom.dataset.adresseOsc});
            }
            paramObject=ObjectsKontrol.jsonConcat(paramObject,this.paramContext);

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

    loadOscillators(contextAudio){
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
                paramObject=ObjectsKontrol.jsonConcat(paramObject,{"adresseOsc":oscillatorDom.dataset.adresseOsc});
            }
            paramObject=ObjectsKontrol.jsonConcat(paramObject,this.paramContext);

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
                let knobAmpl=this.getObject("knob",id);
                //on termine de configurer les différents objets
                knobAmpl.onValueChange = function(param){oscillator.changeAmplitude(param.value)};
                id=oscillator.id+"-knobFreq";
                let knobFreq=this.getObject("knob",id);
                knobFreq.onValueChange = function(param){oscillator.changeFrequency(param.value)};
            }
        }
    }

    getObject(type,id) {

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

    static jsonConcat(o1, o2) {
        for (var key in o2) {
            o1[key] = o2[key];
        }
        return o1;
    }
}
