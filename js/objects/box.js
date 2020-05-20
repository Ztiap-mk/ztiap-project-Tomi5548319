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

        var img = new Image();
        img.src = this.src;

        context.drawImage(img, this.x, this.y, this.width, this.height);

    }

    break(strength) {
        var sound;
        var powerup;

        switch (this.type) {
            case "iron":
                if (strength > 1) {
                    sound = new Sound("sounds/iron_box_broken/edited.mp3", Settings.sound, 1);
                    powerup = Math.floor((Math.random() * 100) + 1); // 1-100
                    if(powerup <= 50) // 50% chance of dropping a powerup
                        Powerup.generate(app.canvas, 1600 * this.x / app.canvas.width, 900 * this.y / app.canvas.height, 1600 * this.width / app.canvas.width, 900 * this.height / app.canvas.height);
                    app.remove(this);
                } else
                    sound = new Sound("sounds/object_not_broken/edited.mp3", Settings.sound, 0.3);

                break;
            case "wood":
                sound = new Sound("sounds/wooden_box_broken/edited.mp3", Settings.sound, 0.3);
                powerup = Math.floor((Math.random() * 100) + 1); // 1-100
                if(powerup <= 30) // 30% chance of dropping a powerup
                    Powerup.generate(app.canvas, 1600 * this.x / app.canvas.width, 900 * this.y / app.canvas.height, 1600 * this.width / app.canvas.width, 900 * this.height / app.canvas.height);

                app.remove(this);
                break;
            default:
                if (strength > 2) // Laser
                    app.remove(this);
                else
                    sound = new Sound("sounds/object_not_broken/edited.mp3", Settings.sound, 0.3);
        }
    }
}