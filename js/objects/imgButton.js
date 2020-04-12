class ImgButton extends GameObject {
    constructor(canvas, src, x_mult, y_mult, width_mult, height_mult) {
        // Construct Widget
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.imgSrc = src;
    }

    // Redefine ondraw function
    ondraw(context) {
        var button = this;

        var img = new Image();
        img.src = button.imgSrc;

        context.drawImage(img, button.x, button.y, button.width, button.height);
    }

    // Redefine onclick function
    onclick(event) {
        if (this.action) return this.action();
    }


    // By default do nothing
    action() {
    }
}