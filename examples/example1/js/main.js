requirejs.config({
    baseUrl: '../../lib',
    //Gestion des dépendances
    //objectsKontrol/...js un peu bourrin, comment faire de manière plus élégante, notion de package ?
    shim: {
        'oscillatorAudio':['oscillator'],
        'sliderAudio':['slider'],
        'outAudio':['out'],
        'toggle':['canvas'],
        'objectsKontrol': ['oscillatorAudio', 'bang', 'draw', 'knob','sliderAudio', 'toggle','outAudio']
    }
});

// Start the main app logic.
requirejs(['objectsKontrol'],
    function () {

        var contextAudio;

        function initAudio() {
            try {
                //create the audio context
                // définition du contexte audio les navigateurs avec un moteur Webkit/blink demandent un préfixe
                //var contextAudio = new AudioContext();
                contextAudio = new (window.AudioContext || window.webkitAudioContext)();
            }
            catch(e) {
                alert('Web Audio API n\'est pas supporté par ce navigateur');
            }
        }

        //crée un scope internne à initialiser
        //function finit scope vidé vide la cache
        //si navigateur se rend compte qu'une variable du scope de la fonction est référencéd ans une fonction anonyme il la garde

        function initInterface(){

            //À MODIFIER
            //il faut être sûr que le contexte audio soit créé
            //ou interface OSC en place
            const objetsK = new ObjectsKontrol();
            objetsK.loadObjects(contextAudio);
            objetsK.configureObjects(contextAudio);

            let oscillator1 = objetsK.getObject("oscillator","osc1");
            let slider1 = objetsK.getObject("slider","slider1");
            let out1 = objetsK.getObject("out","out1");

            //on connecte le gain de l'oscillator avec le gain du slider
            oscillator1.outlet=slider1.gainNode;
            oscillator1.connectOutlet();
            //on connecte le gain du slider avec le gain de la sortie
            slider1.outlet=out1.gainNode;
            slider1.connectOutlet();


            /*  ce code ne fonctionne pas car dans la fonction on l'objet this fait référence au boutonStart ou au boutonStop et pas à l'oscillator
                document.getElementById("boutonStart").addEventListener("mousedown",oscillator.on);
                document.getElementById("boutonStop").addEventListener("mousedown", oscillator.off);*/
            //document.getElementById("boutonStart").addEventListener("mousedown",oscillator.on.bind(oscillator)); //on perd le this du bouton mais on peut retrouver les infos par evt
            //document.getElementById("boutonStart").addEventListener("mousedown",()=>oscillator.on());
        }

        initAudio();
        initInterface();
    });






