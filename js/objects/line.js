class Line extends Widget {
    // Initialization
    constructor(x1, y1, x2, y2) {

        // Construct an Object
        super(canvas, x1, y1, x2 - x1, y2 - y1);

        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    ondraw(context) {
        context.strokeStyle = "red";

        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.stroke();
    }
}