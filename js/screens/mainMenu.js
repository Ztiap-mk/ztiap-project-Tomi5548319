function mainMenu(canvas) {
    var nodes = [];

    // Drawables
    var buttonPlay = new ImgButton(canvas, "img/button_play.png", 500, 200, 500, 150);
    buttonPlay.action = function () {
        app.nodes = round1(app.canvas);
        app.resetSounds();

        // Add in-game music
        var music = new Sound("sounds/game_loop/417491__centurion-of-war__millitary-46.wav", app.volume, 0.3);
        music.sound.loop = true;
        app.addSound(music);
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
            for (var i in app.sounds) {
                app.sounds[i].changeVolume(app.volume); // resume the volume
            }
            app.muted = false;
        } else {
            this.imgSrc = "img/sound_off.svg";
            for (var i in app.sounds) {
                app.sounds[i].changeVolume(0); // mute
            }
            app.muted = true;
        }
    };
    nodes.push(buttonSound);

    return nodes;
}