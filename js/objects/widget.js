class Widget extends Node {
    constructor(x, y, width, height) {
        // Construct a Node
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }


    // Drawing widgets using canvas
    draw(context) {
        // Draw self
        this.ondraw(context);

        // Send draw event to observers
        this.notify("draw", context);
    }


    // Click handling
    click(point) {

        // Point needs to be converted to local coordinates
        var localPoint = {
            x: point.x - this.x,
            y: point.y - this.y
        };

        // Check if localPoint is inside Widget boundary
        if (0 < localPoint.x && localPoint.x < this.width)
            if (0 < localPoint.y && localPoint.y < this.height)
                this.onclick();

        // Send click event to observers
        this.notify("click", point);
    }


    // Keyboard handling
    keyCheck() {
        this.onkey();

        // Send key message to observers
        this.notify("keyCheck");
    }

    // Widget specific methods, need to be set manually
    ondraw(context) {}
    onclick() {}
    onkey() {}
}