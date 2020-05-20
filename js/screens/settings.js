function settings(canvas) {
    var nodes = [];

// Screen resolution settings
    var textScreenSize = new Text(canvas, app.context, 300, 50, 325, "Screen resolution:", "black", 40);
    nodes.push(textScreenSize);


    var textScreenSmall = new Text(canvas, app.context, 700, 50, 105, "Small", "black", 40);
    textScreenSmall.id = "small";
    textScreenSmall.border = true;
    textScreenSmall.onclick = function(){
        if(Settings.gamePaused === false) {
            Settings.changeResolution(app, this.id);
            app.nodes = settings(app.canvas); // Refresh this screen
        }
    };

    var textScreenMedium = new Text(canvas, app.context, 830, 50, 145, "Medium", "black", 40);
    textScreenMedium.id = "medium";
    textScreenMedium.border = true;
    textScreenMedium.onclick = function(){
        if(Settings.gamePaused === false) {
            Settings.changeResolution(app, this.id);
            app.nodes = settings(app.canvas); // Refresh this screen
        }
    };

    var textScreenBig = new Text(canvas, app.context, 1000, 50, 60, "Big", "black", 40);
    textScreenBig.id = "big";
    textScreenBig.border = true;
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

    var textControls = new Text(canvas, app.context, 700, 170, 200, "Controls", "black", 50);
    nodes.push(textControls);



    // Player 1
    var textPlayer1 = new Text(canvas, app.context, 150, 250, 160, "Player 1", "black", 40);
    nodes.push(textPlayer1);

    // Forward
    var text = new Text(canvas, app.context, 200, 310, 120, "Forward", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 450, 310, 200, Settings.player1_forward, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player1_forward"));
        }
    }
    nodes.push(text);

    // Backward
    text = new Text(canvas, app.context, 200, 360, 150, "Backward", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 450, 360, 200, Settings.player1_backward, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player1_backward"));
        }
    }
    nodes.push(text);

    // Left
    text = new Text(canvas, app.context, 200, 410, 150, "Left", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 450, 410, 200, Settings.player1_left, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player1_left"));
        }
    }
    nodes.push(text);

    // Right
    text = new Text(canvas, app.context, 200, 460, 150, "Right", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 450, 460, 200, Settings.player1_right, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player1_right"));
        }
    }
    nodes.push(text);

    // Shooting
    text = new Text(canvas, app.context, 200, 510, 150, "Shooting", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 450, 510, 200, Settings.player1_shoot, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player1_shoot"));
        }
    }
    nodes.push(text);



    // Player 2
    var textPlayer2 = new Text(canvas, app.context, 850, 250, 160, "Player 2", "black", 40);
    nodes.push(textPlayer2);

    // Forward
    text = new Text(canvas, app.context, 900, 310, 120, "Forward", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 1150, 310, 200, Settings.player2_forward, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player2_forward"));
        }
    }
    nodes.push(text);

    // Backward
    text = new Text(canvas, app.context, 900, 360, 150, "Backward", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 1150, 360, 200, Settings.player2_backward, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player2_backward"));
        }
    }
    nodes.push(text);

    // Left
    text = new Text(canvas, app.context, 900, 410, 150, "Left", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 1150, 410, 200, Settings.player2_left, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player2_left"));
        }
    }
    nodes.push(text);

    // Right
    text = new Text(canvas, app.context, 900, 460, 150, "Right", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 1150, 460, 200, Settings.player2_right, "black", 30);
    text.border = true;
    text.onclick = function () {
        if(Settings.gamePaused === false) {
            Settings.gamePaused = true;
            app.add(keyBind(app.canvas, "Settings.player2_right"));
        }
    }
    nodes.push(text);

    // Shooting
    text = new Text(canvas, app.context, 900, 510, 150, "Shooting", "black", 30);
    nodes.push(text);

    text = new Text(canvas, app.context, 1150, 510, 200, Settings.player2_shoot, "black", 30);
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