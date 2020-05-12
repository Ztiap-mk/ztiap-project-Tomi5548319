function prepareTanks(canvas, nodes) {
    var width = 75;
    var height = 50;

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
    tank1.lose = function () {
        app.nodes = gameOver(2, app.nodes, app.canvas);
    };

    // HP indicators
    var hp = new Hp(1, app.canvas, 0, 800, 50, 50);
    tank1.add(hp);
    hp = new Hp(2, app.canvas, 40, 800, 50, 50);
    tank1.add(hp);
    hp = new Hp(3, app.canvas, 80, 800, 50, 50);
    tank1.add(hp);

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
    tank2.lose = function () {
        app.nodes = gameOver(1, app.nodes, app.canvas);
    };

    // HP indicators
    hp = new Hp(1, app.canvas, 1470, 800, 50, 50);
    tank2.add(hp);
    hp = new Hp(2, app.canvas, 1510, 800, 50, 50);
    tank2.add(hp);
    hp = new Hp(3, app.canvas, 1550, 800, 50, 50);
    tank2.add(hp);

    nodes.push(tank2);

    return nodes;
}