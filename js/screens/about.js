function about(canvas) {
    var nodes = [];

    var textAbout = new Text(canvas, app.context, 50, 100, 1500,
        "This game is a combination of tank battle and bomberman games. {newLine} " +
        "The goal of this game is to have fun :) {newLine} " +
        " {newLine} " +
        "Players may obtain following powerups by destroying boxes:", "black", 50);

    nodes.push(textAbout);

    // Ammo
    var powerup = new Powerup(canvas, 150, 375, 50, 50);
    powerup.type = 0;
    powerup.src = "img/powerup_ammo.svg";
    nodes.push(powerup);

    var text = new Text(canvas, app.context, 220, 385, 1200, "- player will be able to break iron boxes", "black", 30);
    nodes.push(text);


    // Speed
    powerup = new Powerup(canvas, 150, 450, 50, 50);
    powerup.type = 3;
    powerup.src = "img/powerup_speed.svg";
    nodes.push(powerup);

    text = new Text(canvas, app.context, 220, 460, 1200, "- player will move faster", "black", 30);
    nodes.push(text);


    // Shield
    powerup = new Powerup(canvas, 150, 525, 50, 50);
    powerup.type = 2;
    powerup.src = "img/powerup_shield.svg";
    nodes.push(powerup);

    text = new Text(canvas, app.context, 220, 535, 1200, "- player will receive a shield, which blocks 1 shot", "black", 30);
    nodes.push(text);


    // Laser
    powerup = new Powerup(canvas, 150, 600, 50, 50);
    powerup.type = 1;
    var img = new AnimatedImage(canvas, 150, 600, 50, 50, "img/powerup_laser.svg", 200, 200, 2, 500);
    powerup.add(img);
    powerup.src = "img/powerup_ammo.svg";
    nodes.push(powerup);

    text = new Text(canvas, app.context, 220, 610, 1200, "- player will be equipped with a laser gun, which is able to destroy everything", "black", 30);
    nodes.push(text);


    var buttonBack = new ImgButton(canvas, "img/button_returnToMainMenu.png", 50, 750, 300, 100);
    buttonBack.action = function () {
        app.nodes = mainMenu(app.canvas);
    };
    nodes.push(buttonBack);

    return nodes;
}