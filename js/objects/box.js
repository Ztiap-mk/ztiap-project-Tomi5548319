class Box extends GameObject {
    constructor(canvas, boxType, x_mult, y_mult, width_mult, height_mult) {
        // Construct Widget
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.type = boxType;

        switch (boxType) {
            case "iron":
                this.src = "img/box_iron.png";
                break;
            case "wood":
                this.src = "img/box_wooden.png";
                break;
            default:
                this.src = "img/wall.png";
        }
    }

    // Redefine ondraw function
    ondraw(context) {
        var box = this;

        var img = new Image();
        img.src = box.src;

        context.drawImage(img, box.x, box.y, box.width, box.height);

    }

    break(strength) {
        var sound;

        switch (this.type) {
            case "iron":
                if (strength > 1) {
                    sound = new Sound("sounds/iron_box_broken/edited.mp3", app.volume, 0.3);
                    app.remove(this);
                } else {
                    sound = new Sound("sounds/object_not_broken/edited.mp3", app.volume, 0.3);
                }

                break;
            case "wood":
                sound = new Sound("sounds/wooden_box_broken/edited.mp3", app.volume, 0.3);
                app.remove(this);
                break;
            default:
                sound = new Sound("sounds/object_not_broken/edited.mp3", app.volume, 0.3);
        }
    }
}