function keyBind(canvas, setting) {
    var window = new Window(canvas, 500, 300, 600, 250);
    window.backgroundColor = "#a0ffa0";
    window.id = "pause";

    window.add(new Text(canvas, app.context, 600, 375, 500, "Press a key", "black", 75));
    window.onkeyDown = function (key) {
        Settings.gamePaused = false;
        var command = "" + setting + " = \"" + key + "\";";
        eval(command);
        app.nodes = settings(app.canvas);
    };

    return window;
}