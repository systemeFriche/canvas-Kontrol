/** ObjKontrol
 * Bibliothèque d'interfaces HTML simples.
 *
 * OBJET : PIANO
 *
 * Version: 0.2.0 (22/03/2019)
 * Require: vanilla js
 *
 * Licence Creative Commons CC : BY-SA
 * Author : Fabien Guntz
 *
 * Big Thanks to Anne-Marie Puizillout
 * Design : https://github.com/aterrien/jQuery-Knob
 */

//    ctx.lineCap='round'

class Piano
{
    constructor(param) {
        this.elementDom=param.elementDom;
        this.id=param.id;
        //this.ctx = this.elementDom.getContext("2d");
        this.legende = param.legende || "";
        //this.sourisX=0;
        this.couleur=param.couleur;
        this.onValueChange=param.onvaluechange || function(){};

        this.notesArray = [
            {note:"DO3",whitePressed:false,blackPressed:false},
            {note:"RE3",whitePressed:false,blackPressed:false},
            {note:"MI3",whitePressed:false},
            {note:"FA3",whitePressed:false,blackPressed:false},
            {note:"SOL3",whitePressed:false,blackPressed:false},
            {note:"LA3",whitePressed:false,blackPressed:false},
            {note:"SI3",whitePressed:false},
            {note:"DO4",whitePressed:false,blackPressed:false},
            {note:"RE4",whitePressed:false,blackPressed:false},
            {note:"MI4",whitePressed:false},
            {note:"FA4",whitePressed:false,blackPressed:false},
            {note:"SOL4",whitePressed:false,blackPressed:false},
            {note:"LA4",whitePressed:false,blackPressed:false},
            {note:"SI4",whitePressed:false},
            {note:"DO5",whitePressed:false,blackPressed:false},
        ];

        this.numberWhiteNotes=15;
        this.noteWhiteWidth = 70;
        this.noteBlackWidth=40;
        this.noteBlackHeight=250;
        this.whiteHeight=400;

        //this.ctx.scale(param.scale,param.scale);
        this.onValueChange=param.onvaluechange || function(){};
        this.width=param.width;
        this.scale=param.scale;
        this.height=this.scale*this.whiteHeight;

        this.adresseOsc=param.adresseOsc;
    }

    initInterface() {
        //On ajoute les éléments html qui composent l'interface graphique du bang
        //Le elementDom principal
        let canvasPianoDom=document.createElement('canvas');

        //Il faudrait distinguer ces deux états pour gérer le fait qu'on appuie déjà sur une touche déjà appuyée
        canvasPianoDom.addEventListener("mousedown",this.mouseDownUp.bind(this));
        canvasPianoDom.addEventListener("mouseup",this.mouseDownUp.bind(this));

        canvasPianoDom.id=this.id+"-canvas";
        canvasPianoDom.className="piano";
        canvasPianoDom.width=this.width;
        canvasPianoDom.height=this.height;
        canvasPianoDom.setAttribute("data-couleur", this.couleur);
        this.elementDom.appendChild(canvasPianoDom);
        this.ctx = canvasPianoDom.getContext("2d");
        this.ctx.scale(this.scale,this.scale);

        this.drawPiano();
    }

    drawPiano()
    {
        let wLeft=0;
        let wRight=0;

        // draw piano notes
        for( let i = 0; i < this.numberWhiteNotes; i++ ) {



            // border
            this.ctx.lineWidth=2;
            this.ctx.strokeStyle="rgba(0,0,0,1)";

            // white notes
            this.ctx.beginPath();
            this.ctx.fillStyle="rgba(255,255,255,1)";
            if (this.notesArray[i].whitePressed){
                this.ctx.fillStyle=this.couleur;
            }

            wLeft=0;
            wRight=0;

            //pour dessiner la touche blanche on a besoin de savoir si il y a des touches noires avant et après
            if(i>0){
                //si touche noire avant
                if(typeof this.notesArray[i-1].blackPressed !== "undefined"){
                    wLeft=this.noteBlackWidth/2;
                }
            }

            if(i<this.numberWhiteNotes-1){
                //si touche noire après
                if(typeof this.notesArray[i].blackPressed !== "undefined"){
                    wRight=this.noteBlackWidth/2;
                }
            }
            this.ctx.moveTo(this.noteWhiteWidth * i +wLeft,0);
            this.ctx.lineTo(this.noteWhiteWidth * (i+1) -wRight,0);
            this.ctx.lineTo(this.noteWhiteWidth * (i+1) -wRight,this.noteBlackHeight);
            this.ctx.lineTo(this.noteWhiteWidth * (i+1),this.noteBlackHeight);
            this.ctx.lineTo(this.noteWhiteWidth * (i+1),this.whiteHeight);
            this.ctx.lineTo(this.noteWhiteWidth * i,this.whiteHeight);
            this.ctx.lineTo(this.noteWhiteWidth * i,this.noteBlackHeight);
            this.ctx.lineTo(this.noteWhiteWidth * i+wLeft,this.noteBlackHeight);
            this.ctx.lineTo(this.noteWhiteWidth * i+wLeft,0);
            this.ctx.fill();
            this.ctx.stroke();

            // black notes
            //on ne dessine pas la touche noire (si touche noire) de la dernière touche blanche
            if(i<this.numberWhiteNotes-1){
                if(typeof this.notesArray[i].blackPressed !== "undefined"){
                    this.ctx.beginPath();
                    this.ctx.fillStyle="black";
                    //ctx.strokeStyle = "black";
                    if (this.notesArray[i].blackPressed){
                        this.ctx.fillStyle=this.couleur;
                    }
                    this.ctx.rect( this.noteWhiteWidth * (i+1) - this.noteBlackWidth/2, 0, this.noteBlackWidth, this.noteBlackHeight);
                    this.ctx.fill();
                    this.ctx.stroke();
                }
            }
        }
    }

    updatePianoState(e){
        // on récupère les cordonnées du clic
        let xPos = e.offsetX;
        let yPos = e.offsetY;

        let state = 0;

        // on a cliqué sur une touche noire
        if( yPos < this.noteBlackHeight ) {
            for(let i = 0 ; i < this.numberWhiteNotes; i++) {
                if( xPos > ( (i+1) * this.noteWhiteWidth - this.noteBlackWidth/2 ) && xPos < ( (i+1) * this.noteWhiteWidth + this.noteBlackWidth/2 ) && this.notesArray[ i ].blackPressed!=="undefined" ) {
                    if (this.notesArray[i].blackPressed===false){
                        this.notesArray[i].blackPressed=true;
                    }
                    else{
                        this.notesArray[i].blackPressed=false;
                    }
                    this.onTouchChange(this.notesArray[i],"b");
                }
            }
        } else { // on a cliqué sur une touche blanche
            for(let i = 0 ; i < this.numberWhiteNotes; i++) {
                if( xPos > ( i * this.noteWhiteWidth ) && xPos < ( (i+1) * this.noteWhiteWidth ) ) {
                    if (this.notesArray[i].whitePressed===false){
                        this.notesArray[i].whitePressed=true;
                    }
                    else{
                        this.notesArray[i].whitePressed=false;
                    }
                    this.onTouchChange(this.notesArray[i],"w");
                }
            }
        }
    }

    mouseDownUp(e){
        this.updatePianoState(e);
        this.drawPiano();
    }

    onTouchChange(note,bOrW){

        let sharp="";//pour gérer si on envoie la note dièse ou note sans dièse
        let state=0;//pour gérer quel état on envoi la note blanche ou la note noire
        if (bOrW==="b"){
            sharp="#";
            state=note.blackPressed;
        }
        else{
            state=note.whitePressed;
        }

        let param = {
            "adresseOsc":this.adresseOsc,
            args:[
                {
                    "type":"s",
                    "value":note.note+sharp
                },
                {
                    "type":"i",
                    "value":state
                }
            ]
        };

        this.onValueChange(param);
    }
}

export default Piano;

