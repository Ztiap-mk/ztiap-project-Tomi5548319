class Bullet extends GameObject {
    // Initialization
    constructor(canvas, x_mult, y_mult, width_mult, height_mult, dx, dy) {

        // Construct an Object
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.canvas = canvas;

        this.movementSpeed = canvas.width / 10 / 3;

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

        // Render the x and y
        context.fillStyle = "red";
        context.beginPath();
        context.arc(this.x, this.y, 1, 0, Math.PI * 2);
        context.closePath();
        context.fill();

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
        for (var obj of scene) {
            if(obj.nodes.length > 0) this.checkCollision(obj.nodes, dt); // This object contains objects inside
            // Object is not physical
            if (!obj.physical || obj === this) continue;
            var collisions;
            if (obj instanceof Tank) {
                collisions = this.checkTankCollision(obj);
                if (collisions.length)
                    this.onCollide(obj, dt); // Bullet hit a tank
                continue;
            }
            if (obj instanceof Box) {
                this.checkBoxCollision(obj);
            }
            if (obj instanceof Window) {
                if(this.x - this.width/2 < obj.x || this.x + this.width/2 > obj.x + obj.width ||
                this.y - this.height/2 < obj.y || this.y + this.height/2 > obj.y + obj.height)
                    app.remove(this);
            }
        }
    }

    checkTankCollision(obj) {
        return [];
    }

    checkBoxCollision(obj) {
        if(this.x > obj.x && this.x < obj.x + obj.width && this.y > obj.y && this.y < obj.y + obj.height){
            obj.break(obj);
            app.remove(this);
        }

    }

    onCollide(obj, dt){
        console.log("Bullet collided");
    }
}