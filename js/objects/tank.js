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
        for (var i in this.corners) {
            context.fillStyle = "black";
            context.beginPath();
            context.arc(this.corners[i].x, this.corners[i].y, 1, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        }

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
        this.x += direction * this.movementSpeed * this.dx;
        this.y += direction * this.movementSpeed * this.dy;

        this.updateCorners();
    }

    // Rotation logic
    rotate(direction) {
        this.angle += direction * this.rotationSpeed;
        if (this.angle < 0)
            this.angle += 360;

        this.angle %= 360;

        this.dx = Math.cos(this.angle * Math.PI / 180) * (-1);
        this.dy = Math.sin(this.angle * Math.PI / 180) * (-1);

        this.updateCorners();
    }

    updateCorners() {
        this.updateCornersPositions();

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

        // RIGHT REAR
        this.corners[2] = ({
            x: (this.x - (this.dy * (this.height / 2)) - (this.dx * (this.width / 3))),
            y: (this.y - this.dy * (this.width / 3) + this.dx * (this.height / 2))
        });

        // LEFT REAR
        this.corners[3] = ({
            x: (this.x + (this.dy * (this.height / 2)) - (this.dx * (this.width / 3))),
            y: (this.y - this.dy * (this.width / 3) - this.dx * (this.height / 2))
        });
    }

}