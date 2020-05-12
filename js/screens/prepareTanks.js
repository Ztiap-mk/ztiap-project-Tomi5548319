function prepareTanks(canvas, nodes, roundsWon1, roundsWon2) {
    var width = 75;
    var height = 50;

    var tank1 = new Tank(canvas, width / 2, app.windowOffset + height / 1.5, width, height, 270, "img/tank_green.svg", roundsWon1);
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
        var enemy = app.getEnemyTank(app, this);
        enemy.roundsWon++;

        if(enemy.roundsWon === 5){
            for(var node of enemy.nodes)
                if(node instanceof Text)
                    node.lines = node.splitTextIntoLines("" + enemy.roundsWon, app.context);
            app.nodes = gameOver(2, app.nodes, app.canvas);
        }
        else
            eval("app.nodes = round" + ((enemy.roundsWon + this.roundsWon) % 9 + 1) + "(app.canvas, " + this.roundsWon + ", " + enemy.roundsWon + ");");

    };

    // HP indicators
    var hp = new Hp(1, app.canvas, 0, 800, 50, 50);
    tank1.add(hp);
    hp = new Hp(2, app.canvas, 40, 800, 50, 50);
    tank1.add(hp);
    hp = new Hp(3, app.canvas, 80, 800, 50, 50);
    tank1.add(hp);

    // Bullet strength indicators
    var ammo = new Ammo(1, app.canvas, 0, 850, 50, 50);
    tank1.add(ammo);
    ammo = new Ammo(2, app.canvas, 40, 850, 50, 50);
    tank1.add(ammo);
    ammo = new Ammo(3, app.canvas, 80, 850, 50, 50);
    tank1.add(ammo);

    // Rounds won indicator
    var roundsWon = new Text(app.canvas, app.context, 700, 15, 50, "" + roundsWon1, "green", 50);
    tank1.add(roundsWon);

    nodes.push(tank1);

    // Dash between points indicators
    var dash = new Text(app.canvas, app.context, 760, 15, 30, "-", "black", 50);
    nodes.push(dash);



    var tank2 = new Tank(canvas, 1600 - width / 2, 900 - app.windowOffset - height / 1.5, width, height, 90, "img/tank_red.svg", roundsWon2);
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
        var enemy = app.getEnemyTank(app, this);
        enemy.roundsWon++;

        if(enemy.roundsWon === 5){
            for(var node of enemy.nodes)
                if(node instanceof Text)
                    node.lines = node.splitTextIntoLines("" + enemy.roundsWon, app.context);
            app.nodes = gameOver(1, app.nodes, app.canvas);
        }
        else
            eval("app.nodes = round" + ((enemy.roundsWon + this.roundsWon) % 9 + 1) + "(app.canvas, " + enemy.roundsWon + ", " + this.roundsWon + ");");


    };

    // HP indicators
    hp = new Hp(1, app.canvas, 1470, 800, 50, 50);
    tank2.add(hp);
    hp = new Hp(2, app.canvas, 1510, 800, 50, 50);
    tank2.add(hp);
    hp = new Hp(3, app.canvas, 1550, 800, 50, 50);
    tank2.add(hp);

    // Bullet strength indicators
    ammo = new Ammo(1, app.canvas, 1470, 850, 50, 50);
    tank1.add(ammo);
    ammo = new Ammo(2, app.canvas, 1510, 850, 50, 50);
    tank1.add(ammo);
    ammo = new Ammo(3, app.canvas, 1550, 850, 50, 50);
    tank1.add(ammo);

    // Rounds won indicator
    roundsWon = new Text(app.canvas, app.context, 800, 15, 50, "" + roundsWon2, "red", 50);
    tank2.add(roundsWon);

    nodes.push(tank2);

    return nodes;
}