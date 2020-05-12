class Ammo extends GameObject {
    constructor(id, canvas, x_mult, y_mult, width_mult, height_mult) {
        // Construct a Widget
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.id = id;
        if(id === 1)
            this.src = "img/ammo_full.svg";
        else
            this.src = "img/ammo_empty.svg";

        this.physical = false;
    }

    // Redefine draw
    ondraw(context) {

        // Render the image
        var img = new Image();
        img.src = this.src;
        context.drawImage(img, this.x, this.y, this.width, this.height);

    }

}