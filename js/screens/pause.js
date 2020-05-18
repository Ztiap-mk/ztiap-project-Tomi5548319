function pause(canvas) {
    var window = new Window(canvas, 500, 300, 600, 250);
    window.backgroundColor = "#8080ff";
    window.id = "pause";

    window.add(new Text(canvas, app.context, 550, 375, 500, "Game paused", "black", 75));

    var cross = new Text(canvas, app.context, 510, 310, 30, "X", "black", 30);
    cross.border = true;
    cross.onclick = function () {
        for (var child of app.nodes)
            if(child instanceof Window && child.id === "pause")
                app.remove(child);

        Settings.gamePaused = false;
    }
    window.add(cross);

    return window;
}