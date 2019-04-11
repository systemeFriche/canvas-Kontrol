/** ObjKontrol
 * Bibliothèque d'interfaces simples.
 *
 * OBJET : SLIDER AUDIO
 *
 * Version: 0.2.0 (22/03/2019)
 * Require: vanilla js
 *
 * Licence Creative Commons CC : BY-SA
 * Author : Fabien Guntz
 *
 * Big Thanks to Anne-Marie Puizillout
 */

class SliderAudio extends Slider {

    constructor(param) {
        super(param);
        this.contextAudio = param.contextAudio;
        this.initAudio();
        this.outlet = null;
        //valueB en dB
        //this.valueB=param.valeur;
    }

    setValueB(val)
    {
        this.valueB=val;
        this.drawSlider();
        if(this.contextAudio){
            let amplitudeLin = Math.pow(10, this.valueB/20);
            this.changeAmplitude(amplitudeLin);
        }
    }

    initAudio() {
        this.gainNode = this.contextAudio.createGain();
        let amplitudeLin = Math.pow(10, this.valueA/20);
        this.gainNode.gain.setValueAtTime(amplitudeLin, this.contextAudio.currentTime);
    }

    connectOutlet() {
        this.gainNode.connect(this.outlet);
    }

    changeAmplitude(amplitude) {
        //amplitude : amplitude en Volt
        if(this.gainNode){
            this.gainNode.gain.linearRampToValueAtTime(amplitude, this.contextAudio.currentTime + 0.05);
            //setValueAtTime(amplitudeLin, this.contextAudio.currentTime);
            //this.gainNode.gain.value=amplitudeLin;
        }
        //this.amplitude=amplitude;
    }
}




