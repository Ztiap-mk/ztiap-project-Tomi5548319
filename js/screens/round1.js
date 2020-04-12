function round1(canvas) {
    var nodes = [];

    var box_size = 50;

    // Fill the whole map with boxes
    var i;
    for (i = 0; i < 1600 / box_size; i++)
        for (j = 0; j < 900 / box_size; j++) {
            if ((i < 3 && j < 3) || (i > 1600 / box_size - 4 && j > 900 / box_size - 4)) // Empty space for players
                continue;
            if (i % 3 === 0 && j % 3 === 0)
                nodes.push(new Box(canvas, "wood", i * box_size, j * box_size, box_size, box_size));
        }

    nodes = prepareTanks(canvas, nodes);

    return nodes;
}