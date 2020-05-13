class Tank extends GameObject {
    // Initialization
    constructor(canvas, x_mult, y_mult, width_mult, height_mult, angle, imgSrc, roundsWon) {

        // Construct an Object
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.imgSrc = imgSrc;
        this.canvas = canvas;

        this.movementSpeed = canvas.width / 10 / 7;
        this.rotationSpeed = 13;

        this.roundsWon = roundsWon;

        this.hp = 3;

        this.rof = 1000; // Rate of fire
        this.bulletStrength = 1;
        this.lastShot = Date.now();

        this.angle = angle;
        this.dx = Math.cos(this.angle * Math.PI / 180) * (-1);
        this.dy = Math.sin(this.angle * Math.PI / 180) * (-1);

        this.corners = [];
        this.updateCorners();

        // Old positions, for collision purposes
        this.last_x = this.x;
        this.last_y = this.y;
        this.last_angle = this.angle;
        this.last_dx = this.dx;
        this.last_dy = this.dy;

        // Very old positions, for collision purposes
        this.llast_x = this.last_x;
        this.llast_y = this.last_y;
        this.llast_angle = this.last_angle;
        this.llast_dx = this.last_dx;
        this.llast_dy = this.last_dy;
    }

    // Redefine draw
    ondraw(context) {
        context.save();

        // Move the image
        context.translate(this.x, this.y);

        // Rotate the image
        context.rotate(this.angle * Math.PI / 180);

        // Render the image
        var img = new Image();
        img.src = this.imgSrc;
        context.drawImage(img, -this.width / 1.5, -this.height / 2, this.width, this.height);

        context.restore();

        // Render the corners - use for debugging only
        /*for (var i in this.corners) {
            context.fillStyle = "red";
            context.beginPath();
            context.arc(this.corners[i].x, this.corners[i].y, 1, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        }*/

        // Render the x and y - use for debugging only
        /*context.fillStyle = "red";
        context.beginPath();
        context.arc(this.x, this.y, 1, 0, Math.PI * 2);
        context.closePath();
        context.fill();*/

    }

    // TODO remove this
    // Redefine click (tank can be angled)
    click(point) {

        var clicked = false; // Tank was clicked

        var collisions = [];

        // Check collision of 4 lines (tanks sides) with click
        for (var i = 0; i < 4; i++) {
            // Tank side
            var line1 = {
                x1: this.corners[i].x,
                y1: this.corners[i].y,
                x2: this.corners[(i + 1) % 4].x,
                y2: this.corners[(i + 1) % 4].y
            };

            // outside of canvas and other side of click
            var line2 = {
                x1: -1,
                y1: -1,
                x2: point.x,
                y2: point.y
            };

            if (linesCollide(line1, line2))
                collisions.push(i);

        }

        //app.add(new Line(-1, -1, point.x, point.y));

        var min_x = this.corners[0].x;
        var max_x = min_x;
        var min_y = this.corners[0].y;
        var max_y = min_y;

        for(var corner of this.corners){
            if(corner.x < min_x)
                min_x = corner.x
            if(corner.x > max_x)
                max_x = corner.x;
            if(corner.y < min_y)
                min_y = corner.y;
            if(corner.y > max_y)
                max_y = corner.y;
        }

        clicked = collisions.length === 1 && point.x > min_x && point.x < max_x && point.y > min_y && point.y < max_y;

        if (clicked) {
            // Call onclick function
            console.log("clicked");
            this.onclick();
        }

        this.notify("click", point);
    }

    // Movement logic
    move(dt) {

        this.llast_x = this.last_x;
        this.llast_y = this.last_y;
        this.llast_angle = this.last_angle;
        this.llast_dx = this.last_dx;
        this.llast_dy = this.last_dy;

        this.last_x = this.x;
        this.last_y = this.y;
        this.last_angle = this.angle;
        this.last_dx = this.dx;
        this.last_dy = this.dy;

        // Move
        this.x += dt * this.movementSpeed * this.dx;
        this.y += dt * this.movementSpeed * this.dy;

        app.collisionCheck(dt);
        this.updateCorners(Math.abs(dt));
    }

    // Rotation logic
    rotate(dt) {

        this.llast_x = this.last_x;
        this.llast_y = this.last_y;
        this.llast_angle = this.last_angle;
        this.llast_dx = this.last_dx;
        this.llast_dy = this.last_dy;

        this.last_x = this.x;
        this.last_y = this.y;
        this.last_angle = this.angle;
        this.last_dx = this.dx;
        this.last_dy = this.dy;

        // Rotate
        this.angle += dt * this.rotationSpeed;
        if (this.angle < 0)
            this.angle += 360;

        this.angle %= 360;

        // Update the movement vectors
        this.dx = Math.cos(this.angle * Math.PI / 180) * (-1);
        this.dy = Math.sin(this.angle * Math.PI / 180) * (-1);

        app.collisionCheck(dt);
        this.updateCorners(Math.abs(dt));
    }

    shoot() {
        var time = Date.now();
        if(time - this.lastShot > this.rof){ // Tank is allowed to shoot
            this.lastShot = time;

            var bullet = new Bullet(app.canvas, (1600 * this.x) / app.canvas.width + this.dx * 50,
                (900 * this.y) / app.canvas.height + this.dy * 50, 15, 15, this.dx, this.dy, this.bulletStrength);

            app.add(bullet);
        }
    }

    // Tank specific function
    lose() {}

    checkCollision(scene, dt) {
        // Check each object
        for (var obj of scene) {
            if (obj.nodes.length > 0) this.checkCollision(obj.nodes, dt); // This object contains objects inside
            // Object is not physical
            if (!obj.physical || obj === this) continue;
            var collisions;
            if (obj instanceof Tank) {
                collisions = this.checkTankCollision(obj);
                if (collisions.length)
                    this.onCollide(obj, dt); // Tanks collided
                continue;
            }
            if (obj instanceof Box) {
                collisions = this.checkBoxCollision(obj);

                if (collisions.length)
                    this.onCollide(obj, dt);
            }
        }
    }

    checkBoxCollision(object) {

        var collisions = [];

        // Check collision of 4 lines (tanks sides) with objects sides
        for (var i = 0; i < 4; i++) {
            // Tank side
            var line1 = {
                x1: this.corners[i].x,
                y1: this.corners[i].y,
                x2: this.corners[(i + 1) % 4].x,
                y2: this.corners[(i + 1) % 4].y
            };

            // TOP SIDE
            var line2 = {
                x1: object.x,
                y1: object.y,
                x2: object.x + object.width,
                y2: object.y
            };
            if (linesCollide(line1, line2))
                collisions.push(1);

            // RIGHT SIDE
            line2 = {
                x1: object.x + object.width,
                y1: object.y,
                x2: object.x + object.width,
                y2: object.y + object.height
            };
            if (linesCollide(line1, line2))
                collisions.push(2);

            // BOTTOM SIDE
            line2 = {
                x1: object.x + object.width,
                y1: object.y + object.height,
                x2: object.x,
                y2: object.y + object.height
            };
            if (linesCollide(line1, line2))
                collisions.push(3);

            // LEFT SIDE
            line2 = {
                x1: object.x,
                y1: object.y + object.height,
                x2: object.x,
                y2: object.y
            };
            if (linesCollide(line1, line2))
                collisions.push(4);
        }

        return collisions;
    }

    checkTankCollision(object) {
        var collisions = [];

        // Check collision of 4 lines (tanks sides) with objects sides
        for (var i = 0; i < 4; i++) {
            // Tank side
            var line1 = {
                x1: this.corners[i].x,
                y1: this.corners[i].y,
                x2: this.corners[(i + 1) % 4].x,
                y2: this.corners[(i + 1) % 4].y
            };

            // TOP SIDE
            var line2 = {
                x1: object.corners[0].x,
                y1: object.corners[0].y,
                x2: object.corners[1].x,
                y2: object.corners[1].y
            };
            if (linesCollide(line1, line2))
                collisions.push(1);

            // RIGHT SIDE
            line2 = {
                x1: object.corners[1].x,
                y1: object.corners[1].y,
                x2: object.corners[2].x,
                y2: object.corners[2].y
            };
            if (linesCollide(line1, line2))
                collisions.push(2);

            // BOTTOM SIDE
            line2 = {
                x1: object.corners[2].x,
                y1: object.corners[2].y,
                x2: object.corners[3].x,
                y2: object.corners[3].y
            };
            if (linesCollide(line1, line2))
                collisions.push(3);

            // LEFT SIDE
            line2 = {
                x1: object.corners[3].x,
                y1: object.corners[3].y,
                x2: object.corners[0].x,
                y2: object.corners[0].y
            };
            if (linesCollide(line1, line2))
                collisions.push(4);
        }

        return collisions;
    }

    onCollide(obj, dt) {
        this.x = this.llast_x;
        this.y = this.llast_y;
        this.dx = this.llast_dx;
        this.dy = this.llast_dy;
        this.angle = this.llast_angle;

        this.updateCorners(dt);
    }

    updateCorners(dt) {
        this.updateCornersPositions();

        // Check if corners are not outside of map
        for (var corner of this.corners) {
            if (corner.x < 0)
                this.x += dt * this.movementSpeed * Math.abs(this.dx);
            else if (corner.x > canvas.width)
                this.x -= dt * this.movementSpeed * Math.abs(this.dx);

            if (corner.y < app.windowOffset * canvas.height / 900)
                this.y += dt * this.movementSpeed * Math.abs(this.dy);
            else if (corner.y > canvas.height - app.windowOffset * canvas.height / 900)
                this.y -= dt * this.movementSpeed * Math.abs(this.dy);

        }

        this.updateCornersPositions();
    }

    updateCornersPositions() {
        // RIGHT FRONT
        this.corners[0] = ({
            x: (this.x - (this.dy * (this.height / 2)) + (this.dx * (this.width / 2))),
            y: (this.y + this.dy * (this.width / 2) + this.dx * (this.height / 2))
        });

        // LEFT FRONT
        this.corners[1] = ({
            x: (this.x + (this.dy * (this.height / 2)) + (this.dx * (this.width / 2))),
            y: (this.y + this.dy * (this.width / 2) - this.dx * (this.height / 2))
        });

        // LEFT REAR
        this.corners[2] = ({
            x: (this.x + (this.dy * (this.height / 2)) - (this.dx * (this.width / 3))),
            y: (this.y - this.dy * (this.width / 3) - this.dx * (this.height / 2))
        });

        // RIGHT REAR
        this.corners[3] = ({
            x: (this.x - (this.dy * (this.height / 2)) - (this.dx * (this.width / 3))),
            y: (this.y - this.dy * (this.width / 3) + this.dx * (this.height / 2))
        });
    }

}