function gameOver(winner, nodes, canvas) {

    app.stopMovement(app);

    // Light gray background
    var window = new Window(canvas, 320, 180, 960, 540);
    window.backgroundColor = "#c0c0c0"; // light gray

    var textWinner = new Text(canvas, app.context, 400, 400, 800, "Congratulations player " + winner + ", you win!", "green", 50);
    window.add(textWinner);

    var buttonReturnToMainMenu = new ImgButton(canvas, "img/button_returnToMainMenu.png", 370, 600, 250, 90);
    buttonReturnToMainMenu.action = function () {
        app.nodes = mainMenu(app.canvas);
    };
    window.add(buttonReturnToMainMenu);

    var buttonPlayAgain = new ImgButton(canvas, "img/button_playAgain.png", 700, 600, 250, 90);
    buttonPlayAgain.action = function () {
        app.nodes = round1(app.canvas);
    };
    window.add(buttonPlayAgain);

    nodes.push(window);
    return nodes;
}