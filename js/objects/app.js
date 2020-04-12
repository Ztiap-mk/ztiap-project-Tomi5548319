class App extends Widget {
    constructor(element) {
        var canvas = window.document.getElementById(element);
        var context = canvas.getContext("2d");

        super(0, 0, canvas.width, canvas.height);

        this.canvas = canvas;
        this.context = context;

        this.keys = [];
        this.sounds = [];

        this.volume = 0.5;
        this.muted = true; // TODO separate music and sounds
    }

    addSound(sound) {
        if (this.muted)
            sound.changeVolume(0);
        else
            sound.changeVolume(app.volume);

        sound.play();
        this.sounds.push(sound);
    }


    removeSound(sound) {
        sound.stop();
        var index = this.sounds.indexOf(sound);
        delete this.sounds[index];
    }


    resetSounds() {
        for (var i in this.sounds) {
            this.removeSound(this.sounds[i]);
        }
    }


    // Redefine draw
    ondraw(context) {
        var app = this;

        // TODO change to clip from the game
        var backgroundImg = new Image();
        backgroundImg.src = "img/background.png";

        context.drawImage(backgroundImg, 0, 0, app.canvas.width, app.canvas.height);

    }


    // Detect events and notify observers
    update() {
        this.draw(this.context);
        this.keyCheck();
    }


    // Initialize application handlers
    start() {
        var app = this;

        // Mouse click handler
        window.onclick = function (event) {
            var point = {
                x: event.layerX,
                y: event.layerY,
            };
            // Send click message to all observers
            app.click(point);
        };

        // Key down handler
        window.onkeydown = function (event) {

            app.keys[event.key] = true;

        };

        // Key up handler
        window.onkeyup = function (event) {

            app.keys[event.key] = false;

        };

        // Load the main menu
        app.nodes = mainMenu(app.canvas);

        // Start the music
        var music = new Sound("sounds/home_screen_loop/Two Steps From Hell - To Glory.mp3", app.volume, 0.5);
        music.sound.loop = true;
        app.addSound(music);

    }
}