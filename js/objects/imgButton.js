class ImgButton extends GameObject {
    constructor(canvas, src, x_mult, y_mult, width_mult, height_mult) {
        // Construct Widget
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.imgSrc = src;
        this.physical = false;
    }

    // Redefine ondraw function
    ondraw(context) {
        var img = new Image();
        img.src = this.imgSrc;

        context.drawImage(img, this.x, this.y, this.width, this.height);
    }

    // Redefine onclick function
    onclick(event) {
        if (this.action) return this.action();
    }


    // By default do nothing
    action() {}
}