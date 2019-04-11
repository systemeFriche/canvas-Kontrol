/** ObjKontrol
 * Bibliothèque d'interfaces simples.
 *
 * OBJET : OSCILLATOR AUDIO
 *
 * Version: 0.2.0 (22/03/2019)
 * Require: vanilla js
 *
 * Licence Creative Commons CC : BY-SA
 * Author : Fabien Guntz
 *
 * Big Thanks to Anne-Marie Puizillout
 */

class OscillatorAudio extends Oscillator {

    constructor(param) {
        super(param);
        this.contextAudio = param.contextAudio;
        this.initAudio();
        this.outlet = null;
    }

    initAudio() {
        this.oscillatorNode = this.contextAudio.createOscillator();
        this.oscillatorNode.type = this.type;
        this.oscillatorNode.frequency.value = this.frequency; // valeur en hertz
        this.gainNode = this.contextAudio.createGain();
        this.gainNode.gain.setValueAtTime(0, this.contextAudio.currentTime);
        this.oscillatorNode.connect(this.gainNode);
        this.oscillatorNode.start();
    }

    connectOutlet() {
        this.gainNode.connect(this.outlet);
    }

    on() {
        this.gainNode.gain.linearRampToValueAtTime(this.amplitude, this.contextAudio.currentTime + 0.05);
        this.etatActive = true;
        this.drawOscillator();
    }

    off() {
        this.gainNode.gain.linearRampToValueAtTime(0, this.contextAudio.currentTime + 0.05);
        this.etatActive = false;
        this.drawOscillator();
    }

    changeType(type){
        let stateMem=false;
        if(this.etatActive){
            stateMem=true;
        }
        this.off();
        this.oscillatorNode.stop();
        this.type=type;
        this.initAudio();
        this.connectOutlet();
        if(stateMem){
            this.on();
        }
        this.drawOscillator();
    }

    changeAmplitude(amplitude) {
        //amplitude : amplitude en Volt
        if(this.gainNode){
            this.gainNode.gain.linearRampToValueAtTime(amplitude, this.contextAudio.currentTime + 0.05);
            //this.gainNode.gain.value=amplitudeLin;
            //setValueAtTime(amplitudeLin, this.contextAudio.currentTime);
        }
        this.amplitude=amplitude;
    }

    changeFrequency(frequency) {
        this.oscillatorNode.frequency.value=frequency;
        this.frequency=frequency;
    }
}




