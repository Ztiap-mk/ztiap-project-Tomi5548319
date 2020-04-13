class Tank extends GameObject {
    // Initialization
    // TODO increment id, don't take it as a parameter
    constructor(canvas, x_mult, y_mult, width_mult, height_mult, angle, imgSrc) {

        // Construct a Widget
        super(canvas, x_mult, y_mult, width_mult, height_mult);

        this.imgSrc = imgSrc;
        this.canvas = canvas;

        this.movementSpeed = canvas.width / 10 / 10 / 3;
        this.rotationSpeed = 3;

        this.angle = angle;
        this.dx = Math.cos(this.angle * Math.PI / 180) * (-1);
        this.dy = Math.sin(this.angle * Math.PI / 180) * (-1);

        this.corners = [];
        this.updateCorners();
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
        /*for (var i in this.corners) {
            context.fillStyle = "black";
            context.beginPath();
            context.arc(this.corners[i].x, this.corners[i].y, 1, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        }*/

        // Render the x and y
        /*context.fillStyle = "red";
        context.beginPath();
        context.arc(this.x, this.y, 1, 0, Math.PI * 2);
        context.closePath();
        context.fill();*/

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
    move(direction) {

        var last_x = this.x;
        var last_y = this.y;

        this.x += direction * this.movementSpeed * this.dx;
        this.y += direction * this.movementSpeed * this.dy;

        this.updateCorners();

        var collision = this.checkCollision(app.nodes);
        if (collision === -1) { // Tanks collided
            this.x = last_x;
            this.y = last_y;
        }

        this.updateCorners();
    }

    // Rotation logic
    rotate(direction) {

        var last_x = this.x;
        var last_y = this.y;
        var last_angle = this.angle;
        var last_dx = this.dx;
        var last_dy = this.dy;

        this.angle += direction * this.rotationSpeed;
        if (this.angle < 0)
            this.angle += 360;

        this.angle %= 360;

        this.dx = Math.cos(this.angle * Math.PI / 180) * (-1);
        this.dy = Math.sin(this.angle * Math.PI / 180) * (-1);

        this.updateCorners();

        var collision = this.checkCollision(app.nodes);
        if (collision === -1) { // Tanks collided
            this.x = last_x;
            this.y = last_y;
            this.angle = last_angle;
            this.dx = last_dx;
            this.dy = last_dy;
        }

        this.updateCorners();
    }

    checkCollision(scene) {
        // Check each object
        for (var obj of scene) {
            // Object is not physical
            if (!obj.physical || obj === this) continue;
            var collisions;
            if (obj instanceof Tank) {
                collisions = this.checkTankCollision(obj);
                if (collisions.length)
                    return -1; // Don't move
                continue;
            }
            collisions = this.checkSideCollision(obj);

            for (var i = 0; i < collisions.length; i++) {
                switch (collisions[i]) {
                    case 1: // Top
                        this.y -= this.movementSpeed;
                        break;
                    case 2: // Right
                        this.x += this.movementSpeed;
                        break;
                    case 3: // Bottom
                        this.y += this.movementSpeed;
                        break;
                    case 4: // Left
                        this.x -= this.movementSpeed;
                        break;
                }
            }

            if (collisions.length)
                return true;

        }

        // No collision occured
        return false;
    }

    checkSideCollision(object) {

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

    updateCorners() {
        this.updateCornersPositions();

        // Check if corners are not outside of map
        for (var i in this.corners) {
            if (this.corners[i].x < 0)
                this.x += this.movementSpeed * Math.abs(this.dx);
            else if (this.corners[i].x > canvas.width)
                this.x -= this.movementSpeed * Math.abs(this.dx);

            if (this.corners[i].y < 0)
                this.y += this.movementSpeed * Math.abs(this.dy);
            else if (this.corners[i].y > canvas.height)
                this.y -= this.movementSpeed * Math.abs(this.dy);

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