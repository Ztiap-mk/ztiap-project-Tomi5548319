function round6(canvas, roundsWon1, roundsWon2) {
    console.log("round 6");

    var nodes = [];
    var window = prepareRound(canvas, roundsWon1, roundsWon2);

    var box_size = 50;

    // Fill the whole map
    var i;
    for (i = 0; i < 1600 / box_size; i++)
        for (j = app.windowOffset / box_size; j < (900 - app.windowOffset) / box_size; j++) {
            // Empty space for players
            if ((i < 3 && j < 3 + app.windowOffset/box_size) || (i > 1600 / box_size - 4 && j > 900 / box_size - 4 - app.windowOffset/box_size))
                continue;

            // Wall in the middle
            if(i >= 6 && i <= 25 && j >= app.windowOffset / box_size + 5 && j <= (900 - app.windowOffset) / box_size - 6)
                window.add(new Box(canvas, "wall", i * box_size, j * box_size, box_size, box_size));

        }

    nodes.push(window);
    return nodes;
}