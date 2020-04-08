function about(canvas){
	var nodes = []
	
	var buttonBack = new ImgButton(canvas, "objects/button_returnToMainMenu.png", 50, 750, 300, 100)
	buttonBack.action = function(){
		app.nodes = mainMenu(app.canvas)
	}
	nodes.push(buttonBack)
	
	return nodes
}