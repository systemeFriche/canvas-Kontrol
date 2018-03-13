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


//Il faut attendre que le port soit ouvert pour charger tous les objets
oscPort.on("ready", function () {

    //on crée tous les objets Knob présents dans le DOM
    let collKnobs = document.querySelectorAll(".knob");

    //on récupère tous les objets du DOM de la classe knob
    for (let knobDom of collKnobs){
        //pour chaque objet du DOM de la classe knob on crée un objet javascript knob
        let knob;
        knob = new Knob({
            "canvas":knobDom,
            "legende":knobDom.dataset.legende,
            "angleDepart":parseInt(knobDom.dataset.angleDepart),
            "angleArrivee":parseInt(knobDom.dataset.angleArrivee),
            "typeVal":knobDom.dataset.typeVal,
            "valeurMin": knobDom.dataset.valeurMin,
            "valeurMax":knobDom.dataset.valeurMax,
            "valeur":parseFloat(knobDom.dataset.valeurInit),
            "scale":parseFloat(knobDom.width/300.0),//le canvas de base a été créé dans un carré de 300 pixels de côté
            "couleur":knobDom.dataset.couleur,
            "onvaluechange":function(adresseOsc,typeVal,val){envoiValeurOsc(adresseOsc,typeVal,val)},
            "adresseOsc":knobDom.dataset.adresseOsc

        });
        knob.drawKnob();
        //on envoie la valeur initiale pour MAX
        knob.onValueChange(knob.adresseOsc,knob.typeVal,knob.valeurA);
    }

    //on crée tous les objets Slider présents dans le DOM
    let collSliders = document.querySelectorAll(".slider");

    //on récupère tous les objets du DOM de la classe knob
    for (let sliderDom of collSliders){
        //pour chaque objet du DOM de la classe slider on crée un objet javascript slider
        let slider;
        slider = new Slider({
            "canvas":sliderDom,
            "legende":sliderDom.dataset.legende,
            "typeVal":sliderDom.dataset.typeVal,
            "valeurMin": sliderDom.dataset.valeurMin,
            "valeurMax":sliderDom.dataset.valeurMax,
            "valeur":parseFloat(sliderDom.dataset.valeurInit),
            "scaleX":parseFloat(sliderDom.width/100.0),//le canvas de base a été créé dans un rectangle de 100 pixels par 300 pixels
            "scaleY":parseFloat(sliderDom.height/300.0),//le canvas de base a été créé dans un rectangle de 100 pixels par 300 pixels
            "couleur":sliderDom.dataset.couleur,
            "onvaluechange":function(adresseOsc,typeVal,val){envoiValeurOsc(adresseOsc,typeVal,val)},
            "adresseOsc":sliderDom.dataset.adresseOsc

        });
        slider.drawSlider();
        //on envoie la valeur initiale pour MAX
        slider.onValueChange(slider.adresseOsc,slider.typeVal,slider.valeurA);
    }

    //on crée tous les objets Toggle présents dans le DOM
    let collToggles = document.querySelectorAll(".toggle");

    //on récupère tous les objets du DOM de la classe toggle
    for (let toggleDom of collToggles){
        //pour chaque objet du DOM de la classe toggle on crée un objet javascript toggle
        let toggle;
        toggle = new Toggle({
            "canvas":toggleDom,
            "legende":toggleDom.dataset.legende,
            "etatToggle":parseInt(toggleDom.dataset.etatInit),
            "scale":parseFloat(toggleDom.width/300.0),//le canvas de base a été créé dans un carré de 300 pixels de côté
            "couleur":toggleDom.dataset.couleur,
            "onvaluechange":function(adresseOsc,typeVal,val){envoiValeurOsc(adresseOsc,typeVal,val)},
            "adresseOsc":toggleDom.dataset.adresseOsc

        });
        toggle.drawToggle();
        //on envoie la valeur initiale pour MAX
        toggle.onValueChange(toggle.adresseOsc,"i",toggle.etatToggle);
    }

    //on crée tous les objets Bang présents dans le DOM
    let collBangs = document.querySelectorAll(".bang");

    //on récupère tous les objets du DOM de la classe toggle
    for (let bangDom of collBangs){
        //pour chaque objet du DOM de la classe toggle on crée un objet javascript toggle
        let bang;
        bang = new Bang({
            "canvas":bangDom,
            "legende":bangDom.dataset.legende,
            "scale":parseFloat(bangDom.width/300.0),//le canvas de base a été créé dans un carré de 300 pixels de côté
            "couleur":bangDom.dataset.couleur,
            "onvaluechange":function(adresseOsc,typeVal,val){envoiValeurOsc(adresseOsc,typeVal,val)},
            "adresseOsc":bangDom.dataset.adresseOsc

        });
        bang.drawCercle();
    }

});





