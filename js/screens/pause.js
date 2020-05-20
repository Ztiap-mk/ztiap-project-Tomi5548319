function pause(canvas) {
    var window = new Window(canvas, 400, 200, 800, 450);
    window.backgroundColor = "#9090ff";
    window.id = "pause";

    window.add(new Text(canvas, app.context, 550, 350, 500, "Game paused", "black", 75));

    var cross = new Text(canvas, app.context, 410, 210, 30, "X", "black", 30);
    cross.border = true;
    cross.onclick = function () {
        for (var child of app.nodes)
            if(child instanceof Window && child.id === "pause")
                app.remove(child);

        Settings.gamePaused = false;
    };
    window.add(cross);

    var buttonReturn = new ImgButton(canvas, "img/button_returnToMainMenu.png", 450, 500, 300, 100);
    buttonReturn.action = function () {
        Settings.gamePaused = false;
        app.nodes = mainMenu(app.canvas);
    };
    window.add(buttonReturn);

    var buttonCancel = new ImgButton(canvas, "img/button_cancel.png", 850, 500, 300, 100);
    buttonCancel.action = function () {
        for (var child of app.nodes)
            if(child instanceof Window && child.id === "pause")
                app.remove(child);

        Settings.gamePaused = false;
    };
    window.add(buttonCancel);

    return window;
}