/////////////////////////////////////////////////// MAIN ///////////////////////////////////////////////////
var app

function loop(){
	app.update()
	requestAnimationFrame(loop)
}


// Initialization
window.onload = function(){
	app = new App("canvas")
	
	app.start()
	
	requestAnimationFrame(loop)
}