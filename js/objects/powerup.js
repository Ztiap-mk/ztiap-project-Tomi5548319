class Powerup extends GameObject {
    constructor(canvas, x_mult, y_mult, width_mult, height_mult) {
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.timeLeft = 30; // Powerups will despawn after 30 seconds

        /* Powerup types:
        -1 -> undefined
        0 -> ammo (33% chance)
        1 -> laser (1% chance)
        2 -> shield (33% chance)
        3 -> speed (33% chance)
        */
        this.type = -1;
        this.src = "";
    }

    // Redefine ondraw function
    ondraw(context) {

        if(this.type !== 1) {
            var img = new Image();
            img.src = this.src;
            context.drawImage(img, this.x, this.y, this.width, this.height);
        }

    }

    static generate(canvas, x_mult, y_mult, width_mult, height_mult) {
        var powerup = new Powerup(canvas, x_mult, y_mult, width_mult, height_mult);

        // Generate a random powerup
        var rand = Math.floor((Math.random() * 100) + 1);

        if(rand <= 33){ // ammo
            powerup.type = 0;
            powerup.src = "img/powerup_ammo.svg"
        }

        else if(rand <= 60){ // laser
            powerup.type = 1;
            var img = new AnimatedImage(canvas, x_mult, y_mult, width_mult, height_mult, "img/powerup_laser.svg", 200, 200, 2, 500);
            powerup.add(img);
        }

        else if(rand <= 67){ // shield
            powerup.type = 2;
            powerup.src = "img/powerup_shield.svg"
        }

        else{ // speed
            powerup.type = 3;
            powerup.src = "img/powerup_speed.svg"
        }

        app.add(powerup);
    }
}