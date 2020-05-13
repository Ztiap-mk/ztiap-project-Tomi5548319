/*
* TODO
* Fix Box vs Tank collisions
* Add settings
* Add game title
*/

var app;

function loop() {
    app.update();
    requestAnimationFrame(loop);
}


// Initialization
window.onload = function () {
    app = new App("canvas");

    app.start();

    requestAnimationFrame(loop);
};