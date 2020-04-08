function mainMenu(canvas){
	var nodes = []
	
	var buttonPlay = new ImgButton(canvas, "objects/button_play.png", 500, 200, 500, 150)
	buttonPlay.action = function() {
		app.nodes = round1(app.canvas)
	}
	nodes.push(buttonPlay)
	
	var buttonSettings = new ImgButton(canvas, "objects/button_settings.png", 500, 400, 500, 150)
	buttonSettings.action = function() {
		app.nodes = settings(app.canvas)
	}
	nodes.push(buttonSettings)
	
	var buttonAbout = new ImgButton(canvas, "objects/button_about.png", 500, 600, 500, 150)
	buttonAbout.action = function() {
		app.nodes = about(app.canvas)
	}
	nodes.push(buttonAbout)
	
	var buttonSound = new ImgButton(canvas, "objects/sound_on.svg", 1510, 10, 80, 45)
	buttonSound.action = function() {
		console.log("Sound clicked")
		switch(this.imgSrc){
			case "objects/sound_on.svg":
				this.imgSrc = "objects/sound_off.svg"
				break
			case "objects/sound_off.svg":
				this.imgSrc = "objects/sound_on.svg"
				break
		}
	}
	nodes.push(buttonSound)
	
	return nodes
}