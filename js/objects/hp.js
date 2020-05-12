class Hp extends GameObject {
    constructor(id, canvas, x_mult, y_mult, width_mult, height_mult) {
        // Construct a Widget
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.id = id;
        this.src = "img/hp_full.svg";

        this.physical = false;
    }

    // Redefine draw
    ondraw(context) {

        console.log("Drawing HP");
        context.save();

        // Move the image
        context.translate(this.x, this.y);

        // Render the image
        var img = new Image();
        img.src = this.src;
        context.drawImage(img, 0, 0, this.width, this.height);

        context.restore();


    }

}