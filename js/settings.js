function settings(canvas){
	var nodes = []
	
	var buttonCancel = new ImgButton(canvas, "objects/button_cancel.png", 50, 750, 300, 100)
	buttonCancel.action = function(){
		app.nodes = mainMenu(app.canvas)
	}
	nodes.push(buttonCancel)
	
	var buttonSave = new ImgButton(canvas, "objects/button_save.png", 700, 750, 300, 100)
	buttonSave.action = function(){
		app.nodes = mainMenu(app.canvas)
	}
	nodes.push(buttonSave)
	
	return nodes
}