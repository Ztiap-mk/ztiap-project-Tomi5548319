class Laser extends GameObject {
    constructor(canvas, x_mult, y_mult, dx, dy) {
        super(canvas, x_mult, y_mult, dx, dy);

        this.x2 = this.x + dx;
        this.y2 = this.y + dy;

        var window = {
            y: 0,
            height: 0
        };
        for(var child of app.nodes) {
            if(child instanceof Window) {
                window.y = child.y;
                window.height = child.height;
            }
        }

        while(this.x2 > 0 && this.x2 < app.canvas.width && this.y2 > window.y && this.y2 < window.y + window.height) {
            this.x2 += dx;
            this.y2 += dy;
        }
    }

    ondraw(context) {
        context.strokeStyle = "red";

        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x2, this.y2);
        context.stroke();

        var sound = new Sound("sounds/laser_gun/edited.mp3", Settings.sound, 0.5);

        this.checkCollision(app.nodes);

        app.remove(this);
    }

    checkCollision(scene) {
        // Check each object
        for (var obj of scene) {
            if (obj.nodes.length > 0) this.checkCollision(obj.nodes); // This object contains objects inside
            // Object is not physical
            if (!obj.physical || obj === this) continue;

            if (obj instanceof Tank && this.checkTankCollision(obj) === true){
                this.onCollide(obj);
                continue;
            }

            if (obj instanceof Box && this.checkBoxCollision(obj) === true)
                this.onCollide(obj);

        }
    }

    checkTankCollision(obj) {
        // Check collision of 4 lines (tanks sides) with laser
        for (var i = 0; i < 4; i++) {
            // Tank side
            var line1 = {
                x1: obj.corners[i].x,
                y1: obj.corners[i].y,
                x2: obj.corners[(i + 1) % 4].x,
                y2: obj.corners[(i + 1) % 4].y
            };

            // Laser
            var line2 = {
                x1: this.x,
                y1: this.y,
                x2: this.x2,
                y2: this.y2
            };

            if (linesCollide(line1, line2))
                return true;
        }

        return false;
    }

    checkBoxCollision(obj) {
        // Check collision of 4 lines (box sides) with laser

        // Laser
        var line1 = {
            x1: this.x,
            y1: this.y,
            x2: this.x2,
            y2: this.y2
        };

        // Box left side
        var line2 = {
            x1: obj.x,
            y1: obj.y,
            x2: obj.x,
            y2: obj.y + obj.height
        };
        if (linesCollide(line1, line2))
            return true;

        // Box top side
        line2 = {
            x1: obj.x,
            y1: obj.y,
            x2: obj.x + obj.width,
            y2: obj.y
        };
        if (linesCollide(line1, line2))
            return true;

        // Box right side
        line2 = {
            x1: obj.x + obj.width,
            y1: obj.y,
            x2: obj.x + obj.width,
            y2: obj.y + obj.height
        };
        if (linesCollide(line1, line2))
            return true;

        // Box bottom side
        line2 = {
            x1: obj.x,
            y1: obj.y + obj.height,
            x2: obj.x + obj.width,
            y2: obj.y + obj.height
        };

        return linesCollide(line1, line2);
    }

    onCollide(obj) {
        if(obj instanceof Box)
            obj.break(3);
        if(obj instanceof Tank) {

            obj.lose(); // Laser penetrates through everything
            var sound = new Sound("sounds/enemy_destroyed/edited.mp3", Settings.sound, 0.3);

        }
    }
}