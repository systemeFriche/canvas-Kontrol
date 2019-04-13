requirejs.config({
    baseUrl: '../../../src/assets/js',
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

        function initInterface(){

            const objetsK = new ObjectsKontrol();
            objetsK.loadObjects();
            objetsK.configureObjects();
        }

        initInterface();
    });






