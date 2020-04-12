class Text extends GameObject {
    constructor(canvas, context, x_mult, y_mult, text, colour, size_mult) {
        // Construct a GameObject
        super(canvas, x_mult, y_mult, size_mult, size_mult);

        this.text = text;
        this.colour = colour;

        context.font = this.height + "px Arial";
        this.width = context.measureText(this.text).width;
    }

    // Redefine ondraw function
    ondraw(context) {

        // Text boundary
        /*context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();*/

        // Write text down
        context.fillStyle = this.colour;
        context.font = this.height + "px Arial";
        context.fillText(this.text, this.x, this.y + this.height);

    }

}