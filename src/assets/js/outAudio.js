/** ObjKontrol
 * Bibliothèque d'interfaces simples.
 *
 * OBJET : OUT AUDIO
 *
 * Version: 0.2.0 (22/03/2019)
 * Require: vanilla js
 *
 * Licence Creative Commons CC : BY-SA
 * Author : Fabien Guntz
 *
 * Big Thanks to Anne-Marie Puizillout
 */

class OutAudio extends Out {

    constructor(param) {
        super(param);
        this.contextAudio = param.contextAudio;
        this.initAudio();
    }

    initAudio(){
        this.gainNode = this.contextAudio.createGain();
        this.gainNode.gain.setValueAtTime(0, this.contextAudio.currentTime);
        this.gainNode.connect(this.contextAudio.destination);
    }

    on() {
        this.contextAudio.resume();
        //fade in
        this.gainNode.gain.linearRampToValueAtTime(1, this.contextAudio.currentTime + 0.05);
        this.etatActive = true;
        this.drawOut();
    }

    off() {
        //fade out
        this.gainNode.gain.linearRampToValueAtTime(0, this.contextAudio.currentTime + 0.05);
        this.contextAudio.suspend();
        this.etatActive = false;
        this.drawOut();
    }

}




