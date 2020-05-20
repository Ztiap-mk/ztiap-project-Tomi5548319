function mainMenu(canvas) {
    var nodes = [];

    // Start the music
    if(app.music !== undefined)
        app.music.stop();
    app.music = new Sound("sounds/home_screen_loop/Two Steps From Hell - To Glory.mp3", Settings.music, 0.5);
    app.music.sound.loop = true;

    var title = new AnimatedImage(app.canvas, 400, 25, 700, 150, "img/title.png", 776, 102, 6, 150);
    nodes.push(title);

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


    // Sound controls
    var soundSrc = "";
    if (Settings.sound.muted === true)
        soundSrc = "img/sound_off.svg";
    else
        soundSrc = "img/sound_on.svg";

    var buttonSound = new ImgButton(canvas, soundSrc, 1250, 50, 150, 80);
    buttonSound.action = function () {
        if (Settings.sound.muted === true) {
            this.imgSrc = "img/sound_on.svg";
            Settings.sound.muted = false;
            var sound = new Sound("sounds/object_not_broken/edited.mp3", Settings.sound, 0.3);

        } else {
            this.imgSrc = "img/sound_off.svg";
            Settings.sound.muted = true;

        }
    };
    nodes.push(buttonSound);

    var musicSrc = "";
    if (Settings.music.muted === true)
        musicSrc = "img/music_off.svg";
    else
        musicSrc = "img/music_on.svg";

    var buttonMusic = new ImgButton(canvas, musicSrc, 1400, 50, 150, 80);
    buttonMusic.action = function () {
        if (Settings.music.muted === true) {
            this.imgSrc = "img/music_on.svg";

            app.music.changeVolume(Settings.music.volume); // resume the volume
            Settings.music.muted = false;
        } else {
            this.imgSrc = "img/music_off.svg";

            app.music.changeVolume(0); // mute
            Settings.music.muted = true;
        }
    };
    nodes.push(buttonMusic);

    return nodes;
}