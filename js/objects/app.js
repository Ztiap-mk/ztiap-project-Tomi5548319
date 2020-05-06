class App extends Widget {
    constructor(element) {
        var canvas = window.document.getElementById(element);
        var context = canvas.getContext("2d");

        super(0, 0, canvas.width, canvas.height);

        this.canvas = canvas;
        this.context = context;
        this.resolution = "medium";

        this.keys = [];
        this.music;

        this.volume = 0.5;
        this.muted = true;

        this.windowOffset = 100; // Offset of the in-game window

        this.time = Date.now();
    }

    changeResolution(new_size) {
        for (var node of this.nodes) {
            if (node instanceof Text && (node.id === "small" || node.id === "medium" || node.id === "big") && node.id !== new_size)
                node.selected = false;
        }

        switch (new_size) {
            case "small":
                this.resolution = "small";
                this.canvas.width = 800;
                this.canvas.height = 450;
                break;
            case "big":
                this.resolution = "big";
                this.canvas.width = 1600;
                this.canvas.height = 900;

                break;
            default:
                this.resolution = "medium";
                this.canvas.width = 1200;
                this.canvas.height = 675;
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
        var now = Date.now();
        var dt = (now - this.time) / 100;
        this.time = now;

        this.draw(this.context);
        this.keyCheck(dt);
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
        app.music = new Sound("sounds/home_screen_loop/Two Steps From Hell - To Glory.mp3", app.volume, 0.5);
        app.music.sound.loop = true;
    }
}