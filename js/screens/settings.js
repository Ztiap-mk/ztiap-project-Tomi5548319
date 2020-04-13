function settings(canvas) {
    var nodes = [];

    // Screen resolution settings
    var textScreenSize = new Text(canvas, app.context, 100, 50, 325, "Screen resolution:", "black", 40);
    nodes.push(textScreenSize);



    var textScreenSmall = new Text(canvas, app.context, 500, 50, 105, "Small", "black", 40);
    textScreenSmall.id = "small";
    textScreenSmall.onclick = function(){
        app.changeResolution(this.id);
        app.nodes = settings(app.canvas);
    };

    var textScreenMedium = new Text(canvas, app.context, 620, 50, 145, "Medium", "black", 40);
    textScreenMedium.id = "medium";
    textScreenMedium.onclick = function(){
        app.changeResolution(this.id);
        app.nodes = settings(app.canvas);
    };

    var textScreenBig = new Text(canvas, app.context, 780, 50, 60, "Big", "black", 40);
    textScreenBig.id = "big";
    textScreenBig.onclick = function(){
        app.changeResolution(this.id);
        app.nodes = settings(app.canvas);
    };

    switch(app.resolution){
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

    // Cancel the settings
    /*var buttonCancel = new ImgButton(canvas, "img/button_cancel.png", 50, 750, 300, 100);
    buttonCancel.action = function () {
        app.nodes = mainMenu(app.canvas);
    };
    nodes.push(buttonCancel);*/

    // Save the settings
    var buttonSave = new ImgButton(canvas, "img/button_save.png", 700, 750, 300, 100);
    buttonSave.action = function () {
        app.nodes = mainMenu(app.canvas);
    };
    nodes.push(buttonSave);

    return nodes;
}