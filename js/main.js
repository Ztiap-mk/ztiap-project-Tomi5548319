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
	
	// Add nodes
	app.nodes = mainMenu(app.canvas)
	
	app.start()
	
	requestAnimationFrame(loop)
}