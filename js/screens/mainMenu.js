function mainMenu(canvas) {
    var nodes = [];

    // Start the music
    if(app.music !== undefined)
        app.music.stop();
    app.music = new Sound("sounds/home_screen_loop/Two Steps From Hell - To Glory.mp3", app.volume, 0.5);
    app.music.sound.loop = true;

    // Drawables
    var buttonPlay = new ImgButton(canvas, "img/button_play.png", 500, 200, 500, 150);
    buttonPlay.action = function () {
        app.nodes = round1(app.canvas, 0, 0);
    };
    nodes.push(buttonPlay);

    var buttonSettings = new ImgButton(canvas, "img/button_settings.png", 500, 400, 500, 150);
    buttonSettings.action = function () {
        app.nodes = settings(app.canvas);
    };
    nodes.push(buttonSettings);

    var buttonAbout = new ImgButton(canvas, "img/button_about.png", 500, 600, 500, 150);
    buttonAbout.action = function () {
        app.nodes = about(app.canvas);
    };
    nodes.push(buttonAbout);

    var soundSrc = "";
    if (app.muted)
        soundSrc = "img/sound_off.svg";
    else
        soundSrc = "img/sound_on.svg";

    var buttonSound = new ImgButton(canvas, soundSrc, 1510, 10, 80, 45);
    buttonSound.action = function () {
        console.log("Sound clicked");
        if (app.muted) {
            this.imgSrc = "img/sound_on.svg";

            app.music.changeVolume(app.volume); // resume the volume
            app.muted = false;
        } else {
            this.imgSrc = "img/sound_off.svg";

            app.music.changeVolume(0); // mute
            app.muted = true;
        }
    };
    nodes.push(buttonSound);

    return nodes;
}