function prepareTanks(canvas, nodes) {
    var width = 75;
    var height = 50;

    // Add tanks
    var tank1 = new Tank(canvas, width / 2, app.windowOffset + height / 1.5, width, height, 270, "img/tank_green.svg");
    tank1.onkey = function (dt) {
        if (app.keys["a"] === true)
            this.rotate(-dt);
        if (app.keys["d"] === true)
            this.rotate(dt);
        if (app.keys["w"] === true)
            this.move(dt);
        if (app.keys["s"] === true)
            this.move(-dt);
        if (app.keys["c"] === true)
            this.shoot();
    };
    tank1.onclick = function () {
        app.nodes = gameOver(1, app.nodes, app.canvas);
    };
    nodes.push(tank1);

    var tank2 = new Tank(canvas, 1600 - width / 2, 900 - app.windowOffset - height / 1.5, width, height, 90, "img/tank_red.svg");
    tank2.onkey = function (dt) {
        if (app.keys["ArrowLeft"] === true)
            this.rotate(-dt);
        if (app.keys["ArrowRight"] === true)
            this.rotate(dt);
        if (app.keys["ArrowUp"] === true)
            this.move(dt);
        if (app.keys["ArrowDown"] === true)
            this.move(-dt);
        if (app.keys["l"] === true)
            this.shoot();
    };
    tank2.onclick = function () {
        app.nodes = gameOver(2, app.nodes, app.canvas);
    };
    nodes.push(tank2);

    return nodes;
}