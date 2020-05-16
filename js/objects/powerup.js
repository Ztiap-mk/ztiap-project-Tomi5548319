class Powerup extends GameObject {
    constructor(canvas, x_mult, y_mult, width_mult, height_mult) {
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.timeLeft = 30; // Powerups will despawn after 30 seconds

        /* Powerup types:
        -1 -> undefined
        0 -> ammo (30% chance)
        1 -> laser (10% chance)
        2 -> shield (30% chance)
        3 -> speed (30% chance)
        */
        this.type = -1;
        this.src = "";
    }

    // Redefine ondraw function
    ondraw(context) {

        var img = new Image();
        img.src = this.src;

        context.drawImage(img, this.x, this.y, this.width, this.height);

    }

    static generate(canvas, x_mult, y_mult, width_mult, height_mult) {
        var powerup = new Powerup(canvas, x_mult, y_mult, width_mult, height_mult);

        // Generate a random powerup
        var rand = Math.floor((Math.random() * 100) + 1);

        if(rand <= 30){ // ammo
            powerup.type = 0;
            powerup.src = "img/powerup_ammo.svg"
        }

        else if(rand <= 40){ // laser
            powerup.type = 1;
            powerup.src = "img/powerup_laser.svg"
        }

        else if(rand <= 70){ // shield
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