function settings(canvas) {
    var nodes = [];

// Screen resolution settings
    var textScreenSize = new Text(canvas, app.context, 100, 50, 325, "Screen resolution:", "black", 40);
    nodes.push(textScreenSize);


    var textScreenSmall = new Text(canvas, app.context, 500, 50, 105, "Small", "black", 40);
    textScreenSmall.id = "small";
    textScreenSmall.onclick = function(){
        if(Settings.gamePaused === false) {
            Settings.changeResolution(app, this.id);
            app.nodes = settings(app.canvas); // Refresh this screen
        }
    };

    var textScreenMedium = new Text(canvas, app.context, 620, 50, 145, "Medium", "black", 40);
    textScreenMedium.id = "medium";
    textScreenMedium.onclick = function(){
        if(Settings.gamePaused === false) {
            Settings.changeResolution(app, this.id);
            app.nodes = settings(app.canvas); // Refresh this screen
        }
    };

    var textScreenBig = new Text(canvas, app.context, 780, 50, 60, "Big", "black", 40);
    textScreenBig.id = "big";
    textScreenBig.onclick = function(){
        if(Settings.gamePaused === false) {
            Settings.changeResolution(app, this.id);
            app.nodes = settings(app.canvas); // Refresh this screen
        }
    };

    switch(Settings.resolution){
        case "small":
            textScreenSmall.selected = true;
            break;
        case "medium":
            textScreenMedium.selected = true;
            break;
        case "big":
            textScreenBig.selected = true;
            break;
    }

    nodes.push(textScreenSmall);
    nodes.push(textScreenMedium);
    nodes.push(textScreenBig);


    // Player controls

    var textControls = new Text(canvas, app.context, 100, 120, 200, "Controls", "black", 50);
    nodes.push(textControls);



    // Player 1
    var textPlayer1 = new Text(canvas, app.context, 100, 180, 160, "Player 1", "black", 40);
    nodes.push(textPlayer1);

    // Forward
    var text = new Text(canvas, app.context, 150, 230, 120, "Forward", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 400, 230, 200, Settings.player1_forward, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player1_forward"));
        }
    }
    nodes.push(text);

    // Backward
    text = new Text(canvas, app.context, 150, 270, 150, "Backward", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 400, 270, 200, Settings.player1_backward, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player1_backward"));
        }
    }
    nodes.push(text);

    // Left
    text = new Text(canvas, app.context, 150, 310, 150, "Left", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 400, 310, 200, Settings.player1_left, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player1_left"));
        }
    }
    nodes.push(text);

    // Right
    text = new Text(canvas, app.context, 150, 350, 150, "Right", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 400, 350, 200, Settings.player1_right, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player1_right"));
        }
    }
    nodes.push(text);

    // Shooting
    text = new Text(canvas, app.context, 150, 390, 150, "Shooting", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 400, 390, 200, Settings.player1_shoot, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player1_shoot"));
        }
    }
    nodes.push(text);



    // Player 2
    var textPlayer2 = new Text(canvas, app.context, 100, 430, 160, "Player 2", "black", 40);
    nodes.push(textPlayer2);

    // Forward
    text = new Text(canvas, app.context, 150, 480, 120, "Forward", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 400, 480, 200, Settings.player2_forward, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player2_forward"));
        }
    }
    nodes.push(text);

    // Backward
    text = new Text(canvas, app.context, 150, 520, 150, "Backward", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 400, 520, 200, Settings.player2_backward, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player2_backward"));
        }
    }
    nodes.push(text);

    // Left
    text = new Text(canvas, app.context, 150, 560, 150, "Left", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 400, 560, 200, Settings.player2_left, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player2_left"));
        }
    }
    nodes.push(text);

    // Right
    text = new Text(canvas, app.context, 150, 600, 150, "Right", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 400, 600, 200, Settings.player2_right, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player2_right"));
        }
    }
    nodes.push(text);

    // Shooting
    text = new Text(canvas, app.context, 150, 640, 150, "Shooting", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 400, 640, 200, Settings.player2_shoot, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player2_shoot"));
        }
    }
    nodes.push(text);


    // Cancel the settings
    /*var buttonCancel = new ImgButton(canvas, "img/button_cancel.png", 50, 750, 300, 100);
    buttonCancel.action = function () {
        app.nodes = mainMenu(app.canvas);
    };
    nodes.push(buttonCancel);*/

    // Save the settings
    var buttonSave = new ImgButton(canvas, "img/button_save.png", 650, 750, 300, 100);
    buttonSave.action = function () {
        if(Settings.gamePaused === false)
            app.nodes = mainMenu(app.canvas);
    };
    nodes.push(buttonSave);

    return nodes;
}