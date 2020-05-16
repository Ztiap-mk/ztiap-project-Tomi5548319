class Bullet extends GameObject {
    // Initialization
    constructor(canvas, x_mult, y_mult, width_mult, height_mult, dx, dy, strength) {

        // Construct an Object
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.strength = strength;

        this.movementSpeed = canvas.width / 10 / 3;

        var sound = new Sound("sounds/shooting/edited.mp3", app.volume, 0.3);

        this.dx = dx;
        this.dy = dy;
    }

    // Redefine draw
    ondraw(context) {
        context.save();

        // Move the image
        context.translate(this.x, this.y);

        // Render the image
        var img = new Image();
        img.src = "img/bullet.svg";
        context.drawImage(img, -this.width / 2, -this.height / 2, this.width, this.height);

        context.restore();

        // Render the x and y, used for debugging
        /*context.fillStyle = "red";
        context.beginPath();
        context.arc(this.x, this.y, 1, 0, Math.PI * 2);
        context.closePath();
        context.fill();*/

    }

    onUpdate(dt) {
        this.move(dt);
    }

    move(dt) {
        this.x += dt * this.movementSpeed * this.dx;
        this.y += dt * this.movementSpeed * this.dy;

        this.checkCollision(app.nodes, dt);
    }

    checkCollision(scene, dt) {
        // Check each object

        var collidedWithBox = false;

        for (var obj of scene) {
            if (obj.nodes.length > 0) this.checkCollision(obj.nodes, dt); // This object contains objects inside
            // Object is not physical
            if (!obj.physical || obj === this) continue;
            var collisions;

            if (obj instanceof Tank) {
                collisions = this.checkTankCollision(obj);

                if (collisions)
                    this.onCollide(obj, dt); // Bullet hit a tank
                continue;
            }

            if (obj instanceof Box) {
                if(collidedWithBox) continue; // Don't destroy more than 1 box at once

                collidedWithBox = this.checkBoxCollision(obj);
                if(collidedWithBox)
                    this.onCollide(obj, dt);
                continue;
            }

            if (obj instanceof Window) {
                if (this.x - this.width / 2 < obj.x || this.x + this.width / 2 > obj.x + obj.width ||
                    this.y - this.height / 2 < obj.y || this.y + this.height / 2 > obj.y + obj.height) {
                    var sound = new Sound("sounds/object_not_broken/edited.mp3", app.volume, 0.3);
                    app.remove(this);
                }
            }
        }
    }

    checkTankCollision(obj) {
        var collisions = [];

        // Check collision of 4 lines (tanks sides) with bullet center
        for (var i = 0; i < 4; i++) {
            // Tank side
            var line1 = {
                x1: obj.corners[i].x,
                y1: obj.corners[i].y,
                x2: obj.corners[(i + 1) % 4].x,
                y2: obj.corners[(i + 1) % 4].y
            };

            // outside of canvas and other side of click
            var line2 = {
                x1: -1,
                y1: -1,
                x2: this.x,
                y2: this.y
            };

            if (linesCollide(line1, line2))
                collisions.push(i);

        }

        var min_x = obj.corners[0].x;
        var max_x = min_x;
        var min_y = obj.corners[0].y;
        var max_y = min_y;

        for(var corner of obj.corners){
            if(corner.x < min_x)
                min_x = corner.x
            if(corner.x > max_x)
                max_x = corner.x;
            if(corner.y < min_y)
                min_y = corner.y;
            if(corner.y > max_y)
                max_y = corner.y;
        }

        return collisions.length === 1 && this.x > min_x && this.x < max_x && this.y > min_y && this.y < max_y;
    }

    checkBoxCollision(obj) {
        //return this.x > obj.x && this.x < obj.x + obj.width && this.y > obj.y && this.y < obj.y + obj.height;

        // Box left side
        if (this.x + this.width/2 > obj.x && this.x + this.width/2 < obj.x + obj.width && this.y > obj.y && this.y < obj.y + obj.height) {
            return true;
        }

        // Box right side
        else if(this.x - this.width/2 > obj.x && this.x - this.width/2 < obj.x + obj.width && this.y > obj.y && this.y < obj.y + obj.height){
            return true;
        }

        // Box top side
        else if(this.x > obj.x && this.x < obj.x + obj.width && this.y + this.height/2 > obj.y && this.y + this.height/2 < obj.y + obj.height){
            return true;
        }

        // Box bottom side
        else if(this.x > obj.x && this.x < obj.x + obj.width && this.y - this.height/2 > obj.y && this.y - this.height/2 < obj.y + obj.height){
            return true;
        }

        return false;

    }

    onCollide(obj, dt) {
        if (obj instanceof Tank){
            var sound;

            if(obj.hasShield === true) { // This tank has a shield => destroy it instead of lowering HP
                obj.hasShield = false;

                for(var child of obj.nodes)
                    if(child instanceof Shield)
                        obj.remove(child);

                var index = obj.powerups.indexOf(2);
                obj.powerups.splice(index, 1);

                sound = new Sound("sounds/shield_destroyed/320549__debsound__pop-19.wav", app.volume, 0.5);
            } else { // This tank doesn't have a shield => lower his HP
                for(var hp of obj.nodes)
                    if(hp instanceof Hp && hp.id === obj.hp)
                        hp.src = "img/hp_empty.svg";

                obj.hp -= 1;

                if(obj.hp === 0){
                    obj.lose();
                    sound = new Sound("sounds/enemy_destroyed/edited.mp3", app.volume, 0.3);

                } else {
                    sound = new Sound("sounds/damage_caused/edited.mp3", app.volume, 1);
                }
            }

            app.remove(this);
        }
        if (obj instanceof Box) {
            obj.break(this.strength);
            app.remove(this);
        }
    }
}