class App extends Widget {
    constructor(element) {
        var canvas = window.document.getElementById(element);
        var context = canvas.getContext("2d");

        super(0, 0, canvas.width, canvas.height);

        this.canvas = canvas;
        this.context = context;

        this.keys = [];
        this.music;

        this.windowOffset = 100; // Offset of the in-game window

        this.time = Date.now();
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

        this.notify("update", dt);
    }


    // Function returns enemy tank
    getEnemyTank(parent, ignore){
        for(var node of parent.nodes){
            if(node instanceof Tank && node !== ignore){
                return node;
            }
            if(node.nodes.length > 0){
                var found = this.getEnemyTank(node, ignore);
                if (found !== undefined)
                    return found;
            }
        }
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
            console.log(event.key);

        };

        // Key up handler
        window.onkeyup = function (event) {

            app.keys[event.key] = false;

        };

        // Load the main menu
        app.nodes = mainMenu(app.canvas);
    }
}