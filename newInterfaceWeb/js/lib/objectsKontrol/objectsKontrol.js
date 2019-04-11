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

    constructor() {
        this.collSliders = [];
        this.collKnobs = [];
        this.collBangs = [];
        this.collToggles = [];
        this.collOuts = [];
        this.collOscillators = [];
    }

    loadObjects(contextAudio){
        //un oscillateur est composé de knobs, il faut donc d'abord charger les oscillateurs avant les knobs
        this.loadOscillators(contextAudio);
        this.loadBangs();
        this.loadKnobs();
        this.loadSliders(contextAudio);
        this.loadToggles();
        this.loadOuts(contextAudio);
    }

    configureObjects(contextAudio){
        this.configureOscillators(contextAudio);
    }

    loadSliders(contextAudio){
        //on crée tous les objets Slider présents dans le DOM
        let collSlidersDom = document.querySelectorAll(".slider");

        //on récupère tous les objets du DOM de la classe knob
        for (let sliderDom of collSlidersDom){
            //pour chaque objet du DOM de la classe slider on crée un objet javascript slider
            let slider;

            if (contextAudio) {
                slider = new SliderAudio({
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
                    "onvaluechange":function(){},
                    //"onvaluechange":function(val){this.changeAmplitude(val)},
                    "contextAudio":contextAudio
                });
            }
            else {
                slider = new Slider({
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
                    //"onvaluechange":function(adresseOsc,typeVal,val){envoiValeurOsc(adresseOsc,typeVal,val)},
                    "adresseOsc":sliderDom.dataset.adresseOsc
                });
            }

            slider.initInterface();
            //ATTENTION penser à envoyer la valeur initiale si OSC

            //slider.drawSlider();
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
            knob = new Knob({
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
                //"onvaluechange":function(adresseOsc,typeVal,val){envoiValeurOsc(adresseOsc,typeVal,val)},
                "adresseOsc":knobDom.dataset.adresseOsc

            });

            knob.initInterface();
            //ATTENTION penser à envoyer la valeur initiale si OSC
            //knob.drawKnob();
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
            bang = new Bang({
                "elementDom":bangDom,
                "id":bangDom.id,
                "legende":bangDom.dataset.legende,
                "width":bangDom.dataset.width,
                "scale":parseFloat(bangDom.dataset.width/300.0),//le elementDom de base a été créé dans un carré de 300 pixels de côté
                "styleBorder":bangDom.dataset.styleBorder,
                "couleur":bangDom.dataset.couleur,
                //"onvaluechange":function(adresseOsc,typeVal,val){envoiValeurOsc(adresseOsc,typeVal,val)},
                "adresseOsc":bangDom.dataset.adresseOsc

            });

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
            toggle = new Toggle({
                "elementDom":toggleDom,
                "legende":toggleDom.dataset.legende,
                "etatToggle":parseInt(toggleDom.dataset.etatInit),
                "width":toggleDom.dataset.width,
                "scale":parseFloat(toggleDom.dataset.width/300.0),//le elementDom de base a été créé dans un carré de 300 pixels de côté
                "styleBorder":toggleDom.dataset.styleBorder,
                "couleur":toggleDom.dataset.couleur,
                //"onvaluechange":function(adresseOsc,typeVal,val){envoiValeurOsc(adresseOsc,typeVal,val)},
                "adresseOsc":toggleDom.dataset.adresseOsc

            });
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

            if (contextAudio) {
                out = new OutAudio({
                    "elementDom":outDom,
                    "id":outDom.id,
                    "legende":outDom.dataset.legende,
                    "width":outDom.dataset.width,
                    "height":outDom.dataset.height,
                    "scale":parseFloat(outDom.dataset.width/300.0),//le elementDom de base a été créé dans un carré de 300 pixels de côté
                    "styleBorder":outDom.dataset.styleBorder,
                    "couleur":outDom.dataset.couleur,
                    //"onvaluechange":function(adresseOsc,typeVal,val){envoiValeurOsc(adresseOsc,typeVal,val)},
                    "contextAudio":contextAudio
                });
            }
            else{
                out = new Out({
                    "elementDom":outDom,
                    "id":outDom.id,
                    "legende":outDom.dataset.legende,
                    "width":outDom.dataset.width,
                    "height":outDom.dataset.height,
                    "scale":parseFloat(outDom.dataset.width/300.0),//le elementDom de base a été créé dans un carré de 300 pixels de côté
                    "styleBorder":outDom.dataset.styleBorder,
                    "couleur":outDom.dataset.couleur,
                    //"onvaluechange":function(adresseOsc,typeVal,val){envoiValeurOsc(adresseOsc,typeVal,val)},
                    "adresseOsc":outDom.dataset.adresseOsc
                });
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

            if (contextAudio) {
                oscillator = new OscillatorAudio({
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
                    //on n'en a pas besoin
                    //"adresseOsc":oscillatorDom.dataset.adresseOsc
                    "contextAudio":contextAudio
                });
            }
            else {
                oscillator = new Oscillator({
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
                    "adresseOsc":oscillatorDom.dataset.adresseOsc
                    //"onvaluechange":function(adresseOsc,typeVal,val){envoiValeurOsc(adresseOsc,typeVal,val)},

                });
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
}
