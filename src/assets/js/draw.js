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

class Draw{

    constructor(elementDOM,scaleX,scaleY) {
        this.elementDOM=elementDOM;
        this.scaleX=this.elementDOM.width/100.0*scaleX;
        this.scaleY=this.elementDOM.height/100.0*scaleY;
        this.init();
    }

    init(){
        if (this.elementDOM.getContext) {
            this.context = this.elementDOM.getContext('2d');
            this.context.scale(this.scaleX,this.scaleY);
        }
    }

    drawSinus(backgroundColor,lineColor) {

        this.elementDOM.style.backgroundColor=backgroundColor;

        this.context.strokeStyle=lineColor;
        this.context.lineWidth=4;

        //on efface le elementDom
        this.context.clearRect(0,0,100,100);
        //point de départ
        let x0=10;
        let y0=50;
        //abscisse d'arrivée
        let x1=90;
        //amplitude
        let A=40;
        //pas du traçage
        let dx=1;

        var x = 10;
        var y = y0-A*Math.sin(this.scaleRad(x0,x1,x));

        this.context.beginPath();
        this.context.moveTo(x, y);

        // Loop to draw segments
        for (let i = x0+dx; i <= x1; i += dx) {
            x = i;
            y = y0-A*Math.sin(this.scaleRad(x0,x1,x));
            this.context.lineTo(x,y);


        }
        this.context.stroke();
    }

    drawTriangle(backgroundColor,lineColor){

        this.elementDOM.style.backgroundColor=backgroundColor;

        this.context.strokeStyle=lineColor;
        this.context.lineWidth=4;

        //on efface le elementDom
        this.context.clearRect(0,0,100,100);

        this.context.beginPath();
        this.context.moveTo(10, 50);
        this.context.lineTo(30,10);
        this.context.lineTo(70,90);
        this.context.lineTo(90,50);
        this.context.stroke();
    }

    drawSawTooth(backgroundColor,lineColor){

        this.elementDOM.style.backgroundColor=backgroundColor;

        this.context.strokeStyle=lineColor;
        this.context.lineWidth=4;

        //on efface le elementDom
        this.context.clearRect(0,0,100,100);

        this.context.beginPath();
        this.context.moveTo(10, 50);
        this.context.lineTo(50,10);
        this.context.lineTo(50,90);
        this.context.lineTo(90,50);
        this.context.stroke();
    }

    drawSquare(backgroundColor,lineColor){

        this.elementDOM.style.backgroundColor=backgroundColor;

        this.context.strokeStyle=lineColor;
        this.context.lineWidth=4;

        //on efface le elementDom
        this.context.clearRect(0,0,100,100);

        this.context.beginPath();
        this.context.moveTo(10, 50);
        this.context.lineTo(10,10);
        this.context.lineTo(50,10);
        this.context.lineTo(50,90);
        this.context.lineTo(90,90);
        this.context.lineTo(90,50);
        this.context.stroke();
    }

    scaleRad(x0,x1,x){

        let xRad;
        let width=x1-x0;
        xRad=(x-x0)/width*Math.PI * 2;
        return xRad;
    }
}

export default Draw;