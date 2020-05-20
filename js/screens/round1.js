function round1(canvas, roundsWon1, roundsWon2) {
    console.log("round 1");

    var nodes = [];
    var window = prepareRound(canvas, roundsWon1, roundsWon2);

    nodes.push(window);
    return nodes;
}