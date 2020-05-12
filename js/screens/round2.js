function round2(canvas) {
    // TODO make different maps
    var nodes = [];

    // Add in-game music
    app.music.stop();
    app.music = new Sound("sounds/game_loop/417491__centurion-of-war__millitary-46.wav", app.volume, 0.3);
    app.music.sound.loop = true;

    var window = new Window(canvas, 0, 100, 1600, 700);
    window.backgroundColor = "#c0c0c0"; // light gray
    window.physical = true;

    var box_size = 50;

    // Fill the whole map
    var i;
    for (i = 0; i < 1600 / box_size; i++)
        for (j = app.windowOffset / box_size; j < (900 - app.windowOffset) / box_size; j++) {
            // Empty space for players
            if ((i < 3 && j < 3 + app.windowOffset/box_size) || (i > 1600 / box_size - 4 && j > 900 / box_size - 4 - app.windowOffset/box_size))
                continue;

            // Left wall
            if(i === 3 && j < 6 + app.windowOffset / box_size){
                window.add(new Box(canvas, "wall", i * box_size, j * box_size, box_size, box_size));
                continue;
            }

            // Right wall
            if(i === 1600 / box_size - 4 && j > (900 - app.windowOffset) / box_size - 7){
                window.add(new Box(canvas, "wall", i * box_size, j * box_size, box_size, box_size));
                continue;
            }

            // Iron boxes
            if(i % 3 === 1 && i > 7 && i < 1600 / box_size - 8 && j % 3 === 1 && j > 5 && j < (900 - app.windowOffset) / box_size - 3){
                window.add(new Box(canvas, "iron", i * box_size, j * box_size, box_size, box_size));
                continue;
            }

            // Wooden boxes
            if ((i % 3 === 1 && i > 5 && i < 1600 / box_size - 6 && j % 3 === 1) || i <= 3 || i >= 1600 / box_size - 4)
                window.add(new Box(canvas, "wood", i * box_size, j * box_size, box_size, box_size));
        }

    window.nodes = prepareTanks(canvas, window.nodes);
    nodes.push(window);

    return nodes;
}