requirejs.config({
    baseUrl: '../src/assets/js',
    //Gestion des dépendances
    shim: {
        'oscillatorAudio':['oscillator'],
        'sliderAudio':['slider'],
        'outAudio':['out'],
        'toggle':['canvas'],
        'objectsKontrol': ['oscillatorAudio', 'bang', 'draw', 'knob','sliderAudio', 'toggle','outAudio']
    }
});

// Start the main app logic.
requirejs(['objectsKontrol','osc'],
    function () {

        //Il faudrait ajouter test si connexion OSC en place

        function initInterface(){

            const objetsK = new ObjectsKontrol();
            objetsK.loadObjects();
            objetsK.configureObjects();
        }

        initInterface();
    });






