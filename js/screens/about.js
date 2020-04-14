function about(canvas) {
    var nodes = [];

    var textAbout = new Text(canvas, app.context, 50, 100, 1500,
        "This game is a combination of tank battle and bomberman games. {newLine} " +
        "The goal of this game is to have fun :) {newLine} " +
        "Players win the round, if they shoot the other player's tank before the time runs out. The player who wins 5 rounds first wins the whole game. {newLine} " +
        "Player 1 controls his tank with WASD + C. {newLine} " +
        "Player 2 controls his tank with Arrow keys + L", "black", 50);

    nodes.push(textAbout);

    var buttonBack = new ImgButton(canvas, "img/button_returnToMainMenu.png", 50, 750, 300, 100);
    buttonBack.action = function () {
        app.nodes = mainMenu(app.canvas);
    };
    nodes.push(buttonBack);

    return nodes;
}