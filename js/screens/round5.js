function round5(canvas, roundsWon1, roundsWon2) {
    // TODO make different maps
    console.log("round 5");

    var window = prepareRound(canvas, roundsWon1, roundsWon2);

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
            if ((i % 3 === 1 && i > 5 && i < 1600 / box_size - 6 && j % 3 === 1) /*|| i <= 3 || i >= 1600 / box_size - 4*/)
                window.add(new Box(canvas, "wood", i * box_size, j * box_size, box_size, box_size));
        }

    return window;
}