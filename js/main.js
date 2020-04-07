/////////////////////////////////////////////////// MAIN ///////////////////////////////////////////////////
var app

function loop(){
	app.update()
	requestAnimationFrame(loop)
}


// Initialization
window.onload = function(){
	app = new App("canvas")
	//canvas, x_mult, y_mult, width_mult, height_mult, angle, imgSrc
	
// Add buttons
	var buttonPlay = new ImgButton(app.canvas, "objects/button_play.png", 500, 200, 500, 150)
	buttonPlay.action = function() {
		app.nodes = round1(app.canvas)
		console.log("Play clicked")
	}
	app.add(buttonPlay)
	
	var buttonSettings = new ImgButton(app.canvas, "objects/button_settings.png", 500, 400, 500, 150)
	buttonSettings.action = function() {
		console.log("Settings clicked")
		//app.nodes = ...
	}
	app.add(buttonSettings)
	
	var buttonAbout = new ImgButton(app.canvas, "objects/button_about.png", 500, 600, 500, 150)
	buttonAbout.action = function() {
		console.log("About clicked")
		//app.nodes = ...
	}
	app.add(buttonAbout)
	
	var buttonSound = new ImgButton(app.canvas, "objects/sound_on.svg", 1510, 10, 80, 45)
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
	app.add(buttonSound)
	

	app.start()
	
	requestAnimationFrame(loop)
}