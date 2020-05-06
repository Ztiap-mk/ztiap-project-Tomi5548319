class Window extends GameObject {
    // Initialization
    constructor(canvas, x_mult, y_mult, width_mult, height_mult) {

        // Construct an Object
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.backgroundColor = "white";
        this.physical = false;
    }

    ondraw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.backgroundColor;
        context.fill();
        context.stroke();
    }
}