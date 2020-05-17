function round1(canvas, roundsWon1, roundsWon2) {
    console.log("round 1");

    var nodes = [];

    // Add in-game music
    app.music.stop();
    app.music = new Sound("sounds/game_loop/417491__centurion-of-war__millitary-46.wav", Settings.music, 0.3);
    app.music.sound.loop = true;

    var window = new Window(canvas, 0, 100, 1600, 700);
    window.backgroundColor = "#c0c0c0"; // light gray
    window.physical = true;

    var box_size = 50;

    // Fill the whole map
    var i, j;
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
            if(i === 1600 / box_size - 4 && j > (900 - app.windowOffset) / box_size - 7) {
                window.add(new Box(canvas, "wall", i * box_size, j * box_size, box_size, box_size));
                continue;
            }

            // Middle wall
            if(j >= 8 && j <= 9 && i > 9 && i < 1600 / box_size - 10)
                window.add(new Box(canvas, "wall", i * box_size, j * box_size, box_size, box_size));

        }

    window.nodes = prepareTanks(canvas, window.nodes, roundsWon1, roundsWon2);
    nodes.push(window);

    return nodes;
}