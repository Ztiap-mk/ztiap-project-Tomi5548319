class Shield extends GameObject {
    constructor(canvas, x_mult, y_mult, width_mult, height_mult) {
        // Construct a Widget
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.physical = false;
    }

    // Redefine draw
    ondraw(context) {

        context.save();
        context.globalAlpha = 0.5;

        // Move the image
        context.translate(this.x, this.y);

        // Render the shield
        var img = new Image();
        img.src = "img/shield.svg";
        context.drawImage(img, -this.width / 2, -this.height / 2, this.width, this.height);

        context.restore();

    }

}