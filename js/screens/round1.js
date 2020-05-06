function round1(canvas) {
    var nodes = [];

    // Add in-game music
    app.music.stop();
    app.music = new Sound("sounds/game_loop/417491__centurion-of-war__millitary-46.wav", app.volume, 0.3);
    app.music.sound.loop = true;

    var window = new Window(canvas, 0, 100, 1600, 700);
    window.backgroundColor = "#c0c0c0"; // light gray
    window.physical = true;

    var box_size = 50;

    // Fill the whole map with boxes
    var i;
    for (i = 0; i < 1600 / box_size; i++)
        for (j = app.windowOffset / box_size; j < 800 / box_size; j++) {
            if ((i < 3 && j < 3 + app.windowOffset/box_size) || (i > 1600 / box_size - 4 && j > 900 / box_size - 4 - app.windowOffset/box_size)) // Empty space for players
                continue;
            if (i % 5 === 0 && j % 5 === 0)
                window.add(new Box(canvas, "wood", i * box_size, j * box_size, box_size, box_size));
        }

    window.nodes = prepareTanks(canvas, window.nodes);
    nodes.push(window);

    return nodes;
}