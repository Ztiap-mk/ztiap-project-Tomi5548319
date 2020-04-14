class Tank extends GameObject {
    // Initialization
    constructor(canvas, x_mult, y_mult, width_mult, height_mult, angle, imgSrc) {

        // Construct a Widget
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.imgSrc = imgSrc;
        this.canvas = canvas;

        this.movementSpeed = canvas.width / 10 / 7;
        this.rotationSpeed = 13;

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

        // Render the corners
        for (var i in this.corners) {
            context.fillStyle = "red";
            context.beginPath();
            context.arc(this.corners[i].x, this.corners[i].y, 1, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        }

        // Render the x and y
        context.fillStyle = "red";
        context.beginPath();
        context.arc(this.x, this.y, 1, 0, Math.PI * 2);
        context.closePath();
        context.fill();

    }

    // TODO remove this
    // Redefine click (tank can be angled)
    click(point) {

        var clicked = false;

        var max_x = this.corners[0].x;
        var min_x = this.corners[0].x;
        var max_y = this.corners[0].y;
        var min_y = this.corners[0].y;

        // Not ideal, but works just fine for demonstration purposes
        for (var i in this.corners) {
            if (this.corners[i].x > max_x)
                max_x = this.corners[i].x;
            if (this.corners[i].x < min_x)
                min_x = this.corners[i].x;
            if (this.corners[i].y > max_y)
                max_y = this.corners[i].y;
            if (this.corners[i].y < min_y)
                min_y = this.corners[i].y;
        }

        if (min_x < point.x && point.x < max_x && min_y < point.y && point.y < max_y)
            clicked = true;

        if (clicked) {
            // Call onclick function
            this.onclick();
        }

        this.notify("click", point);
    }

    // Movement logic
    move(dt) {
        this.last_x = this.x;
        this.last_y = this.y;

        this.x += dt * this.movementSpeed * this.dx;
        this.y += dt * this.movementSpeed * this.dy;

        this.updateCorners(Math.abs(dt));
    }

    // Rotation logic
    rotate(dt) {
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

        this.updateCorners(Math.abs(dt));
    }

    checkCollision(scene, dt) {
        // Check each object
        for (var obj of scene) {
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
        //if (obj instanceof Bullet)

        this.x = this.last_x;
        this.y = this.last_y;
        this.dx = this.last_dx;
        this.dy = this.last_dy;
        this.angle = this.last_angle;

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

            if (corner.y < 0)
                this.y += dt * this.movementSpeed * Math.abs(this.dy);
            else if (corner.y > canvas.height)
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